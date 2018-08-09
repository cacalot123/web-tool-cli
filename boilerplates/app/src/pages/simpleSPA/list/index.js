import React, {Component} from 'react';
import './index.scss';
import {getUrlParams} from '../../../unit/getUrl';
import hoc from './wrapSample';
import baseModel from "../../../model/baseModel";


@hoc
class Index extends Component {
  constructor(props) {
    super(props);
    const t = this;
    t.baseModel = baseModel;
    t.state = {
      post: "list"
    }
  }

  componentDidMount() {
    this.getData();
    console.log('getUrlParams',getUrlParams);
  }

  getData() {
    const postData = {};
    const t = this;
    postData.name = "hah";
    postData.id = "22";

    this.baseModel.baseGetTest(postData).then((dataMap) => {
      console.log(1, dataMap)
    });
    this.baseModel.basePostTest(postData).then((dataMap) => {
      console.log(1, dataMap)
      t.setState({
        post:dataMap.message
      })
    });
  }


  render() {
    return (
      <div className="index">
        index
        <div className="list">list</div>
        <div className="list">{this.state.post}</div>

      </div>

    );
  }
}

export default Index;
