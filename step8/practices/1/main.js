const rootElm = document.getElementById('areaSelector');

function initAreaSelector() {
  updatePref().then(() => {
    updateCity();
  });
}

function getPrefs() {
  return fetch('./prefectures.json').then((prefResponse) => {
    return prefResponse.json();
  });
}

function getCities(cityCode) {
  return fetch(`./cities/${cityCode}.json`).then((cityResponse)=>{
    return cityResponse.json();
  });
}

function updatePref() {
  return getPrefs().then((prefs)=>{
    return createPrefOptionsHtml(prefs);
  });  
} 

function updateCity() {
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  return getCities(prefSelectorElm.value).then((cities)=>{
    createCityOptionsHtml(cities);
  });
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