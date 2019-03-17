import React ,{ Component } from 'react'

// 请求数据
import axios from 'axios'

import { connect } from 'react-redux'

import "./List.css"

// loading 组件
import Loading from '../loading/loading'

class ListUI extends Component {
    constructor(){
        super();
        this.state = {
            musicList:[],
            isLoading:true // 开始加载
        };
        this.handleMove = this.handleMove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.isMove = false;
    }
    render(){
        return(
            <div>
                <div id="musicList">
                    <ul>
                        {
                            this.state.isLoading ? <Loading/> :
                            this.state.musicList.map((item,index)=>{
                                return (
                                    <li key={ item.id }
                                        onTouchMove={this.handleMove}
                                        onTouchEnd={() => { this.handleEnd(item.id) } }>
                                        <div className="listOrder">{ index + 1 }</div>
                                        <div className="listName">
                                            <h3>{item.title }</h3>
                                            <p>{item.author }</p>
                                        </div>
                                    </li>
                                )
                            })
                        }


                    </ul>
                </div>
            </div>
        );
    }
    // 生命周期函数： DOM 渲染成功后请求---数据的交互
    componentDidMount(){
        axios.post("/api/index/index",{ 
            "TransCode": "020111",
             "OpenId": "Test", 
             "Body": { 
                 "SongListId": "141998290" 
                } 
         }).then((res)=>{
             console.log(res);
             if (res.data.ErrCode === "OK") {
                var musicList = res.data.Body.songs;
                this.setState({
                    musicList:musicList,// 拿到歌曲信息
                    isLoading:false,    // 请求成功之后为false
                })
             }
         });

         // 触发箭头的状态管理
        this.props.headerArrowFn();

    }

    // 点击方法的实现
    handleMove(){
        this.isMove = true;
    }
    handleEnd(id){
        if (this.isMove) {    // 鼠标移动的时候
            this.isMove = false;
        } else {              // 鼠标点击的时候
            this.props.history.push('/lyric/' + id);// 编程式路由的实现
            this.props.musicNameFn(id); // 音乐id的传入
            this.props.isMusicPlay()    // 是否播放
        }
    }

}

function mapStateToProps() {                // 任务的处理
    return {
        
    }
}

function mapDispatchToProps(dispatch) {     // 任务的发配
    return {
        headerArrowFn(){// 箭头的切换
            dispatch({
                type: 'HEADER_ARROW_CHANGE',
                payload:false
            })
        },
        musicNameFn(id){
            dispatch({
                type:'MUSICNAME_CHANGE',
                payload:id
            })
        },
        isMusicPlay(){
            dispatch({
                type:'MUSICPLAY_CHANGE',
                payload:true
            })
        }
    }
}



var List = connect(mapStateToProps, mapDispatchToProps)(ListUI);



export default List