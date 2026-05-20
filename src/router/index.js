import { index_template } from '../views/index.js';
import { users_template } from '../views/users.js';
import { user_profile_template } from '../views/user-profile.js';
import { catalog_template } from '../views/catalog.js';
import { estimates_template } from '../views/estimates.js';
import { operations_template } from '../views/operations.js';

const routes = {
  '/': index_template,
  '/users': users_template,
  '/user-profile': user_profile_template,
  '/catalog': catalog_template,
  '/estimates': estimates_template,
  '/operations': operations_template,
};

export const router = {
  init() {
    window.addEventListener('popstate', this.handleRoute.bind(this));
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigateTo(e.target.href);
      }
    });
    this.handleRoute();
  },

  navigateTo(url) {
    window.history.pushState(null, null, url);
    this.handleRoute();
  },

  handleRoute() {
    const path = window.location.pathname;
    const template = routes[path] || routes['/'];
    document.getElementById('app').innerHTML = template;
    this.initView(path);
  },

  initView(path) {
    const event = new CustomEvent('routeChanged', { detail: { path } });
    document.dispatchEvent(event);
  },
};
