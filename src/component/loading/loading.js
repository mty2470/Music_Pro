import React,{Component} from 'react'

import "./loading.css"

class Loading extends Component {
    render(){
        return (
          <div className="loader">
            <div className="loader-inner">
                    <div className="loader-line-wrap">
                        <div className="loader-line" />
              </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line" />
              </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line" />
              </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line" />
              </div>
                    <div className="loader-line-wrap">
                        <div className="loader-line" />
              </div>
            </div>
          </div>
        );
    }
}

export default Loading;