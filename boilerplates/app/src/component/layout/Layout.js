import React, {Component} from 'react';
import './base.scss';

export default class Layout extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
