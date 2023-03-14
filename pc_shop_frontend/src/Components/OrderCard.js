import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import api_socket from "../network";
import Button from "@mui/material/Button";


const OrderCard = ({ is_manager, order, manager_page, statuses }) => {

    const [show, setShow] = useState(false);
    const [newOrderStatus, setNewOrderStatus] = useState(order.status.id)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Логика изменения статусов:
    // cur_status - текущий статус, в зависимости от него
    // Предоставляем на выбор другие статусы
    const getOptions = (cur_status) => {
        switch (cur_status) {
            case 1:
                return [
                    {
                        value: 2,
                        label: 'Оплачено'
                    },
                    {
                        value: 7,
                        label: 'Отклонено'
                    }
                ]
            case 2:
                return [
                    {
                        value: 3,
                        label: 'Упаковано'
                    },
                    {
                        value: 7,
                        label: 'Отклонено'
                    }
                ]
            case 3:
                return [
                    {
                        value: 4,
                        label: 'Доставляется'
                    },
                    {
                        value: 7,
                        label: 'Отклонено'
                    }
                ]
            case 4:
                return [
                    {
                        value: 5,
                        label: 'Доставлено'
                    },
                    {
                        value: 3,
                        label: 'Упаковано'
                    },
                    {
                        value: 7,
                        label: 'Отклонено'
                    }
                ]
            case 5:
                return [
                    {
                        value: 3,
                        label: 'Упаковано'
                    },
                    {
                        value: 7,
                        label: 'Отклонено'
                    },
                    {
                        value: 6,
                        label: 'Завершено'
                    }
                ]
        }
    }

    const getFullPrice = (order) => {
        const items = order.list_of_order;
        let fullprice = 0;
        items.forEach(item => fullprice += item.amount * item.price)
        return fullprice
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title style={{
                        fontFamily: "Bahnschrift",
                    }}>
                        Заказ №{order.id}
                    </Card.Title>

                    <Card.Text>
                        {is_manager ?
                            <>
                                Пользователь:
                                {order.user}
                                <br/>
                            </>
                            :
                            undefined}
                        <Card.Text>
                            Дата и время заказа: {new Date(order.creationdate).toLocaleString()}
                        </Card.Text>
                        <Card.Text>
                            Дата изменения: {order.editiondate?new Date(order.editiondate).toLocaleString():'Еще не оплачено'}
                        </Card.Text>
                        <Card.Text>
                            Дата доставки: {order.completitiondate?new Date(order.completitiondate).toLocaleString():'Еще не доставлено'}
                        </Card.Text>
                        Стоимость: {getFullPrice(order)} ₽<br/>
                        Текущий статус: {order.status.name}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush" style={{alignSelf: "self-start"}}>
                    {order.list_of_order.map((item, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                {index + 1}) {item.name}, кол-во: {item.amount} шт., сумма: {item.amount*item.price} ₽
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

                {!is_manager || !manager_page ? undefined:
                    <Card.Body>
                        <Button
                            variant={"contained"}
                            onClick={event => {
                            event.preventDefault()
                            handleShow()
                        }
                        }>Изменить статус</Button>
                        {order.status.id ===1||
                        order.status.id ===2||
                        order.status.id ===3||
                        order.status.id ===4||
                        order.status.id ===5||
                        order.status.id ===6?

                            <button className="btn btn-danger"
                                >Удалить</button>

                            :
                            <Button
                            variant={"contained"}
                                onClick={async (event) =>{
                                event.preventDefault()
                                for(let i=0;i<order.ordered_items.length;i++) {
                                    await fetch(`http://${api_socket}/ordercart/${order.ordered_items[i].id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Authorization': ` Bearer ${localStorage.getItem('accessToken')}`,
                                            'Content-Type': 'application/json'
                                        },
                                    })
                                }
                            }
                            }>Удалить</Button>}

                    </Card.Body>
                }
            </Card>

            {!is_manager || !manager_page ? undefined:
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменение статуса заказа №{order.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Новый статус:
                        <Select
                            className="basic-single"
                            classNamePrefix="статус"
                            defaultValue={statuses.map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            }).filter(item => item.value === order.status.id)[0]}
                            name="color"
                            options={getOptions(newOrderStatus)}
                            onChange={choice => {
                                setNewOrderStatus(choice.value)}
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" onClick={handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="contained" onClick={event => {
                            // запрос на изменение статуса
                            const options = {
                                method: 'PATCH',
                                headers:{
                                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                                    'Content-Type':'application/json'
                                },
                                body: JSON.stringify({
                                    status: newOrderStatus,
                                    edition_date: new Date().toISOString(),
                                    completition_date:  [4, 5, 7].includes(newOrderStatus)? new Date().toISOString(): null
                                })
                            };
                            fetch(`http://${api_socket}/orderm/${order.id}/`, options)
                                .then(response => response.json())
                                .then(response => console.log(response))
                                .catch(err => console.error(err));
                            handleClose()
                        }}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}

export default OrderCard;