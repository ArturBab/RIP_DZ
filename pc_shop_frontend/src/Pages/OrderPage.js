import { useSelector, useDispatch } from "react-redux";
import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import OrderCard from "../Components/OrderCard";
import {fetchOrders} from "../store/middlewares/OrderPageMiddlewares";


function OrdersPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const userIsManager = useSelector(state => state.cached_data.App.userIsManager)
    const userOrders = useSelector(state => state.cached_data.OrderPage.ordersList)
    const loadingStatus = useSelector(state => state.ui.OrderPage.loadingStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userStatus) dispatch(fetchOrders(localStorage.getItem('userId')))
    }, [userStatus])

    return (
        <>
            <br/>
            {!userStatus
                ?
                <div style={{marginTop: "10px", fontSize: "20px"}}>
                    Пожалуйста, авторизуйтесь для просмотра вашего списка заказов
                </div>
                :
                <div style={{marginTop: "10px", fontSize: "20px", width: "100%"}}>
                    <div style={{
                        fontFamily: 'Bahnschrift',
                        textAlign: "center"
                    }}>
                        Ваши заказы
                    </div>
                    <br/>
                    {loadingStatus ? undefined :
                        <div className={"container"}>
                            {userOrders.length === 0 ? <div>У вас пока нет заказов.</div>:
                                <Row xs={1} md={1} sm={1} lg={1} className="grid">

                                    {userOrders.map((item, index) => {
                                        return(
                                            <Col key={index}>
                                                <OrderCard is_manager={userIsManager}
                                                           order={item}
                                                           manager_page={false}/>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default OrdersPage;