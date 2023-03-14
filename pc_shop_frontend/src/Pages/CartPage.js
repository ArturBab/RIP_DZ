import React, {useEffect} from "react";
import {Col, Row, Spinner} from 'react-bootstrap';
import Cartcard from "../Components/CartCard";
import { useSelector, useDispatch } from 'react-redux';
import {fetchcart} from "../store/middlewares/CartPageMiddlewares";
import api_socket from "../network";
import SplitButton from "../Components/SplitButton";
import Button from "@mui/material/Button";


function CartPage() {

    const userid = localStorage.getItem('userId')
    const loadingStatus = useSelector(state => state.ui.CartPage.loadingStatus)
    const fullprice = useSelector(state => {
        return state.cached_data.CartPage.fullprice
    })
    const CartList = useSelector(state => state.cached_data.CartPage.cartitems)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("trying to load cart");
        dispatch(fetchcart(userid))
    },[]);
    const OrderAdd = async() =>{
        const userid = localStorage.getItem('userId')
        if (CartList.length){
            const data_to_send = {
                "user": userid-0,
                "status": 1,
                "creationdate": new Date(),
                "editiondate": null,
                "completitiondate": null,
                "fullprice": fullprice
            }
            await fetch(`http://${api_socket}/order/?user=${userid}/`,{
                method: 'POST',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data_to_send)
            }).then((response) =>{
                return response.json()
            }).then(async (new_order)=>{
                const cartlenght = CartList.length
                console.log(new_order)
                for (let i=0;i<cartlenght;i++){
                    let orderdata={
                        "order": new_order.id-0,
                        "prod": CartList[i].prod.id-0,
                        "price": CartList[i].prod.price-0,
                        "amount": CartList[i].amount-0,
                        "name": CartList[i].prod.name
                    }
                    await fetch(`http://${api_socket}/orderlist/`,{
                        method: 'POST',
                        headers:{
                            'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(orderdata)
                    })
                    await fetch(`http://${api_socket}/cart/${CartList[i].id}/?user=${userid}/`,{
                        method: 'DELETE',
                        headers:{
                            'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type':'application/json'
                        }
                    })
                }
            })}
        dispatch(fetchcart(userid))
    }



    return (
        <>
            <h2>Ваша корзина:</h2>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"CartGrid"}>
                            {!CartList.length ? <div className={"emptyresponse"}><h1>Корзина пуста</h1></div>:
                                <>
                                    <Row xs={1} sm={1} md={2} lg={2} className={"grid"}>
                                        {CartList.filter(cartitem => cartitem.amount>0).map((item, index) => {
                                            console.log(CartList)
                                            return (
                                                <Col key={index}>
                                                    <Cartcard {...item}/>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </>}
                        </div>
                        <br/>
                        <div className={"fullprice"} style={{fontFamily: 'Bahnschrift', fontSize: 40, color: 'orange'}}>
                            Итого: {fullprice} руб.
                        </div>
                        {fullprice <= 0 ? <Button variant={"contained"} className={"button"} disabled>Оформить заказ</Button>:
                            <>
                                <Button variant={"contained"} className={"delete"} onClick={(event=>{
                                    OrderAdd()
                                })}>Оформить заказ</Button>
                            </>

                        }
                    </>
                }
            </div>
        </>
    );
}

export default CartPage;