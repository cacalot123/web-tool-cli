import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {setStorageApp} from '@component/setStorageApp';
import authCourse from '@model/authCourse';
import {setTitle} from '@util';
import style from './style.scss';

// const DetailBottomButton = lazy(() => import('./detailBottomButton'));
// const DetailTitle = lazy(() => import('./detailTitle'));
// const DetailUseCode = lazy(() => import('./detailUseCode'));
// const DetailContent = lazy(() => import('./detailContent'));

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
class CourseDetailPage extends PureComponent {
  static type = 1;

  constructor(props) {
    super(props);
    const t = this;
    setTitle('课程详情');
    setStorageApp();


    t.state = {
      title: ''
    };
  }

  componentDidMount() {
    authCourse.getDetail().then((res) => {
      console.log(res);
      this.setState({
        title: res.title
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const t = this;
    t.state.courseId = nextProps.match.params.courseId;
    t.setState(t.state);
    const postData = {};
    postData.courseId = nextProps.match.params.courseId;
    postData.uid = localStorage.getItem('uid');
    // postData.accessToken = urlParams.sign;
    postData.ffrom = localStorage.getItem('ffrom');
  }

  componentDidUpdate() {

  }

  goNext = () => {
    const {props} = this;
    props.history.push({
      pathname: '/course',
      state: {vcode: 'vcode'}
    });
  };

  render() {
    const {count} = this.props;
    const {title} = this.state;
    console.log('style.text', style);
    return (
      <div className="course_detail">
        <span
          className={style.text}
          onMouseUp={() => this.goNext()}
        >
          toIndex
        </span>
        <div>
          {count}
        </div>
        <div>
          {title}
        </div>
      </div>
    );
  }
}

export default CourseDetailPage;
