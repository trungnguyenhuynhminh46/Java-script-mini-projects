const $ = document.querySelector.bind(document);
function sendMsg(){
    const text = $('#input').value;
    const output = $('#output');
    output.innerText = text;
}