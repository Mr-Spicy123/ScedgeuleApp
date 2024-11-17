const today = new Date();
var day = today.getDate();
var month = today.getMonth();

export const eventsPromise = fetch('./sample-text.json')
    .then(response => response.json())
    .catch(error => console.error('Error loading JSON:', error));