class PhotoViewer {
  constructor(rootElm, images) {
    this.rootElm = rootElm;
    this.images = images;
    this.currentIndex = 0;
  }

  init() {
    const nextButtonElm = this.rootElm.querySelector('.nextButton'); // --- [1〜]
    nextButtonElm.addEventListener('click', () => {
      this.next();
    }); // --- [〜1]

    const prevButtonElm = this.rootElm.querySelector('.prevButton'); // --- [2〜]
    prevButtonElm.addEventListener('click', () => {
      this.prev();
    }); // --- [〜2]

    this.updatePhoto(); // --- [3]
  }

  updatePhoto() { // --- [4〜]
    const frameElm = this.rootElm.querySelector('.frame');
    const image = this.images[this.currentIndex];
    frameElm.innerHTML = `
      <div class="currentImage">
        <img src="${image}" />
      </div>
    `;
  } // --- [〜4]

  next() {
    this.currentIndex++; // --- [5]
    this.updatePhoto();
  }

  prev() {
    this.currentIndex--;// --- [6]
    this.updatePhoto();
  }
}

const images = [
  'https://fakeimg.pl/250x150/81DAF5', 
  'https://fakeimg.pl/250x150/F781F3', 
  'https://fakeimg.pl/250x150/81F7D8'
];
new PhotoViewer(document.getElementById('photoViewer'), images).init();