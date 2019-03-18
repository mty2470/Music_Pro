import React ,{ Component } from 'react'
import "./Lyric.css"

import axios from 'axios'


// 小箭头的处理，也得使用任务的配发，react-redux
import {connect} from 'react-redux'


class LyricUI extends Component {

    constructor(){
        super();
        this.state = {
            LyricList:[],// 改造成 时间和歌词 对应的形式
            active:-1    // 以标识的方式来解决
        };
        this.handlTouch = this.handlTouch.bind(this);
    }

    render(){
        return(
            <div>
                <div id="musicLyric">
                    <ul ref="musicUl" onTouchStart={this.handlTouch}>
                        {/* <li>歌词测试文字</li>
                        <li className="active">歌词测试文字</li>
                        <li>歌词测试文字</li>
                        <li>歌词测试文字</li> */}
                        {
                            this.state.LyricList.map((item,index)=>{//   7.
                                return <li key={index} className={this.state.active === index ? "active" : ""}>{ item.lyric }</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }


    // 1.生命周期函数：
    componentDidMount(){
        var id = this.props.match.params.id;
        // console.log(id);
        axios.get('/music/Music/Music?id='+id+'&type=lrc').then(
            (res)=>{
                console.log(res);
                this.setState({
                    LyricList:this.formatLyric(res.data)
                });
            }
        );
        // 触发箭头的状态管理
        this.props.headerArrowFn();
        this.props.musicNameFn(id); // 详情页刷新的问题


        if (this.props.ismusicPlay) {
          this.lyricPlay(); // 播放就输出歌词
        } else {
          this.lyricPause(); // 8.会导致 定时器一直走，音乐暂停不触发。
        }

    }

    // 更新歌词
    componentDidUpdate(){
        // 8.解决死循环
        // if (this.state.active !== -1) {
        //     return false;
        // }

        // if (this.props.ismusicPlay) {
        //     this.lyricPlay();// 播放就输出歌词
        // } else {
        //     this.lyricPause();// 8.会导致 定时器一直走，音乐暂停不触发。
        // }
    }

    // componentDidUpdate() 中的解决方法
    // 解决定时器调用 8.9
    componentWillReceiveProps(nextprops){
        if (nextprops.ismusicPlay) {
          this.lyricPlay(); // 播放就输出歌词
        } else {
          this.lyricPause(); // 8.会导致 定时器一直走，音乐暂停不触发。
        }
    }

    // 
    componentWillUnmount(){
        this.lyricPause(); // 销毁定时器，返回列表
    }

    // 2.将歌词格式化
    formatLyric(lyrics){
        var result = [];
        // 正则表达式的匹配 
        var re = /\[([^\]]+)\]([^[]+)/g;   // ？？？？？
                // lyrics.replace(re,function($0,$1,$2){
                //     result.push({
                //         time:$1,
                //         lyric:$2
                //     });
                // });
        lyrics.replace(re,($0,$1,$2)=>{
            result.push({
                time: this.formatTime($1),
                lyric:$2
            });
        });
        console.log(result);
        return result
    }
    // 3.时间( 歌词自动滚动 )
    formatTime(time){   //  全都转化为秒
        var arr = time.split(":");
        return parseFloat(arr[0]) * 60 + parseFloat(arr[1]);
    }
    lyricPlay(){// 4.
        this.Playing();
        this.timer = setInterval(this.Playing.bind(this),500)   //
    }
    lyricPause(){// 5.
        clearInterval(this.timer);
    }
    Playing(){// 6.
        console.log("定时器监听");
        
        var LyricList = this.state.LyricList;
        var audio = document.getElementById("audio"); // 通过 id 存取
        var musicUl = this.refs.musicUl;// 9.
        var musicLl = musicUl.getElementsByTagName("li")[0];// 9.
        for (let i = 0; i < LyricList.length; i++) {
            if ( LyricList[i].time < audio.currentTime && LyricList[i+1].time > audio.currentTime ) {
                console.log(LyricList[i].lyric);
                this.setState({ // 更新的时候就会一直调用 lyricPlay  lyricPause ，死循环
                    active:i, // 播放的时候激活 active 
                })
                if (i > 5) { // 9.歌词的自动滚动
                    musicUl.style.top = - (i - 5) * (musicLl.offsetHeight + 15) + "px";
                }
            }
        }
    }
    handlTouch(){
        var id = this.props.match.params.id;
        this.props.history.push('/pic/' + id);
    }

}



// 箭头的配置处理
function mapStateToProps(state) {            // 数据的处理
    return {
        ismusicPlay:state.ismusicPlay,  // 获取音乐是否播放 
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
        musicNameFn(id){ // 详情页刷新
            dispatch({
                type:"MUSICNAME_CHANGE",
                payload:id
            })
        }
    }
}

var Lyric = connect(mapStateToProps, mapDispatchToProps)(LyricUI);

export default Lyric