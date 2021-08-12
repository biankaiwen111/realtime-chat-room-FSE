if (window.localStorage.getItem("FSEToken") !== null) {
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "http://localhost:8000/chatroom/",
    beforeSend: function (request) {
      request.setRequestHeader(
        "Authorization",
        `bearer ${window.localStorage.getItem("FSEToken")}`
      );
    },
    success: function (data) {
      console.log(data);
      console.log("you have already logged in!");
      window.location.replace(
        window.location.protocol +
          "//" +
          window.location.host +
          "/chatroom.html"
      );
    },
    error: function (textStatus, errorThrown) {
      console.log("error!");
    },
  });
}

$("#login").on("click", function () {
  console.log("login!");
  const username = $("#username").val().trim();
  const password = $("#password").val().trim();

  $.ajax({
    type: "POST",
    data: JSON.stringify({ username: username, password: password }),
    contentType: "application/json",
    url: "http://localhost:8000/users/login",
    success: function (data) {
      console.log("successfully login!");
      console.log(JSON.stringify(data));
      window.localStorage.setItem("FSEToken", data.token);
      window.location.replace(
        window.location.protocol +
          "//" +
          window.location.host +
          "/chatroom.html"
      );
    },
    error: function (textStatus, errorThrown) {
      console.log("error!");
    },
  });
});
