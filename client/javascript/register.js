$("#register").on("click", function () {
  const username = $("#username").val().trim();
  const password = $("#password").val().trim();

  $.ajax({
    type: "POST",
    data: JSON.stringify({ username: username, password: password }),
    contentType: "application/json",
    url: "http://localhost:8000/users/register",
    success: function (data) {
      console.log("success");
      console.log(JSON.stringify(data));
      window.location.replace(
        window.location.protocol + "//" + window.location.host
      );
    },
    error: function (textStatus, errorThrown) {
      console.log("error!");
    },
  });
  console.log("here");
});
