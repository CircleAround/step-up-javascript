const rootElm = document.getElementById('areaSelector');

async function initAreaSelector() {
  await updatePref();
  await updateCity();
}

async function getPrefs() {
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
}

async function getCities(prefCode) {
  const cityResponse = await fetch(`./cities/${prefCode}.json`);
  return await cityResponse.json();
}

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

async function updateCity() {
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  const cities = await getCities(prefSelectorElm.value);
  createCityOptionsHtml(cities);
}

async function createPrefOptionsHtml(prefs) {
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

  prefSelectorElm.addEventListener('change', async(event) => { // --- [1〜]
    updateCity();
  }); // --- [〜1]
}

function createCityOptionsHtml(cities) {
  const optionStrs = [];
  for(let i = 0; cities.length > i; i++) {
    const city = cities[i];
    optionStrs.push(`
      <option name="${city.name}" value="${city.code}">
        ${city.name}
      </option>
    `);
  }
      
  const citySelectorElm = rootElm.querySelector('.cities');
  citySelectorElm.innerHTML = optionStrs.join('');
}

initAreaSelector();