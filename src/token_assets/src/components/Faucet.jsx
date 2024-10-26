import React, { useState } from "react";
import {token,canisterId,createActor} from "../../../declarations/token"
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";
function Faucet(props) {
  const [isDisabled,setDisable]=useState(false);
  const [buttonText,setText]=useState("Gimme Gimme");
  async function handleClick(event) {
      setDisable(true);
//internet newtwork authentication
      const authClient = await AuthClient.create();
      const identity= await authClient.getIdentity();

      const authenticatedCanister = createActor(canisterId,{
        agentOptions:{
          identity,
        },
      })
      //const result = await authenticatedCaister.payOut();
      const result = await token.payOut();
      setText(result);
      


  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Nithin tokens here! Claim 10,000 Nisvy tokens to your {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
