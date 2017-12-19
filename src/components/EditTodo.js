import React, {Component} from 'react';
import TodoForm from './TodoForm'
import './EditTodo.css';
class EditTodo extends Component {
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
      <TodoForm userId={this.props.userId} currentTodo={this.props.currentTodo} todoId={this.props.currentTodo.id} reloadPage={this.props.reloadPage} handleError={this.props.handleError}/>
      <button className="GoBack" onClick={this.handleClick}>Go Back</button>
    </div>
)
    else {

    return (
    <button className="EditTodo" onClick={this.handleClick}>Edit</button>
   );
 }
  }
}

export default EditTodo;
