class AreaSelector {
  constructor(rootElm) {
    this.rootElm = rootElm;
    this.prefectures = [];
    this.cities = [];
    this.prefCode = null;
    this.prefSelectorElm = rootElm.querySelector('.prefectures');
    this.citySelectorElm = rootElm.querySelector('.cities');
    this.init();
  }

  async init() {
    try {
      const prefResponse = await fetch('prefectures.json');
      this.prefectures = await prefResponse.json();
      this.prefCode = this.prefectures[0].code;
      const cityResponse = await fetch(`./cities/${this.prefCode}.json`);
      this.cities = await cityResponse.json();
      this.updatePrefOptionsHtml();
      this.updateCityOptionsHtml();
      this.onChangePref();
    } catch(e) {
      this.rootElm.innerText = '地域情報の読み込みに失敗しました';
      console.error(e);
    }
  }

  updatePrefOptionsHtml() {
    let optionsStr = this.prefectures.map((pref) => {
      return `
        <option name="${pref.name}" value="${pref.code}">
          ${pref.name}
        </option>
      `;
    });
    
    this.prefSelectorElm.innerHTML = optionsStr.join('\n');
  }

  updateCityOptionsHtml() {
    let optionsStr = this.cities.map((city) => {
      return `
        <option name="${city.name}" value="${city.code}">
          ${city.name}
        </option>
      `;
    });
    
    this.citySelectorElm.innerHTML = optionsStr.join('\n');
  }

  onChangePref() {
    this.prefSelectorElm.addEventListener('change', async(event) => {
      this.prefCode = event.target.value;
      const cityResponse = await fetch(`./cities/${this.prefCode}.json`);
      this.cities = await cityResponse.json();
      this.updateCityOptionsHtml();
    });
  }
}

new AreaSelector(document.getElementById('areaSelector'));