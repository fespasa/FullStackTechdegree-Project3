//Connection TEST - console.log("Test"); - SUCCESSFUL

const jobRoleField = document.querySelector('#title');
const otherJobRoleField = document.querySelector('#other-job-role');

/* add focus at the first input when the page loads */
window.addEventListener("load", () => {
    document.querySelector('#name').focus();
    otherJobRoleField.style.display = "none"; //hide optional Other Job Role field
});

/* show or hide "other job role" input in case of the value of the Job Role selector */
jobRoleField.addEventListener("change", (e) => {
    if(jobRoleField.value === "other") {
        otherJobRoleField.style.display = "block";
    } else {
        otherJobRoleField.style.display = "none";
    }
});