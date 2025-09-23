const username = "Sim3-14159";
const repoList = document.getElementById("repo-list");

async function loadRepos() {
  repoList.innerHTML = "<li>Loading repositories...</li>";
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed`);
    const repos = await response.json();
    if (!Array.isArray(repos)) {
      repoList.innerHTML = "<li>Could not load repositories.</li>";
      return;
    }
    if (repos.length === 0) {
      repoList.innerHTML = "<li>No repositories found!</li>";
      return;
    }
    repoList.innerHTML = "";
    repos.forEach(repo => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <span style="color: #555; font-size: 0.95em;">
          ${repo.description ? " – " + repo.description : ""}
          ${repo.language ? " | " + repo.language : ""}
          ⭐${repo.stargazers_count}
        </span>
      `;
      repoList.appendChild(li);
    });
  } catch (err) {
    repoList.innerHTML = "<li>Error loading repositories.</li>";
  }
}

loadRepos();
