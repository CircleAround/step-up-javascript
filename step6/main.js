/* eslint no-unused-vars: 0 */
const rootElm = document.getElementById('areaSelector');

async function initAreaSelector() {
  await updatePref();
  await updateCity();
}

async function getPrefs() {
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
}

async function getCities(cityCode) {
  const cityResponse = await fetch(`./cities/${cityCode}.json`);
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

  prefSelectorElm.addEventListener('change', async(event) => {
    updateCity();
  });
} 

function createCityOptionsHtml(cities) {
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
}

initAreaSelector();