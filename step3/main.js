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
    
    this.renderImageUrls();
    this.updatePhoto();
  }

  updatePhoto() {
    const frameElm = this.rootElm.querySelector('.frame');
    const imageNumber = this.currentIndex + 1;
    frameElm.innerHTML = `
      <p>${imageNumber}枚目</p>
      <div class="currentImage">
        <img src="${this.images[this.currentIndex]}" />
      </div>
    `;

    this.setTimer();
  }

  setTimer() {
    if (this.timerKey) {
      clearTimeout(this.timerKey);
    }
    
    this.timerKey = setTimeout(() => {
      this.next();
    }, 3000);
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

  renderImageUrls() {
    const imagesElm = this.rootElm.querySelector('.images');
    let imageUrlsHtml = '';
    for (const image of this.images) {
      imageUrlsHtml += `<li><a href="${image}" target="_blank">${image}</a></li>`;
    }
    imagesElm.innerHTML = imageUrlsHtml;
  }
}

const images = [
  'https://fakeimg.pl/250x150/81DAF5', 
  'https://fakeimg.pl/250x150/F781F3', 
  'https://fakeimg.pl/250x150/81F7D8'
];
new PhotoViewer(document.getElementById('photoViewer'), images).init();