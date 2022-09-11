const $ = document.querySelector.bind(document);
const colors = ['red','purple','blue','yellow','green','orange','red','black','white', 'grey'];
const button = $('button');
const changeColors = function(e){
    const htmlElement = document.documentElement;
    const index = Math.floor(Math.random() * 10);
    htmlElement.style.backgroundColor = colors[index];
};
button.onclick = changeColors;