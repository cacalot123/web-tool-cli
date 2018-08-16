import React, { Component } from 'react';
import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';



class BasicInputExample extends Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handleClick = () => {
    this.inputRef.focus();
  }
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div>


        <List renderHeader={() => 'Not editable / Disabled'}>
          <InputItem
            value="not editable"
            editable={false}
          >姓名</InputItem>
          <InputItem
            value="style of disabled `InputItem`"
            disabled
          >姓名</InputItem>
        </List>
      </div>
    );
  }
}
// const H5NumberInputExampleWrapper = createForm()(BasicInputExample);

export default BasicInputExample;
