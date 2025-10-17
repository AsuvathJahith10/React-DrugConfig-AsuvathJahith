


const DrugListSearch = () => {

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
                    <label className="FilterLabel LebalStyle" htmlFor="status">*Drug Attribute Level</label>
                    <select
                        id="status"
                        className="DropDownList FilterInput"
                    //value={searchFields.Status}
                    //onChange={e => onFieldChange("Status", e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Active">GCNSeq</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                        <option value="DeActive">Inactive</option>
                    </select>
                    <label className="FilterLabel LebalStyle" htmlFor="status">Search By</label>
                    <select
                        id="status"
                        className="DropDownList FilterInput"
                    //value={searchFields.Status}
                    //onChange={e => onFieldChange("Status", e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                        <option value="DeActive">Inactive</option>
                    </select>
                    <label className="FilterLabel LebalStyle" htmlFor="name">GCN</label>
                    <input
                        id="name"
                        className="FilterInput"
                        type="text"
                        //value={searchFields.Name}
                        //onChange={e => onFieldChange("Name", e.target.value)}
                        maxLength={50}
                        //placeholder="Enter Name"
                    />
                    <button className="PrimaryButton">Search</button>
                </div>
            </div>
        </>
    );
}




export default DrugListSearch