import React, { useEffect,useState } from "react";
import EBookContact from "./contracts/EBook.json";
import getWeb3 from "./getWeb3";
import AddBook from "./components/add_book";
import BookDetail from "./components/book_details";
import AllBooksDetails from "./components/all_books";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import "./App.css";

const { TabPane } = Tabs;

function App(){

  const [contract, setContract] = useState()
  const [accounts, setAccounts] = useState()

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
        setContract(instance);

        const receipt= await instance.methods.owner.call().call({ from: accounts[0] });
        console.log("yoo",receipt);
        localStorage.setItem('owner',receipt)

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
      {
      accounts==localStorage.getItem('owner') ?
        <TabPane tab="Add Book" key="1">
          <AddBook accounts={accounts} contract={contract}/>
        </TabPane>
      
      :
      <TabPane tab="Book Detail" key="2">
        <BookDetail accounts={accounts} contract={contract}/>
      </TabPane>
      }
      <TabPane tab="ALL Book" key="3">
        <AllBooksDetails accounts={accounts} contract={contract}/>
      </TabPane>
      </Tabs>
    </div>
  );
}


export default App;
