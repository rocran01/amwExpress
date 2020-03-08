const express = require('express');
const staticRouter = require('express').Router();
const path = require('path');
const mysql = require('mysql');



staticRouter.post('/payrol',(req, res) => {
    var taxYear = req.body.taxYear;
    var sLoan = req.body.sLoan;  
    var taxCode = req.body.taxCode;
    var salary = req.body.salary;
    var period = req.body.period;
    if(period ==1){
        var salary = salary;
    }
    else if(period ==2){
        var salary = salary * 12;
    }
    else{
        var salary = salary * 52;
    }

    var taxCode = taxCode.split(/(\d+)/);

    console.log(parseInt(taxCode[1]) * 10 );
    console.log(taxYear );
    con.query("SELECT * FROM ocy.employed WHERE ocy.employed.taxYear =" + mysql.escape( parseInt(taxYear)), function (err, result, fields) {
        if (err) throw res.status(404).send(results.error.details[0].message);
        var tax = (salary - result[0].pAllowance) * result[0].bRate;
        var netPay = Math.round((salary - tax)/12);
        var niPay = (salary - result[0].pAllowance) * result[0].bRate;
        var text = 'Net monthly pay of ' + niPay + ' with tax paid of ' + Math.round(tax/12 )+ ' and NI of ' + niPay;
        console.log(result[0].taxYear);
              res.render('pages/payrol', {   netPay: netPay, niPay: niPay, tax: tax/12 , bRate: result[0].bRate,
                 hRate: result[0].hRate, text: text  });
      });


    console.log(req.body);

  });
  

staticRouter.get('/',(req, res) => {
    res.render('pages/index');
});

staticRouter.get('/aboutus',(req, res) => {
    res.render('pages/aboutus');
});

staticRouter.get('/products',(req, res) => {
    res.render('pages/products');
});

staticRouter.get('/payrol',(req, res) => {
    res.render('pages/payrol',{pAllowance:'', bRate:'',hRate:'', tax:'', netPay: '',niPay:'', text: '' });
});


staticRouter.get('/contactus',(req, res) => {
    res.render('pages/contactus');
});


module.exports = staticRouter;