import React, { Component,Fragment } from 'react';
import './App.css';
// 
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom'

import Header from './component/header/Header'
import List from './component/list/List'
import Audio from "./component/audio/Audio";
import Lyric from "./component/lyric/Lyric";

import Pic from './component/pic/Pic'


// 数据接口：https://api.hibai.cn/api/demo/index

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
            <div id="main">
                <Header></Header>
                {/* 路由重定向的配置  +  以及动态路由 */}
                <Switch>
                    <Route path="/list" component={List}></Route>
                    <Route path="/lyric/:id" component={Lyric}></Route>      
                    <Route path="/pic/:id" component={ Pic }></Route>
                    <Redirect from="/*" to="/list"></Redirect>         
                </Switch>
                <Audio></Audio>
            </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
