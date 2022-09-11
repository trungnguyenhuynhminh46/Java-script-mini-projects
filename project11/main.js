const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var items = localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')):[]; 
var create_box = $('.create-box');
var question_input = $('#question');
var answer_input = $('#answer');
var flashcards = $('#flashcards');
function showCreateBox(){
    create_box.classList.add('show');
}
function hideCreateBox(){
    create_box.classList.remove('show');
}
function delFlashCards(){
    localStorage.clear();
    items = [];
    flashcards.innerHTML = '';
}
function divMarker(item, index){
    let flashcard = document.createElement('div');
    flashcard.classList.add('flashcard');
    let htmlContent = `
        <div class="flashcard__header">
            <button class="flashcard__button-hide">
                <i class="fa-solid fa-minus"></i>
            </button>
        </div>
        <div class="flashcard__question">${item['question']}</div>
        <div class="flashcard__answer">${item['answer']}</div>
    `;
    flashcard.innerHTML = htmlContent;
    let question = flashcard.querySelector('.flashcard__question');
    let answer = flashcard.querySelector('.flashcard__answer');
    let hidenButton = flashcard.querySelector('.flashcard__button-hide');
    question.addEventListener('click', function(){
        answer.classList.add('show');
    });
    answer.addEventListener('click', function(){
        answer.classList.remove('show');
    })
    hidenButton.addEventListener('click', function(){
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        window.location.reload();
    })
    flashcards.appendChild(flashcard);
}
function addFlashCard(){
    let question = question_input.value;
    let answer = answer_input.value;
    if(question&&answer){
        // Lưu trên giao diện
        let item = {
            question: question,
            answer: answer
        }
        divMarker(item, items.length-1);
        // Lưu trên localStorage;
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }
}
const app = {
    renderHTML: function(){
        items.forEach(divMarker);
    },
    start: function(){
        this.renderHTML();
    }
}
app.start();