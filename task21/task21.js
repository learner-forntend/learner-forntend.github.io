;
(function() {
  "use strict";
  //字典对象
  var tags = Object.create(null);
  //事假绑定
  var input_tag = document.querySelector("#tag");
  document.querySelector("#add_tag").addEventListener("click", handerAddTag);

  var tag_show = document.querySelector("#tag_show");
  tag_show.addEventListener("click", deleteTag);
  tag_show.addEventListener("mouseover", mouseOverTag);
  tag_show.addEventListener("mouseout", mouseOutTag);

  function handerAddTag() {
    if (!input_tag.value.trim()) return;
    var tag = input_tag.value.trim();
    if (!tags[tag]) {
      tags[tag] = true;
      input_tag.value = "";
      render();
    } else {
      input_tag.value = "";
      return;
    }
  }

  function render() {
    var tmp = [];
    for (var tag in tags) {
      tmp.push("<div>" + tag + "</div>");
    };

    document.querySelector("#tag_show").innerHTML = tmp.join("");
  }

  function deleteTag(event) {

    var target = event.target;

    if (target.id === "tag_show") return;
    console.log(target.id);
    delete tags[target.innerText.substr(5)];
    render();
  }

  function mouseOverTag(event) {
    var target = event.target;
    if (target.id === "tag_show") return;
    console.log(target);
    target.className = "active";
    target.innerText = "点击删除 " + target.innerText;
  }

  function mouseOutTag(event) {
    var target = event.target;
    if (target.id === "tag_show") return;
    target.className = "";
    target.innerText = target.innerText.substr(5);
  }

})();

//添加兴趣
;
(function() {
  "use strict";
  var hobbies = Object.create(null);
  var hobby_input = document.querySelector("#hobbies");
  var hobby_show = document.querySelector("#hobby_show");
  document.querySelector("#add_hobby").addEventListener("click", handleClick);

  /////////////////////////////////////////////////////////////////////
  function handleClick() {
    var raw_hobbies = hobby_input.value.trim();
    var hobbies_may = raw_hobbies.split(/[\s\r\n，、]/);
    for (var index in hobbies_may) {
      var val = hobbies_may[index].trim();
      if (val && !hobbies[val]) {
        hobbies[val] = true;
      }
    }
    render();
    hobby_input.value = "";
  }

  function render() {
    var tmp = [];
    for (var hobby in hobbies) {
      tmp.push("<div>" + hobby + "</div>");
    }
    hobby_show.innerHTML = tmp.join("");
  }


})();
