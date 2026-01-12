const API_BASE = "http://localhost:3000";

async function loadProfile() {
  const res = await fetch(`${API_BASE}/profile`);
  const data = await res.json();
  document.getElementById("profile").textContent =
    JSON.stringify(data, null, 2);
}

async function searchProjects() {
  const skill = document.getElementById("skillInput").value;
  if (!skill) return;

  const res = await fetch(`${API_BASE}/projects?skill=${skill}`);
  const data = await res.json();
  document.getElementById("projects").textContent =
    JSON.stringify(data, null, 2);
}

loadProfile();
