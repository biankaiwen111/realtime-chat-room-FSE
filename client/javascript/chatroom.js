const socket = io("http://localhost:8000", {
  query: {
    token: localStorage.getItem("FSEToken"),
  },
});

$.ajax({
  type: "GET",
  contentType: "application/json",
  url: "http://localhost:8000/chatroom",
  beforeSend: function (request) {
    request.setRequestHeader(
      "Authorization",
      `bearer ${window.localStorage.getItem("FSEToken")}`
    );
  },
  success: function (data) {
    console.log(data);
    oldMessages = data["historyMessages"];
    oldMessages.forEach((message) => {
      $("#chatroom-window").append(
        `<div class="border rounded mb-2 mt-2"><p><strong>${
          message.user
        }</strong> ${
          message.time.slice(0, 10) + " " + message.time.slice(11, 16)
        }</p><p>${message.message}</p></div>`
      );
    });
    $("#chatroom-window").scrollTop($("#chatroom-window").prop("scrollHeight"));
  },
  error: function (textStatus, errorThrown) {
    console.log("error!");
  },
});

$("#send-message")
  .off()
  .on("click", function () {
    const message = $("#message-content").val();
    $("#message-content").val("");
    socket.emit("message", { message: message });
  });

socket.on("newMessage", (arg) => {
  console.log(arg);
  console.log(typeof arg.timestamp);
  const window = document.getElementById("chatroom-window");
  const isScroll =
    window.scrollHeight - window.clientHeight <= window.scrollTop + 1;

  console.log(isScroll);
  $("#chatroom-window").append(
    `<div class="border rounded mb-2 mt-2"><p><strong>${
      arg.username
    }</strong> ${
      arg.timestamp.slice(0, 10) + " " + arg.timestamp.slice(11, 16)
    }</p><p>${arg.message}</p></div>`
  );
  if (isScroll) {
    $("#chatroom-window").scrollTop($("#chatroom-window").prop("scrollHeight"));
  }
});
