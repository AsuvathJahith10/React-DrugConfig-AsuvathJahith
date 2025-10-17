import { useState } from "react";
import GridComponent from "../../GridComponent";

const IncludeExcludeDrugList = ({ data,onDeleteDrug,title }) => {
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
 const handleSearch = () => {
    setAppliedSearch(searchText.trim());
  };

  const filteredData = !appliedSearch
    ? data
    : data.filter(item =>
        Object.values(item).some(val =>
          val?.toString().toLowerCase().includes(appliedSearch.toLowerCase())
        )
      );
   

  return (
    <>
     
        <div className="mb-3 d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
          {/*  <div className="d-flex flex-nowrap align-items-center justify-content-end" style={{ gap: '0.5rem' }}>*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      className="FilterInput"*/}
          {/*      placeholder="Search..."*/}
          {/*      value={searchText}*/}
          {/*      onChange={(e) => setSearchText(e.target.value)}*/}
          {/*    />*/}
          {/*  <button className="PrimaryButton ms-2" onClick={handleSearch}>*/}
          {/*  Search*/}
          {/*</button>*/}
          {/*</div>*/}
        </div>
      <GridComponent
              title={title}
              Orgdata={filteredData}
              showDelete={true}
              onDelete={onDeleteDrug}
              style={{Hight:"100px"}}
      />
    </>
  );
};

export default IncludeExcludeDrugList;
