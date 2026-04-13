const responses = [
  "That’s actually a thoughtful question.",
  "Let me walk through that with you.",
  "There’s a nice idea hidden in that.",
  "We can break this down step by step.",
  "That’s worth exploring deeper."
];

function addMessage(text, sender) {
  const msg = $('<div class="message '+sender+'"></div>');
  $("#messages").append(msg);
  typeText(msg, text);
  scrollBottom();
}

function typeText(element, text) {
  let i = 0;
  const interval = setInterval(() => {
    element.text(element.text() + text[i]);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 20);
}

function scrollBottom() {
  $("#messages").scrollTop($("#messages")[0].scrollHeight);
}

function sendMessage(text=null) {
  const input = text || $("#input").val().trim();
  if (!input) return;

  addMessage(input, "user");
  $("#input").val("");
  toggleSend();

  $("#welcome").fadeOut(200);
  $("#typing").show();

  setTimeout(() => {
    $("#typing").hide();
    const reply = responses[Math.floor(Math.random()*responses.length)];
    addMessage(reply, "ai");
  }, 800);
}

/* Input */
$("#input").on("input", function() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
  toggleSend();
});

function toggleSend() {
  $("#send").prop("disabled", $("#input").val().trim()==="");
}

/* Send */
$("#send").click(()=>sendMessage());

$("#input").keypress(function(e){
  if(e.which===13 && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});

/* Cards */
$(".card").click(function(){
  sendMessage($(this).text());
});

/* Toggle */
$(".toggle").click(function () {
  $("body").toggleClass("dark");
  localStorage.setItem("theme", $("body").hasClass("dark") ? "dark" : "light");
});

/* Load saved theme */
$(document).ready(function () {
  if (localStorage.getItem("theme") === "dark") {
    $("body").addClass("dark");
  } else {
    $("body").removeClass("dark");
  }
});