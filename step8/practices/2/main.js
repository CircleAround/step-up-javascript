const rootElm = document.getElementById('areaSelector');

let _prefs;
let _cities;

async function initAreaSelector() {
  // getCitiesの扱いが冗長ですが、下記のPromise.allが書けることが主題です。
  // 通信はこの時に行い、ドロップダウンの変更時には起きません。
  const [prefs, ...cities] = await Promise.all([
    getPrefs(), getCities('001'), getCities('002'), getCities('003')
  ]);

  _prefs = prefs;
  _cities = {};
  _cities['001'] = cities[0];
  _cities['002'] = cities[1];
  _cities['003'] = cities[2];

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

function updatePref() {
  createPrefOptionsHtml(_prefs);
} 

function updateCity() {
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  const cities = _cities[prefSelectorElm.value];
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

  prefSelectorElm.addEventListener('change', () => {
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