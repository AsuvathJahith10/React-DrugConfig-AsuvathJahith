import React, { useEffect, useState, useRef } from 'react';
import '../App.css';


const GridComponent = ({ Orgdata, title = "Active", columnAlignments = {}, columnDisplayNames = {}, columnWidths = {}, onDelete = null, showDelete = false, showEditButtonColumn = false }) => {

    //Actual Data
    const [data, setData] = useState([]);

    //Sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    //Filter
    const [filterPopup, setFilterPopup] = useState(null);
    const popupRef = useRef(null);
    const [filters, setFilters] = useState({});

    //Pagging
    const [rowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (Orgdata && Orgdata.length > 0) {
            setData(Orgdata);
            setCurrentPage(1);

            const initialFilters = Object.keys(Orgdata[0]).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {});
            setFilters(initialFilters);
        }
        else
            setData(Orgdata);
    }, [Orgdata]);


    // Filtering logic
    const filteredData = React.useMemo(() => data.filter((row) =>
        Object.keys(filters).every((key) =>
            String(row[key] || '').toLowerCase().includes(filters[key].toLowerCase())
        )
    ), [data, filters]);

    // Sorting logic
    const sortedData = React.useMemo(() => [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Check if the column is a date field
        const isDateField = ['effectivedate', 'termdate', 'lastmodified'].includes(sortConfig.key);
        if (isDateField) {
            aValue = Date.parse(aValue);
            bValue = Date.parse(bValue);

            console.log("Sorting:", sortConfig.key, aValue, bValue);
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    })
        , [filteredData, sortConfig]);

    // Handle filter change
    const handleFilterChange = (e, column) => {
        setFilters({ ...filters, [column]: e.target.value });
    };



    //SortButton
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }


        //setData(sorted);
        setSortConfig({ key, direction });
    };

    //Get Sort Button Icon
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return sortConfig.direction === 'asc' ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-up-fill"></i>;
        return sortConfig.direction === 'asc' ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>;
    };

    //Filter Popup toggle
    const toggleFilterPopup = (key) => {
        setFilters({ ...filters, [key]: '' });
        setFilterPopup(filterPopup === key ? null : key);
    };

    // Pagination
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };
    //const rowsPerPage = 15;
    //const totalPages = Math.ceil(data.length / rowsPerPage);
    const headers = data && data.length > 0 ? Object.keys(data[0]) : [];
    const pageRefs = useRef([]);

    useEffect(() => {
        const currentRef = pageRefs.current[currentPage - 1];
        if (currentRef) {
            currentRef.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [currentPage]);
    // Fixed width for the first column (edit button)
    const fixedColumnWidthPx = 35;

    // Count of other columns (headers length)
    const numberOfColumns = headers.length;
    const defaultColumnWidth = `calc((100% - ${fixedColumnWidthPx}px) / ${numberOfColumns})`;

    return (
        <div className="container mt-3 container-no-padding" >
            <div className="row justify-content-center" >
                <div className="col-auto me-auto" >
                    <h6 className="mb-0" >{title}</h6>
                </div>
                <div className="col-auto">
                    <label className="label-small">{sortedData.length} Records</label>
                </div>
            </div>
            <div className="table-container">
                <div className="table-responsive table-wrapper" >
                    <table className="table table-striped table-bordered table-hover table-rounded mb-0 custom-table" cellPadding="10">
                        <colgroup>
                            {showEditButtonColumn && (
                                <col style={{ width: `${fixedColumnWidthPx}px` }} />
                            )}
                            {headers.map((key) => (
                                <col key={key} style={{ width: columnWidths[key] || defaultColumnWidth }} />
                            ))}
                        </colgroup>
                        <thead className="table-header">
                            <tr>
                                {showEditButtonColumn===true && (
                                    <th style={{
                                        backgroundColor: '#c8dbfb', width: `${fixedColumnWidthPx}px`, textAlign: "center"  // <-- add this line 
                                    }}></th>)}
                                {headers.map((key) => (
                                    <th key={key} className="table-th" style={{ textAlign: columnAlignments[key] || 'left', width: columnWidths[key] }}>
                                        <div className="align-items-center" onClick={() => handleSort(key)}>
                                            <span className="text-capitalize">{columnDisplayNames[key] || key}</span>
                                            <span className="btn ms-1 sort-icon">{getSortIcon(key)}</span>
                                        </div>

                                    </th>
                                ))}
                                {showDelete === true && (
                                    <th style={{
                                        backgroundColor: '#c8dbfb',
                                        width: `${fixedColumnWidthPx}px`,
                                        textAlign: "center"
                                    }}>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? (
                                currentRows.map((item, index) => (

                                    <tr key={index}>
                                       {showEditButtonColumn && (
                                            <td style={{ width: `${fixedColumnWidthPx}px` }}>
                                                <button /*onClick={onClick}*/ style={{ border: "none", background: "none", padding: 0, margin: 'auto' }}>
                                                    <img src={`${process.env.PUBLIC_URL}/Images/EditCheck.png`} alt="button" style={{ width: '16px', height: '16px' }} />
                                                </button>
                                            </td>)}
                                        {headers.map((header) => (
                                            <td key={header} style={{ textAlign: columnAlignments[header] || 'left', width: columnWidths[header] }}>{item[header]}</td>
                                        ))}
                                        {onDelete && (
                                            <td style={{ width: `${fixedColumnWidthPx}px`, textAlign: 'center' }}>
                                                <button
                                                    onClick={() => onDelete(item)}
                                                    style={{
                                                        border: 'none',
                                                        background: 'none',
                                                        padding: '0',
                                                        cursor: 'pointer',
                                                        color: 'red',
                                                    }}
                                                    title="Delete"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={headers.length + 1} className="text-center">Loading data...</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <div>
                    <nav aria-label="Page navigation">
                        <div className="pagination-container">
                            {/* First */}
                            <button
                                className="btn btn-sm btn-light page-button"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                title="First Page">
                                <i className="bi bi-skip-start-fill"></i>
                            </button>

                            {/* Previous */}
                            <button
                                className="btn btn-sm btn-light page-button"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                title="Previous Page">
                                <i className="bi bi-caret-left-fill"></i>
                            </button>

                            {/* Scrollable page numbers */}
                            <div className="pagination-scrollbar"
                                style={{
                                    overflowX: 'auto',
                                    flex: 1,
                                    //scrollbarWidth: 'thin',
                                    //scrollbarColor: '#c8dbfb transparent',
                                }}
                            >
                                <ul
                                    className="pagination pagination-sm mb-0"
                                >
                                    {[...Array(totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        return (
                                            <li
                                                key={page}
                                                ref={(el) => (pageRefs.current[i] = el)}
                                                className={`page-item ${page === currentPage ? 'active' : ''}`}

                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            {/* Next */}
                            <button
                                className="btn btn-sm btn-light"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                title="Next Page"
                            >
                                <i className="bi bi-caret-right-fill"></i>
                            </button>

                            {/* Last */}
                            <button
                                className="btn btn-sm btn-light"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                title="Last Page"
                            >
                                <i className="bi bi-skip-end-fill"></i>
                            </button>


                        </div>
                    </nav>
                </div>

            </div>
        </div>
    );
    //);
}

export default GridComponent;
