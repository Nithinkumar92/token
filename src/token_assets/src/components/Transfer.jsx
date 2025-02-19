import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token";
import { canisterId,createActor } from "../../../declarations/token/index";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";
function Transfer() {
   const [recipientId,setId]=useState("");
   const [amount,setAmount]=useState("");
   const [isDisabled,setDisabled]=useState(false);
   const [feedback,setFeedback]=useState("");
   const [isHidden,setHidden]=useState(true);
  async function handleClick() {
    setDisabled(true);
   const recipient = Principal.fromText(recipientId);
   const amountToTrasfer = Number(amount);
  

   
   const result = await token.transfer(recipient,amountToTrasfer);
   setFeedback(result);
   setHidden(false);
   setDisabled(false);
    
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>{
                  setId(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>{
                  setAmount(e.target.value)
                }}
                
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick}  disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
