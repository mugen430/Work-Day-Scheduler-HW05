

let workDay = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};


$(document).ready(function(){
  initializeLocalStorage();
  console.log
})


$('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

let counter = 1;
for(const property in workDay) {

  workDay1 = loadCorrectDataset();


  let textEntry = "#text-entry" + counter;
  $(textEntry).text(workDay1[property]);
  let timeId = "#time" + counter;
  let presentHour = moment().hour(); 
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);  
 
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past-hour");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future-hour");
  } else {
    $(textEntry).addClass("present-hour");
  }
  counter ++;
}



$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveSchedule(hourString, value);
});

function hourNumberFromHourString(hourString) {
  switch(hourString) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

function loadCorrectDataset() {
  result = localStorage.getItem('workDay')
  console.log('LOADCORRECTDATSSET', result);
  return (result ? result : workDay);
}

function initializeLocalStorage() {
  localStorage.setItem('workDay', JSON.stringify(workDay));
};

function saveToLocalStorage(dayObj) {
  localStorage.setItem('workDay', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
  if(!localStorage.getItem('workDay')) {
    initializeLocalStorage();
  }

  let workHours = JSON.parse(localStorage.getItem('workDay'));
  workHours[hourString] = val
  
  console.log('WITH NEW STRING', workHours);
  saveToLocalStorage(workHours);
  console.log('UPDATED', JSON.parse(localStorage.getItem('workDay')));
}


function updateCalendarContents(dayObject) {
  let workHours = JSON.parse(localStorage.getItem('workDay'));
  let hourString = $("#time" + counter).text();
  console.log('HOURSTRING', hourString);
  for(const property in workHours) {
    
    console.log("PROPERTY", property);
    console.log("TEST WORKHOURS", dayObject[property]);

    let res = $("div").attr("value", property);
    console.log('BLOOPER', res);
  }
}

function newUpdateCalendar(dayObject) {
  $(".calendar-row").each(function(index) {
  
    let res = $(this).children("div");
    console.log("RES", res);
    console.log("RES.TEXT()", res.text());
    console.log("DAYOBJECT VALUE", dayObject[res.text()]);
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}

newUpdateCalendar(JSON.parse(localStorage.getItem('workDay'))); 