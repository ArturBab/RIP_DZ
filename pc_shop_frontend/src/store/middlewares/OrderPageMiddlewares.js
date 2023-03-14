import * as OrderPageActionCreators from "../actionCreators/OrderPageActionCreators"
import {getOrders, getOrdersFilter, getOrdersm, getOrdersmFilter, getStatuses} from "../../modules"

export const  fetchpartprods = (user,filters) => async dispatch => {
    if (user) {
        dispatch(OrderPageActionCreators.createAction_setloadingStatus(true))
        if (filters) {
            const orders = await getOrdersFilter(user, filters)
            dispatch(OrderPageActionCreators.createAction_setordersList(orders))
            dispatch(OrderPageActionCreators.createAction_setloadingStatus(false))
        } else {
            const orders = await getOrders(user)
            dispatch(OrderPageActionCreators.createAction_setordersList(orders))
            dispatch(OrderPageActionCreators.createAction_setloadingStatus(false))
        }
    }
}


export const  fetchpartprodsm = (filters) => async dispatch => {
    dispatch(OrderPageActionCreators.createAction_setloadingStatus(true))
    if (filters) {
        const orders = await getOrdersmFilter(filters)
        dispatch(OrderPageActionCreators.createAction_setordersList(orders))
        dispatch(OrderPageActionCreators.createAction_setloadingStatus(false))
    } else {
        const orders = await getOrdersm()
        dispatch(OrderPageActionCreators.createAction_setordersList(orders))
        dispatch(OrderPageActionCreators.createAction_setloadingStatus(false))
    }
}


export const  fetchOrders = (user) => async dispatch => {
    if (user) {
        dispatch(OrderPageActionCreators.createAction_setloadingStatus(true))
        const orders = await getOrders(user)
        const statuses = await getStatuses()
        dispatch(OrderPageActionCreators.createAction_setstatusList(statuses))
        dispatch(OrderPageActionCreators.createAction_setordersList(orders))
        dispatch(OrderPageActionCreators.createAction_setloadingStatus(false))
    }
}


export const fetchOrdersm = () => async dispatch => {
    dispatch(OrderPageActionCreators.createAction_setloadingStatus(true))
    const orders = await getOrdersm()
    const statuses = await getStatuses()
    dispatch(OrderPageActionCreators.createAction_setstatusList(statuses))
    dispatch(OrderPageActionCreators.createAction_setordersList(orders))
    dispatch(OrderPageActionCreators.createAction_setloadingStatus(false))
}