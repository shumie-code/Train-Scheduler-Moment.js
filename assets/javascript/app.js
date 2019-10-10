//Firebase Web-Configuration
var firebaseConfig = {
  apiKey: "AIzaSyDcpU-6ZKuYuUg42qPqOzPmUQiuTzGX2-8",
  authDomain: "train-scheduler-moment-js-fire.firebaseapp.com",
  databaseURL: "https://train-scheduler-moment-js-fire.firebaseio.com",
  projectId: "train-scheduler-moment-js-fire",
  storageBucket: "train-scheduler-moment-js-fire.appspot.com",
  messagingSenderId: "112321194951",
  appId: "1:112321194951:web:cd85950448cb53085087e2",
  measurementId: "G-R0E3J6NLQX"
};

//Initalize Firebase
firebaseConfig.initializeApp(config);

var trainData = firebase.database().ref();
//Shows Current Time
$("#currentTime").append(moment().format("hh:mm A"));

//Button For AddinG Trains
$("#addTrainBtn").on("click", function() {
  event.preventDefault();
  //Take User Input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequencyInput").val().trim();

  //Creates Local object for storing train data temporaily
  var newTrain= {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }

  //Uploads Train Data to Database

  trainData,push(newTrain);

  //Alert
  alert(newTrain.name + " has been added");

  //Clears all text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;

  
});

// Firebase event for adding trains to the database & a row in the html when a user adds input

trainData.on("child_added", function(childSnapshot) {

  let data = childSnapshot.val();
  let trainNames = data.name;
  let trainDestin = data.destination;
  let trainFrequency = data.frequency;
  let theFirstTrain = data.firstTrain;
  console.log(theFirstTrain);

  //Calculate the minutes until arrival
  let tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
  let tMinutes = trainFrequency - tRemainder;

  // Calculate the arrival time, add the tMinutes to the current time
  let tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  //Add each trains data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" +tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");

});




