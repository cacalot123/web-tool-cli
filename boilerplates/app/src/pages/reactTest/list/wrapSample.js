import React, {Component} from 'react';

const hoc = WrappedComponent => class extends Component {
  constructor(props) {
    super(props);
    const t = this;
    this.state = {
      title: "text111",
      modalShow: false
    }
  }

  testClick = (info) => {
    const t= this;
    this.setState({
      modalShow: true
    });
    console.log('info',info)

  }

  layerClose = () => {
    this.setState({
      modalShow: false
    });
  }

  render() {
    const {title, modalShow} = this.state;
    const props = {
      testClick: this.testClick,
      layerClose: this.layerClose,
      title,
      modalShow,
      ...this.props
    }
    console.log('hoc');
    return (
      <WrappedComponent {...props}/>
    );
  }
};


export default hoc;
