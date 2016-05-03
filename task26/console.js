;
(function() {
    'use strict';

    function _Console(element) {
        this.element = element;
    }

    _Console.prototype.log = function(innerText) {
        if (!innerText) return;
        this.element.appendChild(createElement(innerText));
    };

    _Console.prototype.logFailure = function() {
        this.element.appendChild(createElement("failed"));
    };


    window._Console = _Console;



    /////////////////////////////////////
    function createDiv(innerText) {
        var _div = document.createElement("div");
        _div.innerText = innerText;
        return _div;
    }

})()
