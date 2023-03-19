// import { useState } from "react";
// // import axios from "axios";
// import "./UserLogin.css";
// const UserLogin = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `c0206602ad77a6343af6`,
//             pinata_secret_api_key: `5c0b577402bfffcee07d471bb0a6000e3f43340184a355cc63885cf49272b929`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//         //const signer = contract.connect(provider.getSigner());
//         const signer = contract.connect(provider.getSigner());
//         signer.add(account, ImgHash);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object
//     // console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// };
// export default UserLogin;
import { useState, useEffect } from "react";
import axios from "axios";
import "./FileUpload.css";
import Display from "./Display";



const UserLogin = ({ state ,account}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        console.log("ENtered try" )
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `d57b517782ad7327b5c5`,
            pinata_secret_api_key: `5b1f43b49452a776862beeb86da3a0633cc82ad8474ced133498d519df68efee`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        console.log(ImgHash)
        // const signer = state.contract.connect(state.provider.getSigner());
        state.contract.add(account, ImgHash);
        alert("uploaded successfully");
      } catch (error) {
        alert("Unable to upload image to Pinata");
        console.log(error);
      }
    }
    console.log(account)
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
     console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
    }

    const [transaction, setTransaction] = useState([]);

    const grantAccessToDoctor = async (event) => {
        console.log("abcdef");
        event.preventDefault();
        const { contract } = state;
        const address = document.querySelector("#address").value;
        console.log(address,contract);
        console.log(address,contract);
        try{
          const transaction = await contract.grantAccessToDoctor(address,1);
            await transaction.wait();
            alert("Done");
            console.log("Transaction is done"+" "+transaction);

        }
        catch(error){
            console.log(error["message"]);
        }
        
      };

      
    
    // var hidval=false;
    // const getPatient= async (event) =>{
    //     event.preventDefault();
    //     const { contract } = state;
    //     const address1 = document.querySelector("#address1").value;
    //     console.log("Clicked get doc");
    //     try{
    //       const transaction =await contract.getPatientDetails(address1);
    //       setTransaction(transaction);
    //       hidval=true;
    //       alert("Done");
    //     }
    //     catch(error){
    //       alert(error);
    //     }
    //     console.log("After  ");
    //   }
    
   


    return(
        <>

<div className="w-full h-screen" style={ { textAlign:"center", backgroundColor: "whitesmoke"} }> 
      <p className="text-4xl">Hello {account}</p>
        <div className="flex  justify-evenly " style={ { textAlign:"center" ,marginTop:"90px"} }>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" onSubmit={grantAccessToDoctor} style={{backgroundColor: "lightblue", width:"30%"}} >
            <h1>Grant Access to Doctor</h1><br></br>
            <div className="mb-3">
              <label className="form-label">Enter Doctor Address </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
              />
            </div><br></br>
            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-violet-600 text-white " 
              disabled={!state.contract}
            >
              
              Grant
            </button>
          </form>
          <br></br>
          <br></br>
          <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800" style={{backgroundColor: "lightblue", width:"30%"}} >
            
            
           
            <Display state={state} account={account}></Display>
          </form>
        <form className="shadow-2xl bg-slate-100 rounded-xl p-8 dark:bg-slate-800"  style={{backgroundColor: "lightblue", width:"30%"}}>
        <div>Upload your Files</div><br></br>
        <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>

        </form>

      </div>
      <div>
      <br></br>
        <br></br>
        <br></br>
        
        
        </div>
      </div>


        </>
    )
  }


export default UserLogin