import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "../views/Profile.vue";
import Feed from "../views/Feed.vue";
import Request from "../views/Request.vue";
import Approve from "../views/Approve.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: "/feed",
    name: "feed",
    component: Feed,
    beforeEnter: authGuard,
  },
  {
    path: "/request",
    name: "request",
    component: Request,
    beforeEnter: authGuard,
  },{
    path: "/approve",
    name: "approve",
    component: Approve,
    beforeEnter: authGuard,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
