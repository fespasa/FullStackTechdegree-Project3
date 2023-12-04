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
const ccNumField = document.querySelector('#cc-num');
const zipField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');

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
    const isFieldEmpty = (field) => {
        const fieldValue = field.value.trim();
        return fieldValue === "";
    }
    const isEmailValid = (field) => {
        const fieldValue = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(fieldValue);
    }
    const noSubmit = (validationField) => {
        console.log(validationField);
        const condition = false;
        switch (validationField) {
            case nameField:
                condition = isFieldEmpty(nameField);
            case emailField:
                condition = isFieldEmpty(emailField);
            case activitiesInputs:
                let activitiesCounter = 0;
                for (let i = 0; i < activitiesInputs.length; i++){
                    if (activitiesInputs[i].hasAttribute("selected")){
                        activitiesCounter++;
                    }
                }
                condition = activitiesCounter === 0;
            case ccNumField:
                condition = !ccNumRegex.test(ccNumField.value);
            case zipField:
                condition = !ccZipRegex.test(zipField.value);
            case cvvField:
                condition = !ccCvvRegex.test(cvvField.value);
        }
    
        if(condition) {
            console.log(`No Valid ${validationField}`);
            e.preventDefault();
            validationField.parentNode.classList.add('no-valid');
            validationField.parentNode.classList.remove('valid');
        } else {
            e.preventDefault();
            console.log(`Valid ${validationField}`);
            validationField.parentNode.classList.add('valid');
            validationField.parentNode.classList.remove('no-valid');
        }
    }

    /* Name Validation - Not empty or blank */
    noSubmit(isFieldEmpty(nameField));

    /* Email Validation - Correct email format */
    noSubmit(!isEmailValid(emailField));

    /* Activities Validation - At least one selected */
    noSubmit(activitiesInputs);

    /* Credit Card Validation - 13 to 16 digit CC number */
    if(document.querySelector('#payment').value === "credit-card") {
        noSubmit(ccNumField); // CC nº field validation
        noSubmit(zipField); // zip field validation
        noSubmit(cvvField); // cvv field validation
    }
});

/*===== Activities Section Visibility =====*/
for (let i = 0; i < activitiesInputs.length; i++) {
    //add focus class when it focuses
    activitiesInputs[i].addEventListener('focus', function() {
        activitiesInputs[i].parentNode.classList.add('focus');
    });
    //remove focus class when it blurs
    activitiesInputs[i].addEventListener('blur', function() {
        activitiesInputs[i].parentNode.classList.remove('focus');
    });
}