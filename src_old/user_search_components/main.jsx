import React,{Component} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

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

  componentWillReceiveProps(newProps) {
    const {searchName} = newProps
    //console.log(searchName)
    this.setState({loading:true,initview:false})

    //发送axios请求
    const url = 'https://api.github.com/search/users?q='+ searchName  //要注意这里的字符串和变量的拼接规则
    axios.get(url)
        .then(res => {
          const result = res.data
          //console.log(res)
          const users = result.items.map(item => {
            return {
              name:item.login,
              url:item.html_url,
              avatarUrl:item.avatar_url
            }
          })

          this.setState({
            users,
            loading:false
          })

        })
        .catch(error => {
          //console.log(error);
          this.setState({
            loading:false,
            errorMsg:error.message
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

