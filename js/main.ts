const billAmount = <HTMLInputElement> document.querySelector('#bill');
const numberOfPeople = <HTMLInputElement> document.querySelector('#numOfPeople');
const customAmount = <HTMLInputElement> document.querySelector('#custom');
const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input')

const tipAmount = document.querySelectorAll('.buttons button:not(:last-child)');
const buttons = document.querySelectorAll('.buttons button');
let activeButton = <HTMLButtonElement> document.querySelector('button.active');

const perPersonTotal = <HTMLElement> document.querySelector('#perPerson');
const eachPersonCharge = <HTMLElement> document.querySelector('#eachPersonCharge');

const reset = document.getElementById('reset');

const format = (amount: string): number => {
    if (amount.length < 0) { return 0.00}
    if (amount.indexOf('.') <0) { return parseFloat(amount)}

    const i = amount.indexOf('.');
    const newAmount = amount.substr(0, i+3);

    return parseFloat(newAmount)

}

const calcTotals = () => { // when both billAmount and number of people change value
    // 1 ) get (bill Amount) fixed to 2 decimal points 
    eachPersonCharge.innerHTML = `R0.00`;
    perPersonTotal.innerHTML = `R0.00`;
    const bill = parseFloat(parseFloat(billAmount.value).toFixed(2))
    if(!parseInt(numberOfPeople.value) || parseInt(numberOfPeople.value) <= 0) {
        return numberOfPeople.parentElement?.classList.add('error');
    } else {
        numberOfPeople.parentElement?.classList.remove('error');
    }
    if (!parseInt(billAmount.value) || parseInt(billAmount.value) <= 0) {
        return billAmount.parentElement?.classList.add('error');
    } else {
        billAmount.parentElement?.classList.remove('error');
    }
    if ((!parseInt(customAmount.value) || parseInt(customAmount.value) < 0) && activeButton.id == 'customAmount') {
        return customAmount.parentElement?.classList.add('error');
    } else {
        customAmount.parentElement?.classList.remove('error');
    }
    
    // 2 ) get (number of people) fixed to 0 decimal points
    const people = parseInt(numberOfPeople.value);
    // 3 ) get (tip percent active) 
    let percentValue: string | number = activeButton.innerHTML.trim();
    if (activeButton.id == 'customAmount') {
        // 3.2) get from other input
        // 3.3) check value
        const value = customAmount.value;
        if (parseInt(value) > 0 ) {
            percentValue = value;
        } else {
            percentValue = "0";
        }
    } else {
        percentValue = percentValue.split('%')[0];
        customAmount.value = "";
    }

    percentValue = parseFloat(percentValue) / 100;
    let tip = bill * percentValue,
    eachPersonTip = ((bill + (bill * percentValue)) / people).toString(),
    eachPersonTotal = (tip / people).toString();

    eachPersonCharge.innerHTML = `R${parseFloat(format(eachPersonTip).toString()).toFixed(2)}`;
    perPersonTotal.innerHTML = `R${parseFloat(format(eachPersonTotal).toString()).toFixed(2)}`;

};

const toggleActiveButton = (event: Event) => {
    // 0 ) check if button does not have class active
    let target = <HTMLElement> event.target;
    if (target.id === 'custom') {
        target = <HTMLElement> target.parentElement
    }
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

const addInputVisibility = (event: Event) => {
    const input = <HTMLDivElement> event.target;
    input.parentElement?.classList.add('visible')
}
const removeInputVisibility = (event: Event) => {
    const input = <HTMLDivElement> event.target
    input.parentElement?.classList.remove('visible')
}

inputs.forEach( input => {
    input.addEventListener('change', calcTotals);
    input.addEventListener('keyup', calcTotals);
    input.addEventListener('focusin', addInputVisibility)
    input.addEventListener('focusout', removeInputVisibility)
});

buttons.forEach( button => {
    button.addEventListener('click', toggleActiveButton)
})

reset?.addEventListener('click', () => {
    location.reload()
})

