import React, {lazy, PureComponent, Suspense} from 'react';
import {setTitle} from '@util';
import {setStorageApp} from '@component/setStorageApp';
import {connect} from 'react-redux';
import style from './style.scss';

// const DetailBottomButton = lazy(() => import('./detailBottomButton'));
// const DetailTitle = lazy(() => import('./detailTitle'));
// const DetailUseCode = lazy(() => import('./detailUseCode'));
// const DetailContent = lazy(() => import('./detailContent'));


class CourseDetailPage extends PureComponent {

  static type = 1;

  constructor(props) {
    super(props);
    const t = this;
    setTitle('课程详情');
    setStorageApp();


    t.state = {
      params: t.props.match.params,
      courseId: t.props.match.params.courseId,
      CourseDetail: {
        'applyEndTime': '2018-12-12T07:38:22.644Z',
        'applyFee': 0,
        'applyHeads': [],
        'applyStartTime': '2018-12-12T07:38:22.644Z',
        'childCourse': [
          {
            'applyFee': 0,
            'id': 0,
            'isInvite': 0,
            'isPromotion': 0,
            'joinNum': 0,
            'originalApplyFee': 0,
            'pic': '',
            'promotionApplyFee': 111,
            'readNums': 0,
            'title': ''
          }
        ],
        'commentNum': 0,
        'content': '',
        'courseStartTime': '2018-12-12T07:38:22.645Z',
        'courseType': '',
        'demoOption': '',
        'desc': '',
        'fitGroup': '',
        'hostInfo': {
          'doctorHead': '',
          'doctorId': 0,
          'doctorName': '',
          'doctorUid': 0,
          'fansNum': 0,
          'goodAt': '',
          'thsNum': 0,
          'zixunOrderNum': 0
        },
        'hostUid': 0,
        'id': 0,
        'isBuy': false,
        'isCoupon': false,
        'isFav': false,
        'isInvite': 0,
        'isPromotion': 0,
        'joinNum': 0,
        'joinWay': '',
        'originalApplyFee': 0,
        'parentId': 0,
        'pic': 'string',
        'promotionApplyFee': 210,
        'promotionCountDown': 0,
        'readNums': 0,
        'shareData': {
          'cover': '',
          'desc': '',
          'shareUrl': '',
          'title': ''
        },
        'subCourseNum': 0,
        'tags': '',
        'title': ''
      }
    };
  }

  componentDidMount() {

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
    authCourseApi.getDetail(postData)
      .then((res) => {
        this.setState({
          CourseDetail: res
        }, function () {
          setTimeout(function () {
          }, 3000);
        });

      });
  }

  componentDidUpdate() {

  }

  goNext = () => {
    this.props.history.push({
      pathname: '/course',
      state: {'vcode': 'vcode'}
    });
  };

  render() {
    const {CourseDetail, courseId} = this.state;
    console.log('style.text', style);
    return (
      <div className="course_detail">
        <div className={style.text} onClick={this.goNext}>find1<br/><br/><br/><br/><br/><br/><br/>
        </div>
      </div>
    );
  }
}

export default CourseDetailPage;
