(function() {
  'use strict';
  var queue = ["你", "你们", "我们", "你和他们", "我自己"];
  render();

  function render(className, rege) {
    var tmp = [];
    console.log(className);
    console.log(rege);
    for (var index in queue) {
      var _className;
      if (rege) {
        _className = rege.test(queue[index]) ? className : "";
      } else {
        _className = "";
      }
      tmp.push("<div class='" + _className + "'>" + queue[index] + "</div>")
    }

    document.getElementById('for_queue').innerHTML = tmp.join('');
  };

  function INTest(_value_arr) {
    for (var _count = 0; _count < _value_arr.length; _count++) {
      if (!/[A-Za-z\u4e00-\u9fa5]*/.test(_value_arr[_count])) {
        return false;
      }
    }
    return true;
  }

  ;
  (function() {
    document.getElementById('clickArea').addEventListener("click", function(e) {
      var btn = e.target;
      var _in = document.getElementById('in');
      //函数式
      function alertNow(fn) {
        if (_in.value == '') {
          return;
        };
        var _value_arr = _in.value.split(" ");
        if (INTest(_value_arr)) {
          for (var m = 0; m < _value_arr.length; m++) {
            if (!_value_arr[m].trim()) {
              continue;
            }
            fn.call(queue, _value_arr[m]);
          }
        } else {
          alert("请输入有效字符,不能有特殊字符和数字");
        }
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
        case "search_btn":
          if (document.querySelector("#search_word").value) {
            var testRegx = new RegExp(document.querySelector("#search_word").value);
            render("active", testRegx);
          }
          return;
          break;
        default:
          return;
          break;
      }
      _in.value = '';
      render();
    })

  })()
})()
