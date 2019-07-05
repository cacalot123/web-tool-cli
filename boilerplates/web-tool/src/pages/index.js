import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from '@component/scrollToTop';
import {Layout1} from '@component/layout';
import CourseRouters from './course/router';
import {detailReducer} from '../store';
import 'babel-polyfill';
import 'react-perf-tool/lib/styles.css';
import pageageJson from '../../package';
// import ReactPerfTool from 'react-perf-tool';
// import Perf from 'react-addons-perf';


const store = createStore(detailReducer);
console.log('store', store);

// 计算权限
const Xoute = ({path, component}) => (
  <Route
    exact
    path={path}
    // component={$auth.page[path] !== false ? component : Page403}
    component={component}
  />
);

class Main extends Component {
  render() {
    const baseName = pageageJson.name;
    console.log('baseName', baseName);
    return (
      <Provider store={store}>
        <BrowserRouter
          basename={`/${baseName}`}
        >
          <ScrollToTop>
            <div className="container">
              <Route path="/" component={Layout1}/>
              <Switch>
                {CourseRouters.map((route, i) => {
                  const key = `course${i}`;
                  return (
                    <Xoute key={key} path={route.path} component={route.component}/>);
                })}
              </Switch>
            </div>
          </ScrollToTop>
        </BrowserRouter>
        {/*<ReactPerfTool perf={Perf} />*/}
      </Provider>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));
// registerServiceWorker();
