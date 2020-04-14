var row = 0,
    x = 1,
    y = 1,
    snakeBody,
    countApples,
    kostil = false,
    score = 0,
    speed = 300,
    direction = 'left';

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
var scoreDivNumber = document.createElement( "div" );
scoreDivNumber.classList.add( "scoreNumber" );
scoreDivNumber.innerHTML = '<b><i><big>' + score + '</big></i></b>';
scoreDiv.append( scoreDivNumber );



function fadeIn() {
    scoreDivNumber.classList.remove( "animation" );
}

function changeText() {
    scoreDivNumber.innerHTML = '<b><i><big>' + score + '</big></i></b>';
    scoreDivNumber.classList.add( "animation" );
    setTimeout( fadeIn, 800 );
}


for ( let i = 0; i < 400; i++ ) {
    if ( x > 20 ) { y++; x = 1; }
    field.innerHTML += '<div class="square" X="' + x + '" Y="' + y + '"></div>';
    x++;
}


field = document.querySelectorAll( ".square" );
/*
for ( let i = 0; i < 400; i++ ) {
    if ( i % 20 === 0 ) { row++; }

    if ( row % 2 === 0 ) {
        if ( i % 2 === 0 ) {
            field[i].classList.add( "black" );
        }
    } else {
        if ( i % 2 !== 0 ) {
            field[i].classList.add( "black" );
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
function createObject( name ) {
    for ( let i = 0; i <= getRandom( 1, 10 ); i++ ) {
        field[getRandom( 0, 400 )].classList.add( name );
    }
   
    let apples = document.querySelectorAll( ".apple" );
    countApples = apples.length;
    AppleDiv.innerHTML = 'x ' + countApples;
    console.log( "Spawned: " + apples.length + "apples")
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

var interval = setInterval( move, speed );

function startGame() {
   
}

function move() {
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

    //  console.log( "x=" + x + "  y=" + y );
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
        switch ( e.code )
        {
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