    const today = new Date();
    var dayOfWeek = today.getDay();
    var dayOfMonth = today.getDate();
    var month = today.getMonth();

    const addClass = document.getElementById("add-class");
    const addEvent = document.getElementById("add-event");
    const removeEvent = document.getElementById("remove-event");

    addClass.addEventListener("click", function() {
        window.location.href = "addClass.html";
    });
    
    addEvent.addEventListener("click", function() {
        window.location.href = "addEvent.html";
    });

    removeEvent.addEventListener("click", function() {
        window.location.href = "removeEvent.html";
    });


    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //these are the maximum number of days for the co-responding month
    var dayName = daysOfWeek[dayOfWeek];
    var monthName = months[month];

    //test events array
    //var events = ["Event F:9/26*0:00/0:00", "Event A:9/5*0:00/0:00", "Event B:9/8*0:00/0:00", "Event C:8/31*0:00/0:00", "Event D:9/6*0:00/0:00", "Event E:9/8*0:00/0:00"]
    //var events = ["First Week Complete:9/6*3:30pm", "First Day of School:9/4*8:45am/3:30pm"]
    import { eventsPromise } from './events.js';
    let events;
    eventsPromise.then(resolvedEvents => {
        console.log("resolved: ", resolvedEvents);
        events = resolvedEvents;
        console.log("events", events); // Use the jsonArray data here

        sortDates(events);

        const numDivs = daysAway(events);

        //2D array that will contain the info from dates split up into different elements
    
    
    // Get the container where divs will be appended
    const container = document.getElementById('schedule');
    // Clear previous divs (if any)
    container.innerHTML = '';
    // Loop to create the specified number of divs
    for (let i = 0; i < numDivs; i++) {
        //title div
        const divTitle = document.createElement('div');
        divTitle.classList.add('day-of-week');
        divTitle.textContent = dayName + ", " + monthName + " " + dayOfMonth;
        container.appendChild(divTitle);
        //event div
        let eventText = "";
        for (let j = 0; j < events.length; j++) {
            //use month+1 because month is usually used as the index in 'months' array
            if (month+1 === events[j].month && dayOfMonth === events[j].day) {
                if (eventText = "") {
                eventText += events[j].subject + " - " + events[j].time;
                }
                else {
                    let eventDiv = document.createElement('div');
                    eventDiv.classList.add('event-div');
                    eventDiv.textContent = events[j].subject + " - " + events[j].time;
                    container.appendChild(eventDiv);
                }
            }
        }
        const eventsDiv = document.createElement('div');
        eventsDiv.classList.add('event-div');
        eventsDiv.textContent = eventText;
        container.appendChild(eventsDiv);
        //increment variables
        dayOfWeek+=1;
        dayOfMonth+=1;
        //change the month if days exceed maximum
        if (dayOfMonth > daysInMonth[month]) {
            dayOfMonth=1;
            month++;
            monthName = months[month%12];
        }
        dayName = daysOfWeek[dayOfWeek%7];
    }
    });
    

    

    //insertion sort method to sort test dates
    function sortDates(dates) {
        for(let i = 0; i < dates.length; i++) {
            for (let j = i; j > 0; j--) {
                    let jMonth = dates[j].month;
                    let j1Month = dates[j - 1].month;
                    let jDay = dates[j].day;
                    let j1Day = dates[j - 1].day;
                    if (jMonth < j1Month) {
                        let temp = dates[j];
                        dates[j] = dates[j - 1];
                        dates[j - 1] = temp;
                    }
                    if (parseInt(jMonth) === parseInt(j1Month)) {
                        if (parseInt(jDay) < parseInt(j1Day)) {
                            let temp = dates[j];
                            dates[j] = dates[j - 1];
                            dates[j - 1] = temp;
                        }
                    }
            }
        }
    }

    function daysAway(events) {
        //dayOfMonth
        //month - 0 based number
        let inputDayOfMonth = events[events.length - 1].day;
        let inputMonth = events[events.length - 1].month - 1;
        console.log(inputDayOfMonth);
        console.log(inputMonth);
        //days away starts at one to include current input day
        let daysAway = 1;
        while (inputMonth !== month || inputDayOfMonth !== dayOfMonth) {
            if (inputMonth > month) {
                if (inputDayOfMonth === 0) {
                    inputMonth--;
                    inputDayOfMonth = daysInMonth[inputMonth];
                    if (inputMonth === month && inputDayOfMonth === dayOfMonth) {
                        break;
                    }
                }
                    daysAway++;
                    inputDayOfMonth--;
            }
            if (inputMonth === month) {
                if (inputDayOfMonth > dayOfMonth) {
                    inputDayOfMonth--;
                    daysAway++;
                }
            }
        }
        return daysAway;
    }