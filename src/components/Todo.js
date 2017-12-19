import React, {Component} from 'react';
import Tag from './Tag'
import EditTodo from './EditTodo'
import DeleteTodo from './DeleteTodo'
import './Todo.css';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        todo: "",
        description: "",
        tags: []
      }

    }
    fetch('http://127.0.0.1:8848/api/users/' + this.props.userId + '/todos/' + this.props.todoId).then((response) => {

      if (response.status >= 400) {
        return Promise.reject((response.statusText && response.status + " " + response.statusText) || response.status);
      }
      return response.json()
    }).then((jsonResponse) => {
      this.setState({data: jsonResponse.data[0]})
    }).catch((err) => {
      this.setState({error: JSON.stringify(err)})
    })
  }
  render() {
    if (this.state.error) {
      return (<div className="Todo">
        <h1 className="Todo-title">{this.state.error}!!!</h1>
      </div>);
    }
    return (<div className="Todo">
      {this.state.data.todo && <h3 className="Todo-title">Title: {this.state.data.todo}</h3>}

      <EditTodo currentTodo={this.state.data} userId={this.props.userId} todoId={this.props.todoId} reloadPage={this.props.reloadPage} handleError={this.props.handleError} />
      <DeleteTodo userId={this.props.userId} todoId={this.props.todoId} reloadPage={this.props.reloadPage} handleError={this.props.handleError} />

      {this.state.data.description && <p className="Todo-intro">Description:{this.state.data.description}</p>}
      {this.state.data.id && <p className="Todo-intro">Todo Id:{this.state.data.id}</p>}

      {
        this.state.data.tags.length > 0 && <p className="Todo-intro">Tags:{
              this.state.data.tags.map((tag, i) => {
                return <Tag tag={tag} key={i}/>;
              })
            }
          </p>
      }
    </div>);
  }
}

export default Todo;
