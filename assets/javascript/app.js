$(document).ready(function () {

  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;
  //prevents the clock from being sped up unnecessarily
  var clockRunning = false;
  // stopwatch object
  var stopwatch = {
    time: 10,
    convertedTime: "",

    count: function () {
      //Decrease time by one
      stopwatch.time--;
      stopwatch.convertedTime = stopwatch.timeConverter(stopwatch.time);
      $("#display").text(stopwatch.convertedTime);

      if (stopwatch.time === 0) {
        //alert("you ran out of time!");
        clearInterval(intervalId);
        //stopwatch.time = 0
        //var converted = stopwatch.timeConverter(stopwatch.time);
        $("#display").text(stopwatch.convertedTime);
        $("#game").addClass("hidden");
        $("#scoreContainer").removeClass("hidden");

      }
    },
    timeConverter: function (t) {
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return minutes + ":" + seconds;
    }
  };

  $("#display").text(stopwatch.convertedTime);

  if (!clockRunning) {
    intervalId = setInterval(stopwatch.count, 1000);
    clockRunning = true;
  }

  var correctAnswers = 0;
  var wrongAnswers = 0;
  var notAnswered = 5;

  var html =
    "<p> Correct: " + correctAnswers + "</p>" +
    "<p> Incorrect: " + wrongAnswers + "</p>" +
    "<p> Unanswered: " + notAnswered + "</p>";
  $("#total-score").html(html);

  $("#button").on("click", function () {


    var question = document.getElementsByClassName('option');

    for (var i = 0; i < question.length; i++) {
      if (question[i].checked) {
        // do whatever you want with the checked radio
        notAnswered--;
        console.log(question[i].value);
        if (question[i].value === "correct") {
          correctAnswers++;
        }
        else {
          wrongAnswers++;
        }

      }

    }

    $("#game").addClass("hidden");
    $("#scoreContainer").removeClass("hidden");

    stopwatch.time = 0;

    var html =
      "<p> Correct: " + correctAnswers + "</p>" +
      "<p> Incorrect: " + wrongAnswers + "</p>" +
      "<p> Unanswered: " + notAnswered + "</p>";
    $("#total-score").html(html);

  });

})

