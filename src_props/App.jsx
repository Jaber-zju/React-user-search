import React,{Component} from 'react';
//import './Comments.css'

import Search from './user_search_components/search'
import Main from './user_search_components/main'

export default class App extends Component {

  state = {
    searchName:''
  }

  setSearchName = (searchName) => {
    this.searchName = searchName
    this.setState({searchName})

  }


  render(){
    const {searchName} = this.state
    return (
        <div className="container">
          <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <Search setSearchName={this.setSearchName}/>
          </section>
          <Main searchName={searchName}/>
        </div>
    )

  }
}
