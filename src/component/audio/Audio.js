import React ,{ Component } from 'react'
import "./Audio.css"

// 播放 暂停
import {connect} from 'react-redux'

class AudioUI extends Component {
    constructor(){
        super();
        this.handleTap = this.handleTap.bind(this);
    }

    render(){
        return(
            <div>

                <div id="musicAudio">
                    <div ref="audioPlay" className="audioPlay" onTouchStart = { this.handleTap }></div>
                    {/* 小球的拖拽 */}
                    <div ref="audioProgress" className="audioProgress">
                        <div ref="audioBar" className="audioBar"></div>
                        <div ref="audioNow" className="audioNow"></div>
                    </div>

                </div>

                {/* 要进行判断，看是否为空 */}
                <audio id="audio" ref="audio" src={ this.props.musicName && "/music/Music/Music?id="+ this.props.musicName +"&type=url"}></audio>

            </div>
        );
    }


    // 调用拖拽
    componentDidMount() {
        this.handleDrag();
    }

    // 生命周期函数中调用 state ，获取数据仓库中的数据，来执行相关的函数
    componentDidUpdate(){
        if (this.props.ismusicPlay) {
            this.musicPlay();
        } else {
            this.musicPause();
        }
    }
    

    musicPlay(){
        this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPause.png)';
        this.refs.audio.play();     // 音频自带的播放

        // 3.
        this.playing();
        this.timer = setInterval(this.playing.bind(this),1000);
        // 面向对象中，this的指向是 window
    }
    musicPause(){
        this.refs.audioPlay.style.backgroundImage = 'url(/images/list_audioPlay.png)';
        this.refs.audio.pause();     // 音频自带的暂停        

        // 3.
        clearInterval(this.timer);
    }
    // 3.监听实时播放
    playing(){
        var audioProgress = this.refs.audioProgress;
        var audioBar = this.refs.audioBar;
        var audioNow = this.refs.audioNow;
        var audio = this.refs.audio;

        // 小球和蓝条随进度自动加载
        var scale = audio.currentTime / audio.duration;     // 获取一个比例值
        audioBar.style.left = scale * audioProgress.offsetWidth + "px";
        audioNow.style.width = scale * 100 + "%";
    }
    // 1.点击播放
    handleTap(){
        // 进行判断，刚开始没有音乐的时候，不播放
        if (  !this.refs.audio.getAttribute("src") ) {
            return false;
        }

        if (this.refs.audio.paused) {       // 暂停状态
            this.props.ismusicPlayFn(true); // 开始播放
        } else {
            this.props.ismusicPlayFn(false); // 暂停   
        }
    }
    // 2.小球的拖拽
    handleDrag(){
        var audioProgress = this.refs.audioProgress;
        var audioBar = this.refs.audioBar;
        var audioNow = this.refs.audioNow;
        var audio = this.refs.audio;
        var disX = 0;
        audioBar.ontouchstart = function(event){
            // console.log(event);
            var This = this; // 绑定this
            var touch = event.changedTouches[0];
            disX = touch.pageX - this.offsetLeft;
            document.ontouchmove = function(ev){
                var touch = ev.changedTouches[0];
                var L = touch.pageX - disX;     // 设置距离
                    if (L<0) {
                        L=0
                    } else if( L > audioProgress.offsetWidth ){
                        L = audioProgress.offsetWidth;
                    }                           // 距离的判断
                This.style.left = L + "px";
                // 确定一个比例值
                var scale = L / audioProgress.offsetWidth;  // 0-1之间
                audio.currentTime = scale * audio.duration; // 快进时匹配播放进度
                audioNow.style.width = scale * 100 + "%";   // 进度条
            };
            document.ontouchend = function(){
                document.ontouchmove = document.ontouchend = null;  //取消两个事件
            }
            return false; // 阻止默认事件
        };
    }
}







function mapStateToProps(state){            // 数据的管理，拿到数据仓库中的数据
    return {
        ismusicPlay: state.ismusicPlay,
        musicName: state.musicName
    }
}
function mapDispatchToProps(dispatch){
    return {
        ismusicPlayFn(bool){
            dispatch({
                type:"ISMUSICPLAY_CHANGE",
                payload:bool
            })
        }
    }
}

var Audio = connect(mapStateToProps, mapDispatchToProps)(AudioUI);


export default Audio