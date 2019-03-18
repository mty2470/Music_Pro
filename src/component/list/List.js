import React ,{ Component } from 'react'

// 请求数据
import axios from 'axios'

import { connect } from 'react-redux'

import "./List.css"

// 设置缓存
import {getSessionStorage,setSessionStorage} from '../../tools/index'


// loading 组件
import Loading from '../loading/loading'

console.log(getSessionStorage, setSessionStorage);



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
                <div id="musicList" ref="musicListUl">
                    <ul>
                        {
                            this.state.isLoading ? <Loading/> :
                            this.state.musicList.map((item,index)=>{
                                return (
                                    // id的对比，确定列表是否被选中
                                    <li className={this.props.musicName ==  item.id ? "active" : ""}

                                        key={ item.id }
                                        onTouchMove={this.handleMove}
                                        onTouchEnd={() => { this.handleEnd(item.id,item.title) } }>
                                        {/* 获取参数的方法 */}
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
    componentDidMount(){ // 生成新组建就会触发

    var musicList = getSessionStorage("musicList")
    if (musicList) {
        this.setState({
          musicList: JSON.parse(musicList),
          isLoading:false
        },()=>{
                // var musicListUl = this.refs.musicListUl;
                // var musicListLi = musicListUl.getElementsByTagName("li");
                // for (let i = 0; i < musicListLi.length; i++) {
                //     if (musicListLi[i].className) {
                //         musicListUl.scrollTop = musicListLi[i].offsetTop;
                //     }
                // }
                this.listScrollTop();
        });
    } else {
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
                },()=>{
                    // 获取所有的li
                    // var musicListUl =this.refs.musicListUl;
                    // var musicListLi = musicListUl.getElementsByTagName("li");
                    // for (let i = 0; i < musicListLi.length; i++) {
                    //     if (musicListLi[i].className) {
                    //         musicListUl.scrollTop = musicListLi[i].offsetTop;                            
                    //     }
                    // }// this.refs.musicListUl.scrollTop = 200;
                    // 加到外层容器上
                    
                    this.listScrollTop();

                    // 进行数据的缓存
                     setSessionStorage('musicList',JSON.stringify(this.state.musicList));

                })
             }
         });
    }// 缓存
         // 触发箭头的状态管理
        this.props.headerArrowFn();   
    }

    
    // 列表回滚的方法
    listScrollTop(){
        var musicListUl = this.refs.musicListUl;
        var musicListLi = musicListUl.getElementsByTagName("li");
        for (let i = 0; i < musicListLi.length; i++) {
            if (musicListLi[i].className) {
                musicListUl.scrollTop = musicListLi[i].offsetTop;
            }
        }
    }



    // 点击方法的实现
    handleMove(){
        this.isMove = true;
    }
    handleEnd(id,musicTitle){
        if (this.isMove) {    // 鼠标移动的时候
            this.isMove = false;
        } else {              // 鼠标点击的时候
            // this.props.history.push('/lyric/' + id);// 编程式路由的实现
            this.props.history.push('/pic/' + id);// 编程式路由的实现
            this.props.musicNameFn(id); // 音乐id的传入
            this.props.isMusicPlay();   // 是否播放
            this.props.musicTitleFn(musicTitle);
        }
    }

}

function mapStateToProps(state) {                // 任务的处理
    return {
        musicName: state.musicName
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
        },
        musicTitleFn(musicTitle){
            dispatch({
                type:"MUSICTITLE_CHANGE",
                payload: musicTitle
            })
        }
    }
}



var List = connect(mapStateToProps, mapDispatchToProps)(ListUI);



export default List