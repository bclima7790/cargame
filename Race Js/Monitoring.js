/* função que monitorará o status da corrida e fará a exposição no painel do jogo */

var Statusfunction = ""

function carsPosition(cars,currentPlayerCar){

    var pilotsPositions = [];
    var playerCurrentPosition = currentPlayerCar.position;
    var playerRank = 1;

    console.log("Posição do player na pista"+currentPlayerCar.position)
    for(i=0;i<cars.length;i++){
        if(currentPlayerCar.position < cars[i].position){
            playerRank = playerRank + 1;
        }
    }

    return playerRank;


}

function statusPanel(player,cars){

    carsAhead = 0;

    statusFunction = setInterval(function(){


        if(player.endOfTrack == false){       
            document.getElementById('race-status').innerText = "Status: "+race.status;
            document.getElementById('race-percentage').innerText = "Distância percorrida: "+((player.position/player.finalPosition)*100).toFixed(2)+" %";
            document.getElementById('player-speed').innerText = "Velocidade: "+player.speed*80+" km/h"
            document.getElementById('player-position').innerText = "Posição Atual: "+ carsPosition(cars,player)     
        }
        else{
            race.status = "Fim de Prova"
            document.getElementById('race-status').innerText = "Status: "+race.status;
            document.getElementById('race-percentage').innerText = "100%";
            document.getElementById('player-speed').innerText = "Velocidade: "+"0"+" km/h"

            for(i=0;i<cars.length;i++){
                if(cars[i].position == cars[i].finalPosition){
                    carsAhead = carsAhead + 1;
                }
            }
            document.getElementById('player-position').innerText = "Posição Final: "+ carsAhead;
            clearInterval(statusFunction);          
        }
    },200);

}

