let dt = new Date();
setInterval(() => {
    let hh = dt.getHours();
    let t = (hh%12) + ' : ' + dt.getMinutes() + ' : ' + dt.getSeconds() + (hh>=12 ? " PM" : " AM");
    document.getElementById("time").innerHTML = t;
},1000);

let text = dt.getDate()+ ' : ' + dt.getDay() + ' : ' + dt.getFullYear();
document.getElementById("date").innerHTML = text;


