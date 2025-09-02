$(document).ready(function () {
  $(".getFavAnimal").on("click", function () {
    $.ajax({
      url: `/favorites/animals`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (response) {
        $(".animal").append(`<h2>${response.animal}!</h2>`)
      },
      error: function (res, status, error) {
        location.href = "/"
      },
    })
  })
})
