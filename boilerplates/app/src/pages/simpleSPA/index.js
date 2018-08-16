import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Layout1} from '../../component/layout';

import routers from './router';

class Main extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div className="container">
            <Route path="/" component={Layout1}/>

            <Switch>
              {routers.map((route, i) => {
                return (<Route key={i} path={route.path} component={route.component}/>);
              })}

              {/*<Route key='12' path='/' component={Index}/>*/}

              {/*<Route key='12' path='/about' component={About}/>*/}
            </Switch>
          </div>
        </HashRouter>
      </div>);

  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));
// registerServiceWorker();
