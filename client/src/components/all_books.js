import React, { useState,useEffect } from 'react';
import { Button, Card, Col, Row} from 'antd';
import { ToastContainer, toast } from 'react-toastify';

export default function AllBooksDetails({accounts, contract}){

    const toastId = React.useRef(null);
    const [bookId, setBookId] = useState(null);
    const [productInfo, setProductInfo] = useState([]);

    const notify = () => toastId.current = toast.info("Getting data from chain!!");
    const dismiss = () =>  toast.dismiss(toastId.current);
    useEffect(()=>{ 
        const onFinish = async (values) => {
            notify();
            setTimeout( async () => {
                const tx = await contract.methods.getAllBook().call({ from: accounts[0] });
        
                console.log("Result:", tx)
                setProductInfo(tx)
                dismiss();
            }, 3000);
            
            
        };
        
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        onFinish();
        onFinishFailed();

    },[])
    
    return (
        <div className="site-card-wrapper">
        
            <ToastContainer/>
            <h2>Book Detail</h2> <br/><br/>
            <Row gutter={16}>{

                productInfo.map(val=>{
                    return(
                        <>
                            <Col span={8}>
                                <Card size='small' title={val.bookName} style={{ width: 300 }}>
                                    <p>{val.id}</p>
                                    <p>{val.status}</p>
                                    <p> <Button type="primary" htmlType="submit">Buy</Button></p>
                                </Card>
                            </Col>
                        </>
                    )
                })
            }
            </Row>
        </div>
    );
}

