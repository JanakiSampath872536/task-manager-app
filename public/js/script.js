async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const formData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:9000/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      // If login is successful (status 200) store the email in sessionStorage
      sessionStorage.setItem("currentUser", email);

      // If login is successful (status 200) redirect to Home page
      // window.location.href = 'taskManager.html';
      window.location.href = "taskManager.html";
    } else {
      // If login fails, show an error message
      alert(data.message || "Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while logging in. Please try again.");
  }
}

async function addUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const formData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:9000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      // If user is added successfully, redirect to login page
      alert("User added successfully. Please login.");
      window.location.href = "index.html";
    } else {
      // If user addition fails, show an error message
      alert(data.message || "User addition failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the user. Please try again.");
  }
}
