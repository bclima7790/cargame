/* Declarando os corredores */
var racers = [
    {name:"Schumacher", team:"Ferrari", speed:0.8, speedVariability:0.4},
    {name:"Hamilton", team:"Mercedez", speed:0.9, speedVariability:0.6},
    {name:"Senna", team:"Mclaren", speed:1, speedVariability:0.7},
    {name:"Alain Prost", team:"Willians", speed:0.9, speedVariability:0.4},
    {name:"Vettel", team:"Red Bull", speed:0.9, speedVariability:0.4},
    {name:"Fernando Alonso", team:"Renault", speed:0.85, speedVariability:0.3},
    {name:"Mika Hakkinen", team:"Mclaren", speed:1, speedVariability:0.2},
    {name:"Nelson Piquet", team:"Brabham", speed:1.05, speedVariability:0.4}]


/* Função construtora do objeto corrida */
function Race(numCars){
    this.carts = 8;
    this.status = 0;
    this.carPositions = [];
}

/* Criando o objeto da corrida */
var race = new Race;

var racersOnTrack = [];
var numActivePilots = 0;
var funcaoPosicao = 0;
var raceCars =[];

race.status = "Carros em fila"

/* Função que vai posicionar os carros selecionados na pista e criar os objetos Cars para os carros que irão correr */
function carPlacing(){
    var carsOnTrack = document.querySelectorAll('.car-button-active')
    var idsSelecteds = [];
    var racersSelected = [];


    /* Pegando os ids somente com números dos carros selecionados */
    for(i=0;i<carsOnTrack.length;i++){
        idsSelecteds[i] = carsOnTrack[i].id;
        idsSelecteds[i] = parseInt(idsSelecteds[i].replace("pilot-",""))
    }
    /* Separando os objetos somente dos pilotos selecionados */
    for(i=0;i<carsOnTrack.length;i++){
        racersSelected[i] = racers[idsSelecteds[i]];
        racersOnTrack[i] = racers[idsSelecteds[i]];
    }

    /* Criando os elementos que serão as pistas com os pilotos selecionados */
    for(i=0;i<carsOnTrack.length;i++){
        /* Referenciando a seção que contém as pistas */
        var tracksBox = document.getElementById('race-tracks')

        /* Criando a primeira div da pista */
        var newTrack = document.createElement('div')
        newTrack.className = 'track'

        /* Criando a div que representará o carro */
        var newPilotonTrack = document.createElement('div')
        var carImage = document.createElement("IMG")
        var pilotBox = document.createElement('div')
        pilotBox.className = "pilot-box"
        var pilotName = document.createTextNode(racersSelected[i].name);
        pilotBox.appendChild(pilotName);
        carImage.setAttribute("src","Race Images/Player-car.png")
        carImage.setAttribute("height","50px")

        newPilotonTrack.appendChild(pilotBox)
        newPilotonTrack.appendChild(carImage)
        newPilotonTrack.className = 'car'
        newPilotonTrack.id = 'car-' + (i+1)
  
        /* Colocando a div do carro dentro da div da pista */
        newTrack.appendChild(newPilotonTrack)

        /* Inserindo a nova pista com o novo piloto na seção das pistas */
        tracksBox.appendChild(newTrack)
    }

    /* Criando os objetos dos carros nas pistas */
    for(i=0;i<racersOnTrack.length;i++){
        raceCars[i] = new Car(racersOnTrack[i].team,racersOnTrack[i].name,(i+1),racersOnTrack[i].speed,racersOnTrack[i].speedVariability)
    }

    /* Deletando os cards dos pilotos que não irão correr na corrida vigente */
    var inactiveCards = document.querySelectorAll('.car-button-inactive')
    for(i=0;i<inactiveCards.length;i++){
        inactiveCards[i].parentElement.remove();
    }

    /*     Imprimindo a função de atualização de posicionamento nos carros na pista */
    funcaoPosicao = setInterval(function(){
        for(i=0;i<raceCars.length;i++){
            var carId = "car-"+(i+1)
            document.getElementById(carId).style.marginLeft = raceCars[i].position.toString() + "%"
    }},raceCars[0].basetime/2)

}

/* Função que identifica o elemento do piloto que será o player */
function playerPilot(){
    var player = document.getElementsByClassName('player-button')[0];
    playerId = player.id
    playerCar = playerId.replace("pilot","car");

    document.getElementById(playerCar).className = "player-car"

}

/* Função que vai mudar classes de acordo com o corredor selecionado pelo player */
function choosingPlayer(){
    var posiblePlayers = document.querySelectorAll('.car-button-active')
    for(i=0;i<posiblePlayers.length;i++){
        posiblePlayers[i].className = 'cpu-button'
    }
}

/* Função que redefine os ids dos pilotos selecionados de acordo com a ordem na Pista */

function identifyPlayer(){
    activePilotsList = document.getElementById('cars-list');
    activePilots = activePilotsList.children[0].children;
    
    i=0;

    while(activePilots[i].children[0].className != "player-button"){
        i = i + 1;
    }

    console.log(i)
    return i;
}


/* Declarando o boost Factor do carro do jogador de acordo com a dificuldade da pergunta*/

var carBoost = {"easy":2.2,"medium":1.6,"hard":1.8};

/* Programação das funções que irão rodar a partir do momento que a janela do jogo for carregada */

window.onload = function(){

    alert("Escolha os campeões mundiais que farão parte da corrida!")

    /* Encontrando os botões de escolha de pilotos */
    var pilotButton = document.querySelectorAll(".car-button-inactive")
    var placingCarsButton = document.getElementById('place-cars')
    var playerCar = "";
    var questionAnswer = 0;

    /* Deixando o painel de perguntas invisível até a escolha do player */
    document.getElementById('questions-panel').style.visibility = "hidden";  
    /* Deixando a parte de perguntas invisível até o começo do jogo */
    document.getElementById('questionandanswer').style.visibility = "hidden";  

    /* Deixando os botões de início e reinício invisíveis até a escolha do nível de pergunta */
    document.getElementById('game-buttons').style.visibility = "hidden";  
    document.getElementById('monitoring-panel').style.visibility = "hidden";  


    /* Status dos botões de pilotos */
    for(i=0;i<pilotButton.length;i++){

        pilotButton[i].addEventListener('click',function(){
            if (this.className =="car-button-inactive"){
                 this.className ="car-button-active";
            }
            else if(this.className =="car-button-active"){
                this.className ="car-button-inactive";
            }
            else if(this.className =="cpu-button" && document.querySelectorAll('.player-button').length == 0){

                /* Deixando o painel do jogo visível */
                document.getElementById('questions-panel').style.visibility = "visible";  

                /* Mudando a classe e identificando o piloto selecionado na pista */
                this.className ="player-button";
                playerNumber = identifyPlayer();

                /* Mudando a condição de falso para a propriedade isPlayer do objeto do carro do jogador */
                raceCars[playerNumber].isPlayer = true;
                playerCar = raceCars[playerNumber]

                activeTracks = document.getElementsByClassName('car')
                for(i=0;i<activeTracks.length;i++){
                    if(i==playerNumber){
                        activeTracks[i].className = "pilot-car"
                    }
                }
            }
            else if(this.className =="cpu-button" && document.querySelectorAll('.player-button').length > 0){
                alert("Somente um piloto pode ser o player!\nDesative o piloto já selecionado para escolher um novo player");
            }
            else if(this.className =="player-button"){
                this.className ="cpu-button";

                /* Tornando o painel do jogo invisível caso nenhum jogador esteja selecionado */
                document.getElementById('questions-panel').style.visibility = "hidden";  

                /* Removendo a classe de player da pista que não foi mais selecionada como player */
                activeTracks = document.getElementsByClassName('track')
                for(i=0;i<activeTracks.length;i++){

                        activeTracks[i].children[0].className = "car"

                }
            }
       
        })
    }

    /* Programando o botão de posicionar os carros */
    placingCarsButton.addEventListener('click',function(){
        carPlacing()
        placingCarsButton.parentElement.remove();
        choosingPlayer()
        alert("Os carros irão para a largada!\nEscolha um jogador e depois selecione o nível de dificuldade inicial!")
    }) 

   /* Declarando que o jogo começa pausado */
   pauseStatus = true;

   /* Programando o botão de pausar e reiniciar o jogo */
   var pauseButton = document.getElementById('pause-button')

   pauseButton.addEventListener('click',function(){
        var numCarsOnTrack = document.querySelectorAll('.car').length;
       if(pauseStatus == true){
           for(i=0;i<=numCarsOnTrack;i++){
             raceCars[i].andar();
           }
           race.status = ""
           console.log(raceCars)
           pauseButton.innerText = "Pausar Jogo";
           pauseStatus = false;
           race.status = "Corrida em andamento"

           /* Deixando as perguntas visíveis */
           document.getElementById('questionandanswer').style.visibility = "visible"; 

           questionAnswer = gameQuestion(); /* Geração de nova pergunta e guradando a reposta na variável questionAnswer*/
       }
       else{
            for(i=0;i<=numCarsOnTrack;i++){
                raceCars[i].stop();
             }
           pauseButton.innerText = "Voltar ao Jogo";
           pauseStatus = true;
           /* Nada de pergunta se pausar o jogo */
           document.getElementById('questionandanswer').style.visibility = "hidden"; 
           race.status = "Corrida pausada"
       }
   })

   /* Programando o botão de reinício de jogo com os mesmos pilotos */
   var newGameButton = document.getElementById('new-game-button')
   
   newGameButton.addEventListener('click',function(){ 

    /* Nada de pergunta se reiniciar o jogo */
    document.getElementById('questionandanswer').style.visibility = "hidden"; 

    race.status = "Carros em fila"

    var numCarsOnTrack = document.querySelectorAll('.car').length;
        for(i=0;i<=numCarsOnTrack;i++){
            raceCars[i].stop();
            raceCars[i].backTo0();
        }
       pauseButton.innerText = "Iniciar Jogo";
       pauseStatus = true;
   })

   /* Programação dos botões de opção de nível de dificuldade das perguntas e armazenamento da dificuldade selecionada*/
   var questionLevel = ""
   var levelButton = document.querySelectorAll('.question-button-inactive')
   var numLevelButton = levelButton.length;

   for(i=0;i<numLevelButton;i++){
       levelButton[i].addEventListener('click',function(){

             /* Deixa o monitoramento e os botões de início e pausa visíveis */
           document.getElementById('game-buttons').style.visibility = "visible";  
           document.getElementById('monitoring-panel').style.visibility = "visible";  

           /* Iniciando o painel de monitoramento da corrida */
           statusPanel(playerCar,raceCars);

           if (document.querySelectorAll('.question-button-active').length == 0){
               this.className = "question-button-active";
               questionLevel = this.id
           }
           else{
               for(i=0;i<document.querySelectorAll('.question-button-active').length;i++){
                   document.querySelectorAll('.question-button-active')[i].className = "question-button-inactive";
               }        
               this.className = "question-button-active";
               questionLevel = this.id

               /* Gerar uma nova pergunta na troca de level */
               questionAnswer = gameQuestion();

           }
  
       })
   }

   /* Programando o botão de responder as perguntas, o qual responderá se a resposta está correta */

   var answerButton = document.getElementById('answer-button')
   answerButton.addEventListener('click',function(){

        var level = questionLevel.replace("-button","")
        var userAnswer = document.getElementById('answer').value;
        var currentBoost = carBoost[level];

        /* Aplicação do Boost no carro do player, caso a resposta esteja correta */
        if(questionAnswer==userAnswer){
            playerCar.boost(currentBoost,2000);
            questionAnswer = gameQuestion();
        }
        /* Processo que ocorrerá caso a resposta esteja errada */
        else{
            alert ('Ops: Resposta errada\nPule ou tente responder corretamente')
        }
   })

   /* Programando o botão de pular pergunta */
   var jumpButton = document.getElementById('jump-button')

   jumpButton.addEventListener('click', function(){
    questionAnswer = gameQuestion();
   })

}




