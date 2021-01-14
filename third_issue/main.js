class PhotoViewer {
  constructor(rootElm, images) {
    this.rootElm = rootElm;
    this.images = images;
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.updateView();
    this.handleListener();
  }

  updateView() {
    this.renderView();
    this.setTimer();
  }

  renderView() {
    const frameElm = this.rootElm.querySelector('.frame');
    frameElm.innerHTML = this.frameView();
  }

  frameView() {
    const imageIndex = (this.currentIndex + 1).toString();

    return `
      <p>${imageIndex}枚目</p>
      <div class="currentImage">
        <img src="${this.this.images[this.currentIndex]}" />
      </div>
    `;
  }

  setTimer() {
    if (this.intervalKey) {
      clearInterval(this.intervalKey);
    }
    
    this.intervalKey = setInterval(() => {
      this.next();
      this.renderView();
      this.setTimer();
    }, (5000));
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

  handleListener() {
    this.onClickNextButton();
    this.onClickPrevButton();
  }

  onClickNextButton() {
    const nextButtonElm = this.rootElm.querySelector('.nextButton');
    nextButtonElm.addEventListener('click', () => {
      this.next();
      this.updateView();
    });
  }

  onClickPrevButton() {
    const prevButtonElm = this.rootElm.querySelector('.prevButton');
    prevButtonElm.addEventListener('click', () => {
      this.prev();
      this.updateView();
    });
  }
}

const images = ['https://fakeimg.pl/250x150/81DAF5', 'https://fakeimg.pl/250x150/F781F3', 'https://fakeimg.pl/250x150/81F7D8'];
new PhotoViewer(document.getElementById('photoViewer'), images);