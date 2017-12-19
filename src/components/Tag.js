import React, {Component} from 'react';
import './Tag.css';
class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: this.props.tag.tag
    }
  }
  render() {
    return (
    <span className="Tag">{this.state.tag}</span>
   );
  }
}

export default Tag;
