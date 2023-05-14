let db = null;
let pictureID = 0;
let request = window.indexedDB.open('myDatabase', 1);

request.onerror = function(event) {
  console.log('Failed to open database');
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log('Database opened successfully');
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  let objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('dom content loaded');

  document.querySelector('#picture').addEventListener('change', savePicture);
  document.querySelector('#remove').addEventListener('click', removeImage);
    
  document.querySelector('#next').addEventListener('click', () => getImage('next'));
  document.querySelector('#prev').addEventListener('click', () => getImage('prev'));
});

function savePicture(event) {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function(event) {
    let blob = new Blob([new Uint8Array(event.target.result)]);
    let objectStore = db.transaction(['myObjectStore'], 'readwrite').objectStore('myObjectStore');
    let request = objectStore.add({ image: blob });

    request.onsuccess = function(event) {
        pictureID += 1;
      console.log('Image added to IndexedDB');
    };
  };
  reader.readAsArrayBuffer(file);
}

//retrieve
function getImage(direction) {
    let objectStore = db.transaction(['myObjectStore'], 'readonly').objectStore('myObjectStore');
    if (direction === 'next') {
      let cursorRequest = objectStore.openCursor(IDBKeyRange.lowerBound(pictureID + 1), 'next');
      cursorRequest.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          pictureID = cursor.key;
          let blob = cursor.value.image;
          let image = document.querySelector('#image');
          image.src = URL.createObjectURL(blob);
          document.querySelector('#prev').disabled = false;
        } else {
          document.querySelector('#next').disabled = true;
        }
      };
    } else {
      let cursorRequest = objectStore.openCursor(IDBKeyRange.upperBound(pictureID - 1), 'prev');
      cursorRequest.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          pictureID = cursor.key;
          let blob = cursor.value.image;
          let image = document.querySelector('#image');
          image.src = URL.createObjectURL(blob);
          document.querySelector('#next').disabled = false;
        } else {
          document.querySelector('#prev').disabled = true;
        }
      };
    }
  }
  

  function removeImage() {
    let objectStore = db.transaction(['myObjectStore'], 'readwrite').objectStore('myObjectStore');
    let request = objectStore.get(pictureID);
    request.onsuccess = function(event) {
      if (request.result) {
        objectStore.delete(pictureID);
        console.log('Image removed from IndexedDB');
        getImage('next');
      }
    };
  }