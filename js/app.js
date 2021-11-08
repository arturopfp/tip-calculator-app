const numberOfPeople = document.getElementById('people-input');
const radioBtns = document.querySelectorAll('input[name="options"]');
const radioLabel = document.querySelectorAll('.tip-txt');
let restBtn = document.getElementById('reset-btn');
let resultTip = document.getElementById('result-tip');
let resultTotal = document.getElementById('result-total');
let bill = document.getElementById('bill-total');




for(i = 0; i < radioBtns.length; i++) {
    radioBtns[i].onclick = function(e) {
        if(e.target.classList[0] === 'input-custom') {
            radioLabel.forEach( e => {
                e.classList.remove('checked');
                e.checked = false;
            })
            this.checked = false;
        } else if(e.target.nextElementSibling.classList[1] === 'checked') {
                radioLabel.forEach( e => {
                    e.classList.remove('checked');
                    e.checked = false;
                })
                this.nextElementSibling.classList.remove('checked')
                this.checked = false;
        } else {
            radioLabel.forEach( e => {
                e.classList.remove('checked');
                e.checked = false;
            })
            this.nextElementSibling.classList.add('checked')
            this.checked = true;
        }

    }
}


const tipCalculator = (bill, tip) => {
    let result = Math.floor(tip / 100 * bill)
    return result;
}

const resetApp = (e) => {
    if(restBtn.classList[0] === 'reset-btn-active') {
        bill.value = '';
        radioLabel.forEach( e => {
            e.classList.remove('checked');
            e.checked = false;
        })
        numberOfPeople.value = '';
        resultTip.innerHTML = '$0';
        resultTotal.innerHTML = '$0';
        restBtn.classList.add('reset-btn-disable');
        restBtn.classList.remove('reset-btn-active');
    } 
}



numberOfPeople.addEventListener('focusout', () => {
    const errTxt = document.getElementById('error-txt')
    const checked = document.querySelector('input[name="options"]:checked');
    
    let customTip = document.getElementById('custom-tip');
    let bill = document.getElementById('bill-total').value;
    bill = parseInt(bill);

    console.log(customTip.value)

    

    if(numberOfPeople.value > 0 && customTip.value === '') {
        const percentageLabel = checked.nextElementSibling;
        let percentage = parseInt(percentageLabel.innerHTML);

        errTxt.classList.add("hidding");
        numberOfPeople.classList.remove("error-input");
        resultTip.innerHTML = '$' + tipCalculator(bill, percentage) / parseInt(numberOfPeople.value)
        resultTotal.innerHTML = '$' + (tipCalculator(bill, percentage) + bill) / parseInt(numberOfPeople.value);
        restBtn.classList.remove('reset-btn-disable');
        restBtn.classList.add('reset-btn-active')

    } else if( numberOfPeople.value > 0 && customTip.value !== '') {
        errTxt.classList.add("hidding");
        numberOfPeople.classList.remove("error-input");
        resultTip.innerHTML = '$' + tipCalculator(bill, customTip.value) / parseInt(numberOfPeople.value)
        resultTotal.innerHTML = '$' + (tipCalculator(bill, customTip.value) + bill) / parseInt(numberOfPeople.value);
        restBtn.classList.remove('reset-btn-disable');
        restBtn.classList.add('reset-btn-active')
    } else {
        errTxt.classList.remove("hidding");
        numberOfPeople.classList.add("error-input");
        restBtn.classList.add('reset-btn-disable');
        restBtn.classList.remove('reset-btn-active');
    }
})