const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var jobs = localStorage.getItem('jobs')?JSON.parse(localStorage.getItem('jobs')):[];
var content_input = $('#search');
var submit = $('.btn-submit');
content_input.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        submit.click();
    }
})
let to_do_list = $('.todo-list');
function jobHTMLMaker(job, index){
    let jobContent = job['content'];
    let item = document.createElement('div');
    item.classList.add('todo-list__item');
    let htmlContent = `
        <div class="todo-list__title">${jobContent}</div>
        <div class="todo-list__control">
            <a href="" class="done ${job['isDone']?'active':''}">
                <i class="fa-solid fa-square-check"></i>
            </a>
            <a href="" class="del">
                <i class="fa-solid fa-trash"></i>
            </a>
        </div>
    `;
    item.innerHTML = htmlContent;
    to_do_list.appendChild(item);
    // Xử lý button
    let checkBtn = item.querySelector('.done');
    let deleteBtn = item.querySelector('.del');
    checkBtn.addEventListener('click', function(e){
        e.preventDefault();
        jobs[index]['isDone'] = !jobs[index]['isDone'];
        localStorage.setItem('jobs', JSON.stringify(jobs));
        if(jobs[index]['isDone']){
            checkBtn.classList.add('active');
        }else{
            checkBtn.classList.remove('active');
        }
    });
    deleteBtn.addEventListener('click', function(e){
        e.preventDefault();
        jobs.splice(index, 1);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        window.location.reload();
    })
}
function addJob(){
    let jobContent = content_input.value;
    if(jobContent.trim()){
        let job = {
            content: jobContent,
            isDone: false
        };
        jobs.push(job);
        jobHTMLMaker(job, jobs.length - 1);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        content_input.value = '';
    }
}
const app = {
    renderHTML: function(){
        jobs.forEach(jobHTMLMaker);
    },
    start: function(){
        this.renderHTML();
    }
}
app.start();