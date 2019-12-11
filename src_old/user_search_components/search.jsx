import React,{Component} from 'react'
import PropTypes from 'prop-types'


export default class Search extends Component {

  static propTypes = {
    setSearchName:PropTypes.func.isRequired,

  }

  search = () =>{
    const {setSearchName} = this.props
    const searchName = this.nameinput.value.trim()
    if (searchName){
      setSearchName(searchName)
    }

  }

  render(){
    return (
        <div>
          <input type="text" placeholder="enter the name you search" className='col-md-4' ref={input => this.nameinput = input}/>
          &nbsp;&nbsp;
          <button className="btn btn-success" onClick={this.search}>Search</button>
        </div>
    )


  }
}

