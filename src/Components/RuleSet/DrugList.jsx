import { useState } from "react";
// import IncludedList from "./IncludedList";
import ExcludedDrugList from "./DrugList/ExcludedDrugList";

const mockData = [
  { drugName: 'Oxycodone', HIC3: 'A2L', HICLSeqNo: '001741', GCN: '70491', GCNSeqNo: '004222', NDC: '33261019152' },
  { drugName: 'Hydrocodone', HIC3: 'B3M', HICLSeqNo: '002932', GCN: '80534', GCNSeqNo: '005321', NDC: '54868123456' },
  { drugName: 'Acetaminophen', HIC3: 'C4T', HICLSeqNo: '003841', GCN: '90812', GCNSeqNo: '006789', NDC: '12345678901' },
];
const DrugList = () => {
  const [excludedDrugs, setExcludedDrugs] = useState(mockData);
  const deleteExcludedDrug = (drug) => {
    setExcludedDrugs(prev => prev.filter(d => d.GCN !== drug.GCN));
     
  };

 

  return (
    <>
      {/* <IncludedList data={includedDrugs} onRemove={moveToExcluded} /> */}
      <ExcludedDrugList data={excludedDrugs} onDeleteDrug={deleteExcludedDrug} />
    </>
  );
};

export default DrugList;
