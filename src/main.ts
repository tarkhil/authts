import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseAppConfig from "./firebaseauth";

Vue.config.productionTip = false;

firebase.initializeApp(firebaseAppConfig);
// firebase.getCurrentUser = () => {
//     return new Promise((resolve, reject) => {
// 	const unsubscribe = firebase.auth().onAuthStateChanged(user => {
// 	    unsubscribe();
// 	    resolve(user);
// 	}, reject);
//     })
// };

const methods = {
    getCurrentUser: () => {
	console.log('Getting current user');
	return new Promise((resolve, reject) => {
	    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
		unsubscribe();
		resolve(user);
	    }, reject);
	})
    },
};


new Vue({
  router,
    store,
    methods,
    // get user() {
    // 	return (async () => await this.getCurrentUser())();
    // },
    async created() {
	console.log("Installing auth handler");
	if (!await this.getCurrentUser()) {
	    this.$router.push('/login');
	}
	this.$router.beforeEach(async (to, from, next) => {
	    console.log("Before router");
	    const requiresAuth = to.matched.some(record =>
		{
		    console.log('Record is');
		    console.log(record);
		    console.log(record.meta.requiresAuth??true);
		    return record.meta.requiresAuth??true; } );
	    if (requiresAuth && !await this.getCurrentUser()){
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

	// firebase.auth().onAuthStateChanged((user) => {
	//     if(user) {
	// 	console.log('user is now:');
	// 	console.log(user);
	// 	//this.$router.push('/')
	//     } else {
	// 	console.log('Logged out');
	// 	this.$router.push('/login')
	//     }
	// });
	// console.log(firebase.auth().currentUser);
	// console.log("Installed");
    },
    render: h => h(App)
}).$mount("#app");
