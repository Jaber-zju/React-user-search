import React,{Component} from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'


export default class Search extends Component {
  static propTypes = {
    setSearchName:PropTypes.func.isRequired,
    keyup:PropTypes.func.isRequired,

  }

  setSearchName = () => {
    const searchName = this.nameinput.value.trim()
    if (searchName) {
      //setSearchName(searchName)
      PubSub.publish('setSearchName',searchName)
    }
  }

  keyup = (event) => {
    const searchName = this.nameinput.value.trim()

    if (event.keyCode === 13) {
      //回车执行查询
      if (searchName) {
        //setSearchName(searchName)
        PubSub.publish('setSearchName',searchName)
      }

    }

  }

  render(){
    return (
        <div>
          <input type='text' placeholder='请输入搜索关键字' ref={input => this.nameinput = input} className='col-md-4' onKeyUp={this.keyup}/>
          &nbsp;&nbsp;&nbsp;
          <button className='btn btn-success' onClick={this.setSearchName}>搜索</button>
        </div>
    )


  }
}

