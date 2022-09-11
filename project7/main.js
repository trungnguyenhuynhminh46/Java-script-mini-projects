// conic.style để copy style màu background
const $ = document.querySelector.bind(document);
const clock = $('.digital-clock');
const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
function handleTime(){
    let today = new Date();
    let dayInWeek = daysInWeek[today.getDay()].toUpperCase();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let ampm = (hours >= 12 ? 'pm' : 'am').toUpperCase();
    hours = hours % 12;
    // Render to HTML
    clock.querySelector('.digital-clock__day').innerText = dayInWeek;
    clock.querySelector('.digital-clock__hour').innerText = hours;
    clock.querySelector('.digital-clock__minute').innerText = minutes;
    clock.querySelector('.digital-clock__ampm').innerText = ampm;
}