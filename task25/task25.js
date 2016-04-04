;
(function() {
    'use strict';

    var Util = {
        appendClassName: function(element, className) {
            var _className = element.className + " " + className;
            element.className = _className.trim();
        },
        removeClassName: function(element, className) {
            element.className = element.className.replace(new RegExp(className), "");
        },

    };
    //////////////////////////////////////////////////////////////////////
    function TreeNode(element, parent, data) {
        this.element = element || null;
        this.parent = parent || null;
        this.children = [];
        this.data = data;
        this.isOpen = false;
        this.element.node = this; //通过 dom 节点访问树节点
    }
    TreeNode.prototype = (function() {
        return {
            constuctor: TreeNode,
            deleteNode: deleteNode,
            toggle: toggle,
            appendChild: appendChild
        }
        ////////////////////////////////////////////////
        function deleteNode() {
            this.element.parentNode.removeChild(this.element);
            this.parent.children.splice(this.parent.children.indexOf(this), 1);
            if (this.parent.children.length == 0) this.parent.toggle(true);
            this.parent = null;
        };

        function toggle(del) {
            if (!del) {
                if (this.children.length === 0) return;
            }
            this.isOpen = !this.isOpen;

            //修改箭头向下
            var _label = this.element.children[0];
            _label.children[0].className = this.isOpen ? "arrow-down" : "arrow-left";

            //子节点收起
            for (var i = 0, len = this.children.length; i < len; i++) {
                var _childElement = this.children[i].element;
                if (this.isOpen) {
                    Util.removeClassName(_childElement, "none")
                } else {
                    Util.appendClassName(_childElement, "none");
                }
            }
        };

        function appendChild(text) {
            var tmp = [

                "<div class='label'>",
                "<span class='arrow-left'></span>",
                "<span class='text'>",
                text,
                "</span>",
                "<span class='add'></span>",
                "<span class='delete'></span>",
                "</div>",
            ];
            var _node = document.createElement("div");
            _node.className = "node";
            _node.innerHTML = tmp.join("");
            this.element.appendChild(_node);
            var new_node = new TreeNode(_node, this, text);
            this.children.push(new_node);
            if (!this.isOpen) {
                this.toggle();
            };
            return new_node;
        }
    })();

    function treeHandler(event) {
        var _target = event.target;
        var _targetClassName = _target.className;
        //搜索到该节点
        var _nodeElement = _target;
        while (_nodeElement.className.indexOf("node") == -1) {
            _nodeElement = _nodeElement.parentNode;
        }
        var _targetNode = _nodeElement.node;
        if (_targetClassName.indexOf("text") != -1) {
            _targetNode.toggle();
        } else if (_targetClassName.indexOf("add") != -1) {
            var name = prompt("请输入节点名称");
            if (!name) return;
            _targetNode.appendChild(name.trim())

        } else if (_targetClassName.indexOf("delete") != -1) {
            _targetNode.deleteNode();
        }
        return;
    }

    function searchHander() {
        var _inputValue = document.querySelector('#word').value.trim()
        if (!_inputValue) {
            alert("请输入关键字");
            return;
        };
        var headNode = document.querySelector(".tree").node;
        var i = 0,
            arr = [];
        var _i = 0,
            _arr = [];
        var _timmer;
        headNode.children.forEach(function(ele) {
            arr.push(ele);
            _arr.push(ele);
        });

        function _clearBg() {
            if (_i == _arr.length) return;
            _arr[_i].children.forEach(function(element) {
                _arr.push(element);
            });
            var _label = _arr[_i].element.children[0];
            Util.removeClassName(_label, "searching");
            Util.removeClassName(_label, "on");
            _i++;
            _clearBg();
        }

        function _clear() {
            if (_timmer) {
                clearTimeout(_timmer);
            }
            _clearBg();
            arr = [];
            headNode.children.forEach(function(ele) {
                arr.push(ele);
            });
        }

        function _search() {
            if (i == arr.length) return;
            var _node = arr[i];
            Util.appendClassName(_node.element.children[0], "searching");
            _node.children.forEach(function(element) {
                arr.push(element);
            });
            _timmer = setTimeout(function() {
                Util.removeClassName(_node.element.children[0], "searching");
                if (new RegExp(_inputValue).test(_node.data)) {
                    Util.appendClassName(_node.element.children[0], "on");
                    while (_node.element.className!="tree") {
                      if(_node.children.length>0&&!_node.isOpen){
                        _node.toggle();
                      }
                      _node = _node.parent;
                    }
                }
                i++;
                _search();
            }, 500);

        };
        _clear();
        _search();
    }

    function init() {
        var tree = document.querySelector(".tree");
        tree.addEventListener("click", treeHandler)
        var headNode = new TreeNode(tree, null);
        headNode.isOpen = true;
        var sec_node = headNode.appendChild("第一层节点1");
        sec_node.appendChild("第二层第1个节点");
        sec_node.appendChild("第二层第1个节点");
        headNode.appendChild("第一层节点2").appendChild("第二层2个节点").appendChild("第三层第1个节点");
        headNode.appendChild("第一层节点3");
        document.querySelector('#search_btn').addEventListener("click", searchHander);
    };
    init();
})();
