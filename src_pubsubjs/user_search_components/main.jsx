import React,{Component} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'


export default class Main extends Component {

  state = {
    initview : true,
    loading :false,
    users : null,
    errorMsg : null,
  };

  static propTypes = {
    searchName:PropTypes.string.isRequired,

  }

  // componentWillReceiveProps(newProps) { //监视收到新的props，发送ajax请求
  //   const {searchName} = newProps
  //   this.setState({initview:false,loading:true})
  //
  //   const url = 'https://api.github.com/search/users?q='+searchName
  //   axios.get(url)
  //       .then(res => {
  //         //console.log(res)
  //         const result = res.data
  //
  //         const users = result.items.map((item,index) => {
  //           return {
  //             name:item.login,
  //             url:item.html_url,
  //             avatarUrl:item.avatar_url
  //           }
  //         })
  //
  //         this.setState({users,loading:false})
  //       })
  //       .catch(err => {
  //         this.setState({errorMsg:err.message,loading:false})
  //       })
  // }

  componentDidMount() {
    PubSub.subscribe('setSearchName',(msg,searchName) => {

      this.setState({initview:false,loading:true})

      const url = 'https://api.github.com/search/users?q='+searchName
      axios.get(url)
          .then(res => {
            //console.log(res)
            const result = res.data

            const users = result.items.map((item,index) => {
              return {
                name:item.login,
                url:item.html_url,
                avatarUrl:item.avatar_url
              }
            })

            this.setState({users,loading:false})
          })
          .catch(err => {
            this.setState({errorMsg:err.message,loading:false})
          })

    })
  }

  render(){
    const {initview, loading, users, errorMsg} = this.state

    if (initview){
      return <h2>请输入关键字进行搜索</h2>
    } else if (loading) {
      return <h2>Loading......</h2>
    } else if (errorMsg) {
      return <h2>{errorMsg}</h2>
    } else {
      return (
          <div className='row'>
            {
              users.map((user,index) => (
                  <div className='card' key={index} style={{margin:10}}>
                    <a href= {user.url} target='_blank' rel="noopener noreferrer">
                      <img src={user.avatarUrl} alt="" style={{width:100}}/>
                    </a>
                    <p className='card-text'>{user.name}</p>
                  </div>
                  )
              )
            }
          </div>
      )
    }



  }
}

