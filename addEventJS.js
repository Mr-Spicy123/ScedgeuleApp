const submit = document.getElementById("submit");
const subjectTextField = document.getElementById("subjectTF");
const monthTextField = document.getElementById("monthTF");
const dayTextField = document.getElementById("dayTF");
const timeTextField = document.getElementById("timeTF");

submit.addEventListener("click", function() {
    addEvent(subjectTextField.value);
    subjectTextField.value = "";
});

subjectTextField.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        addEvent(subjectTextField.value, parseInt(monthTextField.value), parseInt(dayTextField.value), timeTextField.value);
        subjectTextField.value = "";
        monthTextField.value = "";
        dayTextField.value = "";
        timeTextField.value = "";
    }
});

function addEvent(sub, m, d, t) {
    const fs = require('fs');
    const path = './sample-text.json';

    var newEvent = {
        subject: sub,
        month: m,
        day: d,
        time: t,
    };

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        let jsonArray = JSON.parse(data);

        jsonArray.push(newEvent);

        fs.writeFile(path, JSON.stringify(jsonArray, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return;
            }
        });
    });
}
