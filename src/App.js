import React, { Component } from 'react';
import TodoList from './components/TodoList'

import './App.css';

class App extends Component {
  constructor(props) {
        super(props)
        this.handleError = this.handleError.bind(this);
        this.gotoPage = this.gotoPage.bind(this);

        this.state = {
            userId: 1,
            page:1
        };
    }
    handleError(err){
      this.setState({error:err})
    }

    gotoPage(page){
      this.setState({
        page: page
      })
    }

  render() {
    if (this.state.error) {
      return (
      <div className="App">
        <header className="App-header">
          <div className="Todo-list"><h1 className="Todo-list-header">{this.state.error}!!!</h1></div>
     </header>
     </div>
);
    }
    return (
      <div className="App">
        <header className="App-header">
          <span className="User">Current User ID:{this.state.userId}</span>
          <h1 className="App-title">React Todo App</h1>
        </header>

        <TodoList userId={this.state.userId} page={this.state.page} align="center"/>
      </div>
    );
  }
}

export default App;
