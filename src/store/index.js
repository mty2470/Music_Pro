
import { createStore, combineReducers } from "redux";


// 返回 的 < 
function headerArrowReducer(state=false,action) {
    if (action.type === 'HEADER_ARROW_CHANGE') {
        return action.payload
    }
    else{
        return state
    }
}


// 音频的管理：音乐的id和播放暂停
function musicNameReducer(state='',action){
    if (action.type === "MUSICNAME_CHANGE") {
        return action.payload
    } else {
        return state
    }
}
function ismusicPlayReducer(state=false,action){
    if (action.type === "ISMUSICPLAY_CHANGE") {
        return action.payload;
    } else {
        return state
    }
}



let reducers = combineReducers({
    headerArrow:headerArrowReducer,
    musicName:musicNameReducer,
    ismusicPlay:ismusicPlayReducer
})




var store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store