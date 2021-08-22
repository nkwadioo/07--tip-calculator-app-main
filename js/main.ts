const billAmount = <HTMLInputElement> document.querySelector('#bill');
const numberOfPeople = <HTMLInputElement> document.querySelector('#numOfPeople');
const inputs = document.querySelectorAll('input')

const tipAmount = document.querySelectorAll('.buttons button:not(:last-child)');
const buttons = document.querySelectorAll('.buttons button');
let activeButton = <HTMLButtonElement> document.querySelector('button.active');
const customAmount = document.querySelector('#customAmount');

const perPersonTotal = <HTMLElement> document.querySelector('#perPerson');
const eachPersonCharge = <HTMLElement> document.querySelector('#eachPersonCharge');

const format = (amount: string): number => {
    if (amount.length < 0) { return 0.00}
    if (amount.indexOf('.') <0) { return parseFloat(amount)}

    const i = amount.indexOf('.');
    const newAmount = amount.substr(0, i+3);

    return parseFloat(newAmount)

}

const calcTotals = () => { // when both billAmount and number of people change value
    // 1 ) get (bill Amount) fixed to 2 decimal points 
    const bill = parseFloat(parseFloat(billAmount.value).toFixed(2))
    // 2 ) get (number of people) fixed to 0 decimal points
    const people = parseInt(numberOfPeople.value);
    // 3 ) get (tip percent active) 
    let percentValue: string | number = activeButton.innerHTML.trim();
    if (percentValue == 'Custom') {
        // 3.2) get from other input
        percentValue = "1";
    } else {
        percentValue = percentValue.split('%')[0];
    }

    percentValue = parseFloat(percentValue) / 100;
    let tip = bill * percentValue,
    eachPersonTip = ((bill + (bill * percentValue)) / people).toString(),
    eachPersonTotal = parseFloat((tip / people).toString()).toFixed(2);

    eachPersonCharge.innerHTML = `R${format(eachPersonTip)}`;
    perPersonTotal.innerHTML = `R${eachPersonTotal}`;

};

const toggleActiveButton = (event: Event) => {
    // 0 ) check if button does not have class active
    const target = <HTMLElement> event.target;
    if (target.classList.contains('active')) {
        return;
    };
    // 1 ) remove active from all buttons
    buttons.forEach( button => {
        button.classList.remove('active');
    });
    // 2 ) add active class to current button and set variable [activeButton] to current element
    target.classList.add('active');
    activeButton = <HTMLButtonElement> target;
    // 3 ) calculate totalAmounts
    calcTotals();
};

inputs.forEach( input => {
    input.addEventListener('change', calcTotals);
    input.addEventListener('keyup', calcTotals);
});

buttons.forEach( button => {
    button.addEventListener('click', toggleActiveButton)
})

