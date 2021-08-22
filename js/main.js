"use strict";
var billAmount = document.querySelector('#bill');
var numberOfPeople = document.querySelector('#numOfPeople');
var inputs = document.querySelectorAll('input');
var tipAmount = document.querySelectorAll('.buttons button:not(:last-child)');
var buttons = document.querySelectorAll('.buttons button');
var activeButton = document.querySelector('button.active');
var customAmount = document.querySelector('#customAmount');
var perPersonTotal = document.querySelector('#perPerson');
var eachPersonCharge = document.querySelector('#eachPersonCharge');
var format = function (amount) {
    if (amount.length < 0) {
        return 0.00;
    }
    if (amount.indexOf('.') < 0) {
        return parseFloat(amount);
    }
    var i = amount.indexOf('.');
    var newAmount = amount.substr(0, i + 3);
    return parseFloat(newAmount);
};
var calcTotals = function () {
    // 1 ) get (bill Amount) fixed to 2 decimal points 
    var bill = parseFloat(parseFloat(billAmount.value).toFixed(2));
    // 2 ) get (number of people) fixed to 0 decimal points
    var people = parseInt(numberOfPeople.value);
    // 3 ) get (tip percent active) 
    var percentValue = activeButton.innerHTML.trim();
    if (percentValue == 'Custom') {
        // 3.2) get from other input
        percentValue = "1";
    }
    else {
        percentValue = percentValue.split('%')[0];
    }
    percentValue = parseFloat(percentValue) / 100;
    var tip = (bill * percentValue), eachPersonTip = ((bill + (bill * percentValue)) / people).toString(), eachPersonTotal = Math.round(parseFloat(parseFloat((tip / people).toString()).toFixed(2)));
    eachPersonCharge.innerHTML = "R" + format(eachPersonTip);
    perPersonTotal.innerHTML = "R" + eachPersonTotal;
};
var toggleActiveButton = function (event) {
    // 0 ) check if button does not have class active
    var target = event.target;
    if (target.classList.contains('active')) {
        return;
    }
    ;
    // 1 ) remove active from all buttons
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });
    // 2 ) add active class to current button and set variable [activeButton] to current element
    target.classList.add('active');
    activeButton = target;
    // 3 ) calculate totalAmounts
    calcTotals();
};
inputs.forEach(function (input) {
    input.addEventListener('change', calcTotals);
    input.addEventListener('keyup', calcTotals);
});
buttons.forEach(function (button) {
    button.addEventListener('click', toggleActiveButton);
});
//# sourceMappingURL=main.js.map