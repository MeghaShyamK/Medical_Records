import { useState } from "react";
import "./Display.css";
const Display = ({ state, account }) => {
    const contract=state.contract
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    console.log(contract);
    // const Otheraddress = document.querySelector("account").value;
    try {

        console.log(account)
        dataArray = await contract.getPatientDetails(account);
        console.log("hello");
        console.log(dataArray)
      
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      {/* <div className="image-list">{data}</div> */}
      {/* <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input> */}
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;