import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import firebase from "firebase/app";
import getCurrentUser from "../getCurrentUser";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    { path: "/",
      redirect: async ( to ) => {
	  console.log("Redirecting");
	  const user = await (async () => await getCurrentUser())();
	  console.log(`returned user ${user}`);
	  if ( user !== null
	     ) {
	      console.log("Looks like user is here");
	      console.log(firebase.auth().currentUser);
	      return '/home';
	  } else {
	      console.log("Looks like we need to log in");
	      console.log(to);
	      return '/login';
	  }
      },
      beforeEnter: (to, from, next) => {
	  console.log("* Before router");
	  const requiresAuth = to.matched.some(record =>
	      {
		  console.log('* Record is');
		  console.log(record);
		  console.log(`* Auth required: ${record.meta.requiresAuth??true}`);
		  return record.meta.requiresAuth??true; } );
	  if (requiresAuth && (async () => !await getCurrentUser())()){
	      console.log('* Auth required, but no current user');
	      //this.$store.commit('userName', null);
	      next('Login');
	  }else{
	      console.log('* Auth ok, looking for current user');
	      console.log(firebase.auth().currentUser);
	      if ( firebase.auth().currentUser !== null ) {
		  console.log("* set username");
		  //this.$store.commit('userName', firebase.auth().currentUser!.displayName);
	      } else {
		  console.log("* drop username");
		  //this.$store.commit('userName', null);
	      }
	      next();
	  }
      }
    },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
	  requiresAuth: false
      }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
    routes,
    //mode: "history",
});

export default router;
