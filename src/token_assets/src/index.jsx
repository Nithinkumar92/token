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
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();


