var sw = {
    seconds: 0,
    minutes: 0,
    timer: null,
}

function InitializeStopwatch() {
    var button = document.getElementById('watchbutton');
    button.onclick = function()  {
        var button = document.getElementById('watchbutton');
        button.classList.add('hidden');
        sw.timer = setInterval(Tick, 1000);
    }
}

function Tick()  {
    sw.seconds++;
    if (sw.seconds > 59) {
        sw.minutes++;
        sw.seconds = 0;
    }
    var min = document.getElementById('minutes');
    var sec = document.getElementById('seconds');
    min.innerText = sw.minutes.toString().padStart(2, '0');
    sec.innerText = sw.seconds.toString().padStart(2, '0');
}

window.addEventListener("load", InitializeStopwatch);