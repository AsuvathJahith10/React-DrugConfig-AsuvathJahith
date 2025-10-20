import { useState, useEffect } from "react";
// import IncludedList from "./IncludedList";
import DrugListSearch from "./DrugList/DrugListSearch";
import IncludeExcludeDrugList from "./DrugList/IncludeExcludeDrugList";
import ProgramDrugList from "./DrugList/ProgramDrugList";
import config from "../../Config";

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
const DrugList = ({ InExdata,  onChange }) => {

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch data from API
    //useEffect(() => {
    //    //const fetchDrugData = async () => {
    //    //    try {
    //    //        const response = await fetch(`${config.API_BASE_URL}${config.DRUGS_ENDPOINT}`); // <-- Update this
    //    //        if (!response.ok) throw new Error("Failed to fetch drug data.");
    //    //        const data = await response.json();
    //    //        setDrugList(data);
    //    //    } catch (err) {
    //    //        console.error("Error fetching drug list:", err);
    //    //        setError(err.message);
    //    //    } finally {
    //    //        setLoading(false);
    //    //    }
    //    //};

    //    //fetchDrugData();
    //    //(payload)
    //}, []);

    useEffect(() => {
        console.log('InExdata:', InExdata);
        if (InExdata) {
            setIncludedDrugs(InExdata.includeGrid || []);
            setExcludedDrugs(InExdata.excludeGrid || []);
        }
    }, [InExdata]);

    // Filter out drugs that are already in included or excluded lists
    useEffect(() => {
        const filteredDrugList = mockData.filter((drug) => {
            const isInIncludeList = includedDrugs.some((d) => d.GCNSeqNo === drug.GCNSeqNo);
            const isInExcludeList = excludedDrugs.some((d) => d.GCNSeqNo === drug.GCNSeqNo);
            return !isInIncludeList && !isInExcludeList;
        });
        setDrugList(filteredDrugList);
    }, [includedDrugs, excludedDrugs]);  // Trigger whenever included or excluded drugs change


    const sendToParent = (include, exclude) => {
        if (onChange) {
            onChange({
                includeGrid: include,
                excludeGrid: exclude
            });
        }
    };

    const handleSearch = async (payload) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}${config.DRUGS_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setDrugList(result);
            console.log('API Response:', result);

            // Do something with the result (e.g., update state or show in UI)
        } catch (error) {
            console.error('API Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //useEffect(() => {
    //    sendToParent(includedDrugs, excludedDrugs);
    //}, [includedDrugs, excludedDrugs]);


    const HandleExcludeList = () => {
        if (selectedRows.length === 0) return;

        // Find selected items by matching GCN (or whatever key)
        const selectedItems = DrugList.filter((x) => selectedRows.includes(x.GCNSeqNo));

        // Add selected to excludedDrugs
        //setExcludedDrugs((prev) => [...prev, ...selectedItems]);
        setExcludedDrugs((prev) => [...prev, ...selectedItems]);
        // Remove selected from DrugList
        setDrugList((prev) => prev.filter((x) => !selectedRows.includes(x.GCNSeqNo)));

        sendToParent(includedDrugs, [...excludedDrugs, ...selectedItems]);

        // Clear selection
        setSelectedRows([]);
        //setSelectAll(false);
    };

    const HandleIncludeList = () => {
        if (selectedRows.length === 0) return;

        // Find selected items by matching GCN (or whatever key)
        const selectedItems = DrugList.filter((x) => selectedRows.includes(x.GCNSeqNo));

        // Add selected to excludedDrugs
        //setIncludedDrugs((prev) => [...prev, ...selectedItems]);
        setIncludedDrugs((prev) => [...prev, ...selectedItems]);
        // Remove selected from DrugList
        setDrugList((prev) => prev.filter((x) => !selectedRows.includes(x.GCNSeqNo)));

        sendToParent([...includedDrugs, ...selectedItems], excludedDrugs);

        // Clear selection
        setSelectedRows([]);
    };

    const deleteExcludedDrug = (drug) => {
        const updated = excludedDrugs.filter(d => d.GCNSeqNo !== drug.GCNSeqNo);
        setExcludedDrugs(updated);
        setDrugList([...DrugList, drug]);
        sendToParent(includedDrugs, updated);  // updated exclude

    };

    const deleteIncludedDrug = (drug) => {
        const updated = includedDrugs.filter(d => d.GCNSeqNo !== drug.GCNSeqNo);
        setIncludedDrugs(updated);
        setDrugList([...DrugList, drug]);
        sendToParent(updated, excludedDrugs);
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


    const dropdownData = {
        levelOptions: ['GCNSeqNo', 'HICLSeqNo', ],
        searchByOptions: {
            GCNSeqNo: ['GCN', 'GCNSeqNo', 'NDC'],
            HICLSeqNo: ['HICL3']
        }
    };

    if (loading) return <p>Loading drug list...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;


  return (
      <>

          <div className="SectionLabel">Program Drug List</div>
          <label className="SectionSubLabel" style={{ fontSize:'12px' }}>Search for a drug by HICLSeqNo, HICL3, GCN, GCNSeqNo, or NDC. Please make sure the Name matches before adding it to the drug list.</label>
          <DrugListSearch dropdownData={dropdownData} onSearch={handleSearch} />
          <ProgramDrugList data={targetDrugListDataWithHeaders} onSelectionChange={setSelectedRows} AddIncludeList={HandleIncludeList} AddExcludeList={HandleExcludeList} status={DrugSelectStatus} rowKeyField={"GCNSeqNo"} />
          <IncludeExcludeDrugList title={"Included Drug List"} data={targetIncludeDataWithHeaders} onDeleteDrug={deleteIncludedDrug} />
          <IncludeExcludeDrugList title={"Excluded Drug List"} data={targetExcludeDataWithHeaders} onDeleteDrug={deleteExcludedDrug} />
    </>
  );
};

export default DrugList;
