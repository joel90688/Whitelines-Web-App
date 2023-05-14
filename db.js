let db = null;
let pictureID = 0;
let request = window.indexedDB.open('myDatabase', 1);

request.onerror = function(event) {
  console.log('Failed to open database');
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log('Database opened successfully');

  const transaction = db.transaction(['myObjectStore'], 'readonly');
  const objectStore = transaction.objectStore(['myObjectStore']);
  
  const requ = objectStore.getAllKeys();
  
  requ.onsuccess = function(event) {
    const keys = event.target.result;
    console.log(keys); // an array of primary keys

	keys.forEach(key => {
	  getObjectById(key)
	    .then(url => {
	      const img = document.createElement("img");
	      img.style.cssText = 'float: left;width: 25%;padding: 5px;cursor: pointer';
	      img.src = url;
	      img.id = key;
	      img.class = "column";
	      img.addEventListener('mouseover',
	        function(){ img.style.outline = "2px dotted grey";});
	      img.addEventListener('mouseout',
	        function(){ img.style.outline = "none";});
	      document.getElementById("imageList").appendChild(img);

	      img.addEventListener('click', function () {
	        window.location.href = "edit.html";
	        localStorage.setItem("picture", img.src);
			localStorage.setItem("id", img.id);
	      })
	    })
	    .catch(error => console.log(error));
	});
  };
};


request.onupgradeneeded = function(event) {
  db = event.target.result;
  let objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('dom content loaded');

  document.querySelector('#file-input').addEventListener('change', savePicture);
});

function savePicture(event) {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function(event) {
    let blob = new Blob([new Uint8Array(event.target.result)]);
    let objectStore = db.transaction(['myObjectStore'], 'readwrite').objectStore('myObjectStore');
    let request = objectStore.add({ image: blob });

    request.onsuccess = function(event) {
      console.log('Image added to IndexedDB');
    };
  };
  reader.readAsArrayBuffer(file);
}

function getObjectById(id) {
	return new Promise(function(resolve, reject) {
	  let transaction = db.transaction(['myObjectStore'], 'readonly');
	  let objectStore = transaction.objectStore('myObjectStore');
	  let request = objectStore.get(id);
	  request.onsuccess = function(event) {
		let object = event.target.result;
		if (object) {
		  let blob = object.image;
		  let t = URL.createObjectURL(blob);
		  resolve(t);
		} else {
		  reject('Object not found');
		}
	  };
	  request.onerror = function(event) {
		reject('Error retrieving object');
	  };
	});
  }

  function removeImage() {
	console.log(' from IndexedDB');
	let ID = parseInt(localStorage.getItem("id"));
	console.log(ID);
	let objectStore = db.transaction(['myObjectStore'], 'readwrite').objectStore('myObjectStore');
	let request = objectStore.get(ID);
	request.onsuccess = function(event) {
	  if (request.result) {
		let deleteRequest = objectStore.delete(ID);
		deleteRequest.onsuccess = function(event) {
		  console.log('Image removed from IndexedDB');
		  window.location.href = "index.html";
		};
	  }
	};
  }
  