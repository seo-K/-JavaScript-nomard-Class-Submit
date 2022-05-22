// 1. Login Popup & Show UserName
const LoginModal = document.querySelector("#login_modal");
const LoginInput = LoginModal.querySelector("input");
const LoginBtn = LoginModal.querySelector("button");

const UserArea = document.querySelector(".user_area");
const User = UserArea.querySelector(".user_id");

const USERNAME_KEY = "username";
const saveUsername = localStorage.getItem(USERNAME_KEY);

// console.log(localStorage.username);

// 모달 show 조건
if (saveUsername === null) {
    LoginModal.showModal();
    LoginBtn.addEventListener("click", LoginSubmitEvent);
} else {
    paintGreeting(saveUsername);
}

function LoginSubmitEvent(e) {
    const userName = LoginInput.value;

    e.preventDefault();
    localStorage.setItem(USERNAME_KEY, userName);
    LoginModal.close();
    paintGreeting(userName);
}

function paintGreeting(userName) {
    User.innerText = `${userName} 님`;
    UserArea.classList.remove("hidden");
}

// 2. Clock
const DateText = document.querySelector(".date");
const ClockText = document.querySelector(".clock");

function getClock() {
    const date = new Date();
    const TodayYear = date.getFullYear();
    const TodayMonth = date.getMonth();
    const TodayDay = date.getDate();
    const TodayWeek = date.getDay();
    const TodayHours = String(date.getHours()).padStart(2, "0");
    const TodayMinute = String(date.getMinutes()).padStart(2, "0");
    const TodaySecond = String(date.getSeconds()).padStart(2, "0");
    const Weekly = ["일", "월", "화", "수", "목", "금", "토", "일"];

    DateText.innerText = `${TodayYear}년 ${TodayMonth}월 ${TodayDay}일 ( ${Weekly[TodayWeek]}요일 )`;
    ClockText.innerText = `${TodayHours} : ${TodayMinute} : ${TodaySecond}`;
}
getClock();

setInterval(getClock, 1000);

// 3. Quote
const quotes = [
    {
        quotes: "任何国家的基础都是青年的教育。",
        author: "어느 국가든 그 기초는 젊은이들의 교육이다. (디오게네스 라에르티오스）",
    },
    {
        quotes: "我并不期望能赢.但是我要尽力而为。",
        author: "이길 것을 기대하지는 않는다. 하지만 최선을 다할 것이다.",
    },
    {
        quotes: "心之所愿，无所不成。",
        author: "의지 앞에 불가능이란 없다",
    },
    {
        quotes: "言必信，行必果。",
        author: "말에는 신용이 있어야 하고, 행동에는 결과가 있어야 한다.",
    },
    {
        quotes: "过去的痛苦就是快乐。 ",
        author: "지나간 고통은 즐거움이다.",
    },
    {
        quotes: "勿以恶小而为之，勿以善小而不为。",
        author: "작은 악이라도 행하지 말고, 작은 선이라도 행하라.",
    },
    {
        quotes: "天上不会掉下馅饼",
        author: "세상에는 공짜는 없다",
    },
    {
        quotes: "信言不美,美言不信。 ",
        author: "믿음이 가는 말은 투박하고, 화려한 말은 믿음이 가지 않는다.",
    },
    {
        quotes: "绝不能放弃，世界上没有失败，只有放弃。",
        author: "절대 포기하지 마라. 세상에는 실패는 없고 포기만이 있을 뿐이다. ",
    },
    {
        quotes: "不相信别人的人是不可信的",
        author: "아무도 신뢰하지 않는 자는 누구의 신뢰도 받지 못한다. ",
    },
    {
        quotes: "不忘初心，方得始终",
        author: "초심을 잊지 말아야 마침내 성공할수가 있다. ",
    },
];

const quoteArea1 = document.querySelector(".quote p:first-child");
const quoteArea2 = document.querySelector(".quote p:last-child");

function randomQuote() {
    const randomText = quotes[Math.floor(Math.random() * quotes.length)];

    quoteArea1.innerText = randomText.quotes;
    quoteArea2.innerText = randomText.author;
}

randomQuote();
setInterval(randomQuote, 5000);

// 4. background Img
const imageList = ["img01.jpg", "img02.jpg", "img03.jpg"];

function randomBackground() {
    document.body.style.backgroundImage = `url('img/${imageList[Math.floor(Math.random() * imageList.length)]}')`;
}

randomBackground();
setInterval(randomBackground, 5000);

// 6. TodoList
const todoSection = document.querySelector("#todo");
const TodoForm = todoSection.querySelector("#todo-form");
const todoInput = TodoForm.querySelector("input");
const todoBtn = TodoForm.querySelector("button");
const todoList = todoSection.querySelector(".todo-list");
const TODOS_KEY = "todos";

let todos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function submitTodo(e) {
    e.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";

    const newTodoObj = {
        id: Date.now(),
        text: newTodo,
    };

    console.log("Dfdf");

    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

function paintTodo(newTodo) {
    const li = document.createElement("li");
    // id 추가
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    button.innerText = "X";

    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);

    todoList.appendChild(li);
}

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
    const paresedTodos = JSON.parse(savedTodos);

    todos = paresedTodos;

    paresedTodos.forEach(paintTodo);
}

function deleteTodo(e) {
    const li = e.target.parentElement;
    li.remove();
    todos = todos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveTodos();
}

TodoForm.addEventListener("submit", submitTodo);
