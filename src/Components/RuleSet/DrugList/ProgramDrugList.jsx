import { useState } from "react";
import GridComponent from "../../GridComponent";

const ProgramDrugList = ({ data, onSelectionChange, AddIncludeList, AddExcludeList, status, rowKeyField }) => {

    //const filteredData = data.filter(item =>
    //    Object.values(item).some(
    //        val => val.toString().toLowerCase().includes(searchText.toLowerCase())
    //    )
    //);

    return (
        <>
            <GridComponent
                title=""
                Orgdata={data}
                ShowRowSelection={status}
                onSelectionChange={onSelectionChange}
                rowKeyField={rowKeyField}
                //setSelectedRows={setSelectedRows}
            />
            <div>
                <div className="ButtonRow">
                    <button className="PrimaryButton" onClick={AddIncludeList} >Add To Include Drug List</button>
                    <button className="PrimaryButton" onClick={AddExcludeList}>Add To Exclude Drug List</button>
                </div>
            </div>
        </>
    );
};

export default ProgramDrugList;
