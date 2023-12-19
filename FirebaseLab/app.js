// Initialize Firebase
// Get the code provided from Google Firebase's
// Paste the var config = {...}; part here
// Also keep the firebase.initializeApp(...); part
// The <script> </script> portion we will put in the <head> section of our index.html

// const firebaseConfig = {
//   apiKey: "BqrapyB8rTr-8ZBWicgYzxePhTv78tuAQ7rtma2",
//   authDomain: "acit3910_lab.firebaseapp.com",
//   databaseURL: "https://acit3910_lab.firebaseio.com",
//   projectId: "acit3910_lab",
//   storageBucket: "acit3910_lab.appspot.com",
//   messagingSenderId: "218155131841",
//   appId: "1:314194932638:web:313ba5aa871ecd31f93847"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAKDZH7EYXQW4jAJO2rwgjoU8J110_jSzY",
  authDomain: "acit3910-983a2.firebaseapp.com",
  databaseURL: "https://acit3910-983a2.firebaseapp.com",
  projectId: "acit3910-983a2",
  storageBucket: "acit3910-983a2.appspot.com",
  messagingSenderId: "961688104246",
  appId: "1:961688104246:web:0da06e5c6d25dec2e39797"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const testMessage = document.querySelector('#testMessage');
const testMessage2 = document.querySelector('#testMessage2');
const mostExpensive = document.querySelector('#mostExpensive');
const userName = document.querySelector("#userName");
let username = userName.value;
const myScore = document.querySelector("#my-score");
const highestScore = document.querySelector("#top-score")

const testDBRef = db.collection('testCollection').doc('testDoc');
const dataStyleDBRef = db.collection('data').doc('style');
const usersRef = db.collection('users');

// testDBRef.onSnapshot(doc => {
//   let message = doc.data().message;
//   console.log(message);
//   testMessage.innerHTML = message;
// });

testDBRef.onSnapshot(doc => {
  let message = doc.data().messages.message1.text;
  let message2 = doc.data().messages.message2.text;
  let color = doc.data().messages.message1.color;
  let color2 = doc.data().messages.message2.color;
  testMessage.innerHTML = message;
  testMessage2.innerHTML = message2;
  testMessage.style.color = color;
  testMessage2.style.color = color2;
 });

db.collection('toyCollection').orderBy('price', "desc").limit(1)
.onSnapshot(querySnapshot => {
 mostExpensive.innerHTML = '';
 querySnapshot.forEach(doc => {
 mostExpensive.innerHTML += 'The most expensive toy is: '+doc.id+' $'+doc.data().price;
 });
});

dataStyleDBRef.onSnapshot(doc => {
  let colorD = doc.data().colorDescription;
  let colorV = doc.data().colorValue; 
  colorContent.style.backgroundColor = colorV;
  colorDescription.innerHTML = colorD;
})

usersRef.doc(username)
.onSnapshot(doc => {
  score = doc.data().score;
  myScore.innerHTML = score;
});

userName.addEventListener("input", function() {
  let username = userName.value;
  usersRef.doc(username).get()
    .then(doc => {
      if (doc.exists) {
        score = doc.data().score;
        myScore.innerHTML = score;
      } else {
        console.log("User not found");
        score = 0;
        myScore.innerHTML = score; 
      }
    }).catch(error => {
      console.error("Error getting document:", error);
    })
});

usersRef.orderBy('score', 'desc').limit(1)
.onSnapshot(querySnapshot => {
  highestScore.innerHTML = '';
  querySnapshot.forEach(doc => {
    highestScore.innerHTML += doc.data().score + " by " + doc.id;
    });
})

// Store a reference to the red and green buttons so we can easily add
//  click events to them later
const redButton = document.querySelector('.myButtonRed');
const greenButton = document.querySelector('.myButtonGreen');
const orangeButton = document.querySelector('.myButtonOrange');

// Store a reference to where we will display the color we get back
//  from the database
const colorContent = document.querySelector('#color-square');
const colorDescription = document.querySelector('#color-description');

let score = 0;

//Red Button Click Event
redButton.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Red Button Pressed.");
  //Put your code here to update the firebase database with color red.
  var JSONobj = {};
  JSONobj.colorDescription = "Red";
  JSONobj.colorValue = "#de1000";
  dataStyleDBRef.update(JSONobj);
  colorContent.style.backgroundColor = "#de1000";
  colorDescription.innerHTML = "Red";
  // Score 
  score -= 5;
  myScore.innerHTML = score;
  let username = userName.value;
  usersRef.doc(username).set({
    score : score
  });
});

//Green Button Click Event
greenButton.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Green Button Pressed.");
  //Put your code here to update the firebase database with color green.
  var JSONobj = {};
  JSONobj.colorDescription = "Green";
  JSONobj.colorValue = "#15ba10";
  dataStyleDBRef.update(JSONobj);
  colorContent.style.backgroundColor = "#15ba10";
  colorDescription.innerHTML = "Green";
  // Score 
  score += 5;
  myScore.innerHTML = score; 
  let username = userName.value;
  usersRef.doc(username).set({
    score : score
  });
});


// Orange Button Click Event 
orangeButton.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Orange Button Pressed.");
  //Put your code here to update the firebase database with color green.
  var JSONobj = {};
  JSONobj.colorDescription = "Orange";
  JSONobj.colorValue = "#de7610";
  dataStyleDBRef.update(JSONobj);
  colorContent.style.backgroundColor = "#de7610";
  colorDescription.innerHTML = "Orange";
  //Score 
  score = 0;
  myScore.innerHTML = score; 
  let username = userName.value;
  usersRef.doc(username).set({
    score : score
  });
});

const testButton = document.querySelector('.myButtonTest');

// testButton.addEventListener('click', (e) => {
//  e.preventDefault();
//  e.stopPropagation();
//  var JSONobj = {};
//  JSONobj.message = "Yes!";
//  testDBRef.update(JSONobj);
// });

testButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  var JSONobj = {};
  var messageObj = {};
  messageObj.text = "Maybe";
  messageObj.color = "#0000FF";
  JSONobj = {
  "messages.message1" : messageObj
  };
  testDBRef.update(JSONobj);
});



 