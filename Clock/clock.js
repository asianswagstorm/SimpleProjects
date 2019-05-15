/**
 * Created by Andy on 2018-01-12.
 */

function clock() {
    let FullDate = new Date();
    let Hour = FullDate.getHours();
    let Minute = FullDate.getMinutes();
    let Seconds = FullDate.getSeconds();
    let AMPM;
    if(Hour>=12){  AMPM= "  : PM";}
    else AMPM ="  : AM";

    if (Hour == 0){
        Hour = 12;
    }

    if (Hour >12) {
        Hour = Hour-12;
    }

    if (Hour <10) {
        Hour = "0"+Hour;
    }

    if (Minute <10) {
        Minute = "0"+Minute;
    }
    if (Seconds <10) {
        Seconds = "0"+Seconds;
    }


//.innerHTML Change the Value
    document.getElementById('hour').innerHTML = Hour;
    document.getElementById('minute').innerHTML = " : " + Minute;
    document.getElementById('second').innerHTML = " : " + Seconds;
    document.getElementById('AMPM').innerHTML = AMPM;
}


const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;
  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
setInterval(setDate, 1000);
setDate();

  setInterval(clock, 100);


 