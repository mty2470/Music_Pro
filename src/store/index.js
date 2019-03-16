
import { createStore, combineReducers } from "redux";

function headerArrowReducer(state=false,action) {
    if (action.type === 'HEADER_ARROW_CHANGE') {
        return action.payload
    }
    else{
        return state
    }
}

let reducers = combineReducers({
    headerArrow:headerArrowReducer
})


var store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store