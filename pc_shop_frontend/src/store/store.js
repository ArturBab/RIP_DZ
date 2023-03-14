import {configureStore} from "@reduxjs/toolkit";
import * as CartPageMiddlewares from "./middlewares/CartPageMiddlewares"
import * as CategoryPageMiddlewares from "./middlewares/CategoryPageMiddlewares"
import * as HomePageMiddlewares from "./middlewares/HomePageMiddlewares"
import * as OrderPageMiddlewares from "./middlewares/OrderPageMiddlewares"
import * as ProductPageMiddlewares from "./middlewares/ProductPageMiddlewares"
import rootReducer from "./reducers/RootReducer";

const myMiddlewares=[
    CartPageMiddlewares.fetchcart,
    CategoryPageMiddlewares.fetchallprods,
    CategoryPageMiddlewares.fetchpartprods,
    HomePageMiddlewares.fetchcategories,
    OrderPageMiddlewares.fetchpartprods,
    OrderPageMiddlewares.fetchOrders,
    ProductPageMiddlewares.fetchprod
]

const store = configureStore({
    reducer : rootReducer,
    myMiddlewares
})

export default store