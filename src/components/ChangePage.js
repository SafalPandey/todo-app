import React, {Component} from 'react';
import './ChangePage.css';
class ChangePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      value: this.props.value
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.changePage(this.props.value);
  }
  render() {
    return (
    <button className={["ChangePage ",this.state.label].join(" ")} onClick={this.handleClick}>{this.state.label}</button>
   );
  }
}

export default ChangePage;
