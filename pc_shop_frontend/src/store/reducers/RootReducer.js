import {combineReducers} from "@reduxjs/toolkit";
import {uiHomePageReducers, cached_dataHomePageReducers} from "./HomePageReducers";
import {uiCategoryPageReducers, cached_dataCategoryPageReducers} from "./CategoryPageReducers";
import {uiProductPageReducers, cached_dataProductPageReducers} from "./ProductPageReducers";
import {uiAppReducers, cached_dataAppReducers } from "./AppReducers";
import {uiCartPageReducers, cached_dataCartPageReducers} from "./CartPageReducers";
import { uiOrderPageReducers, cached_dataOrderPageReducers } from "./OrderPageReducers";


const rootReducer = combineReducers({
    cached_data: combineReducers({
        HomePage: cached_dataHomePageReducers,
        CategoryPage: cached_dataCategoryPageReducers,
        ProductPage: cached_dataProductPageReducers,
        App:cached_dataAppReducers,
        CartPage:cached_dataCartPageReducers,
        OrderPage:cached_dataOrderPageReducers
    }),
    ui: combineReducers({
        HomePage: uiHomePageReducers,
        CategoryPage: uiCategoryPageReducers,
        ProductPage: uiProductPageReducers,
        App:uiAppReducers,
        CartPage:uiCartPageReducers,
        OrderPage:uiOrderPageReducers
    })
})

export default rootReducer