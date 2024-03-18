let blogPost = window.location.pathname.split("/");

// Allows user to edit blog posts from the blogPost page
const submitEdit = async (event) => {
  event.preventDefault();
  const title = document.getElementById("titleInput").value;
  const description = document.getElementById("bodyInput").value;

  if (title && description) {
    const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.assign("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const form = document.getElementById("yourFormId"); // Replace "yourFormId" with the actual ID of your form

// Event Listener
form.addEventListener("submit", submitEdit);

