class AreaSelector {
  constructor(rootElm) {
    this.rootElm = rootElm;
    this.prefectures = [];
    this.cities = [];
    this.prefCode = null;
  }

  async init() {
    await this.updatePref();
    await this.updateCity();
  }

  async getPrefs() {
    const prefResponse = await fetch('./prefectures.json');
    return await prefResponse.json();
  }

  async getCities(prefCode) {
    const cityResponse = await fetch(`./cities/${prefCode}.json`);
    return await cityResponse.json();
  }

  async updatePref() {
    this.prefectures = await this.getPrefs();
    this.prefCode = this.prefectures[0].code;
    this.createPrefOptionsHtml();
  }

  async updateCity() {
    this.cities = await this.getCities(this.prefCode);
    this.createCityOptionsHtml();
  }

  createPrefOptionsHtml() {
    const prefSelectorElm = this.rootElm.querySelector('.prefectures');
    prefSelectorElm.innerHTML = this.toOptionsHtml(this.prefectures);

    prefSelectorElm.addEventListener('change', async(event) => {
      this.prefCode = event.target.value;
      this.updateCity();
    });
  }

  createCityOptionsHtml() {
    const citySelectorElm = this.rootElm.querySelector('.cities');
    citySelectorElm.innerHTML = this.toOptionsHtml(this.cities);
  }

  toOptionsHtml(records) {
    return records.map((record) => {
      return `
        <option name="${record.name}" value="${record.code}">
          ${record.name}
        </option>
      `;
    }).join('');
  }
}

const areaSelector = new AreaSelector(document.getElementById('areaSelector'));
areaSelector.init();