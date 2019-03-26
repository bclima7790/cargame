/* Função que criará um número aleatório de n casas */

function randomNumber(numbers){
    var newNumber = 0;
    for(i=0;i<numbers;i++){
        newNumber = newNumber + Math.floor(Math.random()*11)*Math.pow(10,i)
    }
    return newNumber
}

/* Função que criará operações com números, os quais terão suas quantidades de casas informadas */
/* Vamos criar um número n de amostras para cada operação na função */

function operation(num1,num2,type){
  
    var factor1Array = []
    var factor2Array = []
    var resultArray = []

        switch(type){
            case "soma":
                var factor1 = randomNumber(num1)
                var factor2 = randomNumber(num2)
                var result = factor1 + factor2
                factor1Array.push(factor1)
                factor2Array.push(factor2)
                resultArray.push(result)
            break;

            case "subtracao":
                var factor1 = randomNumber(num1)
                var factor2 = randomNumber(num2)
                var result = factor1 - factor2
                factor1Array.push(factor1)
                factor2Array.push(factor2)
                resultArray.push(result)
            break;

            case "multiplicacao":
                var factor1 = randomNumber(num1)
                var factor2 = randomNumber(num2)
                var result = factor1 * factor2
                factor1Array.push(factor1)
                factor2Array.push(factor2)
                resultArray.push(result)

            break;
        
    }
    return [factor1Array,factor2Array,resultArray,type]
}

/* Função que identifica o nível pedido para a questão */

function gameQuestion(){

    var levelChoiceButton = document.getElementsByClassName('question-button-active')
    level = levelChoiceButton[0].id.replace("-button","")

    easyArray = [[2,1,"soma"],[2,2,"soma"],[1,1,"multiplicacao"],[2,1,"subtracao"],[2,2,"subtracao"]]
    mediumArray = [[3,2,"soma"],[3,3,"soma"],[2,1,"multiplicacao"],[3,2,"subtracao"],[3,3,"subtracao"]]
    hardArray = [[4,3,"soma"],[4,4,"soma"],[2,2,"multiplicacao"],[4,3,"subtracao"],[4,4,"subtracao"]]

    var operationSymbols = {"soma" :" + " , "multiplicacao" :" x " , "subtracao" : " - "}    
    var currentOperationSymbol = "";

    switch(level){
        case "easy":
            var randomOperation = Math.floor(Math.random()*easyArray.length)
            currentOperation = operation(easyArray[randomOperation][0],easyArray[randomOperation][1],easyArray[randomOperation][2])
            element1 = currentOperation[0][0]
            element2 = currentOperation[1][0]
            resultElement = currentOperation[2][0]
            currentOperationSymbol = easyArray[randomOperation][2]
            console.log(currentOperationSymbol)      
        break;

        case "medium":
            var randomOperation = Math.floor(Math.random()*mediumArray.length)
            currentOperation = operation(mediumArray[randomOperation][0],mediumArray[randomOperation][1],mediumArray[randomOperation][2])
            element1 = currentOperation[0][0]
            element2 = currentOperation[1][0]
            resultElement = currentOperation[2][0]
            currentOperationSymbol = mediumArray[randomOperation][2]
            console.log(currentOperationSymbol)
        break;

        case "hard":
            var randomOperation = Math.floor(Math.random()*hardArray.length)
            currentOperation = operation(hardArray[randomOperation][0],hardArray[randomOperation][1],hardArray[randomOperation][2])
            element1 = currentOperation[0][0]
            element2 = currentOperation[1][0]
            resultElement = currentOperation[2][0]
            currentOperationSymbol = hardArray[randomOperation][2]
            console.log(currentOperationSymbol) 
        break;
            
            
    }

    /* Posicionando a pergunta na janela do jogo */
    document.getElementById('factor1').innerText = element1;
    document.getElementById('factor2').innerText = element2;
    document.getElementById('question-type').innerText = operationSymbols[currentOperationSymbol]

    console.log(level);
    return resultElement;

}


