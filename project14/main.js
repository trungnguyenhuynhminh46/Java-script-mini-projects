/*
-Có các hàm startTimer, stopTimer, clockRunning
-clockRunning được gắn và gỡ cho interval trong hai hàm startTimer và stopTimer
-clockRunning lấy timeElapsed hiện tại được tính bằng 
thời gian hiện tại - thời gian bắt đầu - tổng các khoảng thời gian dừng
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const timer = $('.timer');
var isStart = false;
var timeBegan = null; //Cập nhật 1 lần duy nhất đầu tiên
var timeStopped = null; //Cập nhật sau mỗi lần dừng đồng hồ
var stoppedDuration = 0; //Cập nhật sau khi start
var startInterval = null;
timer.addEventListener('click', function(){
    isStart = !isStart;
    if(isStart){
        startTimer();
    }else{
        stopTimer();
    }
});
timer.addEventListener('dblclick', function(){
    resetTimer();
})
// 
function startTimer(){
    if(timeBegan === null){
        timeBegan = new Date();
    }
    if(timeStopped !== null){
        stoppedDuration += (new Date() - timeStopped);
    }
    startInterval = setInterval(clockRunning, 1);
}
function stopTimer(){
    timeStopped = new Date();
    clearInterval(startInterval);
}
function resetTimer(){
    clearInterval(startInterval);
    isStart = false;
    timeBegan = null;
    timeStopped = null;
    stoppedDuration = 0;
    startInterval = null;
    $('.timer').innerHTML = `
        <span class="hours">00</span>::
        <span class="minutes">00</span>::
        <span class="seconds">00</span>.
        <span class="miliseconds">0000</span>
    `;
}
function clockRunning(){
    let currentTime = new Date();
    let timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

    // Có UTC là lấy giờ theo chuẩn quốc tế
    // Không có UTC là lấy thời gian theo local
    let hours = timeElapsed.getUTCHours();
    let minutes = timeElapsed.getUTCMinutes();
    let seconds = timeElapsed.getUTCSeconds();
    let miliseconds = timeElapsed.getUTCMilliseconds();
    // Cập nhật html
    timer.querySelector('.hours').innerText = hours < 10 ? '0' + hours : hours;
    timer.querySelector('.minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    timer.querySelector('.seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    if(miliseconds < 10){
        timer.querySelector('.miliseconds').innerText = '000' + miliseconds;
    }else if(miliseconds < 100){
        timer.querySelector('.miliseconds').innerText = '00' + miliseconds;
    }else if(miliseconds < 1000){
        timer.querySelector('.miliseconds').innerText = '0' + miliseconds;
    }else{
        timer.querySelector('.miliseconds').innerText = miliseconds;
    }

}
