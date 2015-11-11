

var str = "<tag>50.60</tag>\n<othertag>asdfasf</othertag>";
var patt = "tag";

var reg  = new RegExp("<"+patt+">[0-9a-zA-Z_-]*</"+patt+">", "i");
var tmp = str.search();
tmp = tmp.substring(tmp.indexOf(""));
console.log(str.replace(/>[0-9]*.[0-9]*</i, ","));