import { useSelector, useDispatch } from "react-redux";
import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import OrderCard from "../Components/OrderCard";
import Select from "react-select";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {fetchOrdersm, fetchpartprodsm} from "../store/middlewares/OrderPageMiddlewares";
import Button from "@mui/material/Button";


function ManageOrder() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const userIsManager = useSelector(state => state.cached_data.App.userIsManager)
    const userOrders = useSelector(state => state.cached_data.OrderPage.ordersList)
    const loadingStatus = useSelector(state => state.ui.OrderPage.loadingStatus)
    const orderStatuses = useSelector(state => state.cached_data.OrderPage.statusList)
    const [filtersStatuses, setFiltersStatuses] = useState([])
    const [startValue, setStartValue] = useState(null);
    const [endValue, setEndValue] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {

        if (userStatus) {
            dispatch(fetchOrdersm(localStorage.getItem('userId')))
        }

    }, [userStatus])

    return (
        <>
            {!userStatus ? <div style={{marginTop: "10px", fontSize: "20px"}}>
                    Чтобы посмотреть список заказов Вы должны авторизоваться</div>
                :
                <div
                    style={{
                        marginTop: "10px",
                        fontSize: "20px",
                        width: "100%",
                        display:"flex",
                        flexDirection: "column",
                        justifyContent:"center"}}>

                    <div style={{textAlign: "center"}}>Фильтр заказов</div>

                    <div className={"filters_and_search"}
                         style={{
                             width: "80%",
                             alignSelf: "center",
                             display:"flex",
                             justifyContent:"center",
                             flexDirection:"column"}}>
                        <div style={{marginBottom: "10px"}}>
                            Дата заказа:
                        </div>
                        <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Начальная дата"
                                    value={startValue}
                                    onChange={(newValue) => {
                                        setStartValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Конечная дата"
                                    value={endValue}
                                    onChange={(newValue) => {
                                        setEndValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </div>

                        Статус заказа:
                        <Select
                            // defaultValue={}
                            isMulti
                            name="OrderStatuses"
                            options={orderStatuses.map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            })}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={choice => {
                                setFiltersStatuses(choice.map(item => item.value))
                            }}
                        />
                        <Button
                                variant={"contained"}
                                style={{marginTop: "10px", alignSelf:"center"}}
                                onClick={event => {
                                    event.preventDefault()
                                    let params = ''
                                    if (filtersStatuses.length) params += `&statuses=${filtersStatuses.join(',')}`
                                    if (startValue) params += `&start_date=${new Date(startValue.$d).toISOString()}`
                                    if (endValue) params += `&end_date=${new Date(endValue.$d).toISOString()}`
                                    console.log('fetching with params...')
                                    console.log(params)
                                    dispatch(fetchpartprodsm(params))
                                }
                                }
                        >
                            Применить
                        </Button>
                    </div>

                    <div style={{textAlign: "center",marginTop:"20px"}}>Заказы</div>

                    {loadingStatus ? undefined :
                        <div className={"container"}>
                            {userOrders.length === 0 ? <div>Заказов на данный момент нет.</div>:
                                <Row xs={1} md={1} sm={1} lg={1} className="grid">
                                    {userOrders.map((item, index) => {
                                        return(
                                            <Col key={index}>
                                                <OrderCard is_manager={userIsManager}
                                                           order={item}
                                                           manager_page={true}
                                                           statuses={orderStatuses}/>
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

export default ManageOrder