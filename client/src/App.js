import React, { useEffect,useState } from "react";
import EBookContract from "./contracts/EBookShop.json";
import EBookToken from "./contracts/EBookToken.json";
import getWeb3 from "./getWeb3";
import AddBook from "./components/add_book";
import BookDetail from "./components/book_details";
import AllBooksDetails from "./components/all_books";
import BuyToken from "./components/buy_token";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import "./App.css";

const { TabPane } = Tabs;

function App(){

  const [contract, setContract] = useState(null)
  const [contract1, setContract1] = useState(null)
  const [accounts, setAccounts] = useState()
  const [owner, setOwner] = useState()

  useEffect(()=>{ 
    async function connect(){
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = await EBookContract.networks[networkId];
        const deployedToken = await EBookToken.networks[networkId];
        
        const instance = new web3.eth.Contract(
            EBookContract.abi,
            deployedNetwork && deployedNetwork.address,
           
        );
        const instance1 = new web3.eth.Contract(
          EBookToken.abi,
          deployedToken && deployedToken.address
      );
        // instance.address = ["0xfed5c6f50e57c6886149f47a4f02fdffbacfead8"]
        setAccounts(accounts);
        setOwner(accounts[0].toLowerCase())
        setContract(instance);
        setContract1(instance1);

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
      {
        
        contract != null ? 
        owner==localStorage.getItem('owner') ?
        <Tabs defaultActiveKey="1" style={{marginLeft: '80px', marginRight: '80px'}}>
          <TabPane tab="Add Book" key="1">
            <AddBook accounts={accounts} contract={contract}/>
          </TabPane>
          <TabPane tab="Book Detail" key="2">
            <BookDetail accounts={accounts} contract={contract}/>
          </TabPane>
          <TabPane tab="ALL Book" key="3">
            <AllBooksDetails accounts={accounts} contract={contract}/>
          </TabPane>
        </Tabs>
        :
        <Tabs defaultActiveKey="4" style={{marginLeft: '80px', marginRight: '80px'}}>
          <TabPane tab="ALL Book" key="4">
            <AllBooksDetails accounts={accounts} contract={contract}/>
          </TabPane>
          <TabPane tab="Buy Token" key="5">
            <BuyToken accounts={accounts} contract={contract1}/>
          </TabPane>
        </Tabs>
        :<>
        Loading...
        </>
      }
    </div>
  );
}


export default App;
