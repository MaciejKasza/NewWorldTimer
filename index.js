//Computing clock font-size and cords while resize
function calcClockFontSize() {
  const wrapper = document.querySelector(".wrapper");

  const fontSize = Math.floor(100 * (wrapper.clientWidth / 1920));

  return fontSize;
}

function calcClockPosiotion() {
  const wrapper = document.querySelector(".wrapper");

  const posY = Math.floor(250 * (wrapper.clientWidth / 1920));

  return posY;
}

function calcClockAttributes() {
  const fontSize = calcClockFontSize();
  const clockPosition = calcClockPosiotion() * -1;

  const clock = document.querySelector(".clock");

  clock.style = `
    font-size: ${fontSize}px; 
    transform: translateY(${clockPosition}px);
      `;
}

//Computing time
function calcTimeToRelase() {
  const releaseTime = new Date(2021, 8, 28).getTime();
  const nowTime = new Date().getTime();

  const time = Math.floor((releaseTime - nowTime) / 1000);
  if (time <= 0) return null;
  const s = Math.floor(time % 60);
  const m = Math.floor((time / 60) % 60);
  const h = Math.floor((time / 3600) % 24);
  const d = Math.floor(time / 60 / 60 / 24);

  return [d, h, m, s];
}

function setClock() {
  const daysHtml = document.querySelector(".days");
  const hoursHtml = document.querySelector(".hours");
  const minutesHtml = document.querySelector(".minutes");
  const secondsHtml = document.querySelector(".seconds");

  const calcTime = calcTimeToRelase();

  if (calcTime) {
    daysHtml.textContent =
      calcTime[0] < 10 ? `0${calcTime[0]}d` : `${calcTime[0]}d`;
    hoursHtml.textContent =
      calcTime[1] < 10 ? `0${calcTime[1]}h` : `${calcTime[1]}h`;
    minutesHtml.textContent =
      calcTime[2] < 10 ? `0${calcTime[2]}m` : `${calcTime[2]}m`;
    secondsHtml.textContent =
      calcTime[3] < 10 ? `0${calcTime[3]}s` : `${calcTime[3]}s`;
  } else {
    document.querySelector(".clock").innerHTML = "Napierdalamy!!!";
  }
}

//Add resize event
window.onresize = calcClockAttributes;

//Run while starting
calcClockAttributes();
setClock();

var idInterwalu = window.setInterval(setClock, 1000);
