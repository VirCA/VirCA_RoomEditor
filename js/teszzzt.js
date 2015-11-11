var fs = require('fs');

var tomb = [];
var p = 0;
var path = ["./js/tree.html", "./noexistasdf.no", "./time.txt", "./times.txt", "./noexist.no"];

    for (var i = 0; i < path.length; i++) {
        if(fs.existsSync(path[i])){
            console.log(path[i]);
            tomb[p] = path[i];
            ++p;
        }
    }
console.log(tomb);