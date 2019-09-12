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
var frequencyMin
var nextArrival

$("#add-employee-btn").on("click", function (event) {
    event.preventDefault();
    trainName = $("#employee-name-input").val().trim()
    destinationPlace = $("#role-input").val().trim()
    frequencyMin = $("#start-input").val().trim()
    nextArrival = $("#rate-input").val().trim()
    console.log(employeeName, employeeRole, startDate, monthlyRate)

    //push values to database

    database.ref().push({
        employeeName: $("#employee-name-input").val().trim(),
        employeeRole: $("#role-input").val().trim(),
        startDate: $("#start-input").val().trim(),
        monthlyRate: $("#rate-input").val().trim()

    }

    )


    database.ref().push({
        name: employeeName,
        role: employeeRole,
        start: startDate,
        rate: monthlyRate,

    })
})
//creating chil push on table-rows
database.ref().on("child_added", function(snapshot) {
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