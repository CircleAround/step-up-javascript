const rootElm = document.getElementById('areaSelector');

async function initAreaSelector() { // --- [1〜]
  await updatePref();
  await updateCity();
} // --- [〜1]

async function getPrefs() {
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
}

async function getCities(prefCode) { // --- [2〜]
  const cityResponse = await fetch(`./cities/${prefCode}.json`);
  return await cityResponse.json();
} // ---[〜2]

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

async function updateCity() { // --- [3〜]
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  const cities = await getCities(prefSelectorElm.value);
  createCityOptionsHtml(cities);
} // --- [〜3]

function createPrefOptionsHtml(prefs) {
  const optionStrs = [];
  for(const pref of prefs) {
    optionStrs.push(`
      <option name="${pref.name}" value="${pref.code}">
        ${pref.name}
      </option>
    `);
  }

  const prefSelectorElm = rootElm.querySelector('.prefectures');
  prefSelectorElm.innerHTML = optionStrs.join('');
}

function createCityOptionsHtml(cities) { // --- [4〜]
  const optionStrs = [];
  for(const city of cities) {
    optionStrs.push(`
      <option name="${city.name}" value="${city.code}">
        ${city.name}
      </option>
    `);
  }
      
  const citySelectorElm = rootElm.querySelector('.cities');
  citySelectorElm.innerHTML = optionStrs.join('');
} // --- [〜4]

// updatePref(); // --- [5] 削除
initAreaSelector(); // --- [6]