import React, { useState,useEffect } from 'react';
import { Form, Input, Button, Timeline} from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import getBlockchain from '../getWeb3';
import axios from 'axios';

export default function ShowNFT({accounts, contract}){
    const [tokenInfo,SetTokenInfo]=useState(undefined);

    async function getNFT (){
        console.log(contract);
        const tokenURI= await contract.methods.tokenURI(0);
        console.log(tokenURI);
            const {data}= await axios.get(tokenURI);
            console.log(data.result.name);
            console.log(data.result.description);
            console.log(data.result.image);
            SetTokenInfo(data.result);

    }
    // useEffect(()=>{
    //     const init=async()=>{

    //         // const {nft}= await contract;
    //         const tokenURI= await contract.tokenURI(0);
    //         const {data}= await axios.get(tokenURI);
    //         console.log(data.result.name);
    //         console.log(data.result.description);
    //         console.log(data.result.image);
    //         SetTokenInfo(data.result);
    //     };
    //     init();

    // },[]);
    
    return (
        <div>
            <button onClick={getNFT}>tst</button>
            <h1>yo man</h1>
            <h1>{tokenInfo}</h1>
            {/* <h1>{tokenInfo.description}</h1>
            <img src={tokenInfo.image}/> */}
        </div>
    );
}

