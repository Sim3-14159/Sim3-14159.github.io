const username = "Sim3-14159";
const repoList = document.getElementById("repo-list");

async function loadRepos() {
  repoList.innerHTML = "<li>Loading repositories...</li>";
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`);
    const repos = await response.json();
    if (!Array.isArray(repos)) {
      repoList.innerHTML = "<li>Could not load repositories.</li>";
      return;
    }
    if (repos.length === 0) {
      repoList.innerHTML = "<li>No repositories found!</li>";
      return;
    }
    // Sort by most recently pushed to
    repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
    repoList.innerHTML = "";
    repos.forEach(repo => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
        <div class="repo-meta">
          ${repo.description ? `<span>${repo.description}</span>` : ""}
          ${repo.language ? `<span>📝 ${repo.language}</span>` : ""}
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🔄 Updated: ${new Date(repo.pushed_at).toLocaleDateString()}</span>
        </div>
      `;
      repoList.appendChild(li);
    });
  } catch (err) {
    repoList.innerHTML = "<li>Error loading repositories.</li>";
  }
}

loadRepos();
