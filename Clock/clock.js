/**
 * Created by Andy on 2018-01-12.
 */
function clock() {
    var FullDate = new Date();
    var Hour = FullDate.getHours();
    var Minute = FullDate.getMinutes();
    var Seconds = FullDate.getSeconds();
    var AMPM;
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
setInterval(clock, 100);
