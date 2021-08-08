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
        `<p>${message.message} ${message.time} ${message.user}</p>`
      );
    });
  },
  error: function (textStatus, errorThrown) {
    console.log("error!");
  },
});

$("#send-message")
  .off()
  .on("click", function () {
    const message = $("#message-content").val();
    socket.emit("message", { message: message });
  });

socket.on("newMessage", (arg) => {
  console.log(arg);
  $("#chatroom-window").append(
    `<p>${arg.message} ${arg.timestamp} ${arg.username}</p>`
  );
});
