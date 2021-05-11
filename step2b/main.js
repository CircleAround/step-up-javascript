class PhotoViewer {
  constructor(rootElm, images) {
    this.rootElm = rootElm;
    this.images = images;
    this.currentIndex = 0;
  }

  init() {
    this.updateHtml();
    const nextButtonElm = this.rootElm.querySelector('.nextButton');
    const prevButtonElm = this.rootElm.querySelector('.prevButton');

    nextButtonElm.addEventListener('click', () => {
      this.next();
      this.updateHtml();
    });
    prevButtonElm.addEventListener('click', () => {
      this.prev();
      this.updateHtml();
    });
  }

  updateHtml() {
    this.renderHtml();
    this.setTimer();
  }

  renderHtml() {
    const frameElm = this.rootElm.querySelector('.frame');
    const imageIndex = this.currentIndex + 1;
    frameElm.innerHTML = `
      <p>${imageIndex}枚目</p>
      <div class="currentImage">
        <img src="${this.images[this.currentIndex]}" />
      </div>
    `;

    const imagesElm = this.rootElm.querySelector('.images');
    imagesElm.innerHTML = '';
    const imageStrs = [];
    for(const image of this.images) {
      imageStrs.push(`<a href="${image}" target="_blank">${image}</a>`);
    }
    imagesElm.innerHTML = imageStrs.join('<br>');
  }

  setTimer() {
    if (this.intervalKey) {
      clearInterval(this.intervalKey);
    }
    
    this.intervalKey = setInterval(() => {
      this.next();
      this.updateHtml();
    }, (3000));
  }

  next() {
    const lastIndex = this.images.length - 1;
    if (lastIndex === this.currentIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  prev() {
    const lastIndex = this.images.length - 1;
    if (this.currentIndex === 0) {
      this.currentIndex = lastIndex;
    } else {
      this.currentIndex--;
    }
  }
}

const images = ['https://fakeimg.pl/250x150/81DAF5', 'https://fakeimg.pl/250x150/F781F3', 'https://fakeimg.pl/250x150/81F7D8'];
new PhotoViewer(document.getElementById('photoViewer'), images).init();