var request = require('request@2.67.0');

var key = 'my-google-api-key';

//Using radarsearch service. Can return 200 results per query.
var apiUrl = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?key=' + key;

//Originally written to use nearbysearch. Returns 20 results at a time for a max of 60 results.
//var apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + key;

module.exports = function (context, req, res) {
  makeRequest(context.data.location, context.data.radius, context.data.type, null, 0, function(totalCount){
    res.writeHead(200, { 'Content-Type': 'text/json'});
    res.end(totalCount);
  });
};

var makeRequest = function (location, radius, type, page_token, totalCount, cb){
  var reqUrl = apiUrl + '&location=' + location + '&radius=' + radius + '&type=' + type;
  
  //For use with nearbysearch, pagination
  if (page_token !== null){
    reqUrl = apiUrl + '&pagetoken=' + page_token;
  }
  
  request(reqUrl, function (error, response, body) {
    var jsonObj = JSON.parse(body);
      totalCount += jsonObj.results.length;
      
      //For use with nearbysearch, pagination. Immediately returns via "else" for radarsearch
      if (typeof jsonObj.next_page_token !== "undefined"){
        setTimeout(function(){
          makeRequest(location, radius, type, jsonObj.next_page_token, totalCount, function(tc){  
            cb(tc.toString());
          });
        }, 2000);
      } else {
        cb(totalCount.toString());
      }
  });
};
