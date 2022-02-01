import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
// import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

export default function NewNFT({accounts, contract}){

    const toastId = React.useRef(null);
    const [NFTName, setNFTName] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
   
    const infoToast = (msg) => toastId.current = toast.info(msg);
    const successToast = (msg) => toast.success(msg);
    const errorToast = (msg) => toast.error(msg);
    const dismiss = () =>  toast.dismiss(toastId.current);

    const onFinish = async (values) => {
        infoToast("Processing Transaction!!")

        setTimeout(async() => {
            console.log(contract.methods);
            const tx = await contract.methods.addBook(
                NFTName,
                price,
                description,
                image
              ).send({ from: accounts[0] });
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
            

            <Form.Item label="NFT Name" name="nftName" rules={[{required: true,message: 'Please input nft name!'}]}>
                <Input type="text" placeholder="Enter nft name" onChange={(e)=>setNFTName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{required: true,message: 'Please input description name'}]}>
                <Input type="text" placeholder="Enter description Name" onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{required: true,message: 'Please input nft price'}]}>
                <Input type="number" placeholder="Enter NFT Price" onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Image" name="image" rules={[{required: true,message: 'Please input image url'}]}>
                <Input type="text" placeholder="Enter image url" onChange={(e)=>setImage(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <ToastContainer/>
            </Form.Item>
        </Form>
    );
}

