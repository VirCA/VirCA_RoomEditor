module.exports = function(){
	var obj = {
				"$": {
					name: ""
				},
				"pose":{
					"position":{
						"x": "",
						"y": "", 
						"z": ""
					},
					"orientation":{
						"ypr":{
							"yaw": "",
							"pitch": "",
							"roll": ""
						},
						"angleAxis":{
							"angle": "",
							"axis" :{
								"x": "",
								"y": "",
								"z": ""
							}
						},
						"quaternion":{
							"x": "",
							"y": "",
							"z": "",
							"w": ""
						},
						"rotMatrix":{
							"xx":"",
							"xy":"",
							"xz":"",
							"yx":"",
							"yy":"",
							"yz":"",
							"zx":"",
							"zy":"",
							"zz":""
						}
					}
				},
				"scale":{
					"x": "",
					"y": "",
					"z": ""
				},
				"browser":{
					"url": "",
					"shared": "",
					"draggable": "",
					"snappedToWall": "",
					"width": "",
                    "height": "",
                    "resH": "",
                    "resV": "",
					"zoom": ""
				}			
	}
	return obj;
}