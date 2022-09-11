const $ = document.querySelector.bind(document);
    const caculator = $('#caculator');
    const output = caculator.querySelector('.caculator__output');
    var notValid = false;
    var expression = '';
    function press(key){
        if(!notValid){
            expression += key;
            output.innerText = expression;
        }else{
            expression = '';
            expression += key;
            output.innerText = expression;
            notValid = false;
        }
    }
    function equal(){
        try{
            expression = eval(expression);
            if(typeof expression !== 'undefined'){
                output.innerText = expression;
                expression = '';
                notValid = false;
            }else{
                notValid = true;
                output.innerText = "Not valid input!";
            }
        }catch(err){
            notValid = true;
            output.innerText = "Not valid input!";
        }
    }
    function erase(){
        expression = '';
        output.innerText = '';
    }