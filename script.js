const minutes = document.querySelector("[data-time=minutes]");
const seconds = document.querySelector("[data-time=seconds]");
const stop = document.querySelector("#stop");
const timerTypes = document.querySelectorAll("[data-timerType]");
const count = document.querySelector("#count");
const alarm = new Audio("audio/alarm.wav");

let currentTimerType = "pomodoro";
const times = {
    pomodoro : {text: "pomodoro", time: "25"},
    shortBreak : {text: "shortBreak", time: "05"},
    longBreak : {text: "longBreak", time: "15"}
} 

// sets the timer
const setTime = (type, min) => {

    // removes the current-timer class 
    timerTypes.forEach((timer) => {
        timer.classList.remove("current-timer");
    });

    if (type.id === "pomodoro")
        setStyle("#d95550", "Time to focus!"); 
    else if (type.id === "shortBreak")
        setStyle("#4c9195", "Time for a break!");
    else 
        setStyle("#457ca3", "Time for a break!");

    type.classList.add("current-timer");
    minutes.textContent = min;
    seconds.textContent = "00";
}

// sets the styles of the page depdending on which timer type is selected
const setStyle = (bodyColor, msg) => {
    document.body.style.backgroundColor = bodyColor;
    document.querySelector("#message").textContent = msg
    stop.style.color = document.body.style.backgroundColor;
}


// stops the timer  
const stopTime = () => {
    clearInterval(timer);
    stop.textContent = "START";
    stop.dataset.on = "off";
} 

// starts the timer
const startTime = () => {
    stop.textContent = "STOP";
    stop.dataset.on = "on";
    timer = setInterval(countDown, 1000); 
}

// counts down the time on the timer
const countDown = () => {
    seconds.textContent--;

    // puts a zero infront of the number if it is less than or equal to 9
    if (seconds.textContent.length === 1) 
        seconds.textContent = "0"+seconds.textContent;

    if (checkIfTimerComplete(minutes.textContent, seconds.textContent))
        return;

    if (seconds.textContent <= 0 || seconds.textContent === "00") {
        minutes.textContent--;
        if (minutes.textContent.length === 1) 
            minutes.textContent = "0"+minutes.textContent;

        seconds.textContent = 59; 
    }
}

// turns on and off the timer
let timer;
stop.addEventListener("click", () => {
    if (stop.dataset.on === "on") {
        stopTime();
    } else {
        startTime();
    }
});

// adds a spacific time to each timer type
timerTypes.forEach((timer) => {
    timer.addEventListener("click", () => {
        setTime(timer, times[timer.id].time);
        stopTime();
        currentTimerType = timer.id;
        console.log(currentTimerType);
    });
})


// checks if the timer is done
const checkIfTimerComplete = (min, sec) => {
    if (min <= 0 && sec <= 0) {
        alarm.play();

        const setTimerType = (text, index) => {
            alert(text);
            stopTime();
            setTime(timerTypes[index], times[timerTypes[index].id].time);
            currentTimerType = times[timerTypes[index].id].text;
        }

        if (currentTimerType === "pomodoro") {
            let i = 1;
            let text = "short";
            if (countValue % 4 === 0) {
                i = 2; 
                text="long"
            }
            setTimerType(`Time to take a ${text} break`, i);  
            addToCount();
        } else {
            setTimerType("Time to study", 0);
        }

        // switch (currentTimerType) {
        //     case "pomodoro" : setTimerType("Time to take a short break", 1); break;
        //     case "shortBreak" : setTimerType("Time to study", 0); break;
        //     case "longBreak" : setTimerType("Time to study", 0); break;
        // }

        return true;
    }
}

// default time
setTime(timerTypes[0], times[timerTypes[0].id].time);


//Adds to count when a timer is complete.
let countValue;
const addToCount = () => {  
    num = parseInt(count.textContent.substring(1,2));
    countValue = num++;
    count.textContent = `#${num}`;
}




// ---------------Tasks----------------

// create task

// edit task

// delete task










