import React, { useState,useEffect } from 'react';
import { Button, Card, Col, Row} from 'antd';
import { ToastContainer, toast } from 'react-toastify';

export default function AllBooksDetails({accounts, contract}){

    const toastId = React.useRef(null);
    const [bookId, setBookId] = useState(null);
    const [productInfo, setProductInfo] = useState([]);
    console.log('cons:',contract);
    const notify = () => toastId.current = toast.info("Getting data from chain!!");
    const dismiss = () =>  toast.dismiss(toastId.current);
    useEffect(()=>{ 
        const bookDetails = async (values) => {
            notify();
            setTimeout( async () => {
                const tx = await contract.methods.getAllBook().call({ from: accounts[0] });
        
                console.log("Result:", tx)
                setProductInfo(tx)
                dismiss();
            }, 3000);
            
            
        };
        bookDetails();
    },[])

    async function buyBook(id){
        console.log("from buy",id);
        const status='sold'
        const tx = await contract.methods.updateBookStatus(
            id,
            status,
          ).send({ from: accounts[0] });
        console.log("transaction:", tx)
}
    
    return (
        <div className="site-card-wrapper" align='left'>
        
            <ToastContainer/>
            <h2>Book Detail</h2> <br/><br/>
            <Row gutter={16}>{

                productInfo.map(val=>{
                    return(
                        <>
                            <Col span={8} >
                                {
                                  accounts==localStorage.getItem('owner')?
                                  <Card size='small' title={val.bookName} style={{ width: 300 }}>
                                    <p>{val.id}</p>
                                    <p>{val.status}</p>
                                </Card>
                                :
                                val.status!='sold'?
                                <Card size='small' title={val.bookName} style={{ width: 300 }}>
                                    <p>{val.id}</p>
                                    <p>{val.status}</p>
                                        <p> <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            onClick={e=>{e.stopPropagation();buyBook(val.id)}}>Buy
                                            </Button>
                                         </p>
                                    
                                </Card>
                                :<></>

                                }
                            </Col>
                        </>
                    )
                })
            }
            </Row>
        </div>
    );
}

