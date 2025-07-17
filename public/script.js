import { fetchSearchResults } from '../api/superheroes.js';

export async function handleSearch() {
  const loader = document.getElementById("loader");
  const resultsDiv = document.getElementById("results");
  const query = document.getElementById("searchInput").value.trim();

  resultsDiv.innerHTML = "";
  loader.style.display = "flex";

  try {
    const results = await fetchSearchResults(query);

    if (!results || results.length === 0) {
      resultsDiv.innerHTML = "<p>No superheroes found.</p>";
    } else {
      results.forEach(hero => {
        const div = document.createElement("div");
        div.className = "result-card";
        div.innerHTML = `
          <div style="display:flex;align-items:center;gap:16px;">
            <img src="${hero.image.url}" alt="${hero.name}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid #3498db;">
            <div>
              <div class="result-title">${hero.name}</div>
              <div class="result-body">
                <strong>Powerstats:</strong>
                <ul style="padding-left:18px;margin:4px 0;">
                  <li>Intelligence: ${hero.powerstats.intelligence}</li>
                  <li>Strength: ${hero.powerstats.strength}</li>
                  <li>Speed: ${hero.powerstats.speed}</li>
                  <li>Durability: ${hero.powerstats.durability}</li>
                  <li>Power: ${hero.powerstats.power}</li>
                  <li>Combat: ${hero.powerstats.combat}</li>
                </ul>
              </div>
            </div>
          </div>
        `;
        resultsDiv.appendChild(div);
      });
    }
  } catch (err) {
    resultsDiv.innerHTML = "<p>Error fetching superheroes. Please try again.</p>";
    console.error(err);
  } finally {
    loader.style.display = "none";
  }
}

// Accessibility: trigger search on Enter
document.getElementById("searchBtn").addEventListener("click", handleSearch);

window.handleSearch = handleSearch;

export async function fetchSearchResults(query) {
    if (!query) return [];
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data.response === "success") {
        return data.results;
    }
    return [];
}