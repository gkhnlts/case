import { Router } from '@vaadin/router';

 

const outlet = document.querySelector('main');

const router = new Router(outlet);

 

router.setRoutes([

  { path: '/', component: 'employee-list' },

  { path: '/add', component: 'employee-form' },

  { path: '/edit', component: 'employee-form' }

]);

 

export { router };
