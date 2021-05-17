class PhotoViewer {
  constructor(rootElm, images) {
    this.rootElm = rootElm;
    this.images = images;
    this.currentIndex = 0;
  }

  init() {
    const nextButtonElm = this.rootElm.querySelector('.nextButton');
    nextButtonElm.addEventListener('click', () => {
      this.next();
    });

    const prevButtonElm = this.rootElm.querySelector('.prevButton');
    prevButtonElm.addEventListener('click', () => {
      this.prev();
    });

    this.updatePhoto();
  }

  updatePhoto() {
    const frameElm = this.rootElm.querySelector('.frame');
    const image = this.images[this.currentIndex];
    frameElm.innerHTML = `
      <div class="currentImage">
        <img src="${image}" />
      </div>
    `;
  }

  next() {
    const lastIndex = this.images.length - 1;
    if (this.currentIndex === lastIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }

    this.updatePhoto();
  }

  prev() {
    const lastIndex = this.images.length - 1;
    if (this.currentIndex === 0) {
      this.currentIndex = lastIndex;
    } else {
      this.currentIndex--;
    }

    this.updatePhoto();
  }
}

const images = [
  'https://fakeimg.pl/250x150/81DAF5', 
  'https://fakeimg.pl/250x150/F781F3', 
  'https://fakeimg.pl/250x150/81F7D8'
];
new PhotoViewer(document.getElementById('photoViewer'), images).init();