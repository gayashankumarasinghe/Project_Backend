var mongoose = require('mongoose');
var query = mongoose.Query;
var Data = mongoose.model('NewData');
var subData = mongoose.model('InvestigationData');

module.exports.getData = function (req, res, next) {
  // var firstQuery = new query();
  // function searchInvestigations(investigation_id){
  //     firstQuery = Data.find({investigation_id : investigation_id});
  //     return firstQuery;
  // }

  var acceptdata = {
    _id: String,
    latitudes: String,
    longitudes: String,
    investigation_id: String,
    test_id: String,
    timestamp: String,
    location_id: String,
    location: String
  }

  // Data.find({}, function (err, data) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     var responseObject = {
  //       _id: String,
  //       latitudes: String,
  //       longitudes: String,
  //       investigation_id: String,
  //       test_id: String,
  //       timestamp: String,
  //       location_id: String,
  //       location: String
  //     };
  //     JSON.stringify(data);
  //     responseObject = data;
  //     res.send(responseObject);
  //   }
  // });

  subData.find({},function(err,user){
    if(err){
      res.send(err);
    }
    else{
      res.send(user);
    }
  })


  // subData.findById(searchInvestigations()).exec(function(err,relate){  
  //     if(err){  
  //       res.send(err);  
  //     }  
  //     else{
  //         var responseObject = relate;
  //         res.send(responseObject);
  //     }  
  // });

};