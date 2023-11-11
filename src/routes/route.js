export function handleNavigation() {
  const path = window.location.hash.slice(1);

  const routes = {
    "/": "This is the home page.",
    "/about": "This is the about page.",
    "/contact": "This is the contact page.",
  };

  const content = routes[path] || "Page not found";

  document.getElementById("content").innerHTML = content;
}

// Handle navigation on page load
