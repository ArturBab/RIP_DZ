import './App.css';
import DocumentTitle from 'react-document-title';
import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./themes";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import HomePage from "./Pages/HomePage";
import Category from "./Pages/CategoryPage";
import ProdPage from "./Pages/ProdPage";
import AuthPage from "./Pages/AuthPage";
import RegPage from "./Pages/RegPage";
import OrdersPage from "./Pages/OrderPage";
import CartPage from "./Pages/CartPage";
import ManageOrder from "./Pages/ManagerOrderPage";
import ProdManagerPage from "./Pages/ProdManagerPage";

function App() {
    return(
        <ThemeProvider theme={theme}>
            <DocumentTitle title = 'PC SHOP'>
                <BrowserRouter basename="/" >
                    <ResponsiveAppBar/>
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/category/1/"} element={<Category id={1}/>}/>
                        <Route path={"/category/2/"} element={<Category id={2}/>}/>
                        <Route path={"/category/3/"} element={<Category id={3}/>}/>
                        <Route path={"/category/:ctgid/product/:prodid"} element={<ProdPage/>}/>
                        <Route path={"/auth"} element={<AuthPage/>}/>
                        <Route path={"/reg"} element={<RegPage/>}/>
                        <Route path={"/purchases"} element={<OrdersPage/>}/>
                        <Route path={"/cart"} element={<CartPage/>}/>
                        <Route path={"/ManageOrders"} element={<ManageOrder/>}/>
                        <Route path={"/ProdManagerPage"} element={<ProdManagerPage/>}/>
                    </Routes>
                </BrowserRouter>
            </DocumentTitle>
        </ThemeProvider>
    );
}

export default App;
