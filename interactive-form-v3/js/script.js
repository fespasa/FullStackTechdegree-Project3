//Connection TEST - console.log("Test"); - SUCCESSFUL

const jobRoleField = document.querySelector('#title');
const otherJobRoleField = document.querySelector('#other-job-role');
const colorField = document.querySelector('#color');
const designField = document.querySelector('#design');
const activitiesFieldset = document.querySelector('#activities');
const paymentField = document.querySelector('#payment');
const conferenceForm = document.querySelector('form');
const activitiesInputs = document.querySelectorAll('#activities input');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ccNumRegex = /^\d{13,16}$/;
const ccZipRegex = /^\d{5}$/;
const ccCvvRegex = /^\d{3}$/;

/*===== add focus at the first input when the page loads =====*/
window.addEventListener("load", () => {
    document.querySelector('#name').focus();
    otherJobRoleField.style.display = "none"; //hide optional Other Job Role field
    colorField.disabled = true; //color field disabled
    paymentField.children[1].setAttribute("selected", ""); //set credit card payment default as default
    document.querySelector('#paypal').setAttribute("hidden", ""); // hide other payment methods boxes
    document.querySelector('#bitcoin').setAttribute("hidden", "");
});

/*===== show or hide "other job role" input in case of the value of the Job Role selector =====*/
jobRoleField.addEventListener("change", () => {
    if(jobRoleField.value === "other") {
        otherJobRoleField.style.display = "block";
    } else {
        otherJobRoleField.style.display = "none";
    }
});

/*===== show only the colors of each model of t-shirt =====*/
designField.addEventListener("change", (e) => {
    colorField.disabled = false;
    colorField.firstElementChild.removeAttribute("selected");
    for (let i = 1; i < colorField.children.length; i++) {
        if(e.target.value === colorField.children[i].getAttribute("data-theme")){
            colorField.children[i].removeAttribute("hidden");
        } else {
            colorField.children[i].setAttribute("hidden", "");
        }
    }
    document.querySelector(`[data-theme='${e.target.value}']`).setAttribute("selected", "");
});

/*===== Activities Section =====*/
let totalCost = 0;
activitiesFieldset.addEventListener("change", (e) => {
    if (e.target.hasAttribute("selected")) {
        e.target.removeAttribute("selected");
        totalCost -= parseInt(e.target.getAttribute("data-cost"), 10);
    } else {
        e.target.setAttribute("selected", "");
        totalCost += parseInt(e.target.getAttribute("data-cost"), 10);
    }
    document.querySelector('#activities-cost').innerHTML = `Total: $${totalCost}`;
});

/*===== Payment info Section =====*/
paymentField.addEventListener("change", (e) => {
    const methodsBoxes = e.target.parentNode.parentNode.children;
    // I use a bucle to show or hide. If you add more payment methods it will work properly.
    for(let i = 2; i < methodsBoxes.length; i++){
        if (e.target.value === methodsBoxes[i].getAttribute("id")){
            methodsBoxes[i].removeAttribute("hidden");
        } else {
            methodsBoxes[i].setAttribute("hidden", "");
        }
    }
});

/*===== Form Validation =====*/
conferenceForm.addEventListener("submit", (e) => {
    let badFields = 0;
    const isFieldEmpty = (field) => {
        const fieldValue = field.value.trim();
        return fieldValue === "";
    }
    const isEmailValid = (field) => {
        const fieldValue = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(fieldValue);
    }
    // if it's not correct we set the no-valid class and show the hint. And we increment the number of badFields
    const isNotCorrect = (field) => {
        badFields += 1;
        if (field === activitiesFieldset){
            activitiesFieldset.classList.add('not-valid');
            activitiesFieldset.children[3].style.display = "inline";
            activitiesFieldset.classList.remove('valid');        
        } else {
            field.parentNode.classList.add('not-valid');
            field.nextElementSibling.style.display = "inline";
            field.parentNode.classList.remove('valid');
        }  
    }
    // if it's correct we add the valid class and we hide the hint
    const isCorrect = (field) => {
        if (field === activitiesFieldset){
            activitiesFieldset.classList.add('valid');
            activitiesFieldset.children[3].style.display = "none";
            activitiesFieldset.classList.remove('not-valid');        
        } else {
            field.parentNode.classList.add('valid');
            field.nextElementSibling.style.display = "none";
            field.parentNode.classList.remove('not-valid');
        }  
    }

    /* Name Validation - Not empty or blank */
    if(isFieldEmpty(nameField)){
        isNotCorrect(nameField);
    } else {
        isCorrect(nameField);
    }
    
    /* Email Validation - Correct email format */
    if(!isEmailValid(emailField)){
        isNotCorrect(emailField);
    } else {
        isCorrect(emailField);
    }

    /* Activities Validation - At least one selected */
    const activitiesInputs = document.querySelectorAll('#activities input');
    let activitiesCounter = 0;
    for (let i = 0; i < activitiesInputs.length; i++){
        if (activitiesInputs[i].hasAttribute("selected")){
            activitiesCounter++;
        }
    }
    if(activitiesCounter === 0){
        isNotCorrect(activitiesFieldset);
    } else {
        isCorrect(activitiesFieldset);
    }

    /* Credit Card Validation - 13 to 16 digit CC number */
    if(document.querySelector('#payment').value === "credit-card") {
        if(!ccNumRegex.test(document.querySelector('#cc-num').value)){ // CC nº field validation
            isNotCorrect(document.querySelector('#cc-num')); 
        } else {
            isCorrect(document.querySelector('#cc-num'));
        }
        if(!ccZipRegex.test(document.querySelector('#zip').value)){ // zip field validation
            isNotCorrect(document.querySelector('#zip'));
        } else {
            isCorrect(document.querySelector('#zip'));
        }
        if(!ccCvvRegex.test(document.querySelector('#cvv').value)){ // cvv field validation
            isNotCorrect(document.querySelector('#cvv'));
        } else {
            isCorrect(document.querySelector('#cvv'));
        }
    }
    if (badFields > 0){
        e.preventDefault();
    }
});

/*===== Activities Section Visibility =====*/
for (let i = 0; i < activitiesInputs.length; i++) {
    //add focus class when it focuses
    activitiesInputs[i].addEventListener('focus', () => {
        activitiesInputs[i].parentNode.classList.add('focus');
    });
    //remove focus class when it blurs
    activitiesInputs[i].addEventListener('blur', () => {
        activitiesInputs[i].parentNode.classList.remove('focus');
    });
    //conflicting activity times
    activitiesInputs[i].addEventListener('select', () => {
        const activityTime = activitiesInputs[i].getAttribute('data-day-and-time');
        for (let it = 0; it < activitiesInputs.length; it++){
            if ( it !== i){
                if (activitiesInputs[it].getAttribute('data-day-and-time') === activityTime){
                    activitiesInputs[it].parentNode.classList.add('disabled');
                } else {
                    activitiesInputs[it].parentNode.classList.remove('disabled');
                }
            }
        }
    });
}

