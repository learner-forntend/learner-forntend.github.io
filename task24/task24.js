;
(function() {
  "use strict";
  var isWalk = false;
  var clickedDom;
  var queue_elements = [];
  var deep_walk_index = 0;
  var container = document.querySelector("#container");
  var add_dom = document.querySelector("#add_dom_text");
  var randomWords = ['cat', 'dog', 'yes', 'sc', 'ac', 'td', 'll', 'tx', 'al', 'no'];
  createDomTree(container, 2);
  var timmers = new Array(4);
  document.querySelector(".option").addEventListener('click', walk);
  document.querySelector("#container").addEventListener('click', clickDom);

  //////////////////////////////////////////////////////////////////////
  function clickDom(event) {
    if (isWalk) return;
    clearTimmer();
    var target = event.target;
    clickedDom = target;
    target.className = "clicked";
  }

  function walk(event) {
    var _id = event.target.id;
    switch (_id) {
      case "wide_first":
        walk_tree(wide_walk, 0);
        break;
      case "deep_first":
        walk_tree(deep_walk, 1);
        break;
      case "wide_search":
        search(wide_walk, 2);
        break;
      case "deep_search":
        search(deep_walk, 3);
        break;
      case "add_dom":
        addDom();
        break;
      case "delete_dom":
        deleteDom();
        break;
      default:
        return;
    }
  }

  function addDom() {
    if (!clickedDom) {
      alert("请选择元素");
      return;
    }
    if (add_dom.value === "") {
      alert("输入名称");
      return;
    }
    var new_dom = document.createElement("div");
    new_dom.innerText = add_dom.value;
    clickedDom.appendChild(new_dom);
  }

  function deleteDom() {
    if (!clickedDom) {
      alert("请选择元素");
      return;
    }
    clickedDom.parentNode.removeChild(clickedDom);
    clickedDom = null;
  }

  function walk_tree(fn, timmer_id) {
    clearTimmer();
    fn.call(null, container)
    var _index = 0
    isWalk = true;

    function _walk() {
      if (_index >= queue_elements.length) {
        isWalk = false
        return;
      }

      queue_elements[_index].className = "active";
      timmers[timmer_id] = setTimeout(function() {
        queue_elements[_index].className = "";
        _index++;
        _walk();
      }, 300);
    };
    _walk();
  }

  function search(fn, timmer_id) {
    clearTimmer();
    var input_value = document.querySelector("#key_word");
    if (input_value.value == "") {
      alert("请输入有效搜索字符");
      return;
    }
    fn.call(null, container);
    var textRegx = new RegExp(input_value.value);
    var _index = 0;
    isWalk = true;

    function _walk() {
      if (_index >= queue_elements.length) {
        isWalk = false;
        return;
      };
      queue_elements[_index].className = "active";
      timmers[timmer_id] = setTimeout(function() {
        if (textRegx.test(queue_elements[_index].firstChild.nodeValue)) {
          queue_elements[_index].className = "chosen";
        } else {
          queue_elements[_index].className = "";
        }
        _index++;
        _walk();
      }, 300);
    }
    _walk();
  }



  function clearTimmer() {
    if (clickedDom) {
      clickedDom.className = "";
      clickedDom = null;
    }

    deep_walk_index = 0;
    for (var index in timmers) {
      if (timmers[index]) clearTimeout(timmers[index]);
    }
    for (var i = 0; i < queue_elements.length; i++) {
      queue_elements[i].className = "";
    }
    queue_elements = [];
  }

  function deep_walk(node) {
    if (node) {
      queue_elements.push(node);
      var nodeChild = node.children;
      if (nodeChild.length > 0) {
        for (var i = 0; i < nodeChild.length; i++) {
          deep_walk(nodeChild[i]);
        }
      }
    }


  }

  function wide_walk(node) {
    if (node) {
      queue_elements.push(node);
    } else {
      return;
    }

    if (node.id !== "container") {
      wide_walk(node.nextElementSibling);
    }
    node = queue_elements[deep_walk_index++]
    wide_walk(node.firstElementChild);
  }

  function createDomTree(container, count) {
    container.innerText = randomWords[Math.floor(Math.random() * randomWords.length)];

    if (count <= 0) return;
    count--;
    var num = Math.floor(Math.random() * 3) + 2;
    var width = (100 / num - 2) + "%"
    for (var i = 0; i < num; i++) {
      var childElement = document.createElement("div");
      childElement.style.width = width;
      container.appendChild(childElement);
      createDomTree(childElement, count);
    }
  }

})();
