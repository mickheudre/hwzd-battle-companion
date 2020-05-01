import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/HomePage.vue';
import BattleDeck from '../components/BattleDeck.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: HomePage,
  }, {
    path: '/battle',
    name: 'BattleDeck',
    component: BattleDeck,
  }],
});
