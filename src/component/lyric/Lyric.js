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
        }
    }

    render(){
        return(
            <div>
                <div id="musicLyric">
                    <ul>
                        {/* <li>歌词测试文字</li>
                        <li className="active">歌词测试文字</li>
                        <li>歌词测试文字</li>
                        <li>歌词测试文字</li> */}
                        {
                            this.state.LyricList.map((item,index)=>{
                                return <li key={index}>{ item.lyric }</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }


    // 生命周期函数：
    componentDidMount(){
        var id = this.props.match.params.id;
        console.log(id);
        axios.get('/music/Music/Music?id='+id+'&type=lrc').then(
            (res)=>{
                console.log(res);
                this.setState({
                    LyricList:this.formatLyric(res.data)
                })
            }
        );

        // 触发箭头的状态管理
        this.props.headerArrowFn();

    }

    // 将歌词格式化
    formatLyric(lyrics){
        var result = [];
        // 正则表达式的匹配 
        var re = /\[([^\]]+)\]([^[]+)/g;   // ？？？？？
        lyrics.replace(re,function($0,$1,$2){
            result.push({
                time:$1,
                lyric:$2
            });
        });
        console.log(result);
        return result
    }

}



// 箭头的配置处理
function mapStateToProps() {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        headerArrowFn() {
            dispatch({
                type: 'HEADER_ARROW_CHANGE',
                payload: true
            })
        }
    }
}

var Lyric = connect(mapStateToProps, mapDispatchToProps)(LyricUI);

export default Lyric