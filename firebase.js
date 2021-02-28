var uid = "";

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

async function listClasses(name) {
    var listOfPreparedClasses = [];
    await db.collection("classroom").doc(name).collection("classes").get().then((docs) => {
        docs.forEach((doc) => {
            listOfPreparedClasses.push(doc.id);
        });
    });
    return listOfPreparedClasses;
}

async function getClass(name, classToRead) {
    var c;
    await db.collection("classroom").doc(name).collection("classes").doc(classToRead).get().then((doc) => {
        c = doc.data();
    });
    return c;
}

// Function to get class code for a given teacher
async function getClassroomCode(name) {
    var code = "";
    await db.collection("classroom").doc(name).get().then((doc) => {
        code = doc.data()["code"];
    });
    return code;
}


// Function to return a list of answers from the student
async function getStudentAnswers(teacherName, classToRead, studentName) {
    var listOfAnswers;
    await db.collection("classroom").doc(teacherName).collection("classes").doc(classToRead).collection("student_name").doc(studentName).get().then((studentAnswers) => {
        listOfAnswers = studentAnswers.data();
    });
    return listOfAnswers["questions"];
}

// Function to get a list of students for each teacher
async function getStudents(teacherName, classToRead) {
    var students = [];
    await db.collection("classroom").doc(teacherName).collection("classes").doc(classToRead).collection("student_name").get().then((s) => {
        s.forEach((student) => {
            students.push(student.id);
        });
    });
    return students;
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

// Function that creates class code
async function createClassroom(name) {
    var code = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    //await db.collection("classroom").doc(name).collection("classes").doc(classToAdd).set(classData);
    await db.collection("classroom").doc(name).set({code: code});
}

// Function that adds student answers
async function addStudentAnswer(teacherName, classToEdit, studentName, answer) {
    var obj = await db.collection("classroom").doc(teacherName).collection("classes").doc(classToEdit).collection("student_name").doc(studentName).get().then((doc) => {return doc.data()});
    obj["questions"].push(answer);
    await db.collection("classroom").doc(teacherName).collection("classes").doc(classToEdit).collection("student_name").doc(studentName).set(obj);

}

// TEST AREA
async function test() {
    console.log(await getClassroomCode("ms_smith"));
    console.log(await getClassroom("ms_smith"));
    updateClass(uid, "feb14", {
        active: -1,
        questions: [
            {answers: ["Rowling", "Kinney", "Patterson", "Lil Ficara"], correct_answer: 0, question: "who wrote Harry Potter"},
            {answers: ["franz ferdinand", "Adolf", "Hitler", "Queen Elizabeth 2"], correct_answer: 0, question: "who's assination started the world war 1"},
            {answers: ["2", "1", "420", "520"], correct_answer: 0, question: "what is 1+1"},
            {answers: ["Richard", "Tyler", "Drake", "Blevins"], correct_answer: 0, question: "Ninja's first name"},
        ]
    });
    createClassroom(uid);
    console.log(await listClasses(uid));
    console.log(uid);
}

async function testStudent() {
    addStudentAnswer(uid, "feb14", "emma", 3);
    console.log(await getStudentAnswers(uid, "feb14", "emma"));
    console.log(await getStudents(uid, "feb14"));
}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    uid = user.uid;
    entry();
    //testStudent();
  } else {
    // User not logged in or has just logged out.
  }
});
