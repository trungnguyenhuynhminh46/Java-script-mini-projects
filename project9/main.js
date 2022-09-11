const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input = $('.grocery-list__input').querySelector('input');
const clearBtn = $('.grocery-list__input').querySelector('i');
const content = $('.grocery-list__content');
input.addEventListener('keyup', function(e){
    if(e.keyCode == '13'){
        let inputText = input.value.trim();
        if(inputText){
            addListItem(inputText);
            input.value = '';
        }
    }
})
clearBtn.addEventListener('click', function(e){
    content.innerHTML = '';
})
function addListItem(text){
    let item = document.createElement('li');
    item.classList.add('grocery-list__item');
    item.innerText = text;
    content.appendChild(item);
}