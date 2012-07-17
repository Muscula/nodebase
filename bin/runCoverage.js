"use strict";
process.env.NODE_ENV = "coverage";
var fs = require("fs");

//make writes to stdout and stderr sync, so the process does not exit before writing output.
process.stdout.write = function (data){
	fs.writeSync(1, data);
};
process.stderr.write = function (data){
	fs.writeSync(2, data);
};

var nodecoverage = require("nodecoverage");
nodecoverage({
	instrument:["lib"],
	requireBeforeRun:["lib/app.js"] //used for starting up a http server or similar, before running all tests
}, function (err) {
	if(err){
		console.error(err);
	}
	process.exit();
});
