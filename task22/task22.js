;
(function() {
  "use strict"
  var queue_elements = [];
  var container = document.querySelector("#container");
  var timmers = new Array(3);
  createDomeTree(container, 5);
  document.querySelector("#btn_area").addEventListener("click", walk);


  ////////////////////////////////////////////////////////////////
  function createDomeTree(element, count) {
    if (count <= 0) return;
    count--;
    element.appendChild(document.createElement("div"));
    element.appendChild(document.createElement("div"));
    createDomeTree(element.children[0], count);
    createDomeTree(element.children[1], count);
  }


  function walk(event) {
    var fn;
    var _id = event.target.id;
    var timmer_index;
    switch (_id) {
      case "pre":
        timmer_index = 0;
        fn = pre_walkTree;
        break;
      case "in":
        timmer_index = 1;
        fn = in_walkTree;
        break;
      case "back":
        timmer_index = 2;
        fn = back_walkTree;
        break;
      default:
        return;
    }
    for (var _index in timmers) {
      if (_index !== timmer_index && timmers[_index]) {
        clearTimeout(timmers[_index]);
      }
    }
    queue_elements.forEach(function(item, index) {
      item.className = "";
    });
    queue_elements = [];
    fn.call(null, container);
    var index = 0;

    function _walk() {
      queue_elements[index].className = "active";
      timmers[timmer_index] = setTimeout(function() {
        queue_elements[index].className = "";
        if (queue_elements[++index]) {
          _walk();
        } else {
          queue_elements = [];
          index = 0;
        }
      }, 500);
    }
    _walk();
  }


  function pre_walkTree(node) {
    queue_elements.push(node)
    if (node.children[0]) {
      pre_walkTree(node.children[0]);
    }
    if (node.children[1]) {
      pre_walkTree(node.children[1]);
    }
  }

  function in_walkTree(node) {
    if (node.children[0]) {
      in_walkTree(node.children[0]);
    }
    queue_elements.push(node);
    if (node.children[1]) {
      in_walkTree(node.children[1]);
    }
  }

  function back_walkTree(node) {
    if (node.children[0]) {
      back_walkTree(node.children[0]);
    }

    if (node.children[1]) {
      back_walkTree(node.children[1]);
    }
    queue_elements.push(node);
  }

})();
