import React ,{ Component } from 'react'

// 请求数据
import axios from 'axios'

import { connect } from 'react-redux'

import "./List.css"

class ListUI extends Component {
    constructor(){
        super();
        this.state = {
            musicList:[]
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
            console.log(520);
            // 编程式路由的实现
            this.props.history.push('/lyric/' + id);
        }
    }

}

function mapStateToProps() {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        headerArrowFn(){
            dispatch({
                type: 'HEADER_ARROW_CHANGE',
                payload:false
            })
        }
    }
}

var List = connect(mapStateToProps, mapDispatchToProps)(ListUI);

export default List