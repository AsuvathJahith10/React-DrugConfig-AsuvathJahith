import { useState } from "react";
import GridComponent from "../../GridComponent";

const ExcludedDrugList = ({ data,onDeleteDrug }) => {
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter(item =>
    Object.values(item).some(
      val => val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search excluded..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div> */}
      <GridComponent
        title="Excluded List"
        Orgdata={filteredData}
        showDelete={true}
        onDelete={onDeleteDrug} 
        showEditButtonColumn={false} 
      />
    </>
  );
};

export default ExcludedDrugList;
