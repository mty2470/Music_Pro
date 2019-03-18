import React,{Component} from 'react'

import "./Pic.css"

import {connect} from 'react-redux'

class PicUI extends Component {
    constructor(){
        super();
        this.handleTouch = this.handleTouch.bind(this);
    }
    render(){
        return (
            <div id="musicPic">
                <div ref="musicPicDiv" onTouchStart={ this.handleTouch }>
                    <img src={ '/music/Music/Music?id='+ 
                        this.props.match.params.id +
                    '&type=pic' } alt=""/>
                </div>
            </div>
        )
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        this.props.headerArrowFn();
        this.props.musicNameFn(id); // 详情页刷新的问题
        if (this.props.ismusicPlay) {
            this.Picplay();
        } else {
            this.PicPause();
        }
    }
    // 做两次判断
    componentDidUpdate(){
        if (this.props.ismusicPlay) {
            this.Picplay();
        } else {
            this.PicPause();
        }
    }
    Picplay(){
        this.refs.musicPicDiv.style.animationPlayState = "running";
    }
    PicPause(){
        this.refs.musicPicDiv.style.animationPlayState = "paused";        
    }
    handleTouch(){
        var id = this.props.match.params.id;
        this.props.history.push('/lyric/' + id);
    }
}

// 箭头的配置处理
function mapStateToProps(state) {            // 数据的处理
    return {
        ismusicPlay: state.ismusicPlay,  // 获取音乐是否播放 
    }
}

function mapDispatchToProps(dispatch) { // 任务的发配
    return {
        headerArrowFn() {
            dispatch({
                type: 'HEADER_ARROW_CHANGE',
                payload: true
            })
        },
        musicNameFn(id) { // 详情页刷新
            dispatch({
                type: "MUSICNAME_CHANGE",
                payload: id
            })
        }
    }
}

var Pic = connect(mapStateToProps, mapDispatchToProps)(PicUI);


export default Pic