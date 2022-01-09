import React, { useState,useEffect } from 'react';
import { Button, Card, Col, Row} from 'antd';
import { ToastContainer, toast } from 'react-toastify';
const {ethers} =require('ethers')

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
                const tx = await contract.methods.getAllBook().call({ 
                    from: accounts[0]
                 });
        
                console.log("Result:", tx)
                setProductInfo(tx)
                dismiss();
            }, 3000);
            
            
        };
        bookDetails();
    },[])

    async function buyBook(id,price){
        console.log("from buy",id);
        const tx = await contract.methods.buyBook(
            id,
            
            ).send({ from: accounts[0],
                     value: ethers.utils.parseEther(price)
            });
        console.log("transaction:", tx)
}
    
    return (
        <div className="site-card-wrapper" align='left'>
        
            <ToastContainer/>
            <h2>Book Detail</h2> <br/><br/>
            <Row gutter={16}>{

                productInfo.map((val,index)=>{
                    return(
                        <>
                            <Col span={8} >
                                {
                                  accounts[0].toLowerCase()==localStorage.getItem('owner')?
                                  <Card size='small' title={val.name} style={{ width: 300 }}>
                                    <p>{val.author}</p>
                                    <p>{val.price}</p>
                                   
                                </Card>
                                :
                                val.status==false?
                                
                                <Card key={index} size='small' title={val.name} style={{ width: 300 }}>
                                    <p>{val.author}</p>
                                    <p>{val.price}</p>
                                    <p> 
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            onClick={e=>{e.stopPropagation();buyBook(index,val.price)}}>
                                                Buy
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

