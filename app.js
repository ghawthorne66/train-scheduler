// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBZxTGt9Y40vDZOCtZROqALsV2EhJAx0AI",
    authDomain: "cbc-activities.firebaseapp.com",
    databaseURL: "https://cbc-activities.firebaseio.com",
    projectId: "cbc-activities",
    storageBucket: "",
    messagingSenderId: "155146048251",
    appId: "1:155146048251:web:18d87ecdcf878262f3565e"
};


firebase.initializeApp(firebaseConfig);
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)


// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

$(document).ready(function () {

    // Initial Values
    var trainName
    var destinationPlace
    var firstTrain
    var frequencyMin


    $("#add-scheduler-btn").on("click", function (event) {
        event.preventDefault();
        trainName = $("#train-name-input").val().trim()
        destinationPlace = $("#destination-input").val().trim()
        firstTrain = $("#time-input").val().trim()
        frequencyMin = $("#frequency-input").val().trim()
        console.log(trainName, destinationPlace, firstTrain, frequencyMin)

        //push values to database

        database.ref().push({
            trainName: $("#train-name-input").val().trim(),
            destinationPlace: $("#destination-input").val().trim(),
            firstTrain: $("#time-input").val().trim(),
            frequencyMin: $("#frequency-input").val().trim()

        }

        )


        database.ref().push({
            train: trainName,
            destination: destinationPlace,
            time: firstTrain,
            frequency: frequencyMin,

        })
    })
    //creating chil push on table-rows
    database.ref().on("child_added", function (snapshot) {
        $("#table-body").append("<tr></tr>")
        // Change the HTML to reflect
        // $("#name-display").text(snapshot.val().name);
        // $("#email-display").text(snapshot.val().email);
        // $("#age-display").text(snapshot.val().age);
        // $("#comment-display").text(
        //   snapshot.val().comment
        console.log(snapshot)


    });

})


// console.log(momemt)