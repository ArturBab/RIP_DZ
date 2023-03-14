import BasicBreadcrumbs from "../Components/Breadcrumbs";
import {useEffect, useState} from "react";
import {Col, Row, Spinner} from "react-bootstrap";
import ProdCard from "../Components/ProdCard";
import {Slider, TextField} from "@mui/material";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {fetchallprods, fetchpartprods} from "../store/middlewares/CategoryPageMiddlewares";
import * as actCr from "../store/actionCreators/CategoryPageActionCreators";
import Button from "@mui/material/Button";


export default function Category({id}) {

    const loadingStatus = useSelector(state => state.ui.CategoryPage.loadingStatus)
    const text_field_value = useSelector(state => state.ui.CategoryPage.textFieldValue)
    const slider_value = useSelector(state => state.ui.CategoryPage.sliderValue)
    const selectedGrp = useSelector(state => state.ui.CategoryPage.groupValue)
    const prods = useSelector(state => state.cached_data.CategoryPage.productList)
    const prods_pricing = useSelector(state => state.cached_data.CategoryPage.productprices)
    const grp = useSelector(state => state.cached_data.CategoryPage.groupList)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(fetchallprods(id))
        console.log(prods)

    }, [id])

    useEffect(() => {
        if (!loadingStatus) {
            if (slider_value[1] !== prods_pricing[1])
            {
                dispatch(actCr.createAction_setsliderValue(prods_pricing))
            }
            dispatch(actCr.createAction_settextFieldValue(text_field_value))
        }

    }, [loadingStatus])

    return (
        <div className={'container'}>
            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Начальная страница'
                },
                {
                    ref: `/category/${id}/`,
                    text: id === 1 ? 'Процессоры': (id === 2 ? 'Видеокарты' : 'Материнские платы')
                }
            ]}/>

            <div className={"page-name"}>Список доступных товаров</div>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ?
                    <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div> :
                    <>
                        <Row xs={1} sm={1} md={2} xl={2}
                             style={
                            {
                                 display: 'block',
                                 width: '1900px',
                                justifyContent: 'center'
                            }
                            }>
                            {prods_pricing[1] === 0? undefined:
                                <Col>
                                    <div id="search-and-filter-group"
                                         style={{
                                             display: "flex",
                                             flexDirection: "column",
                                             padding: '2px',
                                             border: '2px'}}>

                                        <TextField id="search-by-name" label={'Название'} variant="outlined"
                                                   value={text_field_value}
                                                   onChange={event => {
                                                       event.preventDefault()
                                                       dispatch(actCr.createAction_settextFieldValue(event.target.value))
                                                   }}
                                        />
                                        <Slider style={{marginTop: '35px'}}
                                                getAriaLabel={() => 'Temperature range'}
                                                value={slider_value}
                                                min={prods_pricing[0]}
                                                max={prods_pricing[1]}
                                                onChange={event => {
                                                    event.preventDefault()
                                                    dispatch(actCr.createAction_setsliderValue(event.target.value))
                                                }}
                                                valueLabelDisplay="auto"
                                                marks={[
                                                    {
                                                        value: prods_pricing[0],
                                                        label: `${prods_pricing[0]} ₽`
                                                    },
                                                    {
                                                        value: prods_pricing[1],
                                                        label: `${prods_pricing[1]} ₽`
                                                    }
                                                ]}
                                        />
                                        <div style={{textAlign: "center", marginBottom: "20px"}}>Стоимость</div>
                                        <Select
                                            // defaultValue={}
                                            isMulti
                                            name="ProdsGroup"
                                            options={grp.map(item => {
                                                return {
                                                    value: item.id,
                                                    label: item.name
                                                }
                                            })}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={choice => {
                                                dispatch(actCr.createAction_setgroupValue(choice.map(item => item.value)))
                                            }}
                                        />
                                        <div style={{textAlign: "center"}}>Теги</div>
                                        <Button
                                            variant={"contained"}
                                            disabled={loadingStatus}
                                            style={{width: "fit-content", alignSelf: "center", marginTop: '10px'}}
                                            onClick={() => {
                                                let params = `?name=${text_field_value}&max_cost=${slider_value[1]}&min_cost=${slider_value[0]}`;
                                                if (selectedGrp.length) params += `&groups=${selectedGrp.join(',')}`;
                                                dispatch(fetchpartprods(id, params))
                                            }}
                                            className="1">{'Применить фильтр'}
                                        </Button>
                                    </div>
                                    <br/>
                                    <br/>
                                </Col>
                            }
                            <Col>
                                <div className={"container"}>
                                    {!prods.length ? <div className={"empty-result-message"}><h1>Продукция не найдена :(</h1></div>:
                                        <Row xs={1} md={2} sm={2} lg={2} className="grid">

                                            {prods.filter(item => item.is_shown===1).map((item, index) => {
                                                return(
                                                    <Col key={index}>
                                                        <ProdCard prod={item}/>
                                                        <br/>
                                                    </Col>
                                                )
                                            })}

                                        </Row>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </>
                }
            </div>
        </div>
    )
}