import React, { useEffect,useState } from "react";
import NFTContract from "./contracts/NFT.json";
import getWeb3 from "./getWeb3";
import NewNFT from "./components/new_NFT";
import ShowNFT from "./components/show_NFT";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import getBlockchain from "./components/ethereum";
import axios from "axios";

import "./App.css";

const { TabPane } = Tabs;


function App(){

  // const [contract, setContract] = useState(null)
  // const [accounts, setAccounts] = useState()
  // const [owner, setOwner] = useState()
  
  // useEffect(()=>{ 
  //   async function connect(){
  //     try {
  //       const web3 = await getWeb3();
  //       const accounts = await web3.eth.getAccounts();
  //       console.log(accounts);
  //       const networkId = await web3.eth.net.getId();
  //       const deployedNetwork = await NFTContract.networks[networkId];
        
  //       const instance = new web3.eth.Contract(
  //           NFTContract.abi,
  //           deployedNetwork && deployedNetwork.address,
           
  //       );
  //       // instance.address = ["0xfed5c6f50e57c6886149f47a4f02fdffbacfead8"]
  //       setAccounts(accounts);
  //       setOwner(accounts[0].toLowerCase())
  //       setContract(instance);
       
  //       // const receipt= await instance.methods.owner.call().call({ from: accounts[0] });
  //       // console.log("yoo",receipt);
  //       localStorage.setItem('owner','0x824ca52f2f102a5b6b0f57c60ff4a4a50faff8d2')

  //     } catch (error) {
  //         alert(
  //           `Failed to load web3, accounts, or contract. Check console for details.`,
  //         );
  //         console.log(error);
  //     }
  //   }
  //   connect();
  // },[])

  const [tokenInfo,SetTokenInfo]=useState(null);
    useEffect(()=>{
        const init=async()=>{
            const {nft}= await getBlockchain();
            console.log("NFT;",nft);
            const tokenURI= await nft.tokenURI(1);
            console.log("URI:", tokenURI);
            const {data}= await axios.get(tokenURI);
            console.log("name-",data.result.name);
            console.log("des-",data.result.description);
            console.log("img-",data.result.image);
            SetTokenInfo(data.result);
        };
        init();

    },[]);

  return (
    <div className="App">
        {/* <Tabs defaultActiveKey="1" style={{marginLeft: '80px', marginRight: '80px'}}>
          <TabPane tab="New NFT" key="1">
            <NewNFT accounts={accounts} contract={contract}/>
          </TabPane>
          <TabPane tab="NFT Detail" key="2">
            <ShowNFT accounts={accounts} contract={contract}/>
          </TabPane>
          
        </Tabs> */}
        {
          tokenInfo==null ?
          <>
          Loding
          </>
          :
          <>
          {tokenInfo.name}
          <img src={tokenInfo.image}/>
          </>
        }
        {/* {tokenInfo.name} */}
    </div>
  );
}


export default App;
