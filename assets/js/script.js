// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var timeDisplayEl = $('#currentDay');

  //Function to display current date at the top of the page, in the header
  function displayTime() {
    var showToday = dayjs().format('dddd, MMMM D');
    timeDisplayEl.text(showToday);
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  function checkHour() {
    var currentHour = dayjs();

    var timeBlockEl = $('.time-block');

    for (var i = 0; i < timeBlockEl.length; i++) {
      var hourId = timeBlockEl[i].id.substring(5, 7);
      var hourNow = dayjs().hour(hourId);

      if (hourNow.isBefore(currentHour)) {
        timeBlockEl[i].classList.add('past');
      } else if (hourNow.isSame(currentHour)) {
        timeBlockEl[i].classList.add('present');
      } else if (hourNow.isAfter(currentHour)) {
        timeBlockEl[i].classList.add('future');
      }
    }
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  displayTime();
  checkHour();
});
