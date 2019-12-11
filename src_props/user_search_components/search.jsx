import React,{Component} from 'react'
import PropTypes from 'prop-types'


export default class Search extends Component {
  static propTypes = {
    setSearchName:PropTypes.func.isRequired,

  }

  setSearchName = () => {
    const {setSearchName} = this.props
    const searchName = this.nameinput.value.trim()
    if (searchName) {
      setSearchName(searchName)
    }
  }

  render(){
    return (
        <div>
          <input type='text' placeholder='请输入搜索关键字' ref={input => this.nameinput = input} className='col-md-4'/>
          &nbsp;&nbsp;&nbsp;
          <button className='btn btn-success' onClick={this.setSearchName}>搜索</button>
        </div>
    )


  }
}

