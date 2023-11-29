//Connection TEST - console.log("Test"); - SUCCESSFUL

const jobRoleField = document.querySelector('#title');
const otherJobRoleField = document.querySelector('#other-job-role');
const colorField = document.querySelector('#color');
const designField = document.querySelector('#design');
const activitiesFieldset = document.querySelector('#activities');
const paymentField = document.querySelector('#payment');

/* add focus at the first input when the page loads */
window.addEventListener("load", () => {
    document.querySelector('#name').focus();
    otherJobRoleField.style.display = "none"; //hide optional Other Job Role field
    colorField.disabled = true; //color field disabled
    paymentField.children[1].setAttribute("selected", ""); //set credit card payment default as default
    document.querySelector('#paypal').setAttribute("hidden", ""); // hide other payment methods boxes
    document.querySelector('#bitcoin').setAttribute("hidden", "");
});

/* show or hide "other job role" input in case of the value of the Job Role selector */
jobRoleField.addEventListener("change", () => {
    if(jobRoleField.value === "other") {
        otherJobRoleField.style.display = "block";
    } else {
        otherJobRoleField.style.display = "none";
    }
});

/* show only the colors of each model of t-shirt */
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

/* Activities Section */
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

/* Payment info Section */
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