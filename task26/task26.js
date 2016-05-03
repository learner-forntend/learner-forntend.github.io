(function () {
  'use strict';
  //根据浏览器类型设置相应的requestAnimationFrame
  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

})();
