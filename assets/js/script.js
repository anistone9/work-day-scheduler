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

  //Function to create an event when the save button is clicked to push that information to local storage
  function handleSaveEvents(event) {
    console.log(event.currentTarget);

    //Create variable for the parend div of the button pressed; 'this' represents that button in the event
    var hourIdEl = $(this).parent('.time-block');
    var saveId = hourIdEl.attr('id');
    console.log(hourIdEl);

    //read the user input from textarea relative to this event (div)
    var eventEl = hourIdEl.children('.description');
    var userEvent = eventEl.val();

    //save to local storage the user input for a particular hour. DOM traversal to get the ID and the typed text.
    //if the event typed is deleted by the user, remove that entry from storage (remove the key)
    if (userEvent == "") {
      localStorage.removeItem(saveId);
    } else {
      localStorage.setItem(saveId, userEvent);
    }
  }

  //Grab the events from local storage and display them
  function printEvents() {

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
