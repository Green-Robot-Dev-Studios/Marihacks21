// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCEPIvq4lObp7WB6GNLbVeQXLMnBZgGaR8",
    authDomain: "kahoot-ripoff.firebaseapp.com",
    projectId: "kahoot-ripoff",
    storageBucket: "kahoot-ripoff.appspot.com",
    messagingSenderId: "90875492805",
    appId: "1:90875492805:web:efe478afded423251c33ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

// ***************************
// AUTH
// ***************************

ui.start('#firebaseui-auth-container', {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            console.log(authResult);
            return true;
        }
    },
    signInSuccessUrl: './teacher.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
});
