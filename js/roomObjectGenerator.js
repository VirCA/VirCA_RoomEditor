module.exports = function(roomPath, settings){
	var fs = require("fs");
	var room = fs.readFileSync(roomPath);
	var xml2json = require('xmljson').to_json;

	xml2json(room, function(err, result){
		if(err)
			console.log(err);
		else{
			console.log(result);
			settings(result, roomPath);
		}

		return result;
	});
	
}