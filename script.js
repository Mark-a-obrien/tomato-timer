const minutes = document.querySelector("[data-time=minutes]");
const seconds = document.querySelector("[data-time=seconds]");
const stop = document.querySelector("#stop");
const timerTypes = document.querySelectorAll("[data-timerType]");


const times = {
    pomodoro : "25",
    shortBreak : "05",
    longBreak : "15"
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
        setTime(timer, times[timer.id]);
        stopTime();
    });
})


// checks if the timer is done
const checkIfTimerComplete = (min, sec) => {
    if (min <= 0 && sec <= 0) {
        alert("Time to take a short break")
        stopTime();
        setTime(timerTypes[1], times[timerTypes[1].id]);
        return true;
    }
}

// default time
setTime(timerTypes[0], times[timerTypes[0].id]);






// ---------------Tasks----------------












