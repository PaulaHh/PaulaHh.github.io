
function emptyInputAfterSubmit() {
    document.getElementById("emailAddress").value = "";
    document.getElementById("message").value = "";
}

function sendMessage() {
    const form = document.querySelector("#form")
    const submitButton = document.querySelector("#submitButton")
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyVJsxRWBaqnoTLrNyPie5reCajBMYGGI7KFLx6T3j5mL-1jrGMVTQKFZ-DYF8-dm25/exec'
    
    form.addEventListener('submit', e => {
        submitButton.disabled = true;
        e.preventDefault();
        let payload = {
            email: document.getElementById("emailAddress").value,
            message: document.getElementById("message").value
        };
        fetch(scriptURL, { 
            method: 'POST', 
            body: JSON.stringify(payload),
            mode: "no-cors",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            console.log('Success!', response);
            submitButton.disabled = false;
            emptyInputAfterSubmit();
        })
        .catch(error => {
            console.log('Error!', error.message);
            submitButton.disabled = false;
        })
    })
}

sendMessage();