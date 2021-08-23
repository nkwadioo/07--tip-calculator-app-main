"use strict";
var billAmount = document.querySelector('#bill');
var numberOfPeople = document.querySelector('#numOfPeople');
var customAmount = document.querySelector('#custom');
var inputs = document.querySelectorAll('input');
var tipAmount = document.querySelectorAll('.buttons button:not(:last-child)');
var buttons = document.querySelectorAll('.buttons button');
var activeButton = document.querySelector('button.active');
var perPersonTotal = document.querySelector('#perPerson');
var eachPersonCharge = document.querySelector('#eachPersonCharge');
var reset = document.getElementById('reset');
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
    var _a, _b, _c, _d, _e, _f;
    // 1 ) get (bill Amount) fixed to 2 decimal points 
    eachPersonCharge.innerHTML = "R0.00";
    perPersonTotal.innerHTML = "R0.00";
    var bill = parseFloat(parseFloat(billAmount.value).toFixed(2));
    if (!parseInt(numberOfPeople.value) || parseInt(numberOfPeople.value) <= 0) {
        return (_a = numberOfPeople.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('error');
    }
    else {
        (_b = numberOfPeople.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('error');
    }
    if (!parseInt(billAmount.value) || parseInt(billAmount.value) <= 0) {
        return (_c = billAmount.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add('error');
    }
    else {
        (_d = billAmount.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove('error');
    }
    if ((!parseInt(customAmount.value) || parseInt(customAmount.value) < 0) && activeButton.id == 'customAmount') {
        return (_e = customAmount.parentElement) === null || _e === void 0 ? void 0 : _e.classList.add('error');
    }
    else {
        (_f = customAmount.parentElement) === null || _f === void 0 ? void 0 : _f.classList.remove('error');
    }
    // 2 ) get (number of people) fixed to 0 decimal points
    var people = parseInt(numberOfPeople.value);
    // 3 ) get (tip percent active) 
    var percentValue = activeButton.innerHTML.trim();
    if (activeButton.id == 'customAmount') {
        // 3.2) get from other input
        // 3.3) check value
        var value = customAmount.value;
        if (parseInt(value) > 0) {
            percentValue = value;
        }
        else {
            percentValue = "0";
        }
    }
    else {
        percentValue = percentValue.split('%')[0];
        customAmount.value = "";
    }
    percentValue = parseFloat(percentValue) / 100;
    var tip = bill * percentValue, eachPersonTip = ((bill + (bill * percentValue)) / people).toString(), eachPersonTotal = (tip / people).toString();
    eachPersonCharge.innerHTML = "R" + parseFloat(format(eachPersonTip).toString()).toFixed(2);
    perPersonTotal.innerHTML = "R" + parseFloat(format(eachPersonTotal).toString()).toFixed(2);
};
var toggleActiveButton = function (event) {
    // 0 ) check if button does not have class active
    var target = event.target;
    if (target.id === 'custom') {
        target = target.parentElement;
    }
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
var addInputVisibility = function (event) {
    var _a;
    var input = event.target;
    (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('visible');
};
var removeInputVisibility = function (event) {
    var _a;
    var input = event.target;
    (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('visible');
};
inputs.forEach(function (input) {
    input.addEventListener('change', calcTotals);
    input.addEventListener('keyup', calcTotals);
    input.addEventListener('focusin', addInputVisibility);
    input.addEventListener('focusout', removeInputVisibility);
});
buttons.forEach(function (button) {
    button.addEventListener('click', toggleActiveButton);
});
reset === null || reset === void 0 ? void 0 : reset.addEventListener('click', function () {
    location.reload();
});
//# sourceMappingURL=main.js.map