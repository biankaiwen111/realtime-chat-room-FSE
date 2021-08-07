$("#logout").on("click", function () {
  localStorage.removeItem("FSEToken");
  window.location.replace(
    window.location.protocol + "//" + window.location.host
  );
});
