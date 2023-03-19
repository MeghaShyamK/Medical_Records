import { useState, useEffect } from "react";
import { ethers } from "ethers";

const HospitalLogin = ({ state }) => {
  
  const [transaction, setTransaction] = useState([]);
  
  const { contract } = state;

    // useEffect(() => {
    //   const memosMessage = async () => {
    //     const address = document.querySelector("#address1").value;
    //     const memos = await contract.getDoctorDetails("0x58a063BbCA839A181E16b1EB79ce40503b1C676F").call();
    //     setMemos(memos);
    //   };
    //   contract && memosMessage();
    // }, [contract]);

  const getDoc= async (event) =>{
    event.preventDefault();
    const { contract } = state;
    const address1 = document.querySelector("#address1").value;
    console.log("Clicked get doc");
    try{
      const transaction =await contract.getDoctorDetails(address1);
      setTransaction(transaction);
    }
    catch(error){
      alert(error);
    }
  }

  const setDoc = async (event) => {
      console.log("abcdef");
      event.preventDefault();
      const { contract } = state;
      const address = document.querySelector("#address").value;
      const name = document.querySelector("#name").value;
      try{
        const transaction = await contract.setDoctorDetails(true,address,name);
        await transaction.wait();
        alert("Done");
      }
      catch(error){
        alert(error);
      }
      
    };




    return (
      <>  
       <div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "lightblue"} }> 
       <p className="text-4xl">Hospital Page</p>
        <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={getDoc} style={{backgroundColor: "white", width:"30%"}} >
            <div>Get Doctor Details</div><br></br>
            <div className="mb-3">
              <label className="form-label">Get by Doctor address     </label>
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
              Get
            </button>
            <div style={{ marginTop:"30px"}}>
              <div>
                <p style={{textAlign: "center"}}>Doctor Detials</p>
                <div style={{textAlign:"start", marginTop:"10px"}}>Patient Address :  {transaction.at(1)} </div>
                <div style={{textAlign:"start"}}>Patient Name    :  {transaction.at(2)}</div>
                <div style={{textAlign:"start"}}>Prescription    :  {transaction.at(3)} </div>
              </div>
            </div>

          </form>
        
        
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={setDoc} style={{backgroundColor: "white", width:"30%"}} >
            <div>Add Doctor Details</div><br></br>
            <div className="mb-3">
              <label className="form-label">Doctor address    </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="address"
                placeholder="Enter Address"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Doctor Name    </label>
              <input
                type="text"
                className="form-control placeholder:italic outline outline-offset-2 outline-1"
                id="name"
                placeholder="Enter Doctor Name"
              />
            </div><br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white " 
              disabled={!state.contract}
            >
              Add Doctor
            </button>
          </form>
        
        </div>
      </div>

      </>
    );
  };
 


export default HospitalLogin