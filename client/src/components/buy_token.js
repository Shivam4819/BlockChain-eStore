import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import { ToastContainer, toast } from 'react-toastify';
const {ethers} =require('ethers')


export default function BuyToken({accounts, contract}){

    const toastId = React.useRef(null);
    const [amount, setAmount] = useState(0);
   
    const infoToast = (msg) => toastId.current = toast.info(msg);
    const successToast = (msg) => toast.success(msg);
    const errorToast = (msg) => toast.error(msg);
    const dismiss = () =>  toast.dismiss(toastId.current);

    const onFinish = async (values) => {
        infoToast("Processing Transaction!!")

        setTimeout(async() => {
            console.log(contract.methods);
            const tx = await contract.methods.buyToken()
            .send({ from: accounts[0],
                    value: ethers.utils.parseEther(amount)
            });
            
            // console.log(accounts)
            console.log("transaction:", tx)

            if(tx.status){
                dismiss();
                successToast('Transaction successful');
            }else{
                errorToast("Transaction failed");
            }
        }, 1500);
        
        
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
            initialValues={{
            remember: true,
            }}
            layout="vertical" 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{marginLeft: '100px', marginRight: '100px', marginTop: '50px'}} 
        >
            
            <h2>1 ETH = 1EBT</h2>
            <Form.Item label="Ether Amount" name="etherAmount" rules={[{required: true,message: 'Please input ether amount!'}]}>
                <Input type="number" placeholder="Enter ether amount" onChange={(e)=>setAmount(e.target.value)} />
            </Form.Item>
            <h2>Total EBT: {amount}</h2>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Buy EBT
                </Button>
                <ToastContainer/>
            </Form.Item>
        </Form>
    );
}