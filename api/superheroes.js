const ACCESS_TOKEN = "56b4c1ae9caa9c9e67de9320789a0c2c";

export async function fetchSearchResults(query) {
    if (!query) return [];
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data.response === "success") {
        return data.results;
    }
    return [];
}