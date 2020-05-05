import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
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
    beforeEnter: (to, from, next) => {
      if (to.name === 'BattleDeck' && !store.state.gameOngoing) {
        next('/');
      }
      next();
    },
    component: BattleDeck,
  }],
});
