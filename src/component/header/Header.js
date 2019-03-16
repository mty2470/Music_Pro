import React ,{ Component } from 'react'
import "./Header.css"

// 箭头的显示与否管理
import {connect} from 'react-redux'
// 箭头的切换
import {NavLink} from 'react-router-dom'


// class Header extends Component {
//     render(){
//         return(
//             <div>
//                 <div id="musicHeader">
//                     巅峰榜 · 热歌
// 		        </div>
//             </div>
//         );
//     }
// }

function mapStateToProps(state){
     return {
         headerArrow: state.headerArrow
     }
}

function mapDispatchToProps(){
     return {

     }
}

class HeaderUI extends Component {
    render(){
        return(
            <div>
                <div id="musicHeader">
                    { this.props.headerArrow && <NavLink to='/list'><span>&lt;</span></NavLink> }巅峰榜 · 热歌
		        </div>
            </div>
        );
    }
}

var Header = connect(mapStateToProps, mapDispatchToProps)(HeaderUI);

export default Header