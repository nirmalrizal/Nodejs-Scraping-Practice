var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();

var url = 'https://cdn.rawgit.com/younginnovations/internship-challenges/master/data-analysis/scrape-it/exampledata.html';
var json = [];

request(url,function(err, res, body){
	var $ = cheerio.load(body);
	var header = [];
	var data = [];
	$('tbody tr').each(function(index){
		$(this).each(function(){
			if(index === 0){
				header.push($(this).text());
				header = header[0].split('\n');
				header.pop();
			} else {
				var temp = new Array();
				temp.push($(this).text());
				temp = temp[0].split('\n');
				data.push(temp);
			}
		});
	});
	data.map(function(dat){
		var obj = {};
		header.map(function(val,index){
			obj[val] = dat[index];
		});
		json.push(obj);
	});
});

app.get('/',function(req,res){
	res.json(json);
});

app.listen(3000,function(){
	console.log('App listening to port 3000');
});