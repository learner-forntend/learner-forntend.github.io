(function() {
    'use strict';
    //场景对象


    window.play = Play;

    function Play(element) {
        this.context = element.getContext('2d');


    }

    function drawBackground(context) {
        //画好地球
        context.clearRect(0, 0, 600, 600);
        context.arc(300, 300, 20, 0, 2 * Math.PI);
        context.fillStyle = "#000"
        context.fill();
        context.stroke();

        //画好轨道
        for (var i = 0; i < 3; i++) {
            context.strokeStyle = "#999";
            context.beginPath();
            context.arc(300, 300, 50 + 30 * i, 0, 2 * Math.PI);
            context.closePath();
            context.stroke();
        }
    }

    function drawSpaceship(context, ship) {
        var _index = ship.id;
        
    }



})();
