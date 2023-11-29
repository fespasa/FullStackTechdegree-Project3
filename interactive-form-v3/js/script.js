//Connection TEST - console.log("Test"); - SUCCESSFUL

const jobRoleField = document.querySelector('#title');
const otherJobRoleField = document.querySelector('#other-job-role');
const colorField = document.querySelector('#color');
const designField = document.querySelector('#design');
const activitiesFieldset = document.querySelector('#activities');

/* add focus at the first input when the page loads */
window.addEventListener("load", () => {
    document.querySelector('#name').focus();
    otherJobRoleField.style.display = "none"; //hide optional Other Job Role field
    colorField.disabled = true; //color field disabled
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
    for (i = 1; i < colorField.children.length; i++) {
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