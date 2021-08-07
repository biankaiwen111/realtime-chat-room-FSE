const socket = io("http://localhost:8000", {
  query: {
    token: localStorage.getItem("FSEToken"),
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
  $("#chatroom-window").append(`<p>${arg.message}</p>`);
});
