
let db;
let dbVersion = 1;
let dbReady = false;
let imagenr;

			document.addEventListener('DOMContentLoaded', () => {
				console.log('dom content loaded');

				initDb();

				document.querySelector('#picture').addEventListener('change', doFile);
				
				document.querySelector('#next').addEventListener('click', doImageNext);
				document.querySelector('#prev').addEventListener('click', doImagePrev);
});
			

 
			function initDb() {
				let request = indexedDB.open('testPics', dbVersion);

				request.onerror = function(e) {
					console.error('Unable to open database.');
				}

				request.onsuccess = function(e) {
					db = e.target.result;
					//doImageTest();
					console.log('db opened');
					imagenr = 1;
				}

				request.onupgradeneeded = function(e) {
					let db = e.target.result;
					let store = db.createObjectStore('cachedForms', { keyPath: 'id' });
					dbReady = true;
					
				}
			} 

			function doFile(e) {
				console.log('change event fired for input field');
				let file = e.target.files[0];
				var reader = new FileReader();
//				reader.readAsDataURL(file);
				reader.readAsBinaryString(file);

				reader.onload = function(e) {
					//alert(e.target.result);
					let bits = e.target.result;
					let ob = {
						created:new Date(),
						data:bits
					};

					let trans = db.transaction(['cachedForms'], 'readwrite');
					let addReq = trans.objectStore('cachedForms').put(ob);
					//let addReq = trans.put(ob, 1);


					addReq.onerror = function(e) {
						console.log('error storing data');
						console.error(e);
					}

					trans.oncomplete = function(e) {
						console.log('data stored');
					
					}
				}
			}

			function doImageNext() {
				console.log('doImageTest' + imagenr);
				let image = document.querySelector('#image');
				imagenr++;
				//let recordToLoad = 1; //parseInt(document.querySelector('#recordToLoad').value,10);
				//if(recordToLoad === '') recordToLoad = 1;

				let trans = db.transaction(['cachedForms'], 'readonly');
				
				//hard coded id
				let req = trans.objectStore('cachedForms').get(imagenr);
				req.onsuccess = function(e) {
					let record = e.target.result;
					console.log('get success', record);
					image.src = 'data:image/jpeg;base64,' + btoa(record.data);
					
				}
			}

			function doImagePrev() {
				console.log('doImageTest' + imagenr);
				let image = document.querySelector('#image');
				imagenr--;
				//let recordToLoad = 1; //parseInt(document.querySelector('#recordToLoad').value,10);
				//if(recordToLoad === '') recordToLoad = 1;

				let trans = db.transaction(['cachedForms'], 'readonly');
				
				//hard coded id
				let req = trans.objectStore('cachedForms').get(imagenr);
				req.onsuccess = function(e) {
					let record = e.target.result;
					console.log('get success', record);
					image.src = 'data:image/jpeg;base64,' + btoa(record.data);
			
				}
			}
