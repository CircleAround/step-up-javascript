class AreaSelector {
  constructor(rootElm) {
    this.rootElm = rootElm;
    this.prefectures = [];
    this.cities = [];
    this.prefCode = null;
    this.init();
  }

  async init() {
    try {
      await this.updatePref();
      await this.updateCity();
    } catch(e) {
      this.rootElm.innerText = '地域情報の読み込みに失敗しました';
      console.error(e);
    }
  }

  async updatePref() {
    const prefResponse = await fetch('prefectures.json');
    this.prefectures = await prefResponse.json();
    this.prefCode = this.prefectures[0].code;
    this.updatePrefOptionsHtml();
  }

  async updateCity() {
    const cityResponse = await fetch(`./cities/${this.prefCode}.json`);
    this.cities = await cityResponse.json();
    this.updateCityOptionsHtml();
  }

  updatePrefOptionsHtml() {
    let optionsStr = this.prefectures.map((pref) => {
      return `
        <option name="${pref.name}" value="${pref.code}">
          ${pref.name}
        </option>
      `;
    });
    
    const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    prefSelectorElm.innerHTML = optionsStr.join('\n');
    prefSelectorElm.addEventListener('change', async(event) => {
      this.prefCode = event.target.value;
      this.updateCity();
    });
  }

  updateCityOptionsHtml() {
    let optionsStr = this.cities.map((city) => {
      return `
        <option name="${city.name}" value="${city.code}">
          ${city.name}
        </option>
      `;
    });
    
    const citySelectorElm = this.rootElm.querySelector('.cities');
    citySelectorElm.innerHTML = optionsStr.join('\n');
  }
}

new AreaSelector(document.getElementById('areaSelector'));