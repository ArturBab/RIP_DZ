import * as CategoryPageActionCreators from "../actionCreators/CategoryPageActionCreators"
import {getGroups, getProdprice, getProds, getProdsFilter} from "../../modules"



export const  fetchpartprods = (ctg,filters) => async dispatch => {
    if (ctg) {
        dispatch(CategoryPageActionCreators.createAction_setloadingStatus(true))
        if (filters) {
            const prods = await getProdsFilter(ctg, filters)
            dispatch(CategoryPageActionCreators.createAction_setsproductList(prods))
            dispatch(CategoryPageActionCreators.createAction_setloadingStatus(false))
        } else {
            const prods = await getProds(ctg)
            dispatch(CategoryPageActionCreators.createAction_setsproductList(prods))
            dispatch(CategoryPageActionCreators.createAction_setloadingStatus(false))
        }
    }
}


export const  fetchallprods = (ctg) => async dispatch => {
    if (ctg) {
        dispatch(CategoryPageActionCreators.createAction_setloadingStatus(true))
        const prods = await getProds(ctg)
        const groups = await getGroups()
        const prices = await getProdprice(ctg)
        const pricesinfo = [prices.min_cost, prices.max_cost]
        dispatch(CategoryPageActionCreators.createAction_setsproductList(prods))
        dispatch(CategoryPageActionCreators.createAction_setgroupList(groups))
        dispatch(CategoryPageActionCreators.createAction_setproductprices(pricesinfo))
        dispatch(CategoryPageActionCreators.createAction_setloadingStatus(false))
    }
}