import { useState, useEffect } from "react";
// import IncludedList from "./IncludedList";
import DrugListSearch from "./DrugList/DrugListSearch";
import IncludeExcludeDrugList from "./DrugList/IncludeExcludeDrugList";
import ProgramDrugList from "./DrugList/ProgramDrugList";

const mockData = [
  { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004222', NDC: '33261019152' },
  { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '005321', NDC: '54868123456' },
    { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '006789', NDC: '12345678901' },

    { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004225', NDC: '33261019152' },
    { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '005389', NDC: '54868123456' },
    { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '006774', NDC: '12345678901' },

    { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004547', NDC: '33261019152' },
    { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '005875', NDC: '54868123456' },
    { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '008745', NDC: '12345678901' },

    { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004111', NDC: '33261019152' },
    { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '008888', NDC: '54868123456' },
    { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '006142', NDC: '12345678901' },

    { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004465', NDC: '33261019152' },
    { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '005114', NDC: '54868123456' },

    { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004556', NDC: '33261019152' },
    { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '005224', NDC: '54868123456' },
    { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '002485', NDC: '12345678901' },
    { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '006725', NDC: '12345678901' },
];
const DrugList = () => {

    const InitialColumn = [{
        drugName: '',
        HIC3: '',
        HICLSeqNo: '',
        GCN: '',
        GCNSeqNo: '',
        NDC: ''
    }];

    //const [sourceData, setSourceData] = useState(mockData);
    const [DrugList, setDrugList] = useState(mockData);
    const [excludedDrugs, setExcludedDrugs] = useState([]);

    const [includedDrugs, setIncludedDrugs] = useState([]);

    const [selectedRows, setSelectedRows] = useState([]);

    const [DrugSelectStatus, setDrugSelectStatus] = useState(false);
    //useEffect(() => {
    //    console.log("Updated Excluded Drugs:", excludedDrugs);
    //}, [excludedDrugs]);
    //useEffect(() => {
    //    console.log("selectedRows updated:", selectedRows);
    //}, [selectedRows]);

    //const onSelectDrug = (drug) => {
    //    //setSelectedRows(drug);
    //    setSelectedRows(prev =>
    //        prev.some(d => d.GCN === drug.GCN)
    //            ? prev.filter(d => d.GCN !== drug.GCN)  // deselect if already selected
    //            : [...prev, drug]                       // add to selection
    //    );
    //    console.log("Selected Drugs:", drug);
    //};


    const HandleExcludeList = () => {
  
        console.log("Selected rows (GCNs):", selectedRows);
        if (selectedRows.length === 0) return;

        // Find selected items by matching GCN (or whatever key)
        const selectedItems = DrugList.filter((x) => selectedRows.includes(x.GCNSeqNo));

        console.log("Selected items to exclude:", selectedItems);

        console.log("Selected items to exclude:", selectedRows);

        // Add selected to excludedDrugs
        setExcludedDrugs((prev) => [...prev, ...selectedItems]);

        console.log("Selected items to exclude:", selectedRows);

        // Remove selected from DrugList
        setDrugList((prev) => prev.filter((x) => !selectedRows.includes(x.GCNSeqNo)));

        console.log("Selected items to exclude:", DrugList);

        // Clear selection
        setSelectedRows([]);



        console.log("Selected items to exclude:", selectedItems);
        //setSelectAll(false);
    };

    const HandleIncludeList = () => {

        console.log("Selected rows (GCNs):", selectedRows);
        if (selectedRows.length === 0) return;

        // Find selected items by matching GCN (or whatever key)
        const selectedItems = DrugList.filter((x) => selectedRows.includes(x.GCNSeqNo));

        console.log("Selected items to exclude:", selectedItems);

        console.log("Selected items to exclude:", selectedRows);

        // Add selected to excludedDrugs
        setIncludedDrugs((prev) => [...prev, ...selectedItems]);

        console.log("Selected items to exclude:", selectedRows);

        // Remove selected from DrugList
        setDrugList((prev) => prev.filter((x) => !selectedRows.includes(x.GCNSeqNo)));

        console.log("Selected items to exclude:", DrugList);

        // Clear selection
        setSelectedRows([]);



        console.log("Selected items to exclude:", selectedItems);
        //setSelectAll(false);
    };

    const deleteExcludedDrug = (drug) => {

        setExcludedDrugs(prev => prev.filter(d => d.GCNSeqNo !== drug.GCNSeqNo));
        setDrugList([...DrugList, drug])

    };

    const deleteIncludedDrug = (drug) => {

        setIncludedDrugs(prev => prev.filter(d => d.GCNSeqNo !== drug.GCNSeqNo));
        setDrugList([...DrugList, drug])

    };

   //// Extract headers from sourceData or fallback
   // const headersForTarget = DrugList.length > 0
   //     ? Object.keys(DrugList[0])
   //     : Object.keys(InitialValue[0]);  // <-- FIXED here

    const targetExcludeDataWithHeaders = excludedDrugs.length > 0
        ? excludedDrugs
        : InitialColumn; 

    const targetIncludeDataWithHeaders = includedDrugs.length > 0
        ? includedDrugs
        : InitialColumn; 


    const targetDrugListDataWithHeaders = DrugList.length > 0
        ? DrugList
        : InitialColumn; 


    useEffect(() => {
        setDrugSelectStatus(DrugList.length > 0
            ? true
            : false)
    }, [DrugList])

  return (
      <>

          <div className="SectionLabel">Program Drug List</div>
          <label className="SectionSubLabel" style={{ fontSize:'12px' }}>Search for a drug by HICLSeqNo, HICL3, GCN, GCNSeqNo, or NDC. Pleasw make sure the Name matches before adding it to the drug list.</label>
          <DrugListSearch/>
          <ProgramDrugList data={targetDrugListDataWithHeaders} onSelectionChange={setSelectedRows} AddIncludeList={HandleIncludeList} AddExcludeList={HandleExcludeList} status={DrugSelectStatus} rowKeyField={"GCNSeqNo"} />
          <IncludeExcludeDrugList title={"Included Drug List"} data={targetIncludeDataWithHeaders} onDeleteDrug={deleteIncludedDrug} />
          <IncludeExcludeDrugList title={"Excluded Drug List"} data={targetExcludeDataWithHeaders} onDeleteDrug={deleteExcludedDrug} />
    </>
  );
};

export default DrugList;
