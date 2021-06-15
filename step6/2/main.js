const rootElm = document.getElementById('areaSelector'); // --- [1]

async function getPrefs() {
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
}

// async function displayPrefs() {
//   const result = await getPrefs();
//   console.log(result);
// }

async function updatePref() { // --- [2〜]
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
} // --- [〜2]

async function createPrefOptionsHtml(prefs) { // --- [3〜]
  const optionStrs = [];
  for(let i = 0; prefs.length > i; i++) {
    const pref = prefs[i];
    optionStrs.push(`
      <option name="${pref.name}" value="${pref.code}">
        ${pref.name}
      </option>
    `);
  }

  const prefSelectorElm = rootElm.querySelector('.prefectures');
  prefSelectorElm.innerHTML = optionStrs.join('');
} // --- [〜3]

// displayPrefs();
updatePref(); // --- [4]