import React, {useEffect} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import BasicBreadcrumbs from "../Components/Breadcrumbs";
import CategoryCard from "../Components/CategoryCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchcategories} from "../store/middlewares/HomePageMiddlewares";
import ProdCard from "../Components/ProdCard";

export default function HomePage() {

    const ctgs = useSelector(state => state.cached_data.HomePage.ctgList)
    const loadingStatus = useSelector(state => state.ui.HomePage.loadingStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchcategories())
    }, [])

    return (
        <div
            className={"container"}
        >
            <Row>
                <BasicBreadcrumbs props={[
                    {
                        ref: '/',
                        text: ''
                    }
                ]}/>
            </Row>
            <div
                className={'welcome-message'}
                style={{textAlign: "center", fontSize: "30px", fontFamily: "Bahnschrift", marginBottom: "30px"}}>
                Добро пожаловать в интернет-магазин по продажам аксессуаров для ПК!
            </div>
            <div
                className={'welcome-message'}
                style={{textAlign: "center", fontSize: "20px", marginBottom: "20px"}}
            >
            </div>

            {loadingStatus? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>
                :
                <>
                    {!ctgs.length ? <div className={"empty-result-message"}><h1>Категории не найдены
                            :
                            (</h1></div>:
                        <Row xs={1} md={2} sm={2} lg={3} className="grid">
                            {ctgs.map((item, index) => {
                                return(
                                    <Col key={index}>
                                        <CategoryCard
                                            cat_id={item.id}
                                            pic={item.pic}
                                            name={item.name}
                                        />
                                    </Col>
                                )
                            })}
                        </Row>
                    }
                </>
            }
        </div>
    );
}