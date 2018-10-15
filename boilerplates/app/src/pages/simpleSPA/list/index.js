import React, {Component} from 'react';
import './index.scss';
import {getUrlParams} from '../../../unit/getUrl';
import hoc from './wrapSample';
import sampleApi from "../../../model/sample";


@hoc
class Index extends Component {
  constructor(props) {
    super(props);
    const t = this;
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
    sampleApi.simpleGet(postData).then((dataMap) => {
      console.log(1, dataMap)
      t.setState({
        post:dataMap.msg
      })
    });
  }


  render() {
    return (
      <div className="index">
        index
        <div className="list"><a href="#">list</a></div>
        <div className="list">{this.state.post}</div>

      </div>

    );
  }
}

export default Index;
