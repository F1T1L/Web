startNewGame();  // ^_^ pop-up window at start.
var row = 0,                      //глобальные переменные. в т.ч. тупые типа х,y, так делать не надо :)
    x = 1,
    y = 1,
    snakeBody,
    countApples,
    kostil = false,
    score = 0,
    speed = 300,
    interval,
    direction = 'left';
var options = document.createElement( "div" );      //создаем элементы интерфейса.
options.classList.add( "options" );                         //добавляет стиль
var field = document.createElement( "div" );
field.classList.add( "field" );
document.body.prepend( field );                           //добавляем "поле" в наш документ
var scoreDiv = document.createElement( "div" );
var scoreShell = document.createElement( "div" );
var AppleDiv = document.createElement( "div" );
scoreDiv.classList.add( "score" );
AppleDiv.classList.add( "AppleDiv" );
document.body.prepend( scoreShell );                     //создаем "табло" со счетом
scoreDiv.innerHTML = 'Score ';
scoreShell.classList.add( "scoreShell" );
scoreShell.append( scoreDiv );
scoreShell.append( AppleDiv );
field.after( options );                                        
var scoreDivNumber = document.createElement( "div" );
scoreDivNumber.classList.add( "scoreNumber" );
scoreDivNumber.innerHTML = '<b><i><big>' + score + '</big></i></b>';
// создали HTML разметку для переменной score(подсчет очков)
scoreDiv.append( scoreDivNumber );
var optionsWnd = document.createElement( "div" );
// создание окна настройки,а так же трех квадратов разных цветов для смены темы(стиля)
var stylePink = document.createElement( "div" );
stylePink.classList.add( "stylePink" );
var styleGrey = document.createElement( "div" );
styleGrey.classList.add( "styleGrey" );
var styleBlue = document.createElement( "div" );
styleBlue.classList.add( "styleBlue" );
var currentStyleGrey = true;

stylePink.onclick = function () {
    // добавляем на кнопку со стилем функцию для изменения стиля всей страницы
    currentStyleGrey = false;
    // она изменяет фон "поля", его border, а так же аналогично другие элементы.
    field.style.backgroundColor = "#fde5e6";
    field.style.borderColor = "#e3d2d3";
    scoreDiv.style.backgroundColor = "#ceafb0";
    scoreDiv.style.borderColor = "#e3d2d3";
    document.body.style.backgroundColor = "#fde5e6";
    stylePink.classList.add( "choosenStyle" );
    //добавляет кнопке класс, указывающий на выбранную тему.
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
//Было лень создавать кучу переменных для списка + форм, по этому просто было впихнуто как HTML.
optionsWnd.innerHTML = "<ul>" +     
    "<li>Speed of snake:<br>" +        
    '<form onsubmit="return setSpeed()" oninput="speed= level.value = flevel.valueAsNumber"  >' +      
    '<input name = "flevel" id = "flying" type = "range" min = "50" max = "400" value = "300" step = "10" onchange="setSpeed()" > ' +   
    '<output for= "flying" name = "level">300</output>' +   
    '</form >' + "</li><hr>" +
    // "<li>Amount of appeles to spawn:</li>"
    // "<li>skin of snake:</li>" +                                     
    "<li>Change color theme:<br>" +
    "</li > " +
    "</ul >";
//Пояснение: oninput - задает полю output и переменной speed значение, поле выводит это значение (value).
//При изменении значения ползунком - вызывается функция, меняющая значения полей, по сути делает одно и тоже, просто 
// она нужна для изменения значений потом при изменении скорости.(шоб ползунок тоже меня положение, когда изменялась скорость) 
optionsWnd.style.visibility = "hidden";
//созданное окно сразу скрываем
options.before( optionsWnd );
// оно не видимо, но есть и мы может работать с переменными.


var toggle = true;       //переключатель видимости окна настроек

options.onclick = function () {
    // console.log( "Options button CLICKED" );         
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
        var elem_li = document.getElementsByTagName( "li" )[1];  //в список добавляем кнопки "стилей"
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

function setSpeed() {          //задаем текущее значение скорости для ползунка в настройках 
    console.log( "setSpeed(): " + speed );
    document.getElementsByTagName( "input" )[0].valueAsNumber = speed;
    document.getElementsByTagName( "output" )[0].value = speed;
    return false;
}

function fadeIn() {
    scoreDivNumber.classList.remove( "animation" );
}

function changeText() {     //анимация цифры счета, меняет значение + увеличивается в размере.
    scoreDivNumber.innerHTML = '<b><i><big>' + score + '</big></i></b>';
    scoreDivNumber.classList.add( "animation" );
    setTimeout( fadeIn, 800 );
}

for ( let i = 0; i < 400; i++ ) {
    //создаем внутри "поля" 400 квадратов 20х20 с атрибутами х,у и классом.
    if ( x > 20 ) {
        //счетчик строк, если положили 20 кубиков - добавляем строку(y++)
        y++;
        x = 1;
    }
    field.innerHTML += '<div class="square" X="' + x + '" Y="' + y + '"></div>';
    x++;
}

var squares = document.querySelectorAll( ".square" );  //создали коллекцию из всех наших кубиков

/*                                     // красим в шахматную доску наше "поле", для обучения.
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
function random() {            // легасикод)
return Math.floor( Math.random() * 400 ); //0-400
}
 */
function getRandom( min, max ) {      //создание случайного целочисленного числа от min до max.
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min; //Максимум и минимум включаются
}
function createObject( name, min = 1, max = 10 ) {         //создание объекта на "поле"
    for ( let i = 0; i <= getRandom( min, max ); i++ ) {
        let temp = getRandom( 0, 400 );
        squares[temp].classList.add( name );
        if ( countApples === 0 ) {                      //проверка: Есть ли в данной ячейке уже змея?
            for ( let item of snakeBody ) {
                if ( item.classList.contains( 'apple' ) ) { //если яблоко появилось на теле змеи - удаляется объект.
                    console.log( "APPLE IN SNAKE!!! DELETING THIS APPLE!" );
                    squares[temp].classList.remove( name );    
                }
            }
        }
    }

    let apples = document.querySelectorAll( ".apple" );  //Создаем коллекцию из яблок.
    countApples = apples.length;                         //просто чтоб посчитать сколько их было создано случайным образом.
    AppleDiv.innerHTML = 'x ' + countApples;
    console.log( "Spawned: " + apples.length + " apples" );
    console.log( "Min: " + min + " Max: " + max );

}

function createSnake() {        //создание тела змеи
    x = getRandom( 1, 15 );     //начальная позиция змеи, резерв -5 клеток справа, чтоб тело поместилось полностью на "поле"
    y = getRandom( 1, 20 );
    snakeBody = [
        //размещаем змею на "поле", просто от координаты X головы и в право +1 шаг для тела х4 раза.
        document.querySelector( ' [x = "' + Number( x ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 1 ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 2 ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 3 ) + '"][y = "' + Number( y ) + '"] ' ),
        document.querySelector( ' [x = "' + ( Number( x ) + 4 ) + '"][y = "' + Number( y ) + '"] ' )];
    for ( let i = 0; i < snakeBody.length; i++ ) {      //в итоге змея займет 5 ячеек горизонтальных на случаной строчке.
        snakeBody[i].classList.add( "snakeBody" );     //добавляем ей класс
    }
    snakeBody[0].classList.add( "snakeHead" );        // добавляем голову первому элементу
    console.log( "createSnake: x=" + x + " y=" + y );

    for ( let item of snakeBody ) {      // сначал создаются Яблоки, потом создается Змея.
                                         // по этому идет проверка, чтоб она не появилась на месте яблок
                                         // Если появится на яблоке - пересоздается в другом месте.
        if ( item.classList.contains( 'apple' ) ) { 
            console.log( "ReCreating of Snake" );
            for ( let i = 0; i < snakeBody.length; i++ ) {
                snakeBody[i].classList.remove( "snakeBody" );
            }
            snakeBody[0].classList.remove( "snakeHead" );
            createSnake();
        }
    }
}
function startNewGame() {       //pop-up окно начальное. Окно создается библиотекой Swal.

    Swal.fire( {
        imageUrl: 'img/snakeImg.png',
        imageHeight: 100,
        title: 'GreenSnake',
        width: 600,
        padding: '3em',
        background: '#fff',
        confirmButtonText: 'START NEW GAME',
        html: '<p>Move with arrows &larr;&uarr;&rarr;</p>',
        footer: '( Hint: in "OPTIONS" button u can change speed of snake and theme. )',
        imageUrl: 'img/snakeImg.png',
        allowOutsideClick: false,   // запрещаем закрытие окна,если кликнуть за его границами.
        allowEscapeKey: false,      // не закрывает окно,если нажать клавишу Esc.
        backdrop: `
             rgba(0,0,123,0.4)
             url("img/nyan-cat.gif")
             left top
             repeat
             `
    } ).then( ( result ) => {           //при нажатии кнопки - срабатывает функция.
        if ( result.value ) {
            startGame();
        }
    } )
}
function gameOver() {

    Swal.fire( {
        allowOutsideClick: false,
        allowEscapeKey: false,
        imageUrl: 'img/snakeImg.png',
        imageHeight: 150,
        title: 'GOOD GAME!',
        width: 600,
        text: 'Your score: ' + score,
        padding: '3em',
        background: '#fff',
        confirmButtonText: 'EXIT',
        footer: '(that will close browser TAB)',
        backdrop: `
             rgba(0,0,123,0.4)
             url("img/nyan-cat.gif")
             left top
             repeat
             `
    } ).then( ( result ) => {
        if ( result.value ) {
            window.close();       //закрытие вкладки браузера
        }
    } )
}

createObject( "apple" );
createSnake();


function startGame() {
    move();
}
                        // вся магия здесь.  Функция движения запускается через опредленный интервал.
function move() {        // чем ниже интервал - быстрее двигается змея, значение speed управляет этим.
    clearInterval( interval );   // при каждом ходе(итерации) идет обнуление таймера, чтоб она изменяла скорость.
    interval = setInterval( move, speed );
    snakeBody[0].classList.remove( "snakeHead" );
    snakeBody[snakeBody.length - 1].classList.remove( "snakeBody" );
    snakeBody.pop();
    //console.log( "snakeBody.length= " + snakeBody.length );
    if ( direction == 'left' ) {       //описываем логику движения змеи ВЛЕВО.
        if ( x > 1 ) {                 //как работает: Если мы может идти влево ( x-1), то тело сдвигается на -1 по х.
            x -= 1;
            snakeBody.unshift( document.querySelector( ' [x = "' + x + '"][y = "' + y + '"] ' ) );

        } else {                          // если не можем(уперлись в х>1,тоесть конец "поля"(стена слева)), то переносим змею 
            x = 20;                        // в противоположный конец "поля", тоесть х=20 (стена справа) и она снова начинает идти в лево х-1.
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

    let apples = document.querySelectorAll( ".apple" );    //создаем коллекцию из яблок.
    for ( let apple of apples ) {                           //Проверяем координаты головы и яблок.
        if ( apple.getAttribute( 'x' ) == snakeBody[0].getAttribute( 'x' ) &&
            apple.getAttribute( 'y' ) == snakeBody[0].getAttribute( 'y' ) ) {
            console.log( "Eat!" );                          //если координаты совпали - мы едим яблочко и удаляем его из "поля"
            score += 1;                                     // добавляем счет +1
            changeText();                                   // цифре счета делаем анимацию
            if ( speed >= 100 ) {                           // за каждое съеденное яблоко скорость увеличивается змеи.
                speed -= 10;
                clearInterval( interval );
                interval = setInterval( move, speed );
            } else if ( speed >= 50 && speed < 100 ) {      // скорость изменяем не линейно,ну почти)
                speed -= 5;                                 // с 300 до 100 - шаг скорости -10 ед.
                clearInterval( interval );                  // с 100 до 50 - шаг скорости -5ед.
                interval = setInterval( move, speed );
            }

            console.log( "speed: " + speed );
            setSpeed();
            // console.log( "score=" + score );
            apple.classList.remove( "apple" );
            countApples -= 1;
            AppleDiv.innerHTML = 'x ' + countApples;
            // console.log( "countApples= " + countApples );

            if ( countApples <= 0 ) {               //Если яблочки кончились - создаем новые.
                createObject( "apple" );
                console.log( "Respawn!" );
            }
            //увеличиваем нашу змею на +1 квадратик, рост будет заметен при след-м движении.
            let tempX = snakeBody[snakeBody.length - 1].getAttribute( 'x' );
            let tempY = snakeBody[snakeBody.length - 1].getAttribute( 'y' );
            snakeBody.push( document.querySelector( '[x="' + tempX + '"][y="' + tempY + '"]' ) );
        }
    }
    //Проверяем. съела ли змея сама себя
    if ( snakeBody[0].classList.contains( 'snakeBody' ) ) {
        console.log( "GAME OVER!!!" );
        clearInterval( interval );
        gameOver();   //пичалька 
    }

    snakeBody[0].classList.add( "snakeHead" );
    for ( let i = 0; i < snakeBody.length; i++ ) {
        snakeBody[i].classList.add( "snakeBody" );

    }
    kostil = true;  //костыль, немножко черной магии.
}
//Прослушиваем клавиатуру на нажатие стрелок.
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

