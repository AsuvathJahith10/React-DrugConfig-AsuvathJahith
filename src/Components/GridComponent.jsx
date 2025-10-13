import React, { useEffect, useState, useRef } from 'react';


const Datagrid = ({ Orgdata, title = "Active" }) => {

    //Actual Data
    const [data, setData] = useState(Orgdata);

    //Sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    //Filter
    const [filterPopup, setFilterPopup] = useState(null);
    const popupRef = useRef(null);
    const [filters, setFilters] = useState({ name: '', effectivedate: '', termdate: '', lastmodified: '' });

    //Pagging
    const [rowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setData(Orgdata);
        setCurrentPage(1)
    }, [Orgdata]);


    //Get Data
    useEffect(() => {
        console.log(Orgdata);
        console.log("data");
        handleSort('name');
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setFilterPopup(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // Filtering logic
    const filteredData = data.filter((row) =>
        Object.keys(filters).every((key) =>
            String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
        )
    );

    // Sorting logic
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

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

        const sorted = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setData(sorted);
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

    return (
        <div className="container mt-3" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <style>{`
                .page-item.active .page-link {
                  background-color: #c8dbfb !important;
                  border-color: #c8dbfb !important;
                  color: #000 !important;
                }
                .page-link {
                    color: black !important;
                }
                .table-rounded {
                    border-radius: 4px; 
                }
                .pagination-nav {
                   //justify-content: start;
                   /* fixed width for nav */
                }
               .pagination-scrollbar {
                  overflow-x: auto;
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;     /* Firefox */
                }

                .pagination-scrollbar::-webkit-scrollbar {
                  display: none;             /* Chrome, Safari, Opera */
                }

          `}</style>
            <div className="row justify-content-center" >
                <div className="col-auto me-auto" >
                    <h6 className="mb-0" >{title} RuleSets</h6>
                </div>
                <div className="col-auto">
                    <label style={{ fontSize: '12px' }}>{sortedData.length} Records</label>
                </div>
            </div>
            <div style={{ border: "1px solid #ccc", borderRadius: "4px" }}>
                <div className="table-responsive" style={{ minHeight: "395px", overflowY: "auto" }}>
                    <table className="table table-striped table-bordered table-hover table-rounded mb-0" cellPadding="10"
                        style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed", fontSize: '12px', textAlign: "left" }}>
                        <thead style={{ backgroundColor: '#c8dbfb', position: "sticky", top: 0, zIndex: 2 }}>
                            <tr>
                                <th style={{ backgroundColor: '#c8dbfb', width: "35px", textAlign: "center" }}></th>
                                {headers.map((key) => (
                                    <th key={key} style={{ cursor: 'pointer', whiteSpace: 'nowrap', position: 'relative', backgroundColor: '#c8dbfb', padding: '2px', paddingLeft: '0.5rem' }}>
                                        <div className="d-flex align-items-center" onClick={() => handleSort(key)}>
                                            <span className="text-capitalize">{key}</span>
                                            <span className="btn ms-1" style={{ padding: '1px', paddingTop: '2px', paddingBottom: '2px' }} >{getSortIcon(key)}</span>
                                            <span className="ms-5"></span>
                                            <span className="ms-5"></span>
                                        </div>
                                       
                                    </th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? (
                                currentRows.map((item, index) => (
                                  
                                    <tr key={index} >
                                        <td style={{ width: '10px' }}>
                                            <button /*onClick={onClick}*/ style={{ border: "none", background: "none", padding: 0, margin: 'auto' }}>
                                                <img src="/images/EditCheck.png" alt="button" style={{ width: '16px', height: '16px' }} />
                                            </button>
                                        </td>
                                        {headers.map((header) => (
                                            <td key={header}>{item[header]}</td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">Loading data...</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
                <div>
                    <nav aria-label="Page navigation">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                //width: '220px',      // slightly wider for better spacing
                                overflow: 'hidden',
                                margin: '5px',
                            }}
                        >
                            {/* First */}
                            <button
                                className="btn btn-sm btn-light"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                title="First Page"
                                style={{ minWidth: '32px' }}
                            >
                                <i className="bi bi-skip-start-fill"></i>
                            </button>

                            {/* Previous */}
                            <button
                                className="btn btn-sm btn-light"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                title="Previous Page"
                                style={{ minWidth: '32px' }}
                            >
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

export default Datagrid;
