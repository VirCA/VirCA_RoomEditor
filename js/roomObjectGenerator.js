module.exports = function(roomPath, settings){
	var fs = require("fs");
	var room = fs.readFileSync(roomPath);
	//console.log(Date.now());
	var date = new Date();
	var formattedDate = " (backup) "+date.getFullYear() +"."+(date.getMonth()+1)+"."+date.getDate()+" "+date.getHours()+"h"+date.getMinutes()+"m"+date.getSeconds()+"s"+date.getMilliseconds()+"ms";
	//console.log(formattedDate);
	fs.writeFile(roomPath.substring(0, roomPath.lastIndexOf("."))+formattedDate+".room", room, function(err){
		if(err){
			console.log("ERROR: Creating the copy of original file failed.");
		}
	});
	var xml2json = require('xmljson').to_json;

	xml2json(room, function(err, result){
		if(err)
			console.log(err);
		else{
			//console.log("result:");
			//console.log(result);
			settings(result, roomPath);
		}

		return result;
	});
	
}