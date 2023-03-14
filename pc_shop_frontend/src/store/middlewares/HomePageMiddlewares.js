import * as HomePageActionCreators from "../actionCreators/HomePageActionCreators"
import {getCtgs} from "../../modules"

export const fetchcategories = () => async dispatch =>{
    dispatch(HomePageActionCreators.createAction_setloadingStatus(true))
    const data = await getCtgs()
    dispatch(HomePageActionCreators.createAction_setctgList(data))
    dispatch(HomePageActionCreators.createAction_setloadingStatus(false))

}