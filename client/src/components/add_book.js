import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
// import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

export default function AddBook({accounts, contract}){

    const toastId = React.useRef(null);
    const [authorName, setAuthorName] = useState(null);
    const [price, setPrice] = useState(null);
    const [bookName, setBookName] = useState(null);
   
    const infoToast = (msg) => toastId.current = toast.info(msg);
    const successToast = (msg) => toast.success(msg);
    const errorToast = (msg) => toast.error(msg);
    const dismiss = () =>  toast.dismiss(toastId.current);

    const onFinish = async (values) => {
        infoToast("Processing Transaction!!")

        setTimeout(async() => {
            console.log(contract.methods);
            const tx = await contract.methods.addBook(
                bookName,
                price,
                authorName
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
            

            <Form.Item label="Book Name" name="bookname" rules={[{required: true,message: 'Please input book name!'}]}>
                <Input type="text" placeholder="Enter book name" onChange={(e)=>setBookName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Author Name" name="authorName" rules={[{required: true,message: 'Please input author name'}]}>
                <Input type="text" placeholder="Enter author Name" onChange={(e)=>setAuthorName(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Book Price" name="price" rules={[{required: true,message: 'Please input book price'}]}>
                <Input type="number" placeholder="Enter Book Price" onChange={(e)=>setPrice(e.target.value)}/>
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

