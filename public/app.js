// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase,ref,set,push,child  } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIwFAp2q_SlhhB_BdBl1J8__TUZOgmCBA",
  authDomain: "quiz-app-5125e.firebaseapp.com",
  databaseURL: "https://quiz-app-5125e-default-rtdb.firebaseio.com",
  projectId: "quiz-app-5125e",
  storageBucket: "quiz-app-5125e.appspot.com",
  messagingSenderId: "725311835248",
  appId: "1:725311835248:web:3376bb8adaf272230478b5",
  measurementId: "G-5ZL4WP7GH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
var questions = [{
    'que': 'Which of the following ia  a mark up language?',
    'a': 'HTML',
    'b': 'CSS',
    'c': 'JAVASCRIPT',
    'd': "PHP",
    'correct': 'a'
},
{
    'que': 'What year was JavaScript Language?',
    'a': '1996',
    'b': '1995',
    'c': '1994',
    'd': "none of tha above  ",
    'correct': 'b'
},
{
    'que': 'What does Css Stand For?',
    'a': 'Hypertext Markup Languege',
    'b': 'Cascading Style Sheet',
    'c': 'Jason Object  Notation',
    'd': "Helicopter Terminals Motorboats Lamborginis",
    'correct': 'b'
}
]

var index = 0;
var total = questions.length
var right = 0, wrong = 0;
var quesbox = document.getElementById("quesbox")
var optionInputs = document.querySelectorAll('.options')
var loadQuestion = () => {
    if(index === total){
        return  endQuiz()
    }
    reset()
    var data = questions[index]
    quesbox.innerText = `${index+1}) ${data.que}`;
    optionInputs[0].nextElementSibling.innerText = data.a;
    optionInputs[1].nextElementSibling.innerText = data.b;
    optionInputs[2].nextElementSibling.innerText = data.c;
    optionInputs[3].nextElementSibling.innerText = data.d;

}
window.submitQuiz = function (){
    var data = questions[index]
    var ans = getAnswer()
    if(ans === data.correct){
        right++;
    }else{
        wrong++;
    }
    index++;
    loadQuestion();
    var newid = push(ref(database),`answer`).key
    var refrence = ref(database,`answer/${newid}`)
    set(refrence,ans)
    return;
}
var getAnswer = () =>{
    var answer;
    optionInputs.forEach(
        (input) =>{
            if(input.checked){
                answer= input.value;
            }
        }
    )
    return answer;
}
var reset = () =>{
    optionInputs.forEach(
        (input) =>{
           input.checked = false;
        }
    )
}
var endQuiz = () =>{
    document.getElementById("box").innerHTML = `
        <h3> Thank you for plaing the Quiz </h3>
        <h2>${right} / ${total} are correct </h2>
    `
}

loadQuestion();


