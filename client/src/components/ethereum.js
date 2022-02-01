import {ethers,Contract} from 'ethers';
import NFT from '../contracts/NFT.json';

const getBlockchain=()=>
    new Promise((resolve, reject)=>{
        window.addEventListener('load',async()=>{
            if(window.ethereum){
                await window.ethereum.enable();
                const provider=new ethers.providers.Web3Provider(window.ethereum);
                const signer= provider.getSigner()
                console.log("signer:", signer);
                console.log(window.ethereum.networkVersion);
                const nft= new Contract(
                    '0xe5DF850F17B7016778a1c1B3eEA9e78dCd524843',
                    NFT.abi,
                    signer
                );

                resolve({nft})
            }
            resolve({nft:undefined});

        });
    })


export default getBlockchain;