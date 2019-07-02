import React, {PureComponent} from 'react';
import style from './style.scss';

/***
 * class类名
 * @class DetailTitle
 * @param data 数据
 * ***/
class DetailIndex extends PureComponent {
  constructor(props) {
    super(props);
    const t = this;
    t.state = {
      baseClass: 'course-index'
    };
  }

  componentWillMount() {
    const n = 100;
    // 2x+ 3y + 5z = 100

    this.getArray(n, 2);
    this.getArray(n, 3);
    this.getArray(n, 5);
  }

  getArray(n, num) {
    const arr = [];
    let index = 0;
    for (let i = 0; i < n; i += 1) {
      if (n % num === 0) {
        arr[index += 1] = num;
      }
    }
  }

  goDetail=()=>{
    const t= this;
    t.props.history.push('/course/detail/1');
  }


  renderComponent() {
    const t = this;
    console.log('style111', style.text);
    const {baseClass} = t.state;
    return (
      <section className={baseClass} onClick={t.goDetail}>
        <span className={style.text}> 1111</span>
      </section>
    );
  }

  render() {
    const t = this;
    return t.renderComponent();
  }
}

export default DetailIndex;
