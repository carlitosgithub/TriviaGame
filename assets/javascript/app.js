var card = $("#quiz-area");

// Questions
var questions = [
  {
    question: "What is the name of the actress who played Hermione Granger in the Harry Potter films?",
    answers: ["Jennifer Lopez", "Emma Watson", "Emily Blunt", "Mila Kunis"],
    correctAnswer: "Emma Watson"
  },
  {
    question: "Which actress plays Katniss Everdeen in the Hunger Games movies?",
    answers: ["Jennifer Lawrence", "Scarlett Johansson", "Lauren Cohan", "Felicity Jones"],
    correctAnswer: "Jennifer Lawrence"
  },
  {
    question: "In Toy Story, what color is Andy's cowboy hat?",
    answers: ["Brown", "Green", "Yellow", "Red"],
    correctAnswer: "Red"
  },
  {
    question: "What is the Name of Han Solo's Ship",
    answers: ["Titanic", "USS Enterprise", "Millennium Falcon", "Apollo"],
    correctAnswer: "Millennium Falcon"
  },
  {
    question: "Who is the leader of S.H.I.E.L.D?",
    answers: ["Tony Stark", "Nick Fury", "Bruce Banner", "Diana Prince"],
    correctAnswer: "Nick Fury"
  },
  
  {
    question: "What is Clint Barton's superhero name?",
    answers: ["Iron Man", "Batman", "Thor", "Hawkeye"],
    correctAnswer: "Hawkeye"
  },
  {
    question: "Who is Loki's adoptive brother?",
    answers: ["Peter Parker", "Thor", "Bruce Wayne", "Steve Rogers"],
    correctAnswer: "Thor"
  }
];

// Interval - Timer
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

//click events

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
