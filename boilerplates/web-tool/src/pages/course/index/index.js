import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, NavBar, Icon} from 'antd-mobile';
import {keyValueToJson} from '@util';
import style from './style.scss';

/***
 * class类名
 * @class DetailTitle
 * @param data 数据
 * ***/
@connect((state) => {
  const {count, commonVar} = state;
  return {
    count,
    commonVar
  };
}, (dispatch) => {
  const type = 'INCREASE';
  return {
    onIncreaseClick: () => dispatch({
      type,
      number: 20
    })
  };
})
class DetailIndex extends PureComponent {
  constructor(props) {
    super(props);
    const t = this;
    t.state = {
      baseClass: 'course-index'
    };
    t.testArray = {
      aaa: 1,
      bbb: 2
    };
    t.tabs = [
      {title: '1 Tab', key: 't1'},
      {title: '2 Tab', key: 't2'},
      {title: '3 Tab', key: 't3'}
    ];
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(keyValueToJson(this.testArray));
  }

  goDetail = () => {
    const t = this;
    t.props.history.push('/course/detail/1');
  }


  static renderTab() {
    const aaa = 1;
    console.log(aaa);
    return (
      <NavBar
        mode="dark"
        leftContent="Back"
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />
        ]}
      >
        NavBar
      </NavBar>
    );
  }

  renderComponent() {
    const t = this;
    // console.log('style111', style.text);
    // console.log('t.tabs', t.renderTab);


    const {baseClass} = t.state;
    const {onIncreaseClick, count} = t.props;
    return (
      <section className={baseClass}>
        <span className={style.text}> 1111</span>
        <Button type="primary" onMouseUp={t.goDetail}>111</Button>
        <Button type="warning" onMouseUp={() => onIncreaseClick()}>warning</Button>
        {count}
        {DetailIndex.renderTab()}
      </section>
    );
  }

  render() {
    const t = this;
    return t.renderComponent();
  }
}

export default DetailIndex;
