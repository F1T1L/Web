var row = 0,
    x = 1,
    y = 1,
    snakeBody,
    countApples,
    kostil = false,
    score = 0,
    speed = 300,
    interval,
    direction = 'left';
var options = document.createElement( "div" );
options.classList.add( "options" );
var field = document.createElement( "div" );
field.classList.add( "field" );
document.body.prepend( field );
var scoreDiv = document.createElement( "div" );
var scoreShell = document.createElement( "div" );
var AppleDiv = document.createElement( "div" );
scoreDiv.classList.add( "score" );
AppleDiv.classList.add( "AppleDiv" );
document.body.prepend( scoreShell );
scoreDiv.innerHTML = 'Score ';
scoreShell.classList.add( "scoreShell" );
scoreShell.append( scoreDiv );
scoreShell.append( AppleDiv );
field.after( options );
var scoreDivNumber = document.createElement( "div" );
scoreDivNumber.classList.add( "scoreNumber" );
scoreDivNumber.innerHTML = '<b><i><big>' + score + '</big></i></b>';
scoreDiv.append( scoreDivNumber );
var optionsWnd = document.createElement( "div" );
var stylePink = document.createElement( "div" );
stylePink.classList.add( "stylePink" );
var styleGrey = document.createElement( "div" );
styleGrey.classList.add( "styleGrey" );
var styleBlue = document.createElement( "div" );
styleBlue.classList.add( "styleBlue" );
var currentStyleGrey = true;

stylePink.onclick = function () {
    currentStyleGrey = false;
    field.style.backgroundColor = "#fde5e6";
    field.style.borderColor = "#e3d2d3";
    scoreDiv.style.backgroundColor = "#ceafb0";
    scoreDiv.style.borderColor = "#e3d2d3";
    document.body.style.backgroundColor = "#fde5e6";
    stylePink.classList.add( "choosenStyle" );
    styleGrey.classList.remove( "choosenStyle" );
    styleBlue.classList.remove( "choosenStyle" );
}
styleGrey.onclick = function () {
    currentStyleGrey = true;
    field.style.backgroundColor = "#e7eef8";
    field.style.borderColor = "#e9eded";
    scoreDiv.style.backgroundColor = "#9bcbc7";
    scoreDiv.style.borderColor = "#e9eded";
    document.body.style.backgroundColor = "white";
    styleGrey.classList.add( "choosenStyle" );
    stylePink.classList.remove( "choosenStyle" );
    styleBlue.classList.remove( "choosenStyle" );
}
styleBlue.onclick = function () {
    currentStyleGrey = false;
    field.style.backgroundColor = "#c2dde6";
    field.style.borderColor = "#87bed0";
    scoreDiv.style.backgroundColor = "#09868b";
    scoreDiv.style.borderColor = "#87bed0";
    document.body.style.backgroundColor = "#76c1d4";
    styleBlue.classList.add( "choosenStyle" );
    stylePink.classList.remove( "choosenStyle" );
    styleGrey.classList.remove( "choosenStyle" );
}
optionsWnd.classList.add( "optionsWnd" );
optionsWnd.innerHTML = "<ul>" +
    "<li>Speed of snake:<br>" +
    '<form onsubmit="return setSpeed()" oninput="speed= level.value = flevel.valueAsNumber"  >' +
    '<input name = "flevel" id = "flying" type = "range" min = "50" max = "400" value = "300" step = "10" onchange="setSpeed()" > ' +
    '<output for= "flying" name = "level">300</output>' +
    '</form >' + "</li><hr>" +
    //   "<li>Amount of appeles to spawn:</li>" +
    // "<li>skin of snake:</li>" +
    "<li>Change color theme:<br>" +
    "</li > " +
    "</ul >";

var toggle = true;
// window.close(); закрыть ВКЛАДКУ =выйти из игры.
options.onclick = function () {
    // console.log( "Options button CLICKED" );
    window.close();
    options.before( optionsWnd );
    if ( currentStyleGrey ) {
        styleGrey.onclick();
    } else {
        currentStyleGrey = false;
        styleGrey.classList.remove( "choosenStyle" );
    }
    // optionsWnd.toggle = display ? hide or show;
    if ( toggle ) {
        toggle = false;
        optionsWnd.style.visibility = "visible";
        var elem_li = document.getElementsByTagName( "li" )[1];
        elem_li.appendChild( styleGrey );
        elem_li.appendChild( stylePink );
        elem_li.appendChild( styleBlue );

    } else {
        toggle = true;
        optionsWnd.style.visibility = "hidden";
        //  optionsWnd.classList.remove( "optionsWnd" );  удалить грубо.
        //  optionsWnd.innerHTML = '';
    }
}

function setSpeed() {
    console.log( "setSpeed(): " + speed );
    document.getElementsByTagName( "input" )[0].valueAsNumber = speed;
    document.getElementsByTagName( "output" )[0].value = speed;
    return false;
}

function fadeIn() {
    scoreDivNumber.classList.remove( "animation" );
}

function changeText() {
    scoreDivNumber.innerHTML = '<b><i><big>' + score + '</big></i></b>';
    scoreDivNumber.classList.add( "animation" );
    setTimeout( fadeIn, 800 );
}

for ( let i = 0; i < 400; i++ ) {
    if ( x > 20 ) {
        y++;
        x = 1;
    }
    field.innerHTML += '<div class="square" X="' + x + '" Y="' + y + '"></div>';
    x++;
}

var squares = document.querySelectorAll( ".square" );

/*
for ( let i = 0; i < 400; i++ ) {
if ( i % 20 === 0 ) { row++; }

if ( row % 2 === 0 ) {
if ( i % 2 === 0 ) {
squares[i].classList.add( "black" );
}
} else {
if ( i % 2 !== 0 ) {
squares[i].classList.add( "black" );
}
}
}
 */

/*
function random() {
return Math.floor( Math.random() * 400 ); //0-400
}
 */
function getRandom( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min; //Максимум и минимум включаются
}
function createObject( name, min = 1, max = 10 ) {
    for ( let i = 0; i <= getRandom( min, max ); i++ ) {
        let temp = getRandom( 0, 400 );
        squares[temp].classList.add( name );
        if ( countApples === 0 ) {
            for ( let item of snakeBody ) {
                if ( item.classList.contains( 'apple' ) ) { //проверка на наличие класса
                    console.log( "APPLE IN SNAKE!!! DELETING THIS APPLE!" );
                    squares[temp].classList.remove( name );
                }
            }
        }
    }

    let apples = document.querySelectorAll( ".apple" );
    countApples = apples.length;
    AppleDiv.innerHTML = 'x ' + countApples;
    console.log( "Spawned: " + apples.length + " apples" );
    console.log( "Min: " + min + " Max: " + max );

}

function createSnake() {
    x = getRandom( 1, 15 );
    y = getRandom( 1, 20 );
    snakeBody = [
        document.querySelector( ' [x = "' + Number( x ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 1 ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 2 ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 3 ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 4 ) + '"][y = "' + Number( y ) + '"] ' )];
    for ( let i = 0; i < snakeBody.length; i++ ) {
        snakeBody[i].classList.add( "snakeBody" );
    }
    snakeBody[0].classList.add( "snakeHead" );
    console.log( "createSnake: x=" + x + " y=" + y );

    for ( let item of snakeBody ) {
        if ( item.classList.contains( 'apple' ) ) { //проверка на наличие класса
            console.log( "ReCreating of Snake" );
            for ( let i = 0; i < snakeBody.length; i++ ) {
                snakeBody[i].classList.remove( "snakeBody" );
            }
            snakeBody[0].classList.remove( "snakeHead" );
            createSnake();
        }
    }
}
function gameOver() {

    Swal.fire( {
        imageUrl: 'img/snakeImg.png',
        imageHeight: 150,
        title: 'GOOD GAME!',
        width: 600,
        text: 'Your score: ' + score,
        padding: '3em',
        background: '#fff',
        backdrop: `
             rgba(0,0,123,0.4)
             url("img/nyan-cat.gif")
             left top
             repeat
             `
    } )

}

createObject( "apple" );
createSnake();
startGame();

function startGame() {
    move();
}

function move() {
    clearInterval( interval );
    interval = setInterval( move, speed );
    snakeBody[0].classList.remove( "snakeHead" );
    snakeBody[snakeBody.length - 1].classList.remove( "snakeBody" );
    snakeBody.pop();
    //console.log( "snakeBody.length= " + snakeBody.length );
    if ( direction == 'left' ) {
        if ( x > 1 ) {
            x -= 1;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );

        } else {
            x = 20;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );
        }
    }
    if ( direction == 'right' ) {
        if ( x < 20 ) {
            x += 1;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );

        } else {
            x = 1;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );
        }
    }
    if ( direction == 'up' ) {
        if ( y > 1 ) {
            y -= 1;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );

        } else {
            y = 20;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );
        }
    }
    if ( direction == 'down' ) {
        if ( y < 20 ) {
            y += 1;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );

        } else {
            y = 1;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );
        }
    }

    let apples = document.querySelectorAll( ".apple" );
    for ( let apple of apples ) {
        if ( apple.getAttribute( 'x' ) == snakeBody[0].getAttribute( 'x' ) &&
            apple.getAttribute( 'y' ) == snakeBody[0].getAttribute( 'y' ) ) {
            console.log( "Eat!" );
            score += 1;
            changeText();
            if ( speed >= 100 ) {
                speed -= 10;
                clearInterval( interval );
                interval = setInterval( move, speed );
            } else if ( speed >= 50 && speed < 100 ) {
                speed -= 5;
                clearInterval( interval );
                interval = setInterval( move, speed );
            }

            console.log( "speed: " + speed );
            setSpeed();
            // console.log( "score=" + score );
            apple.classList.remove( "apple" );
            countApples -= 1;
            AppleDiv.innerHTML = 'x ' + countApples;
            // console.log( "countApples= " + countApples );

            if ( countApples <= 0 ) {
                createObject( "apple" );
                console.log( "Respawn!" );
            }

            let tempX = snakeBody[snakeBody.length - 1].getAttribute( 'x' );
            let tempY = snakeBody[snakeBody.length - 1].getAttribute( 'y' );
            snakeBody.push( document.querySelector( '[x="' + tempX + '"][y="' + tempY + '"]' ) );
        }
    }

    if ( snakeBody[0].classList.contains( 'snakeBody' ) ) {
        console.log( "GAME OVER!!!" );
        clearInterval( interval );
        gameOver();
    }

    snakeBody[0].classList.add( "snakeHead" );
    for ( let i = 0; i < snakeBody.length; i++ ) {
        snakeBody[i].classList.add( "snakeBody" );

    }
    kostil = true;
}

window.addEventListener( 'keydown', function ( e ) {

    if ( kostil == true ) {

        if ( e.keyCode === 37 && direction !== 'right' ) {
            //   console.log( "left" );
            direction = 'left';
            kostil = false;
        } else if ( e.keyCode === 38 && direction !== 'down' ) {
            direction = 'up';
            // console.log( "up" );
            kostil = false;
        } else if ( e.keyCode === 39 && direction !== 'left' ) {
            direction = 'right';
            //console.log( "right" );
            kostil = false;
        } else if ( e.keyCode === 40 && direction !== 'up' ) {
            direction = 'down';
            //console.log( "down" );
            kostil = false;
        }
    }

    /*
    switch ( e.code ) //можно сделать по номеру клавиши чтоб двигать через WASD + стрелки.{
    case 'ArrowDown':
    console.log( "left" );
    break;
    case ( 38  ):

    break;
    case ( 39 && ( direction !== 'left' ) ):

    break;
    case ( 40 && ( direction !== 'up' ) ):

    break;
    }
     */
} );
