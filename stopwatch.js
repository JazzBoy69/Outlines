var sw = {
    seconds: 0,
    minutes: 0,
    timer: null,
}

function InitializeStopwatch() {
    const button = document.getElementById('watchbutton');
    button.onclick = function()  {
        HideBackgroundInfo();
        const watch = document.getElementById('stopwatch');
        if (watch.classList.contains('armed')) {
            StartClock();
            return;
        }
        watch.classList.add('armed');
    }
}

function StartClock() {
    HighlightSection(0);
    ShowToolbar();
    const button = document.getElementById('watchbutton');
    button.classList.add('hidden');
    const watch = document.getElementById('stopwatch');
    watch.classList.remove('inactive');
    watch.classList.remove('armed');
    sw.timer = setInterval(Tick, 1000);
}

function Tick()  {
    sw.seconds++;
    if (sw.seconds > 59) {
        sw.minutes++;
        sw.seconds = 0;
    }
    let min = document.getElementById('minutes');
    let sec = document.getElementById('seconds');
    min.innerText = sw.minutes.toString().padStart(2, '0');
    sec.innerText = sw.seconds.toString().padStart(2, '0');
}

function HideBackgroundInfo() {
    const backgroundInfo = document.getElementsByClassName('backgroundinfo');
    for (let i=0; i<backgroundInfo.length; i++) {
        backgroundInfo[i].classList.add('hidden');
    }
}

function HighlightSection(index) {
    const sections = document.getElementsByClassName('timediv');
    for (let i=0; i<sections.length; i++) {
        if (i == index) {
            sections[i].classList.remove('hidden');
            continue;
        }
        if (sections[i].classList.contains('hidden')) continue;
        sections[i].classList.add('hidden');
    }
}

function ShowToolbar() {
    const sections = document.getElementsByClassName('timediv');
    if (sections.length === 0) return;
    const toolbar = document.getElementById('toolbar');
    toolbar.classList.remove('inactive');
}

function GoBack() {
    let activeIndex = GetActiveIndex();
    if ((activeIndex === 0) || (activeIndex === -1)) return;
    activeIndex--;
    HighlightSection(activeIndex);
}

function GoForward() {
    let activeIndex = GetActiveIndex();
    const sections = document.getElementsByClassName('timediv');
    if ((activeIndex >= sections.length-1) || (activeIndex === -1)) return;
    activeIndex++;
    HighlightSection(activeIndex);
}

function GetActiveIndex() {
    const sections = document.getElementsByClassName('timediv');
    for (let i=0; i<sections.length; i++) {
        if (!sections[i].classList.contains('hidden')) return i;
    }
    return -1;
}

window.addEventListener("load", InitializeStopwatch);