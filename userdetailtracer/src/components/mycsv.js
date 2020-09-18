import React,{useContext,useEffect} from 'react'
import { Button } from "@material-ui/core";
import { ExportToCsv } from 'export-to-csv';
import { myContext } from "../context";
import { CSVLink } from "react-csv";


const Mycsv = () => {
  
  const { csvData,CsvWorkerDataFunc} = useContext(myContext);
  useEffect(()=>{
    CsvWorkerDataFunc()
  },[])

 const headers = [
    { label: "First Name", key: "f_name" },
    { label: "Last Name", key: "l_name" },
    { label: "Naike", key: "naike_name" },
    { label: "NaikePhone", key: "naike_phone" },
    { label: "Priority", key: "priority" },
    { label: "Ngo", key: "org" },
    { label: "Duplicate", key: "duplicate" },
    { label: "Gender", key: "gender" },
    { label: "Age", key: "age" },
    { label: "Country", key: "country" },
    { label: "District", key: "district" },
    { label: "Municipality", key: "municipality" },
    { label: "Ward", key: "ward" },
    { label: "Category", key: "category" },
    { label: "Kiln Id", key: "kiln_id" },
    { label: "Children", key: "children" },
    { label: "Kiln", key: "kilnname" },
    { label: "Kiln Address", key: "kilnaddress" },
    { label: "Amount Paid", key: "amountpaid" },
    { label: "Amount Payer", key: "amountpayer" },
  ];

    return (
        <div>
        
        <CSVLink  filename={"kiln-workers.csv"} data={csvData} headers={headers}>
          <Button variant="contained" color="secondary">

              ExportCSV
          </Button>
      </CSVLink>
        </div>
    )
}

export default Mycsv

