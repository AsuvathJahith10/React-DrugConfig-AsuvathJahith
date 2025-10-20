import React, { useState, useEffect } from 'react';


const DrugListSearch = ({ dropdownData = {}, onSearch, onChange }) => {

    const {
        levelOptions = [],
        searchByOptions = {}
    } = dropdownData;

    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedSearchBy, setSelectedSearchBy] = useState('');
    const [inputValue, setInputValue] = useState('');

    // Set default selected level and searchBy on mount
    useEffect(() => {
        if (levelOptions.length > 0) {
            const defaultLevel = levelOptions[0];
            setSelectedLevel(defaultLevel);

            const defaultSearchBy = searchByOptions[defaultLevel]?.[0] || '';
            setSelectedSearchBy(defaultSearchBy);
        }
    }, [levelOptions, searchByOptions]);

    const handleLevelChange = (e) => {
        const level = e.target.value;
        setSelectedLevel(level);

        // Set first available searchBy for the new level
        const firstSearchBy = searchByOptions[level]?.[0] || '';
        setSelectedSearchBy(firstSearchBy);
        setInputValue('');
    };

    const handleSearchByChange = (e) => {
        setSelectedSearchBy(e.target.value);
        setInputValue('');
    };

    const handleSearch = () => {
        if (!selectedLevel || !selectedSearchBy || !inputValue) {
            alert("Please complete all fields.");
            return;
        }

        const payload = {
            level: selectedLevel,
            searchBy: selectedSearchBy,
            searchValue: inputValue
        };

        onSearch(payload); // Send to parent
    };

    return (
        <>
            <style>{`
                .PanelStyle{
                        margin-bottom:0px;
                        background-color:white;
                }
              .FilterStyle{
                  margin-bottom:0px;
              }
              .LebalStyle{
                  min-width:0px;
              }
            `}</style>
            <div className="SearchPanel PanelStyle">
                <div className="FilterRow FilterStyle">
                    <label className="FilterLabel LebalStyle" htmlFor="status"><span className="RequiredSymbol">*</span>Drug Attribute Level</label>
                    <select
                        id="status"
                        className="DropDownList FilterInput"
                        value={selectedLevel}
                        onChange={handleLevelChange}
                    >
                        <option value="">Select</option>
                        {levelOptions.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    <label className="FilterLabel LebalStyle" htmlFor="status">Search By</label>
                    <select
                        id="status"
                        className="DropDownList FilterInput"
                        value={selectedSearchBy}
                        onChange={handleSearchByChange}
                        disabled={!selectedLevel}
                    >
                        <option value="">Select</option>
                        {selectedLevel && searchByOptions[selectedLevel]?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <label className="FilterLabel LebalStyle" htmlFor="searchInput">
                        {selectedSearchBy || 'Search'}
                    </label>
                    <input
                        id="name"
                        className="FilterInput"
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        maxLength={50}
                        placeholder={`Enter ${selectedSearchBy || 'Value'}`}
                    />
                    <button className="PrimaryButton" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </>
    );
}




export default DrugListSearch