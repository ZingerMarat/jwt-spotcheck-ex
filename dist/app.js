// Get the form and submit button elements
const loginForm = document.querySelector("#login-form")
const loginBtn = document.querySelector("#login-btn")

// Add an event listener for the form submit event
loginForm.addEventListener("submit", function (event) {
  event.preventDefault()

  const username = document.querySelector("#username").value
  const password = document.querySelector("#password").value

  $.ajax({
    url: "/login",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ username, password }),
    success: function (data) {
      localStorage.setItem("token", data.accessToken)
      window.location.href = "/fav_animals/animals.html"
    },
    error: function (error, textStatus, errorThrown) {
      if (error.status === 401) {
        console.log("Unauthorized error:", errorThrown)
      } else {
        console.log("Request failed:", errorThrown)
      }
    },
  })
})
