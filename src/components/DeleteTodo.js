import React, {Component} from 'react';
// import TodoForm from './TodoForm'
import './DeleteTodo.css';
class DeleteTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled:false
    }
    this.handleClick = this.handleClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem(){
    console.log(this.props);
    let url = 'http://127.0.0.1:8848/api/users/' + this.props.userId + '/todos/'+this.props.todoId;
    fetch(url, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.status >= 400) {
        return Promise.reject((response.statusText && response.status + " " + response.statusText) || response.status);
      }
      return response;
    }).then((jsonResponse) => {
      this.setState({
        enabled:false
      })
     this.props.reloadPage();
    }).catch(err => {
      this.setState({error: err})
      this.props.handleError(err);
    })
  }
  handleClick(){
    // this.props.changePage(this.props.value);
    this.setState({
      enabled: !this.state.enabled
    })

  }
  render() {
    if(this.state.enabled) return (
      <div className="FormWrapper">
        <div className="FormBlock">

        <h3 >Are You Sure You Want To Delete This Item?</h3>
          <button className="Delete" onClick={this.deleteItem}>Delete</button>
        </div>
      <button className="GoBack" onClick={this.handleClick}>Go Back</button>
    </div>);
    else {

    return (
    <button className="DeleteTodo" onClick={this.handleClick}>Delete</button>
   );
 }
  }
}

export default DeleteTodo;
