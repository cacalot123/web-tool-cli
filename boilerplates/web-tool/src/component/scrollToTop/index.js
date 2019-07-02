import {Component} from 'react';
import {withRouter} from 'react-router-dom';

/***
 * 设置回到页面顶部
 * @class ScrollToTop
 *
 * ***/

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const {props} = this;
    if (props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {props} = this;
    return props.children;
  }
}

export default withRouter(ScrollToTop);
