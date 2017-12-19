import React, {Component} from 'react';
import './TodoForm.css';
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: (this.props.currentTodo && this.props.currentTodo.todo) || "",
      description: (this.props.currentTodo && this.props.currentTodo.description) || "",
      tags: (this.props.currentTodo && this.props.currentTodo.tags) || []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTags = this.addTags.bind(this);
  }
  handleClick() {
    // this.props.changePage(this.props.value);
    let url = 'http://127.0.0.1:8848/api/users/' + this.props.userId + '/todos/';
    let method = "POST"
    if (this.props.todoId) {
      url +=this.props.todoId;
      method = "PUT"
    }
    console.log(this.state);
    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((response) => {
      if (response.status >= 400) {
        return Promise.reject((response.statusText && response.status + " " + response.statusText) || response.status);
      }
      return response.json();
    }).then((jsonResponse) => {
      this.setState({
        todo:  "",
        description:  "",
        tags: []
      })
      this.props.reloadPage();
    }).catch(err => {
      this.setState({error: err})
      this.props.handleError(err);
    })

  }

  handleChange(evt) {
    // this.props.changePage(this.props.value);
    console.log(evt.target.id);
    let todo = evt.target.name === "todo"
      ? evt.target.value
      : this.state.todo;
    let description = evt.target.name === "description"
      ? evt.target.value
      : this.state.description;
    let tags = this.state.tags.slice();
    tags[evt.target.id] = evt.target.name === "tags"
      ? evt.target.value
      : this.state.tags[evt.target.id];

    // this.state.todo = todo;
    // this.state.description = description;
    // this.state.tags = tags;
    this.setState({todo: todo, description: description, tags: tags})

  }
  addTags() {
    // this.props.changePage(this.props.value);
    let tags = this.state.tags.slice();
    tags.push("");
    this.setState({todo: this.state.todo, description: this.state.description, tags: tags})

  }
  render() {
    return (<div className="FormWrapper">
      <div className="FormBlock" align="left" id="todoForm">
        <label htmlFor="todo">Title:</label>
        <input type="text" name="todo" value={this.state.todo} onChange={(e) => {
            this.handleChange(e)
          }}></input><br/>
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" value={this.state.description} onChange={(e) => {
            this.handleChange(e)
          }}></input><br/>
        <label htmlFor="tags">Tags:</label>
        {
          this.state.tags.map((tag, i) => {
            return (<input className="Tags" type="text" name="tags" id={i} key={i} placeholder={tag.tag} onChange={(e) => {
                this.handleChange(e)
              }}></input>);
          })
        }
        <button className="AddTags" onClick={this.addTags}>Add Tags</button>

        <button className="TodoSubmit" onClick={this.handleClick}>Submit</button>
      </div>
    </div>);
  }
}

export default TodoForm;
