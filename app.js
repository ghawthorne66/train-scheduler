// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the schedule database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBZxTGt9Y40vDZOCtZROqALsV2EhJAx0AI",
    authDomain: "cbc-activities.firebaseapp.com",
    databaseURL: "https://cbc-activities.firebaseio.com",
    projectId: "cbc-activities",
    storageBucket: "",
    messagingSenderId: "155146048251",
    appId: "1:155146048251:web:18d87ecdcf878262f3565e"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var trainDestination = $("#destination-input")
    .val()
    .trim();
  var trainTime = $("#start-input")
      .val()
      .trim();
  // var trainTime = moment(
  //   $("#start-input")
  //     .val()
  //     .trim(),
  //   "00:00"
  // ).format("X");
  console.log(`Train time: ${trainTime}`);
  var trainFrequency = $("#frequency-input")
    .val()
    .trim();

  // Creates local "temporary" object for holding schedule data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainTime,
    frequency: trainFrequency,
  };

  // Uploads schedule data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding schedule to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // schedule Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // Prettify the schedule start
  var trainTimePretty = moment(trainTime, "HH:mm");
  var currentTime = moment();

  var differenceInTime = moment().diff(moment(trainTimePretty), 'minutes');
  var tRemainder = differenceInTime % trainFrequency;
  var tMinutesToTrain = trainFrequency - tRemainder;
  var nextTrain = currentTime.add(tMinutesToTrain, "minutes");
  nextTrain = nextTrain.format("h:mm a");

  console.log('--------------');
  console.log(differenceInTime);
  console.log(tRemainder);
  console.log(tMinutesToTrain);
  console.log(nextTrain);
  console.log('--------------');

    console.log(`pretty time: ${trainTimePretty}`);
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var nextArrival = moment().diff(
    moment(trainTime, "X"),
    "months" // need to re examine
  );
  console.log(nextArrival);

  // Calculate the total billed frequency
//   var empBilled = nextArrival * trainFrequency;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesToTrain),
 
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


console.log(moment)


// // //Time diiference formulas
// // // Assumptions
// var tFrequency = 3;

// // // Time is 3:30 AM
// var firstTime = "03:30";

// // // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// THE MATH!
    //subtracts the first train time back a year to ensure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        trainTime: trainTime,
        trainfrequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }

    console.log(newTrain);
    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstInput").val("");
    $("#frequencyInput").val("");

    var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;
