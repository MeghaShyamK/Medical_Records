
import { ethers } from "ethers";
import { useState } from "react";
const DoctorLogin = ({ state }) => {
    

    const [transaction, setTransaction] = useState([]);
    
    const[hid1,setHid]= useState([]);
    var hid=false;
    const getPatient= async (event) =>{
        event.preventDefault();
        const { contract } = state;
        const address1 = document.querySelector("#address1").value;
        try{
          const transaction =await contract.getPatientDetails(address1);
          setTransaction(transaction);
          
          //console.log(hidval);
        }
        catch(error){
          alert(error);
        }
        
      }

    const setHealthRecordsDetails = async (event) => {
      event.preventDefault();
      const { contract } = state;
      const address = document.querySelector("#address").value;
      const name = document.querySelector("#name").value;
      const prescription = document.querySelector("#prescription").value+" ,";
      const hid=true;
      setHid(hid);
      try{
        const transaction = await contract.setHealthRecordsDetails(name,address,prescription);
        await transaction.wait();
        alert("Done");  
      }
      catch(error){
        alert(error);
      }
        
      
    };
    return (
      <>
      
      <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "azure"} }> 
      <p className="text-4xl">Doctor Page</p>
        <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
          <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getPatient} style={{backgroundColor: "lightblue", width:"30%"}} >
            <h1>Patient Details </h1><br></br>
            <div className="mb-3">
              <label className="form-label">Get by Patient address  </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="address1"
                placeholder="Enter Address"
              />
            </div><br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white" 
              disabled={!state.contract}
            >
              Get Patient Details
            </button>
            <div style={{ marginTop:"30px"}}>
              <div>
                <p style={{textAlign: "center"}}>Patient Detials</p>
                <div style={{textAlign:"start", marginTop:"10px"}}>Patient Address :  {transaction.at(1)} </div>
                <div style={{textAlign:"start"}}>Patient Name    :  {transaction.at(2)}</div>
                <div style={{textAlign:"start"}}>Prescription    :  {transaction.at(3)} </div>
              </div>
            </div>
      
          </form>
          <br></br>
          <br></br>
          <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={setHealthRecordsDetails} style={{backgroundColor: "lightblue", width:"30%"}}>
            <div>Add Patient Details</div><br></br>
            <div className="mb-3">
              <label className="form-label">Patient address </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="address"
                placeholder="Enter Address"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Patient Name </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="name"
                placeholder="Enter Patient Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Patient Prescription </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="prescription"
                placeholder="Enter Prescription"
              />
            </div><br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white" 
              disabled={!state.contract}
            >
              Add Patient
            </button> <br></br>
          </form>
        <br></br>
        <br></br>
      </div>
      </div>
      </>
    );
  };
 


export default DoctorLogin