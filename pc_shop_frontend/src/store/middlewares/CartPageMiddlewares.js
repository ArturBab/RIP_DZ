import * as CartPageActionCreators from "../actionCreators/CartPageActionCreators"
import {getCart} from "../../modules"


export const  fetchcart = (user) => async dispatch => {
    if (user) {
        dispatch(CartPageActionCreators.createAction_setloadingStatus(true))
        const cart = await getCart(user)
        let fullprice = 0
        console.log(fullprice)
        console.log(cart)
        for (let i=0;i<cart.length;i++){
            fullprice = fullprice+cart[i].prod.price*cart[i].amount
        }
        dispatch(CartPageActionCreators.createAction_setcartitems(cart))
        dispatch(CartPageActionCreators.createAction_setfullprice(fullprice))
        dispatch(CartPageActionCreators.createAction_setloadingStatus(false))
    }
}