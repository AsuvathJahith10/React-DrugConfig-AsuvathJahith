import React, { useEffect, useState, useRef } from 'react';
import '../App.css';


const GridComponent = ({ Orgdata = {}, title = "Active", columnAlignments = {}, columnDisplayNames = {}, columnWidths = {}, hiddenColumns = [], onDelete = null, showDelete = false, Datecolumns = {}, onEditRow = () => { }, showEditButtonColumn = false, onSelectionChange = () => { }, ShowRowSelection = false, rowKeyField = null,
    paginationMode = "client", /*"client" or "server"*/ onPageChange = () => { },   /* function(page, rowsPerPage)*/ totalRecords = null, /*// total record count from DB for server-side*/  pageSizeOptions = [10, 25, 50], defaultRowsPerPage = 10 }) => {

    //Actual Data
    const [data, setData] = useState([]);

    //Sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    //Filter
    const [filterPopup, setFilterPopup] = useState(null);
    const popupRef = useRef(null);
    const [filters, setFilters] = useState({});

    //Pagging
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    //select check box
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [cleanedData, setcleanedData] = useState([])

    useEffect(() => {
        onSelectionChange(selectedRows);
    }, [selectedRows])
       
    useEffect(() => {
        setcleanedData(Orgdata.filter(row =>
            Object.values(row).some(value => value !== null && value !== undefined && String(value).trim() !== '')
        ));

        if (Orgdata && Orgdata.length > 0) {
            //console.log("Setting cleaned data from Orgdata:", Orgdata);
            setData(Orgdata);
            setCurrentPage(1);

            //console.log("Orgdata changed:", data);
            const initialFilters = Object.keys(Orgdata[0]).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {});
            setFilters(initialFilters);
            setSelectAll(false);
            setSelectedRows([]);
        }
        else
            setData(Orgdata);
            setSelectAll(false);
            setSelectedRows([]);
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
        const isDateField = (Array.isArray(Datecolumns) && Datecolumns.includes(sortConfig.key)) ||
            (Datecolumns && typeof Datecolumns === 'object' && Datecolumns[sortConfig.key]);
        if (isDateField) {
            aValue = Date.parse(aValue);
            bValue = Date.parse(bValue);

            //console.log("Sorting:", sortConfig.key, aValue, bValue);
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    }),[filteredData, sortConfig]);

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

   
    //const rowsPerPage = 15;
    //const totalPages = Math.ceil(data.length / rowsPerPage);
    let headers = data && data.length > 0 ? Object.keys(data[0]).filter(key => !hiddenColumns.includes(key)) : [];
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

    const handleCheckboxChange = (keyValue) => {
        setSelectedRows((prev) =>
            prev.includes(keyValue)
                ? prev.filter((v) => v !== keyValue)
                : [...prev, keyValue]
        );
    };

    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            const allKeys = currentRows.map(row => row[rowKeyField]);// Select all keys in the entire data
            setSelectedRows(allKeys);
        } else {
            setSelectedRows([]);
        }
        setSelectAll(checked);
    };



    useEffect(() => {
        if (paginationMode === "server") {
            onPageChange(currentPage, rowsPerPage);
        }
    }, [currentPage, rowsPerPage]);


    const pagedData = React.useMemo(() => {
        if (paginationMode === "server") return data;
        const start = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [paginationMode, sortedData, data, currentPage, rowsPerPage]);

    const totalRecordsCount = paginationMode === "server" && totalRecords !== null
        ? totalRecords
        : sortedData.length;

    const totalPages = Math.ceil(totalRecordsCount / rowsPerPage);
    // Pagination
    //const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = pagedData;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };
 
    return (
        <div className="container mt-3 container-no-padding" >
            <div className="row justify-content-center" >
                <div className="col-auto me-auto" >
                    <h6 className="mb-0" >{title}</h6>
                </div>
                <div className="col-auto">
                    <label className="label-small">{cleanedData.length > 0 ? sortedData.length : 0} Records</label>
                </div>
            </div>
            <div className="table-container">
                <div className="table-responsive table-wrapper" >
                    <table className="table table-striped table-bordered table-hover table-rounded mb-0 custom-table" cellPadding="10">
                        <colgroup>
                            {(showEditButtonColumn || ShowRowSelection) && (
                                <col style={{ width: `${fixedColumnWidthPx}px` }} />
                            )}
                            {(headers.map((key, index) => (<col key={index} style={{ width: columnWidths[key] || defaultColumnWidth }} />)))}
                        </colgroup>
                        <thead className="table-header">
                            <tr>
                                {showEditButtonColumn && (
                                    <th style={{
                                        backgroundColor: '#c8dbfb', width: `${fixedColumnWidthPx}px`, textAlign: "center"  // <-- add this line 
                                    }}></th>)}
                                {data.length > 0 && ShowRowSelection && (
                                    <th className="table-th" style={{ backgroundColor: '#c8dbfb', width: `${fixedColumnWidthPx}px`, textAlign: "center" }}>
                                        <div className="align-items-center" style={{ marginRight:'11px', marginBottom:'5px'}}>
                                        <input className="text-capitalize"
                                                type="checkbox"
                                                onChange={handleSelectAllChange}
                                                checked={selectAll}
                                                //indeterminate={selectedRows.length > 0 && selectedRows.length < currentRows.length ? "true" : "false"} // optional visual hint
                                                aria-label="Select all rows"
                                            />
                                            </div>
                                    </th>
                                )}

                                {
                                    (headers.map((key) => (
                                    <th key={key} className="table-th" style={{ textAlign: columnAlignments[key] || 'left', width: columnWidths[key] }}>
                                        <div className="align-items-center" onClick={() => handleSort(key)}>
                                            <span className="text-capitalize">{columnDisplayNames[key] || key}</span>
                                            <span className="btn ms-1 sort-icon">{getSortIcon(key)}</span>
                                        </div>

                                    </th>
                                ))) }
                                {  showDelete === true && (
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
                            {cleanedData.length > 0 && currentRows.length > 0 ? (
                                currentRows.map((item, index) => (

                                    <tr key={index}>
                                       {showEditButtonColumn && (
                                            <td style={{ width: `${fixedColumnWidthPx}px` }}>
                                                <button /*onClick={onClick}*/ style={{ border: "none", background: "none", padding: 0, margin: 'auto' }}>
                                                    <img onClick={() => onEditRow(item)} src={`${process.env.PUBLIC_URL}/Images/EditCheck.png`} alt="button" style={{ width: '16px', height: '16px' }} />
                                                </button>
                                            </td>)}

                                        {ShowRowSelection && (
                                            <td style={{ width: `${fixedColumnWidthPx}px` }}>
                                                <div style={{marginTop:'4px'}}>
                                                    <input 
                                                        type="checkbox"
                                                        checked={selectedRows.includes(item[rowKeyField])}
                                                        onChange={() => handleCheckboxChange(item[rowKeyField])}
                                                    />
                                                </div>
                                            </td>
                                        )}
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
                                    {/*<td colSpan={headers.length + 1} className="text-center">No Data...</td>*/}
                                </tr>
                            )
                            }

                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-11" style={{ paddingRight:'0px'}}>
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
                                        {cleanedData.length > 0 && [...Array(totalPages)].map((_, i) => {
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
                    <div className="col-md-auto align-item-center justify-content-end" style={{ padding: '4px', }}>
                        {/*<label className="me-1">Rows per page:</label>*/}
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="form-select form-select-sm"
                            style={{ width: 'auto', display: 'inline-block' }}
                        >
                            {pageSizeOptions.map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
    //);
}

export default GridComponent;
