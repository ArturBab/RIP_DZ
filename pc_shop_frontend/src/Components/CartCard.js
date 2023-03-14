import {Card} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchcart} from "../store/middlewares/CartPageMiddlewares";
import api_socket from "../network";
import SplitButton from "./SplitButton";
import Button from "@mui/material/Button";

const CartCard = (data) => {

    const userid = localStorage.getItem('userId')
    const dispatch = useDispatch()

    const CartAdd = async() =>{
        const key = data.id

        const data_to_send = {
            "user": userid-0,
            "prod": data.prod.id-0,
            "amount": data.amount+1
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
        })

        dispatch(fetchcart(userid))
    }

    const CartRemove = async() =>{
        const key = data.id
        const data_to_send = {
            "user": userid-0,
            "prod": data.prod.id-0,
            "amount": data.amount-1
        }
        if (data_to_send.amount <=0){
            await fetch(`http://${api_socket}/cart/${key}/?user=${userid}`,{
                method: 'DELETE',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                }
            }).then((response) => {
                console.log(response)
                console.log(data_to_send)
            })
        }
        else{
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
        }
        dispatch(fetchcart(userid))
    }

    const CartDelete = async() =>{
        const key = data.id
        await fetch(`http://${api_socket}/cart/${key}/?user=${userid}`,{
            method: 'DELETE',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            }
        }).then((response) => {
            console.log(response)
        })
        dispatch(fetchcart(userid))
    }

    return (
        <div className='container'>
            <br/>
            <h3 style={{fontFamily: 'Bahnschrift', fontSize: 50}}>{data.prod.name}</h3>
            <h4 style={{fontFamily: 'Bahnschrift Condensed'}}>Группа: {data.prod.group.name}</h4>
            <h4 style={{fontFamily: 'Bahnschrift Condensed'}}>Категория: {data.prod.category.name}</h4>
            <h4 style={{fontFamily: 'Bahnschrift Condensed'}}>Добавлено в корзину: {data.amount} шт.</h4>
            <h4 style={{fontFamily: 'Bahnschrift Condensed', fontSize: 40}}>Цена: {data.prod.price*data.amount} руб.</h4>
            <SplitButton
                clickHandler={async selected_val => {
                    // TODO: тело функции
                    const key = data.id
                    const data_to_send = {
                        "user": userid-0,
                        "prod": data.prod.id-0,
                        "amount": data.amount+parseInt(selected_val)
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
                    })
                    dispatch(fetchcart(userid))
                }
                }
            />

            <Button variant={"contained"} className={"minus"} onClick={(event=>{
                CartRemove()
            })}>-</Button>
            <br/>
            <br/>
            <Button variant={"contained"} className={"delete"} onClick={(event=>{
                CartDelete()
            })}>Удалить</Button>
            <Link to={`../category/${data.prod.category.id}/product/${data.prod.id}/`}>
                <Button variant={"contained"}  className={"button"}>Перейти</Button>
            </Link>
        </div>
    )
}

export default CartCard;