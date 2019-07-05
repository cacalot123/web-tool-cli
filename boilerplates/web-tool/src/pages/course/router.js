import {lazy} from 'react';
import wrapper from '../wrapper';

const Index = wrapper(
  lazy(() => import('./index/index'))
);
const Detail = wrapper(
  lazy(() => import('./detail'))
);


const router = [{
  path: '/course/Detail/:courseId',
  name: 'Detail',
  component: Detail
}, {
  path: '/course',
  name: 'Index',
  component: Index
}];

export default router;
