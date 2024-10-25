import React, { useState } from "react";
import { token } from "../../../declarations/token";
import {Principal} from "@dfinity/principal";
function Balance() {
  
  const [inputValue,setInput]=useState("");
  const [balanceResult,setBalance]=useState("");
  const [crytoSymbol,setSymbol]=useState("");
  const [isHidden,setHidden]=useState(true);
  
  
  async function handleClick() {
    console.log("Balance Button Clicked");
   const principal = Principal.fromText(inputValue);
   const  currentbalance = await token.balanceOf(principal)
   setBalance(currentbalance.toLocaleString());
  
  const symbol = await token.getSymbol();
  setSymbol(symbol)
  setHidden(false);
  

  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=>{
            setInput(e.target.value)
          }}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {crytoSymbol}</p>
    </div>
  );
}

export default Balance;
