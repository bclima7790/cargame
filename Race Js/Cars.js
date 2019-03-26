
/* Construindo o objeto Car, que conterá as propriedades dos carros da corrida */
function Car(name,pilot,track,speed,speedVariability){
    this.name = name
    this.pilot = pilot
    this.track = track
    this.speed = speed /* Velocidade em termos de porcentagem de pista/período de tempo */
    this.speedFunction = 0; /* Será o id da SetInterval que determinará o posicionamento dos carros */
    this.isPlayer = false; /* Propriedade que retona verdadeiro se é o jogador do player 1 */
    this.position = 0; /* Posição do carro na pista */
    this.finalPosition = 96 /* Posição final da pista */
    this.baseTime = 500; /* Intervalo entre os movimentos dos carros */
    this.speedVariability = speedVariability /* speedVariability Oscilação da velocidada, pode variar entre 0 e 1 */
    this.endOfTrack = false;
}

/* Função da posição do carro */
Car.prototype.andar = function(){
    let self = this;
    self.speedFunction = setInterval(function(){
        var variability = Math.random()*self.speedVariability
        if(self.position + self.speed <= self.finalPosition){
        self.position = self.position + self.speed - variability 
        }
        else{
            self.position = self.finalPosition;
            self.endOfTrack = true;
            clearInterval(self.speedFunction);
            console.log(self.endOfTrack)
        }
    },self.baseTime);
}

/* Função que para o carro na pista */
Car.prototype.stop = function(){
    clearInterval(this.speedFunction)
    this.isStopped = true;
}

/* Função que volta o carros para o início da pista */
Car.prototype.backTo0 = function(){
    this.position = 0;
}

/* Função que irá fazer a velocidade do carro aumentar quando a resposta do jogador for correta*/ 
Car.prototype.boost = function(boostFactor,boostDuration){

    var originalSpeed = this.speed;

    this.speed = boostFactor*this.speed
    console.log("velocidade de Boost: "+this.speed);

    self = this;

    setTimeout(function(){
        self.speed = originalSpeed
        console.log("velocidade original é "+self.speed)
    },boostDuration)
}

