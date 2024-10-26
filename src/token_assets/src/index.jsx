import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index';


const init = async () => { 
  

  const authoClient = await AuthClient.create();
  if(await authoClient.isAuthenticated())
  {
    handleAuthenticated(authoClient);
  }
  else{
  await authoClient.login({
    identityProvider:"https://identity.ic0.app/#authorize",
    onSuccess:()=>{
      handleAuthenticated(authoClient)
    }
  });
}


}
async function handleAuthenticated(authoClient){
  const identity = await authoClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);
  ReactDOM.render(<App loggedInPrincipal={userPrincipal} />, document.getElementById("root"));
}

init();


