export function handleNavigation() {
  const path = window.location.hash.slice(1);

  const routes = {
    "/": "This is the home page.",
    "/dones": "This is the dones page.",
    "/contact": "This is the contact page.",
  };

  const content = routes[path] || "Page not found";

  document.getElementById("content__list").innerHTML = content;
}
