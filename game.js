var level=0;
var userClickedPattern=[]
var start=false
var gamePattern=[]
// console.log("salfda")
function nextSequence(){
    level++;
    $('h1').text('Level '+level)
    var randomNumber=Math.floor(Math.random()*4)
    // console.log(randomNumber)
    var buttonColours=["red", "blue", "green", "yellow"]
    var randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $('#'+randomChosenColour).addClass("black")

    playSound(randomChosenColour)

    setTimeout(() => {
        $('#'+randomChosenColour).removeClass("black")
    }, 100);
    console.log("game pattern is", gamePattern)
    
}
$('.btn').on('click',clickHandler)
function clickHandler(e) {
    
    // var userChosenColor=e.target.id;
    var userChosenColor=$(this).attr('id')
    userClickedPattern.push(userChosenColor)
    // console.log(userClickedPattern)
    animatePress(userChosenColor)
    console.log('user clicked pattern is',userClickedPattern);
    checkAnswer(userClickedPattern.length-1)

}
function playSound(name){

    var aud=new Audio('sounds/'+name+'.mp3')
    aud.play();
}
function animatePress(currentColour) {
    
    $('#'+currentColour).addClass('pressed');

    setTimeout(() => {
        $('#'+currentColour).removeClass("pressed")
    }, 100);
}
$(document).keydown(()=>{
    if(!start){
        start=true;
        $('h1').text('Level '+level)
        userClickedPattern=[]
        setTimeout(() => {
            nextSequence();
            
        }, 200);
    }
    
})
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log('success!');
        if(userClickedPattern.length===gamePattern.length ){
                setTimeout(() => {
                    nextSequence()
                    userClickedPattern=[]
                }, 1000);
            }
            
        }    
    else{
        playSound("wrong")
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver();
    }
    
    
    
}
function startOver() {
    start=false;
    level=0;
    gamePattern=[]
}