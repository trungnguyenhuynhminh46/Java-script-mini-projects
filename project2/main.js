function changeColor(){
    var hex_numbers = ["0", "1", "2", "3", "4", "5", "6","8", "9", "A", "B", "C", "D", "E", "F"];
    var hex_code = '#';
    for(var i=0;i<6;i++){
        var index = Math.floor(Math.random() * hex_numbers.length);
        hex_code += hex_numbers[index];
    }
    document.querySelector('body').style.backgroundColor = hex_code;
    document.querySelector('#hex-code').innerText = hex_code;
}