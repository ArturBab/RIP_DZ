import React, {useEffect} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import {useParams} from "react-router";
import BasicBreadcrumbs from "../Components/Breadcrumbs";
import api_socket from "../network";
import {useDispatch, useSelector} from "react-redux";
import {fetchprod} from "../store/middlewares/ProductPageMiddlewares";
import {getCartItem} from "../modules";
import {useLocation} from 'react-router'
import Button from "@mui/material/Button";



function ProdPage() {

    const { ctgid, prodid } = useParams();

    const loadingStatus = useSelector(state => state.ui.ProductPage.loadingStatus)
    const prod = useSelector(state => {
        return state.cached_data.ProductPage.product
    })
    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location)


    // TODO: Проверить
    const CartAdd = async(prodid) =>{
        const userid = localStorage.getItem('userId')

        const cartitem = await getCartItem(userid,prodid)
        if (cartitem.length===0){
            const data_to_send = {
                "user": userid-0,
                "prod": prodid-0,
                "amount": 1
            }
            await fetch(`http://${api_socket}/cart/?user=${userid}`,{
                method: 'POST',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data_to_send)
            }).then((response) => {
                console.log(response)
                console.log(data_to_send)
            })
                .catch((reason) => {
                    console.log(reason)
                    console.log(data_to_send)
                })
        }
        else{
            const key = cartitem[0].id
            const data_to_send = {
                "user": userid-0,
                "prod": prodid-0,
                "amount": cartitem[0].amount+1
            }
            await fetch(`http://${api_socket}/cart/${key}/?user=${userid}`,{
                method: 'PUT',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data_to_send)
            }).then((response) => {
                console.log(response)
                console.log(data_to_send)
            })
                .catch((reason) => {
                    console.log(reason)
                    console.log(data_to_send)
                })
        }
        dispatch(fetchprod(ctgid,prodid))
    }


    useEffect(() => {
        console.log(location)
        console.log(1)
        dispatch(fetchprod(ctgid, prodid))

    },[location.key])



    return (
        <>
            <div className={`container`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation="border"/></div> :
                    <>
                        <BasicBreadcrumbs props={[
                            {
                                ref: '/',
                                text: 'Начальная страница'
                            },
                            {
                                ref: `/category/${ctgid}/`,
                                text: prod.category.name
                            },
                            {
                                ref: `/category/${ctgid}/product/${prodid}`,
                                text: `${prod.name}`
                            }
                        ]}/>

                        <div className={"container"}>
                            {!prod.id || prod.is_shown === 0 ? <div className={"empty-result-message"}><h1>Этого товара нет в продаже</h1></div>:
                                <>
                                    <Row xs={1} md={1} sm={1} lg={2} className="grid">

                                        <Col className={"info"}>
                                            <div className={"card-info"}>
                                                <div className={"prod-name"} style={{fontFamily: 'Bahnschrift', fontSize: '50px', color: '#2E3B55'}}>
                                                    {prod.name}</div>

                                                {/*{prod.manufac ?
                                                    <div style={{fontFamily: 'Bahnschrift Condensed', fontSize: '30px'}}>
                                                    {prod.manufac.name}
                                                </div>: <div>
                                                    Производитель: не указан
                                                </div>}*/}

                                                <div className={"prod-description"} style={{fontFamily: 'Bahnschrift Condensed', fontSize: '20px', color: '#2E3B55'}}>
                                                    {prod.description}
                                                </div>

                                                <br/>

                                                <div className={"grp-name"} style={{fontFamily: 'Bahnschrift Condensed', fontSize: '20px', color: '#2e5055'}}>
                                                    Группа: {prod.group.name}
                                                </div>

                                                <div className={"in_stock_qty"} style={{fontFamily: 'Bahnschrift Condensed', fontSize: '20px', color: '#2e5055'}}>
                                                    В наличии: {prod.amount} шт.
                                                </div>

                                                <br/>

                                                <div className={"one_instance_price"} style={{fontFamily: 'Bahnschrift', fontSize: '40px', color: '#bb6f0c'}}>
                                                    {prod.price} ₽
                                                </div>

                                                {prod.amount <= 0 ?
                                                    <Button variant={"contained"} className={"button"}>Добавить к покупкам</Button>
                                                    :
                                                    <Button variant={"contained"} className={"button"} onClick={(event=>{
                                                        CartAdd(prodid)
                                                    })}>В корзину</Button>}

                                                <Col  className={"img"}>
                                                    <img
                                                        width={"100%"} style={{ marginLeft:'750px', marginTop:'-83%', width: 300, height: 300 }}
                                                        src={`http://${api_socket}/${prod.picture}`}
                                                        alt={"КАРТИНКА"} className={"prod-img"} />
                                                </Col>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );

}

export default ProdPage;