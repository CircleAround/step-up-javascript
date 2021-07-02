class PhotoViewer {
  constructor(rootElm, images) { // --- [1]
    this.rootElm = rootElm;
    this.images = images;
    this.currentIndex = 0; // --- [2]
  }

  init() {
    const frameElm = this.rootElm.querySelector('.frame'); // --- [3]
    const image = this.images[this.currentIndex]; // --- [4]
    frameElm.innerHTML = `
      <div class="currentImage">
        <img src="${image}" />
      </div>
    `;
  }
}

const images = [
  'https://fakeimg.pl/250x150/81DAF5',
  'https://fakeimg.pl/250x150/F781F3',
  'https://fakeimg.pl/250x150/81F7D8'
];
new PhotoViewer(document.getElementById('photoViewer'), images).init(); // --- [5]