import React, {Component} from 'react';
import TodoForm from './TodoForm'
import './AddTodo.css';
class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled:false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    // this.props.changePage(this.props.value);
    this.setState({
      enabled: !this.state.enabled
    })

  }
  render() {
    if(this.state.enabled) return (<div>
      <TodoForm userId={this.props.userId} reloadPage={this.props.reloadPage} handleError={this.props.handleError}/>
      <button className="AddTodo" onClick={this.handleClick}>Go Back</button>
    </div>
)
    else {

    return (
    <button className="AddTodo" onClick={this.handleClick}>Add Todo</button>
   );
 }
  }
}

export default AddTodo;
