import List from "./list";
import About from "./about";
// import Mobile from './mobile';


const router = [{
  path: '/about',
  name: 'about',
  component: About
}, {
  path: '/',
  name: '',
  component: List
}];

export default router;
