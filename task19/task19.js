(function() {
  'use strict';
  var queue = [];

  function render() {
    var tmp = [];
    for (var index in queue) {
      tmp.push("<div style='height:" + 10 * queue[index] + "px'></div>");
    }

    document.getElementById("for_queue").innerHTML = tmp.join("");
  };

  function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime) {
        return;
      }
    }
  }

  function orderSort() {
    var i, j;
    var changeOrder = [];
    var count = 0;
    //利用缓存数组记录排序过程
    var tmp_queue = queue.slice(0);

    for (i = 0; i < tmp_queue.length; i++) {
      for (j = tmp_queue.length - 1; j > i; j--) {

        if ((+tmp_queue[j - 1]) > (+tmp_queue[j])) {
          console.log((j - 1) + ":" + tmp_queue[j - 1] + "----" + j + ":" + tmp_queue[j]);
          var tmp = tmp_queue[j];
          tmp_queue[j] = tmp_queue[j - 1];
          tmp_queue[j - 1] = tmp;
          changeOrder.push((j - 1) + "-" + j);
        }
      }
    };

    var count = 1;

    function inte() {
      setTimeout(function() {

        var arr = changeOrder[count - 1].split("-");
        var i = arr[0];
        var j = arr[1];
        var tmp = queue[j];
        queue[j] = queue[i];
        queue[i] = tmp;
        render();
        if (count < changeOrder.length) {
          inte();
          count++;
        } else {
          count = 1;
          return;
        }
      }, 1000 + count)
    };
    inte();

    // for (var m = 0; m < changeOrder.length; m++) {
    //
    //   (function(m){
    //     setTimeout(function() {
    //       var arr = changeOrder[m].split("-");
    //       var i = arr[0];
    //       var j = arr[1];
    //       var tmp = queue[j];
    //       queue[j] = queue[i];
    //       queue[i] = tmp;
    //       render();
    //     }, (m + 1) * 1000);
    //   })(m);
    // }
  };



  document.getElementById('clickArea').addEventListener('click', function(e) {
    var btn = e.target;
    console.log(btn.id);
    if (btn.id === "order") {
      orderSort();
      return;
    };

    var _in = document.getElementById('in');


    function alertNow(fn){
      if(_in.value==''){
        return;
      };
      if(queue.length==60){
        alert("容量不足,请勿添加")
      };
      if((+_in.value)<10||(+_in.value)>100){
        alert("请输入0-100之间的数");
      };
      fn.call(queue,_in.value);
      _in.value = "";
    }

    switch (btn.id) {
      case "left_in":
        alertNow([].unshift);
        break;
      case "right_in":
      alertNow([].push);
        break;
      case "left_out":
        alert(queue.shift());
        break;
      case "right_out":
        alert(queue.pop());
        break;
      default:
        break;

    }
    render();
  });




})();
