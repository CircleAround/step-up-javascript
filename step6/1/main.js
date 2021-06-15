async function getPrefs() { // --- [1〜]
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
} // --- [〜1]

async function displayPrefs() { // --- [2〜]
  const result = await getPrefs();
  console.log(result);
} // --- [〜2]

displayPrefs();