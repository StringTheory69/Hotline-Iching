const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

http
  .createServer((req, res) => {
    // Create TwiML response
    
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

    const twiml = new VoiceResponse();
    console.log(`${title}/n ${above}/n ${below}/n ${judgment}/n ${image}`)
    twiml.say(`${title}`);
    twiml.pause({
        length: 1
    });
    twiml.say(`${above}`);
    twiml.pause({
        length: 1
    });
    twiml.say(`${below}`);
    twiml.pause({
        length: 1
    });
    twiml.say(`The Judgment`) 
    twiml.pause({
        length: 1
    });
    twiml.say(`${judgment}`)
    twiml.pause({
        length: 1
    });
    twiml.say(`The Image`)
    twiml.pause({
        length: 1
    });
    twiml.say(`${image}`)
    twiml.pause({
        length: 1
    });
        
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  })
    
    
  })
  .listen(1337, '127.0.0.1');

console.log('TwiML server running at http://127.0.0.1:1337/');

function roll() {
    
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
}

