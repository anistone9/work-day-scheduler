// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var timeBlockEl = $('.time-block');
  var saveButtonEl = $('.saveBtn');
  var timeDisplayEl = $('#currentDay');
  //Function to display current date at the top of the page, in the header
  function displayTime() {
    var showToday = dayjs().format('dddd, MMMM D');
    timeDisplayEl.text(showToday);
  }

  //Function to check the current time via dayjs, then pull the hour ID from the time-block element in the HTML file, 
  //grab only the number from the ID, and compare it to the current time. The styling for the past, current, and future classes
  //is applied based on this check.
  //Had to add "hour" to currentHour check against hourNow for present time, because isSame checks all the way down to miliseconds,
  //and if the use is not fast enough clicking, the delay then registers and it applies the future class
  function checkHour() {
    var currentHour = dayjs();

    for (var i = 0; i < timeBlockEl.length; i++) {
      var hourId = timeBlockEl[i].id.substring(5);
      var hourNow = dayjs().hour(hourId);

      if (hourNow.isBefore(currentHour)) {
        timeBlockEl[i].classList.add('past');
      } else if (hourNow.isSame(currentHour, "hour")) {
        timeBlockEl[i].classList.add('present');
      } else if (hourNow.isAfter(currentHour)) {
        timeBlockEl[i].classList.add('future');
      }
    }
  }

  //First read events from local storage and return an array of event objects.
  //If no events are stored (when the user first opens the application), then create an empty array and return it.
  function readEventsFromStorage() {
    var events = localStorage.getItem('events');
    if (events) {
      events = JSON.parse(events);
    } else {
      events = [];
    }
    return events;
  }

  //Function to grab the array of events from the previous function, and save them in local storage.
  //Takes the array of events created via the events variable above, and saves it as a string to local memory.
  function saveEventsToStorage(events) {
    localStorage.setItem('events', JSON.stringify(events));
  }

  function handleSaveEvents(event) {
    event.preventDefault();
    console.log(event.currentTarget);

    //Create variable for the parend div of button pressed
    var hourIdEl = $(this).parent('.time-block');
    var saveId = hourIdEl.attr('id');
    console.log(hourIdEl);

    //read the user input from textarea
    var eventEl = hourIdEl.children('.description');
    var userEvent = eventEl.val();

    //save to local storage the user text for a particular hour
    if (userEvent == "") {
      localStorage.removeItem(saveId);
    } else {
      localStorage.setItem(saveId, JSON.stringify(userEvent));
    }
  }

  //Grab the events from local storage and display them
  function printEvents() {

    //Get events from storage
    //var events = readEventsFromStorage();

    for (var i = 0; i < timeBlockEl.length; i++) {
      var readId = timeBlockEl[i].id;
      //console.log(readId);
      var storedValue = localStorage.getItem(readId);
      //console.log(storedValue);
      var textAreaEl = timeBlockEl[i].children[1];
      //console.log(textAreaEl[1].tagName);
      textAreaEl.value = storedValue;
    }
  }



  displayTime();
  checkHour();
  printEvents();
  saveButtonEl.on('click', handleSaveEvents);
});
