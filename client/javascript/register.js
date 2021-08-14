$("#register").on("click", function () {
  const username = $("#username").val().trim();
  const password = $("#password").val().trim();

  $.ajax({
    type: "POST",
    data: JSON.stringify({ username: username, password: password }),
    contentType: "application/json",
    url: "http://localhost:8000/users/register",
    success: function (data) {
      alert(data["message"]);
      window.location.replace(
        window.location.protocol + "//" + window.location.host
      );
    },
    error: function (xhr, status, error) {
      const info = JSON.parse(xhr.responseText);
      alert(info["message"]);
    },
  });
});
