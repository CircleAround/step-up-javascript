class PhotoViewer {
  init() {
    const rootElm = document.getElementById('photoViewer'); // --- [1]
    const frameElm = rootElm.querySelector('.frame'); // --- [2]
    const image = 'https://fakeimg.pl/250x150/81DAF5'; // --- [3]

    // --- [4〜]
    frameElm.innerHTML = `
      <div class="currentImage">
        <img src="${image}" />
      </div>
    `;
    // --- [〜4]
  }
}

new PhotoViewer().init(); // --- [5]
