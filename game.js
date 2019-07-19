buttonColours=["red","blue","green","yellow"]; 
userPattern=[];
gamePattern=[];
level=0;
highscore=0;

function playSound(name) {
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function nextSequence() {
    level++;
    $("h1").text("Level "+level);
    var num=Math.random();
    num*=4;
    num=Math.floor(num);
    $("#"+buttonColours[num]).fadeOut(100).fadeIn(100);
    playSound(buttonColours[num]);
    gamePattern.push(buttonColours[num]);
}

function animatePress(name) {
    $("#"+name).toggleClass("pressed");
    setTimeout(function() {
        $("#"+name).toggleClass("pressed");
    },100);
}

function checkPattern() {
    for (var i=0;i<userPattern.length;i++) {
        if (userPattern[i]!==gamePattern[i]) return false;
    }
    return true;
}

$(".btn").click(function() {
    var clicked=this.id;
    userPattern.push(clicked);
    animatePress(clicked);
    console.log(level);
    console.log(userPattern);
    console.log(gamePattern);
    if (checkPattern()==true) {
        playSound(clicked);
    } else {
        playSound("wrong");
        $("body").toggleClass("game-over");
        setTimeout(function() {
            $("body").toggleClass("game-over");
        },200);
        $("h1").text("Game Over. Press A to Restart");
    }
    if (userPattern.length==gamePattern.length&&checkPattern()==true) {
        highscore=Math.max(level,highscore);
        $("h2").text("Highscore = "+highscore);
        setTimeout(nextSequence,1000);
        userPattern=[];
    }
});

$(document).keypress(function(event) {
    if (event.key=='a') {
        $("h1").text("Level 0");
        level=0;
        userPattern=[];
        gamePattern=[];
        nextSequence();
    } 
});