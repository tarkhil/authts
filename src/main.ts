import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseAppConfig from "./firebaseauth";

Vue.config.productionTip = false;

firebase.initializeApp(firebaseAppConfig);

import getCurrentUser from "./getCurrentUser";

const methods = {
    getCurrentUser
};


const app = new Vue({
  router,
    store,
    methods,
    created() {
	console.log("Fixing router");
	this.$router.beforeEach(async (to, from, next) => {
	    console.log("Before router");
	    const requiresAuth = to.matched.some(record =>
		{
		    console.log('Record is');
		    console.log(record);
		    console.log(`Auth required: ${record.meta.requiresAuth??true}`);
		    return record.meta.requiresAuth??true; } );
	    if (requiresAuth && (async () => !await getCurrentUser())()){
		console.log('Auth required, but no current user');
		this.$store.commit('userName', null);
		next('Login');
	    }else{
		console.log('Auth ok, looking for current user');
		console.log(firebase.auth().currentUser);
		if ( firebase.auth().currentUser !== null ) {
		    this.$store.commit('userName', firebase.auth().currentUser!.displayName);
		} else {
		    this.$store.commit('userName', null);
		}
		next();
	    }
	});
    },
    render: h => h(App)
});

// router.beforeEach(async (to, from, next) => {
//     console.log("Before router");
//     const requiresAuth = to.matched.some(record =>
// 	{
// 	    console.log('Record is');
// 	    console.log(record);
// 	    console.log(record.meta.requiresAuth??true);
// 	    return record.meta.requiresAuth??true; } );
//     if (requiresAuth && (async () => !await app.getCurrentUser())()){
// 	console.log('Auth required, but no current user');
// 	app.$store.commit('userName', null);
// 	next('Login');
//     }else{
// 	console.log('Auth ok, looking for current user');
// 	console.log(firebase.auth().currentUser);
// 	if ( firebase.auth().currentUser !== null ) {
// 	    app.$store.commit('userName', firebase.auth().currentUser!.displayName);
// 	} else {
// 	    app.$store.commit('userName', null);
// 	}
// 	next();
//     }
// });

app.$mount("#app");
