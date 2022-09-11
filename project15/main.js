
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var audio = $('#wrong_audio');
var result = null;
var nav_items = $$('.nav__item');
var optionsElements = $$('.answer__item');
var num1Element = $('.question .num1');
var num2Element = $('.question .num2');
var operationElement = $('.question .operation');
let operation = '+';
// Lấy parameter trên url 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var operation_url = urlParams.get('operation');
if(operation_url === 'plus'){
    operation = '+';
}
if(operation_url === 'minus'){
    operation = '-';
}
if(operation_url === 'multiply'){
    operation = '*';
}
if(operation_url === 'divide'){
    operation = '/';
}
/////////////////////////
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function randNum(max){
    // Return interger from 1 to max
    return Number.parseInt(Math.floor(Math.random()*(max+1))+1);
}
function randFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return Number.parseFloat(str);
}
///////////////////////////
function renderHTML(){
    makeQuestion();
    if(operation === '+'){
        nav_items[0].classList.add('active');
    }
    if(operation === '-'){
        nav_items[1].classList.add('active');
    }
    if(operation === '*'){
        nav_items[2].classList.add('active');
    }
    if(operation === '/'){
        nav_items[3].classList.add('active');
    }
}
function handleEvent(){
    // When click on options
    let option1 = optionsElements[0];
    let option2 = optionsElements[1];
    let option3 = optionsElements[2];
    option1.addEventListener('click', function(e){
        if(option1.innerText == result.toString()){
            makeQuestion();
        }else{
            audio.play();
        }
    });
    option2.addEventListener('click', function(e){
        if(option2.innerText == result.toString()){
            makeQuestion();
        }else{
            audio.play();
        }
    });
    option3.addEventListener('click', function(e){
        if(option3.innerText == result.toString()){
            makeQuestion();
        }else{
            audio.play();
        }
    });
}
function makeQuestion(){
    let num1 = randNum(10).toString();
    let num2 = randNum(10);
    let expression = num1 + operation +num2;
    if(operation != '/'){
        result = Number.parseInt(eval(expression));
    }else{
        result = eval(expression).toFixed(2);
    }
    let dummyResult1;
    let dummyResult2;
    if(operation != '/'){
        do{
            dummyResult1 = randNum(100);
        }while(dummyResult1 == result);
        do{
            dummyResult2 = randNum(100);
        }while((dummyResult2 == result) || (dummyResult2 == dummyResult1)); 
    }else{
        do{
            dummyResult1 = randFloat(1, 100, 2);
        }while(dummyResult1 == result);
        do{
            dummyResult2 = randFloat(1, 100, 2);
        }while((dummyResult2 == result) || (dummyResult2 == dummyResult1)); 
    }
    let arrResults = [result, dummyResult1, dummyResult2];
    arrResults = shuffle(arrResults);
    // Render HTML
    num1Element.innerText = num1;
    num2Element.innerText = num2;
    operationElement.innerText = operation;
    optionsElements.forEach(
        (option, index) => {
            option.innerText = arrResults[index]; 
        }
    );
}
renderHTML();
handleEvent();