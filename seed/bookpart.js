// serviceseed.js
var db = require('../models/db');
var partModel = require('../models/part').partModel;
var mongoose = require('mongoose');

var mypart = [
	new partModel({
		partName: "가정/살림"
	}),
	new partModel({
		partName: "건강/취미"
	}),
  new partModel({
		partName: "경제/경영"
	}),
  new partModel({
		partName: "외국어"
	}),
  new partModel({
		partName: "여행"
	}),
  new partModel({
		partName: "역사"
	}),
  new partModel({
		partName: "예술"
	}),
  new partModel({
		partName: "종교"
	}),
  new partModel({
		partName: "자연과학"
	}),
  new partModel({
		partName: "IT모바일"
	})
];
console.log('mypart=', mypart)
var done = 0;
for (var i=0; i<mypart.length; i++) {
	mypart[i].save(function(err, result){
		console.log('result=', result);
		done++;
		if(done == mypart.length) {
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}
