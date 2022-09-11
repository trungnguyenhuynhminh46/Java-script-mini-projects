const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const bill_amount_input = $('#bill_amount');
const number_of_guests_input = $('#number_of_guests');
const ratio_select = $('#ratio');
const alert_view = $('#alert');
function caculateTip(){
    let bill_amount = Number.parseFloat(bill_amount_input.value);
    let number_of_guests = Number.parseInt(number_of_guests_input.value);
    let ratio = Number.parseFloat(ratio_select.value)/100;
    if(bill_amount&&number_of_guests&&ratio){
        let money = (bill_amount/number_of_guests)*ratio;
        alert_view.querySelector('.num').innerText = money.toString();
        alert_view.classList.add('show');
        setTimeout(function(){
            alert_view.classList.remove('show');
        },4000);
    }
}