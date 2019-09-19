var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/iching', function(req, res){
  // Let's scrape Anchorman 2
    
    var random = Math.floor(Math.random() * 64);
    random += 1 
    
  url = `https://ichingfortune.com/hexagrams/${random}.php`;

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
        
        // parsing / regex functions 
        var textArray = $('h2').next().map( function() {
            return $(this).text() //each element input gets turned into text output
        });
                
        var title = $('h1').text().replace(/I Ching/g, "")
        var aboveBelow = $('#image').text().replace(/\n\t\t\t\t\t\t/g, " ");
        aboveBelow = aboveBelow.toString().replace(/\n\t\t\t\t\t/g, " ");
        
        var aboveBelowSplit = aboveBelow.split('Below')
        var above = aboveBelowSplit[0]
        var below = `Below${aboveBelowSplit[1]}`
        var judgment = textArray[1].replace(/\n\t\t\t\t\t\t/g, " ")
        var image = textArray[2].replace(/\n\t\t\t\t\t\t/g, " ")
        
        var jsonObject = 
            { reading :
                {
                 title: title, 
                 above: above,
                 below:below,
                 judgment:judgment,
                 image:image

                }
        }
    }

    res.send(jsonObject)
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
