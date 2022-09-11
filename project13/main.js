const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var notes = localStorage.getItem('notes')?JSON.parse(localStorage.getItem('notes')):[];
const colors = ['#f6e58d', '#ffbe76', '#e056fd', '#22a6b3', '#535c68', '#badc58'];
const rotates = ['rotate(-5deg)', 'rotate(-2deg)', 'rotate(0deg)', 'rotate(2deg)', 'rotate(5deg)'];
const margins = ['-5px', '-2px', '0', '2px', '5px', '10px'];
const create_btn = $('.create-btn');
const create_form = $('.add-note');
const note_list = $('.note-list');
create_form.querySelector('.add-note__input').addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        addNote();
    }
});
// Các hàm trả về giá trị ngẫu nhiên
function randColor(){
    let randIndex = Math.floor(Math.random() * colors.length);
    return colors[randIndex];
}
function randRotate(){
    let randIndex = Math.floor(Math.random() * rotates.length);
    return rotates[randIndex];
}
function randMargin(){
    let randIndex = Math.floor(Math.random() * margins.length);
    return margins[randIndex];
}
function showCreateForm(){
    if(create_form.classList.contains('hide')){
        create_form.classList.remove('hide');
        $('body').classList.add('blur');
    }
}
function hideCreateForm(){
    if(!create_form.classList.contains('hide')){
        create_form.classList.add('hide');
        $('body').classList.remove('blur');
    }
}
function noteHTMLMaker(note, index){
    let noteContent = note['content'];
    let item = document.createElement('div');
    item.classList.add('note-list__item');
    item.style.marginLeft = randMargin();
    item.style.transform = randRotate();
    item.style.backgroundColor = randColor();
    item.innerText=noteContent;
    note_list.appendChild(item);
    // Xử lý event double click
    item.addEventListener("dblclick", function(e){
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        window.location.reload();
    });
}
function addNote(){
    let noteContent = create_form.querySelector('.add-note__input').value;
    if(noteContent){
        note = {
            content: noteContent
        };
        // Lưu giá trị
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        // Tạo cấu trúc html
        noteHTMLMaker(note, notes.length - 1);
    }
}

const app = {
    renderHTML: function(){
        notes.forEach(noteHTMLMaker);
    },
    start: function(){
        this.renderHTML();
    }
}
app.start();