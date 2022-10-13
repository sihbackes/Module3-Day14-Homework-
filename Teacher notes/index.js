// ###########################################

// usually we start following the code from the window.onload method
// since it will be executed automatically when the page finishes loading

// ###########################################

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calendarArray = [];

const now = new Date(); // date of today

const daysInThisMonth = function () {
  // We select the next month with "now.getMonth() +1", just to go back one day with "0" in the third arguement.
  // So starting from the next month from NOW, this will give us back the LAST DAY of the month before, so basically the last day of the current month.
  // And that's exactly what we needed, the last day of the current month is also the total number of days that we need to create in the calendar! ;)
  const getYear = now.getFullYear();
  const getMonth = now.getMonth();

  const lastDayDateObj = new Date(getYear, getMonth + 1, 0);
  const lastDayOfThisMonth = lastDayDateObj.getDate();

  return lastDayOfThisMonth; // returns the number of days in the current month

  //  it can also be written as a one-liner for brevity
  //   return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const showAppointments = function (index) {
  const todaysAppointments = calendarArray[index]; //accessing the day's array - ['13:05 - test']
  // now todaysAppointments is the array containing the meetings for the index passed as arguement (aka: the day clicked)

  const ul = document.getElementById("appointmentsList"); // here we select the unordered list in html
  ul.innerHTML = ""; // and here we make sure we always start with an empty ul list before we append new meetings (li) !

  document.getElementById("appointments").style.display = "block";

  for (let i = 0; i < todaysAppointments.length; i++) {
    // for every string in that day's array...
    const li = document.createElement("li"); // creates the list item node
    const text = todaysAppointments[i]; //grabs the text from the string in the day's array
    li.innerText = text; // sets the text of it with the string in the current position i of the array
    ul.appendChild(li); // appends the li in the list
  }
};

const saveMeeting = function () {
  const previouslySelectedDayNode = document.querySelector(".selected"); // if there's any selected day in the page it will save it
  // are there any "selected" cell in the calendar?
  if (previouslySelectedDayNode) {
    // the following code will execute only if a .selected element exists in the page (or else... something else happens)
    const meetingDay = document.getElementById("newMeetingDay").innerText; // number of the day clicked
    const indexOfToday = parseInt(meetingDay) - 1; // meeting day transformed from a string into a 0 based index
    const meetingTime = document.getElementById("newMeetingTime"); // input type="time"
    const meetingName = document.getElementById("newMeetingName"); // input type="text"

    const meetingText = meetingTime.value + " — " + meetingName.value;

    if (meetingTime.value && meetingName.value) {
      calendarArray[indexOfToday].push(meetingText); // pushes the new appointment in the appropriate position in the appointments array

      showAppointments(indexOfToday); // this triggers the function that searches the array for appointments in that day, by passing the index of the day as arguement
      window.scrollTo(0, document.body.scrollHeight); // scrolls the page to the bottom to show the new appointment
    } else if (!meetingTime.value && !meetingName.value) {
      // if both time and name are missing: alert
      alert("pick a time and set the name of the meeting");
    } else if (!meetingTime.value) {
      // if time is missing: alert
      alert("pick a time for the meeting");
    } else if (!meetingName.value) {
      // if name is missing: alert
      alert("set a name for the meeting");
    }
  } else {
    // if day is not selected: generic alert
    alert("Please click a day before proceeding");
  }
};

const changeDayNumber = function (dayNumber) {
  const newMeetingDayNode = document.getElementById("newMeetingDay");
  newMeetingDayNode.innerText = dayNumber; // insert the number of the day inside #newMeetingDay element text
  newMeetingDayNode.classList.add("hasDay"); // adding a class that gives it the tile look (with background color etc..)
};

const createDays = function (days) {
  const calendarNode = document.getElementById("calendar"); // grabs the calendar node

  for (let i = 0; i < days; i++) {
    const dayCellNode = document.createElement("div"); // this will create an empty day cell
    dayCellNode.className = "day"; // assigning the CSS class

    calendarArray.push([]); // here we are creating an empty array for each day of the loop, inside of the calendarArray.
    // They will be filled up in the saveMeeting() function

    // an emtpy array will be inserted into the calendar array for every day in the month
    // calendarArray looks like:
    // [
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], []
    // ]

    // when a day gets clicked this function will run (on each click!):
    // we are attaching an event listener of type "click" to every dayCellNode we are generating
    dayCellNode.addEventListener("click", function (event) {
      const clickedDayNode = event.currentTarget; // getting back the node of the clicked day cell

      // SELECTING A CELL START______________________________________________
      const previouslySelectedDayNode = document.querySelector(".selected");

      if (previouslySelectedDayNode !== null) {
        // if we have a previously selected node, we remove the class from it first
        previouslySelectedDayNode.classList.remove("selected");
      }
      // ...and apply it to the currently clicked node
      clickedDayNode.classList.add("selected");
      // SELECTING A CELL END________________________________________________

      changeDayNumber(i + 1); // on every click of the cell we are calling this function that updates the number in #newMeetingDay

      // handles days appointments (if any)
      // This is where we check if the clicked day has corresponding appointments saved in the calendarArray
      const todaysAppointments = calendarArray[i]; // grabbing the inner day's array for the index of i
      if (todaysAppointments.length > 0) {
        // if the array IS NOT EMPTY we'll enter here

        showAppointments(i); // this will manage the access of the day array in calendarArray and the display of the single appointments as li appended in the ul
      } else {
        // if the array IS EMPTY we'll enter here
        document.getElementById("appointments").style.display = "none"; // hiding the appointments section, since there's nothig to show
      }
      console.log("CALENDAR ARRAY", calendarArray);
    });

    const h3 = document.createElement("h3"); // label for day's number
    // adding the number as innerText of the day's <h3> we've created
    h3.innerText = i + 1; // the for loop gives a 0 based index, let's increase it by 1 to count days properly

    const today = now.getDate(); // getting today's day number (it was 13 during the lecture)
    if (i + 1 === today) {
      // if the index + 1 value matches today it means that the current dayCellNode is the one that represents today and needs to be colored
      dayCellNode.classList.add("today"); // adds the class for coloring it
    }

    dayCellNode.appendChild(h3); // <div class="day"><h3 /></div>
    calendarNode.appendChild(dayCellNode); // <div id="calendar"> <div class="day"><h3 /></div> </div>
  }
};

window.onload = function () {
  const title = document.querySelector("h1"); // getting the title reference from the DOM
  const numberOfDays = daysInThisMonth(); // receives a number value from the function

  const monthIndex = now.getMonth(); // october has index 9
  const currentMonth = months[monthIndex]; // extracts a string from the months array in the position found with monthIndex
  title.innerText = currentMonth; // sets the month name as the page title

  createDays(numberOfDays); // generates new day cells dynamically based on the number of days provided as arguement
};
