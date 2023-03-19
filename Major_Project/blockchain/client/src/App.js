import abi from "./contracts/BCMedical1.json";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import {ethers}  from "ethers";
import DoctorLogin from "./pages/DoctorLogin";
import HospitalLogin from "./pages/HospitalLogin";
import Login from "./pages/Login";
import UserLogin from "./pages/UserLogin";

//const ethers = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(state);
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/user" element={<UserLogin state={state } account={account}/>}/>
        <Route path="/doctor" element={<DoctorLogin state={state} account={account}/>}/>
        <Route path="/hospital" element={<HospitalLogin state={state} account={account}/>}/>
      </Routes>
    </div>
  );
}

export default App;