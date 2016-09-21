"use strict";
var $ = require('../files/node_modules/jquery/dist/jquery.min.js');
var FIXER_RESPONSE = { "base": "THB", "date": "2016-09-09", "rates": { "AUD": 0.037846, "BGN": 0.049892, "BRL": 0.093243, "CAD": 0.037244, "CHF": 0.027981, "CNY": 0.19203, "CZK": 0.68932, "DKK": 0.18986, "GBP": 0.02157, "HKD": 0.22294, "HRK": 0.19091, "HUF": 7.8725, "IDR": 377.46, "ILS": 0.10789, "INR": 1.9184, "JPY": 2.9553, "KRW": 31.738, "MXN": 0.54047, "MYR": 0.1176, "NOK": 0.23589, "NZD": 0.039027, "PHP": 1.3606, "PLN": 0.11057, "RON": 0.1135, "RUB": 1.8507, "SEK": 0.24239, "SGD": 0.038979, "TRY": 0.085304, "USD": 0.028744, "ZAR": 0.41173, "EUR": 0.02551 } };
function getrate() {
    $.ajax({
        url: "https://api.fixer.io/latest?base=THB",
        dataType: 'jsonp',
        success: function (json) {
            // do stuff with json (in this case an array)
            fx.rates = json.rates;
            FIXER_RESPONSE = json;
        },
        error: function () {
            alert("Sorry we can't get the rate right now, please try again later");
            fx.rates = FIXER_RESPONSE.rates;
        }
    });
}
// $(".main-content").on('click', function() {
// 	console.log(FIXER_RESPONSE.rates.USD)
// })
var selectedcurrency = 'NZD';
var selectedcurrency2 = 'USD';
var amount = 1;
var inputamount = $("input-amount")[0];
var currencydropdown = $("#currency-dropdown")[0];
var currencydropdown2 = $("#currency-dropdown-2")[0];
inputamount.addEventListener("change", function () {
    var amount = document.getElementById("input-amount").value;
    var rate = fx(amount).from(selectedcurrency).to(selectedcurrency2);
    var rate = +rate.toFixed(2);
    var rate = rate.toLocaleString();
    document.getElementById("output-amount").innerHTML = '$' + rate + '  ' + selectedcurrency2;
});
currencydropdown.addEventListener("change", function () {
    selectedcurrency = $("#currency-dropdown option:selected").attr("value");
    console.log(selectedcurrency);
    var rate = fx(amount).from(selectedcurrency).to(selectedcurrency2);
    var rate = +rate.toFixed(2);
    var rate = rate.toLocaleString();
    console.log(rate);
    document.getElementById("output-amount").innerHTML = '$' + rate + '  ' + selectedcurrency2;
});
currencydropdown2.addEventListener("change", function () {
    selectedcurrency2 = $("#currency-dropdown-2 option:selected").attr("value");
    console.log(selectedcurrency2);
    var rate = fx(amount).from(selectedcurrency).to(selectedcurrency2);
    var rate = +rate.toFixed(2);
    var rate = rate.toLocaleString();
    console.log(rate);
    document.getElementById("output-amount").innerHTML = '$' + rate + '  ' + selectedcurrency2;
});
var demo = function (data) {
    fx.rates = data.rates;
    var rate = fx(1).from(selectedcurrency).to(selectedcurrency2);
    var rate = +rate.toFixed(2);
    var rate = rate.toLocaleString();
    document.getElementById("output-amount").innerHTML = '$' + rate + '  ' + selectedcurrency2;
    // console.log("£1 = $" + rate.toFixed(1));
    // console.log(rate);
    // console.log(fx.rates);
};
$.getJSON("https://api.fixer.io/latest?base=THB", demo);
