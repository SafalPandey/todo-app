import React, {Component} from 'react';
import Todo from './Todo'
import ChangePage from './ChangePage'
import AddTodo from './AddTodo'

import './Todolist.css';
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      data: [],
      metadata: {
        prevPage: null,
        page: this.props.page || 1,
        nextPage:null
      }
    }

    this.changePage(this.state.metadata.page);

  }

  changePage(page) {
    fetch('http://127.0.0.1:8848/api/users/' + this.props.userId + '/todos/?page=' + page).then((response) => {
      if (response.status >= 400) {
        return Promise.reject((response.statusText && response.status + " " + response.statusText) || response.status);
      }
      return response.json();
    }).then((jsonResponse) => {
      this.setState({data: jsonResponse.data, metadata: jsonResponse.metadata})
    }).catch(err => {
      console.log(err);
      this.handleError(err)
    })
  }

  reloadPage(){
    this.changePage(this.state.metadata.page);
  }

  handleError(err){
    console.log(err);
    this.setState({error: JSON.stringify(err)})
  }
  render() {
    if (this.state.error) {
      return (<div className="Todo-list">
        <h1 className="Todo-list-header">{this.state.error}!!!</h1>
      </div>);
    }
    return (<div className="Todo-list">
    <div className="TodoWrapper">
       {false && <h2 className="Todo-list-header">List of Todos</h2>}
      {
        this.state.data.map((todo) => {
          return <Todo userId={todo.userId} todoId={todo.id} key={todo.id} reloadPage={this.reloadPage} handleError={this.handleError}/>;
        })
      }
      {this.state.metadata.prevPage && <ChangePage label="Previous" value={this.state.metadata.prevPage} changePage={this.changePage}/>}

      {this.state.metadata.nextPage && <ChangePage label="Next" value={this.state.metadata.nextPage} changePage={this.changePage}/>}
      <AddTodo userId={this.props.userId} reloadPage={this.reloadPage} handleError={this.handleError} />

    </div>
    </div>);
  }
}

export default TodoList;
