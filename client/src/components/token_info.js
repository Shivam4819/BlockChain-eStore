import { Button, Modal, Input } from "antd";
import React, {useState} from "react";
import '../style.css'
import { ToastContainer, toast } from 'react-toastify';
import logo from '../image/logo.png';
const {ethers} =require('ethers')

export default function TokenInfo({accounts, contract}){
   const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const successToast = (msg) => toast.success(msg);
    const errorToast = (msg) => toast.error(msg);
    
    
    const showModal = () => {
        setVisible(true);
    };

     const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(async() => {
          setVisible(false);
          console.log(contract.methods);
          const tx = await contract.methods.buyToken()
          .send({ from: accounts[0],
                value: ethers.utils.parseEther(amount)
           });
          setConfirmLoading(false);
          console.log("transaction:", tx)

            if(tx.status){
                successToast('Transaction successful');
            }else{
                errorToast("Transaction failed");
            }
        }, 2000);
    };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return(
        <div id="token-body">
            <div id="top-nav">
                <div id="logo">
                   <h2 style={{marginTop: '15px'}}> 
                        EBT
                   </h2>
                </div>
                <div id="buy-token">
                    <Button id="buy-btn" onClick={showModal}>
                        Get token
                    </Button>
                    <Modal
                        title="Purchase EBT"
                        visible={visible}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                    
                        <p>
                            <label>Enter the amount of EBT</label>
                            <Input size="large" placeholder="large size" style={{marginTop: '10px'}} onChange={(e)=>setAmount(e.target.value)}  />
                        </p>
                    </Modal>
                    <ToastContainer/>
                </div>
            </div>
            <div id="banner">
                <img src={logo} style={{height: '180px', width: '180px', marginTop: '20px'}}/>
                <p style={{fontSize:'50px', fontWeight: 600, marginBottom: 0}}> What is EBT ? </p>
                <p style={{fontSize:'20px', marginLeft:'18px', marginRight: '20px'}}> 
                    EBT is an ERC-20 token that is used to power our NFT book marketplace, 
                    <br/>the gateway to a NFT marketplace.
                </p>
            </div>
            <div id="info-area">
                <p style={{paddingTop: '40px', fontSize:'36px', fontWeight: 600, marginBottom: "5px"}}>
                    Utility of EBT
                </p>
                <p style={{fontSize:'18px', marginLeft:'20px', marginRight: '20px'}}>
                    E-book-token (EBT) is used for buying and selling the NFT books from marketplace. The
                    token is launched on the Rinkeby test-network. <br/>
                    Anyone can buy the token from our webpage
                    in exchange of test ethers and used this token for buying book NFT from our marketplace.<br/>
                </p>
                <h3 style={{textAlign: "justify", paddingLeft: '170px'}}>
                    Owner Address : 0x8EED37Bb3B43423D2EDa1712601A96293F5033f0<br/>
                    Contract Address : 0x5E9A0305Fa6670C191d4A36Ff22E7C6d8cd7804a<br/>
                    Total supply : 10000000 (1 Cr)<br/>
                    Tokens left :  <br/>
                    1 token = 0.1 eth
                </h3>
            </div>
        </div>
    )
}
