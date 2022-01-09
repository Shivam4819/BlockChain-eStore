import React, { useState } from 'react';
import { Form, Input, Button, Timeline} from 'antd';
import { ToastContainer, toast } from 'react-toastify';

export default function BookDetail({accounts, contract}){

    const toastId = React.useRef(null);
    const [bookId, setBookId] = useState(null);
    const [productInfo, setProductInfo] = useState([]);

    const notify = () => toastId.current = toast.info("Getting data from chain!!");
    const dismiss = () =>  toast.dismiss(toastId.current);
  
    const onFinish = async (values) => {
        notify();
        setTimeout( async () => {
            const tx = await contract.methods.getSpecificBook(
                bookId
            ).call({ from: accounts[0] });

            // const tx = await contract.methods.getAllBook().call({ from: accounts[0] });
    
            console.log("Result:", tx)
            setProductInfo(tx)
            dismiss();
        }, 3000);
        
        
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                layout="vertical" 
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{marginLeft: '100px', marginRight: '100px', marginTop: '50px'}} 
            >
                <Form.Item label="Book Id" name="bookId" rules={[{required: true, message: 'Please input book id',}]}>
                    <Input type="number" placeholder="Enter book id" onChange={(e)=>setBookId(e.target.value)}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <ToastContainer/>
                </Form.Item>
            </Form>
            <div>
                <h2>Book Detail Timeline</h2> <br/><br/>
                
                <Timeline mode="left">
                    
                    <Timeline.Item label="Book Detail:"><h3><u>Book details</u></h3></Timeline.Item>
                        { productInfo.length >0 ? 
                            <div>
                                <Timeline.Item>Book Name: {productInfo.name}</Timeline.Item>
                                <Timeline.Item>Author Name: {productInfo.price}</Timeline.Item>
                                <Timeline.Item>Book Price: {productInfo.price}</Timeline.Item>
                                <Timeline.Item>Book Status: {String(productInfo.status)}</Timeline.Item>
                            </div> : null
                        }    
                </Timeline>
            </div>
        </div>
    );
}

