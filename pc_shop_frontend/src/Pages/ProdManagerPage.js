import React, {useEffect, useState} from "react";
import {Col, Row, Spinner} from "react-bootstrap";
import ProdCard from "../Components/ProdCard";
import {Slider, TextField} from "@mui/material";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {fetchallprods, fetchpartprods} from "../store/middlewares/CategoryPageMiddlewares";
import * as actCr from "../store/actionCreators/CategoryPageActionCreators";
import ManagerProd from "../Components/ManagerProd";
import Modal from "react-bootstrap/Modal";
import api_socket from "../network";
import {getCtgs, getGroups, getProdm} from "../modules";
import Button from "@mui/material/Button";
import {createAction_setgroupList} from "../store/actionCreators/CategoryPageActionCreators";
import {createAction_setctgList} from "../store/actionCreators/HomePageActionCreators";
import Table from 'react-bootstrap/Table';

function ProdManagerPage() {

    const groups = useSelector(state => state.cached_data.CategoryPage.groupList);
    const ctgs = useSelector((state=>state.cached_data.HomePage.ctgList))

    // Модальное окно для добавления
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Состояния полей в модальных окнах
    const [qtyField, setQtyField] = useState('')
    const [nameField, setNameField] = useState('')
    const [costField, setCostField] = useState('')
    const [grpField, setGrpField] = useState()
    const [ctgField, setCtgField] = useState()
    const [descrField, setDescrField] = useState('')

    // const loadingStatus = useSelector(state => state.ui.CategoryPage.loadingStatus)
    // const prods = useSelector(state => state.cached_data.CategoryPage.productList)
    const [prods, setprods] = useState([])
    const [loadingStatus, setloadingStatus] = useState(true)
    const dispatch = useDispatch()

    const getData = async()=>{
        setloadingStatus(true)
        const prodlist = await getProdm()
        const grp_data = await getGroups()
        const ctgs_data = await getCtgs()
        dispatch(createAction_setgroupList(grp_data))
        dispatch(createAction_setctgList(ctgs_data))
        setprods (prodlist)
        setloadingStatus(false)
    }

    useEffect(() => {
        getData()
        // dispatch(fetchallprods(1)) // нужны все

    }, [])

    return (
        <div className={'container'}>
            <Button
                variant={"contained"}
                onClick={event => {
                    event.preventDefault()
                    handleShow()
                }}
            >Добавить новый продукт</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование информации о продукте</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        gap:"10px",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <TextField id="change-name" label={"Название"} variant="outlined"
                               value={nameField}
                               onChange={event => {
                                   event.preventDefault()
                                   setNameField(event.target.value)
                               }}
                               style={{width:"100%"}}
                    />
                    <TextField id="change-manga-qty" label={"Количество на складе"} variant="outlined"
                               value={qtyField}
                               onChange={event => {
                                   event.preventDefault()
                                   setQtyField(event.target.value)
                               }}
                               style={{width:"100%"}}
                    />
                    <TextField id="change-manga-cost" label={"Стоимость"} variant="outlined"
                               value={costField}
                               onChange={event => {
                                   event.preventDefault()
                                   setCostField(event.target.value)
                               }}
                               style={{width:"100%"}}
                    />
                    <TextField
                        id="change-descr"
                        label={"Описание"}
                        variant="outlined"
                        value={descrField}
                        onChange={event => {
                            event.preventDefault()
                            setDescrField(event.target.value)
                        }}
                        style={{width:"100%"}}
                        multiline={true}
                        rows={10}
                    />
                    <Select
                        className="basic-single"
                        classNamePrefix="Группа"
                        name="color"
                        options={groups.map(item => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={choice => {
                            setGrpField(choice.value)}
                        }
                    />
                    <Select
                        className="basic-single"
                        classNamePrefix="Категория"
                        name="color"
                        options ={ctgs.map(item => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={choice => {
                            setCtgField(choice.value)}
                        }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant={"primary"} onClick={event => {
                        event.preventDefault()
                        const options = {
                            method: 'POST',
                            headers:{
                                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                                'Content-Type':'application/json'
                            },
                            body: JSON.stringify({
                                group: grpField-0,
                                category: ctgField-0,
                                name: nameField,
                                description: descrField,
                                price: costField-0,
                                amount: qtyField-0,
                                is_shown:1-0,
                                picture:null
                            })
                        };
                        fetch(`http://${api_socket}/prodm/`, options)
                            .then(response => response.json())
                            .then(response => console.log(response))
                            .then(async () => {
                                const prodlist =  await (getProdm())
                                setprods (prodlist)
                            })
                            .catch(err => console.error(err));
                        handleClose()
                    }
                    }>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={"page-name"}>Список всей продукции</div>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ?
                    <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div> :
                    <>
                        <div className={"container"}>
                            {!prods.length ? <div className={"empty-result-message"}><h1>Продукция не найдена :(</h1></div>:
                                <Row xs={1} md={3} sm={2} lg={4} className="grid">
                                    {prods.map((item, index) => {
                                        return(
                                            <Table striped bordered hover key = {index}>
                                                <ManagerProd prod={item}/>
                                            </Table>
                                        /*<Col key={index}>
                                                <ManagerProd
                                                    prod={item}
                                                />
                                            </Col>*/
                                        )
                                    })}
                                </Row>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ProdManagerPage;