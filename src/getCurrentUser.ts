import firebase from "firebase/app";

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
	console.log("Promising to return current user");
	if ( firebase.auth() === null || firebase.auth() === undefined ) {
	    console.error("But no auth?")
	}
	const unsubscribe = firebase.auth().onAuthStateChanged(user => {
	    console.log({ action: 'returning', user });
	    unsubscribe();
	    resolve(user);
	}, reject);
    })
};

export default getCurrentUser;


