// Tiempo de cada turno
let TIME_LIMIT = 120;

const FULL_DASH_ARRAY = 283

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

function formatTime(timeLeft) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(timeLeft / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = timeLeft % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
}

const startTimer = () => {
    timePassed = 0;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", FULL_DASH_ARRAY);
    return new Promise((resolved) => {
        document.getElementById("base-timer-label").innerHTML = formatTime(TIME_LIMIT);
        timerInterval = setInterval(() => {
            timePassed++;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);

            setCircleDasharray();

            if (timeLeft == 0) {
                clearInterval(timerInterval);
                resolved(true);
            }
        }, 1000);
    })
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}


// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

document.getElementById("timerCountdown").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="${FULL_DASH_ARRAY}"
        class="base-timer__path-remaining"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTime(TIME_LIMIT)}
  </span>
</div>
`;