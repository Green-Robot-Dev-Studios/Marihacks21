
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

var db = firebase.firestore();

var uid = "";
async function getUidState() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        uid = user.uid;
      } else {
        // User not logged in or has just logged out.
      }
    });
}


// Function that gets user id
async function getUid() {
    await getUidState();
    return uid;
}

// ***************************
// READ
// ***************************

// Function to return a list of prepared classes for a given teacher
async function getClassroom(name) {
    var listOfPreparedClasses = [];
    await db.collection("classroom").doc(name).collection("classes").get().then((docs) => {
        docs.forEach((doc) => {
            listOfPreparedClasses.push(doc.data());
        });
    });
    return listOfPreparedClasses;
}

// Function to get class code for a given teacher
async function getClassroomCode(name) {
    var code = "";
    await db.collection("classroom").doc(name).get().then((doc) => {
        code = doc.data()["code"];
    });
    return code;
}

// ***************************
// UPDATE
// ***************************

// Function to edit the data for a given day of class for a given teacher
async function updateClass(name, classToEdit, classData) {
    await db.collection("classroom").doc(name).collection("classes").doc(classToEdit).set(classData);
}

// ***************************
// CREATE
// ***************************

async function addClass(name, classToAdd, classData) {
    var code = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    await db.collection("classroom").doc(name).collection("classes").doc(classToAdd).set(classData);
    await db.collection("classroom").doc(name).set({code: code});
}

// TEST AREA
async function test() {
    console.log(await getClassroomCode("ms_smith"));
    console.log(await getClassroom("ms_smith"));
    updateClass("ms_smith", "feb14", {
        active: -1,
        questions: [
            {answers: ["Rowling", "Kinney", "Patterson", "Lil Ficara"], correct_answer: 0, question: "who wrote Harry Potter"},
            {answers: ["franz ferdinand", "Adolf", "Hitler", "Queen Elizabeth 2"], correct_answer: 0, question: "who's assination started the world war 1"},
            {answers: ["2", "1", "420", "520"], correct_answer: 0, question: "what is 1+1"},
            {answers: ["Richard", "Tyler", "Drake", "Blevins"], correct_answer: 0, question: "Ninja's first name"},
        ]
    });
    addClass(await getUid(), "jan27", {
        active: -1,
        questions: [
            {answers: ["Rowling", "Kinney", "Patterson", "Lil Ficara"], correct_answer: 0, question: "who wrote Harry Potter"},
            {answers: ["franz ferdinand", "Adolf", "Hitler", "Queen Elizabeth 2"], correct_answer: 0, question: "who's assination started the world war 1"},
            {answers: ["2", "1", "420", "520"], correct_answer: 0, question: "what is 1+1"},
            {answers: ["Richard", "Tyler", "Drake", "Blevins"], correct_answer: 0, question: "Ninja's first name"},
        ]
    });
    console.log(await getUid());
}

test();
