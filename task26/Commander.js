(function() {
    'use strict';
    var commander = {
      ships =[undefined,undefined,undefined]

    };

    var consoleUtil = new _Console();
    window.commander = commander;
    //////////////////////////////////////////
    function launch(id){
      var index = id-1;
      if(commander.ships[index]){
        consoleUtil.logFailure();
        return;
      }
      context.save();
      context.translate();
    }

})();
