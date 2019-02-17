var socket = io.connect('http://localhost:8080');

var x = window.innerWidth;
var y = window.innerHeight;

var mouse = {
    x: x / 2,
    y: y / 2
};

var data;


var violin1 = new Pizzicato.Sound({
    source: 'file',
    options: {
        path: '/audio/violin1.mp3',
        loop: true,
        attack: 0.5,
        release: 10
    }
});
var violin2 = new Pizzicato.Sound({
    source: 'file',
    options: {
        path: '/audio/violin2.mp3',
        loop: true,
        attack: 0.5,
        release: 10
    }
});
var violin3 = new Pizzicato.Sound({
    source: 'file',
    options: {
        path: '/audio/violin3.mp3',
        loop: true,
        attack: 0.5,
        release: 10
    }
});
var violin4 = new Pizzicato.Sound({
    source: 'file',
    options: {
        path: '/audio/violin4.mp3',
        loop: true,
        attack: 0.5,
        release: 10
    }
});

var d = 0.0;
var g = 0.0;

socket.on('message', function (message) {
    data = message;
});

function setup() {
    frameRate(15);
}

function keyPressed() {
    violin1.play();
    violin2.play();
    violin3.play();
    violin4.play();
}


function draw() {
    g1 = map(mouse.y, 0, y, 0, 1);
    g = map(mouse.x, 0, x, 1, 0);
    var distortion = new Pizzicato.Effects.Distortion({
        gain: g
    });
    var distortion1 = new Pizzicato.Effects.Distortion({
        gain: g1
    });

    violin1.removeEffect(distortion);
    violin2.removeEffect(distortion);
    violin1.removeEffect(distortion1);
    violin3.removeEffect(distortion1);

    var myWidth = 0,
        myHeight = 0;


    if (data == 'lift') {
        violin3.addEffect(distortion1);
        moveUp();
    }

    if (data == 'drop') {
        violin1.addEffect(distortion1);
        moveDown();
    }

    if (data == 'left') {
        violin1.addEffect(distortion);
        moveLeft();
    }

    if (data == 'right') {
        violin2.addEffect(distortion);
        moveRight();
    }

    updateDimensions();

    document.getElementById("sun").style.background = '-webkit-radial-gradient(' + mouse.x + 'px ' + mouse.y + 'px, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)';

    document.getElementById("sunDay").style.background = '-webkit-radial-gradient(' + mouse.x + 'px ' + mouse.y + 'px, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%)';


    document.getElementById("sunSet").style.background = '-webkit-radial-gradient(' + mouse.x + 'px ' + mouse.y + 'px, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)';

    document.getElementById("waterReflectionContainer").style.perspectiveOrigin = (mouse.x / myWidth * 100).toString() + "% -15%";
    document.getElementById("waterReflectionMiddle").style.left = (mouse.x - myWidth - (myWidth * .03)).toString() + "px";

    var bodyWidth = document.getElementsByTagName("body")[0].clientWidth;

    document.getElementById("sun").style.width = (bodyWidth);
    document.getElementById("sun").style.left = "0px";
    document.getElementById("sunDay").style.width = (bodyWidth);
    document.getElementById("sunDay").style.left = "0px";

    var sky = document.getElementById("sun");
    var water = document.getElementById("water");
    var waterHeight = water.clientHeight;
    var skyHeight = sky.clientHeight;
    var skyRatio = mouse.y / skyHeight;
    var waterRatio = waterHeight / myHeight;
    document.getElementById("darknessOverlay").style.opacity = Math.min((mouse.y - (myHeight / 2)) / (myHeight / 2), 1);
    document.getElementById("darknessOverlaySky").style.opacity = Math.min((mouse.y - (myHeight * 7 / 10)) / (myHeight - (myHeight * 7 / 10)), 1);
    document.getElementById("moon").style.opacity = Math.min((mouse.y - (myHeight * 9 / 10)) / (myHeight - (myHeight * 9 / 10)), 0.65);
    document.getElementById("horizonNight").style.opacity = (mouse.y - (myHeight * 4 / 5)) / (myHeight - (myHeight * 4 / 5));

    document.getElementById("starsContainer").style.opacity = (mouse.y / myHeight - 0.6);

    document.getElementById("waterDistance").style.opacity = (mouse.y / myHeight + 0.6);
    document.getElementById("sunDay").style.opacity = (1 - mouse.y / myHeight);
    document.getElementById("sky").style.opacity = Math.min((1 - mouse.y / myHeight), 0.99);

    document.getElementById("sunSet").style.opacity = (mouse.y / myHeight - 0.2);



    if (mouse.y > 0) {
        var clouds = document.getElementsByClassName("cloud");
        for (var i = 0; i < clouds.length; i++) {
            clouds[i].style.left = Math.min(myWidth * (Math.pow(mouse.y, 2) / Math.pow(myHeight / 2, 2)) * -1, 0);
        }
        //}

        var stars = document.getElementsByClassName('star');
        for (var i = 0; i < stars.length; i++) {
            stars[i].style.opacity = (mouse.y / myHeight - 0.6);
        }


        if (mouse.y > myHeight / 2) {
            document.getElementById("sun").style.opacity = Math.min((myHeight - mouse.y) / (myHeight / 2) + 0.2, 0.5);
            document.getElementById("horizon").style.opacity = (myHeight - mouse.y) / (myHeight / 2) + 0.2;

            document.getElementById("waterReflectionMiddle").style.opacity = (myHeight - mouse.y) / (myHeight / 2) - 0.1;
        } else {
            document.getElementById("horizon").style.opacity = Math.min(mouse.y / (myHeight / 2), 0.99);

            document.getElementById("sun").style.opacity = Math.min(mouse.y / (myHeight / 2), 0.5);
            document.getElementById("waterReflectionMiddle").style.opacity = mouse.y / (myHeight / 2) - 0.1;
        }

    }

    //}, false);



    function updateDimensions() {
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {

            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {

            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }

    }


    function windowResize() {
        updateDimensions();
        var skyHeight = document.getElementById("horizon").clientHeight;




        // update to new sky height
        skyHeight = document.getElementById("sun").clientHeight;
        document.getElementById("waterDistance").style.height = myHeight - skyHeight;
        document.getElementById("division").style.top = skyHeight;
    }

    console.log(data);

}

function moveUp() {
    if (mouse.y <= 0 && data == 'lift') {
        mouse.y = 0;
    } else {
        mouse.y = mouse.y - 4;
    }
}

function moveDown() {
    if (mouse.y >= y && data == 'drop') {
        mouse.y = y;
    } else {
        mouse.y = mouse.y + 4;
    }
}

function moveLeft() {
    if (mouse.x <= 0) {
        mouse.x = 0;
    } else {
        mouse.x = mouse.x - 4;
    }
}

function moveRight() {
    if (mouse.x >= x) {
        mouse.x = x;
    } else {
        mouse.x = mouse.x + 4;
    }
}
