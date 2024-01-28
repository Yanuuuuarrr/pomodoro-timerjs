const notifier = require("node-notifier");
const moment = require("moment");

const argtime = process.argv.slice(2);
const pomodoro_duration = argtime[0];
const break_duration = argtime[1];

let isWorking = false;
let remainingTime = 0;

function formatting(totalSecond) {
  const duration = moment.duration(totalSecond, "seconds");
  const hours = duration.hours().toString().padStart(2, "0");
  const minute = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");
  return `${hours}:${minute}:${seconds}`;
}

function startTimer(duration) {
  isWorking = !isWorking;
  remainingTime = duration * 60;
  const timer = setInterval(() => {
    remainingTime--;
    const formattingTime = formatting(remainingTime);

    console.log(`${isWorking ? "Work" : "break"} : ${formattingTime}`);

    if (remainingTime == 0) {
      clearInterval(timer);

      notifier.notify({
        title: `${isWorking ? "waktunya istirahat" : "ayo kembali bekerja"}`,
        message: `${isWorking ? "Selamat Istirahat" : "Selamat Kerja"}`,
        sound: true,
        wait: true,
      });
      //rekursif
      startTimer(isWorking ? break_duration : pomodoro_duration);
    }
  }, 1000);
}

startTimer(pomodoro_duration);
