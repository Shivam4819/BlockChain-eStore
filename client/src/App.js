import React, { useEffect,useState } from "react";
import EBookContact from "./contracts/EBookToken.json";
import getWeb3 from "./getWeb3";
import BuyToken from "./components/buy_token";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import "./App.css";

const { TabPane } = Tabs;

function App(){

  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState()
  const [owner, setOwner] = useState()

  useEffect(()=>{ 
    async function connect(){
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = await EBookContact.networks[networkId];
        const instance = new web3.eth.Contract(
            EBookContact.abi,
            deployedNetwork && deployedNetwork.address,
        );
        // instance.address = ["0xfed5c6f50e57c6886149f47a4f02fdffbacfead8"]
        setAccounts(accounts);
        setOwner(accounts[0].toLowerCase())
        setContract(instance);

        // const receipt= await instance.methods.owner.call().call({ from: accounts[0] });
        // console.log("yoo",receipt);
        localStorage.setItem('owner','0x824ca52f2f102a5b6b0f57c60ff4a4a50faff8d2')

      } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.log(error);
      }
    }
    connect();
  },[])


  return (
    <div className="App">
      
        
        <Tabs defaultActiveKey="1" style={{marginLeft: '80px', marginRight: '80px'}}>
          <TabPane tab="Buy Token" key="1">
            <BuyToken accounts={accounts} contract={contract}/>
          </TabPane>
         </Tabs>
        
    </div>
  );
}


export default App;
