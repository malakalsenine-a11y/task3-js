let userEmail = document.querySelector("#useremail")
let userPass = document.querySelector("#userpass")
let logbtn = document.querySelector("#logbtn")
let errMess = document.querySelector("#errMess")
let succMess = document.querySelector("#succMess")
let form = document.querySelector("form")
let QuestionsNum = document.querySelector("#questionsNum")
let strTestBtn = document.querySelector("#strTestBtn")
let testScreen = document.querySelector("#testScreen")
let testSection = document.querySelector("#test")
let submitTestBtn = document.querySelector("#submitTestBtn")
let finalScore = document.querySelector("#finalScore")
let logoutBtn = document.querySelector("#logoutBtn")

let cartona = ''
let questionsArray = [];
let correctAnswers = [];

//  لو المستخدم مسجل دخول سابقاً
if(localStorage.getItem("Islogin") === "True"){
    GoToTestPage();
}

// لو فيه أسئلة محفوظة
let saved = localStorage.getItem("SavedQuestions");
if(saved){
    questionsArray = JSON.parse(saved);
    correctAnswers = questionsArray.map(q => q.num1 + q.num2);
    GoToTestPage();
    displayQuestions();
}

//  زر تسجيل الدخول
logbtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (userEmail.value !== "aa@" || userPass.value !== "1234") {
        errMess.classList.replace("d-none", "d-block")
    }
    else {
        errMess.classList.replace("d-block", "d-none")
        succMess.classList.replace("d-none", "d-block")

        localStorage.setItem("Islogin","True")
        setTimeout(GoToTestPage, 1000)
    }
})

function GoToTestPage() {
   testSection.classList.replace("d-none","d-block")
   form.classList.add("d-none")
}

//  زر Start Test
strTestBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let num = QuestionsNum.value;

    cartona = "";
    questionsArray = [];
    correctAnswers = [];

    for (let i = 1; i <= num; i++) {
        let num1 = Math.floor(Math.random() * 10)
        let num2 = Math.floor(Math.random() * 10)

        questionsArray.push({num1, num2});
        correctAnswers.push(num1 + num2); 
    }

    localStorage.setItem("SavedQuestions", JSON.stringify(questionsArray));

    displayQuestions();
});

function displayQuestions(){
    cartona = "";
    questionsArray.forEach((q, index) =>{
        cartona += `${index + 1})   
        <label>${q.num1} + ${q.num2} = </label>
        <input type="number" class='form-control my-2 userAnswer'>`
    });

    testScreen.innerHTML = cartona;
    submitTestBtn.classList.remove("d-none");
}

// Submit Test
submitTestBtn.addEventListener("click", () => {
    let userInputs = document.querySelectorAll(".userAnswer");
    let score = 0;

    for (let i = 0; i < userInputs.length; i++) {
        let userValue = Number(userInputs[i].value);
        if (userValue === correctAnswers[i]) score++;
    }

    finalScore.innerText = `Your Final Score is ${score} / ${correctAnswers.length}`;
});


logoutBtn.addEventListener("click", () => {

    // مسح بيانات تسجيل الدخول والأسئلة
    localStorage.removeItem("Islogin");
    localStorage.removeItem("SavedQuestions");

    //  مسح محتوى الأسئلة ودرجات الاختبار
    testScreen.innerHTML = "";
    QuestionsNum.value = "";
    finalScore.innerText = "";

    //  إظهار نموذج تسجيل الدخول
    testSection.classList.add("d-none");
    form.classList.remove("d-none");
});