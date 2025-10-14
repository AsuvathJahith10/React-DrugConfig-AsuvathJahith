import {useState} from "react";
import DataGrid from "./GridComponent";


const mockSearchResults = [
  { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004222', NDC: '33261019152' },
  { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '005321', NDC: '54868123456' },
  { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '006789', NDC: '12345678901' },
];
const ExcludedList = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(mockSearchResults);

  const handleSearch = () => {
    if (!searchText) {
      setFilteredData(mockSearchResults);
      return;
    }

    const filtered = mockSearchResults.filter(item =>
      Object.values(item).some(
        val => val.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
   const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
    return (
        <>     
        <div className="mb-3 d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
          <div />
            <div className="d-flex flex-nowrap align-items-center justify-content-end" style={{ gap: '0.5rem' }}>
              <input
                type="text"
                className="FilterInput"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            <button className="PrimaryButton ms-2" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <DataGrid title={"Drug"} Orgdata={filteredData} />
        </>
    )
}
export default ExcludedList;