
/** 
  * @desc KMS API routes 
*/
const router = require('express').Router();
const JWT = require('jsonwebtoken');
const mysql = require('mysql');
const {JWT_SECRET} = require('../config/index');
const con = require('../db/auth/db');
const request = require('request');
const https = require('https');






/** 
 * @desc Get all properties on the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - properties details in JSON or failure - error or status 404
*/

/** 
 * @desc Get all properties on the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - properties details in JSON or failure - error or status 404
*/
router.get('/properties',checkAuth,(req, res) => {
    con.query("SELECT * FROM property", function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });
});


/** 
 * @desc Get all Geo Location on the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - Geo Location coordinates in JSON or failure - error or status 404
*/
router.get('/geolocation', checkAuth,(req, res) => {
    con.query("SELECT * FROM propgeolocation", function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });
});


/** 
 * @desc Get a single property by id in the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - single  property by id in JSON or failure - error or status 404
*/
router.get('/properties/:id', checkAuth,(req, res) => {
    con.query("SELECT * FROM property WHERE property.id ="+ mysql.escape( parseInt(req.params.id)), function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });
});


/** 
 * @desc Get a count of properties in the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - total count of properties in JSON or failure - error or status 404
*/
router.get('/pcount', checkAuth,(req, res) => {
    con.query("SELECT COUNT(id) AS pcount FROM property", function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });
      
});

router.get('/qb',(req, res) => {
  data = [];

  var options =
    {  
      hostname: 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365004430440/companyinfo/4620816365004430440',
      method: 'GET',
      Accept: 'application/json',
      Authorization: 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..cI4AthZom_UMzwBQwHh0sQ.e0ZEW8kFSfMjimsP6EnzRvfJL9tqE9GnKM356Ph5Cx002ZtDyJhRo2x_QVMTIcxslgi4kp2_SPSVFEsWqu7f-3IXI0uoghCAV3akyBRJWkXd1MCpbPTOcmxPnL0mU4n6tb1q5M-Jop7MaBkT5c0sL-EKkVqn2e6T1J9cEBVSaTmrpqSzoTCZDRTqKtHZJw66xDHhPP81MIR5UtuM-9U2YepHXj_MkCKc2JtWwnHIaCcJKT3yfR1dowaKwTyKsRO_5rUBbGwVxKdgn0cxfjp4rXD9ioVOuwLmLi9pco1Qz633-ahZtDHfBPvVJWnCCTC37rwv40-2t_F3FLUVIPx2ZFd4fVToKppdSZbCvTQXIvnTcV_0OEJrGDKJZ4Cx48m4nJHDBDjx2EXcGH4SbIsqNxwnWljx5i0b8SzWUdQqhDP1MUXlddlYQZY1QYG9pyIY-nc4hjhPHkAYxGphY_rLEyCY2eXlllMN1nl7LANRkDBvQl3iYlFnUdxoVDjILTR8DTDNXl8YTdVBRugor6VYcTcx7okUtR3w2lQ6ywnBlCBi7kFHRHovGwLEa7wlMOAydXssDrQpz5hFHidUOM5i0wwnlBYMIHAkDtyuq0xG02YvLjTKOk_RwljYoAF55ruoTY54exevHgXYVrpnxtVUI_Zr2Fy8XmS1d6AkG1SXdTNjdsm48LANCYsAAuoR8kTY-IuOmNIg79bFqy64RWOUElfqhjgEnHMUTTesnZ0m5_pk9RLU2z5jevZ2Rvh_LJHW3sjAWkxxhzA2Va6sFNqh8tjCuIMgWYo9Vbw8qLaEP96Qttqo5E6OUH1ApkKdle1876LwRthZKItBXkjjBkLT2v_M86zYANKwKlcaocxwuWV_3FxJnk8mSPCjKh9oQK3I.uKkVNqlRwSKcw03n4-Pb3A'
    };

    urlQB = 'https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365004430440/companyinfo/4620816365004430440';
    const requ = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
    
    })

    res.send(requ);

});


/** 
 * @desc Get a total number of properties keys  in the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - total count of properties in JSON or failure - error or status 404
*/
router.get('/pktotal',checkAuth, (req, res) => {
    con.query("SELECT SUM(propertyKeySets) AS totalKeySets FROM property;", function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });
});


/** 
 * @desc Get a total number of empty hooks on location grid in the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - total empty hooks in JSON or failure - error or status 404
*/
router.get('/locationEmpty',checkAuth, (req, res) => {
  con.query("SELECT COUNT(propertyID) AS emptySpace FROM wlm.klocation ;", function (err, result, fields) {
      if (err) throw res.status(404).send(results.error.details[0].message);
      res.send(result);
    });
});


/** 
 * @desc Get all location data for key grid in the Database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - location details in JSON or failure - error or status 404
*/
router.get('/location', checkAuth, (req, res) => {
    con.query("SELECT * FROM klocation", function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });

});


/** 
 * @desc Get key location data per location
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - location data in JSON or failure - error or status 404
*/
router.get('/locationdata', checkAuth,(req, res) => {
    con.query("SELECT * FROM klocationdata", function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });

});



/** 
 * @desc Get key details on the database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - key details in JSON or failure - error or status 404
*/
router.get('/keys', checkAuth, (req, res) => {

    con.query("SELECT * FROM wlm.key", function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        res.send(result);
      });

});


/** 
 * @desc Add property to property database
 * @param - object req - request received from clients, object res - response sent back to client
 * @return object - success - save: true in JSON or failure - error 
*/
router.post('/property',checkAuth, (req, res) => {
    var id = req.body.id;
    var address1 = req.body.propertyAddress1;
    var address2 = req.body.propertyAddress2;
    var postcode = req.body.propertyPostCode;
    var keyset   = req.body.propertyKeySets;
    var sql = 'INSERT INTO   property ( propertyAddress1, propertyAddress2, propertyPostCode, propertyKeySets) VALUES (?,?,?,?)';
    con.query(sql,[address1, address2, postcode,keyset ], function (err, result) {
        if (err) throw res.status(200).send({ saved: false });
          res.status(200).send({ saved: true });
          id = result.insertId;
          console.log(id);
      }); 

   
});

/*
User athentication to access protected routes or end points 
*/

router.post('/auth/login', (req, res) => {
    var email= req.body.email;
    var password = req.body.password;
  con.query('SELECT * FROM wlm.users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        var token = JWT.sign({
          iss: 'OCYService',
          sub:results[0].idUser,
          lat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate()+1)
        }, JWT_SECRET)
        req.session.loggedin = true;
        req.session.username = results[0].userID;
        res.status(200).send({ auth: true, 
                               token: token,
                               email: email,
                               name: results[0].firstName,
                               surname: results[0].lastName});
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
});

// undate property
router.put('/property',checkAuth,(req, res) => {
    var id = req.body.id ;
    var address1 =  req.body.propertyAddress1;
    var address2 = req.body.propertyAddress2;
    var postcode = req.body.propertyPostCode;
    var keyset = req.body.propertyKeySets;
    console.log(req.body);
    var sql     = "UPDATE property SET propertyAddress1 = ?, propertyAddress2 = ?, propertyPostCode = ? , propertyKeySets = ? WHERE id ="+ mysql.escape( parseInt(id ));

    con.query(sql,[address1,address2 ,postcode, keyset], function (err, result) {
        if (err) throw res.status(200).send({ saved: false });
        console.log(result.affectedRows + " record(s) updated");
        res.status(200).send({ saved: true });
      });
});

// delete property
router.delete('/property/:id',checkAuth, (req, res) => {
    var sql = "DELETE FROM property WHERE id ="+ mysql.escape( parseInt(req.params.id));
    con.query(sql, function (err, result) {
      if (err) throw res.status(200).send({ saved: false });
      res.status(200).send({ deleted: true });
      console.log("Number of records deleted: " + result.affectedRows);
    }); 
});



// validate token received
function checkAuth(req, res, next) {
  var token = req.headers.authorization;
  try{
    if(token){
      JWT.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          var sql = "SELECT * FROM wlm.users WHERE idUser ="+ mysql.escape( parseInt(req.decoded.sub));
          con.query(sql, function (err, result) {
            try{
              if(result.length >0){
                console.log(req.decoded);
                next();
              }
              else{
                return res.json({
                  success: false,
                  message: 'User not found'
                });
              }
            }
            catch(err){
              throw err;
            }
          });
        }
      });
    }
  }
  catch(err){
    return res.json({
      success: false,
      message: 'Token is not valid'
    });
  }
}

// External API 

router.get('/ext/properties/search?',(req, res) => {
  urlQuery = req.query.apiKey;
  let apiKey = new Buffer(urlQuery.toString()).toString('base64');
  let decoded = new Buffer(urlQuery.toString(),'base64').toString('ascii');
  var sqlApi = "SELECT * FROM wlm.users WHERE apiKey ="+ mysql.escape(decoded);
  var sqlUrl = "SELECT * FROM wlm.users WHERE apiKey ="+ mysql.escape(urlQuery);
  
  con.query(sqlUrl, function (err, result) {
    if(result.length >0){
      res.status(401).send('API key needs to be encoded');
    }
    else{
      try{
          con.query(sqlApi, function (err, result){
              if(result.length >0){
                con.query("SELECT * FROM property", function (err, result, fields) {
                  if (err) throw res.status(404).send(results.error.details[0].message);
                  res.send(result);
                  
                });
              }
              else{
                res.status(401).send('unauthorized API');
              }
          });

      }
      catch(err){
        throw err;
      }
    }
  });

});


router.get('/ext/keys/search?',(req, res) => {
  urlQuery = req.query.apiKey;
  let apiKey = new Buffer(urlQuery.toString()).toString('base64');
  let decoded = new Buffer(urlQuery.toString(),'base64').toString('ascii');
  var sqlApi = "SELECT * FROM wlm.users WHERE apiKey ="+ mysql.escape(decoded);
  var sqlUrl = "SELECT * FROM wlm.users WHERE apiKey ="+ mysql.escape(urlQuery);
  
  con.query(sqlUrl, function (err, result) {
    if(result.length >0){
      res.status(401).send('API key needs to be encoded');
    }
    else{
      try{
          con.query(sqlApi, function (err, result){
              if(result.length >0){
                con.query("SELECT * FROM wlm.key", function (err, result, fields) {
                  if (err) throw res.status(404).send(results.error.details[0].message);
                  res.send(result);
                  
                });
              }
              else{
                res.status(401).send('unauthorized API');
              }
          });

      }
      catch(err){
        throw err;
      }
    }
  });

});

router.get('/ext/locations/search?',(req, res) => {
  urlQuery = req.query.apiKey;
  let apiKey = new Buffer(urlQuery.toString()).toString('base64');
  let decoded = new Buffer(urlQuery.toString(),'base64').toString('ascii');
  var sqlApi = "SELECT * FROM wlm.users WHERE apiKey ="+ mysql.escape(decoded);
  var sqlUrl = "SELECT * FROM wlm.users WHERE apiKey ="+ mysql.escape(urlQuery);
  
  con.query(sqlUrl, function (err, result) {
    if(result.length >0){
      res.status(401).send('API key needs to be encoded');
    }
    else{
      try{
          con.query(sqlApi, function (err, result){
              if(result.length >0){
                con.query("SELECT * FROM wlm.klocation", function (err, result, fields) {
                  if (err) throw res.status(404).send(results.error.details[0].message);
                  res.send(result);
                  
                });
              }
              else{
                res.status(401).send('unauthorized API');
              }
          });

      }
      catch(err){
        throw err;
      }
    }
  });

});

/*
Register new users
*/
router.post('/user', checkAuth,(req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  var sql = 'INSERT INTO users ( firstName, lastName, email, password) VALUES (?,?,?,?)';

  const user_ =[['Robert','Ocran','bobkbm@gmail.com','Password'], ['Charlotte','Ocran','rocyservice@gmail.com','Allen']] ;

  con.query(sql, [firstName,lastName ,email, password], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  res.send(user_);
});

module.exports = router;
