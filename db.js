let db;
let dbVersion = 1;
let dbReady = false;

			document.addEventListener('DOMContentLoaded', () => {
				console.log('dom content loaded');

				document.querySelector('#picture').addEventListener('change', doFile);

				document.querySelector('#whenPressedBox').addEventListener('click', doImageTest);

				initDb();
			});

			function initDb() {
				let request = indexedDB.open('testPics', dbVersion);

				request.onerror = function(e) {
					console.error('Unable to open database.');
				}

				request.onsuccess = function(e) {
					db = e.target.result;
					console.log('db opened');
				}

				request.onupgradeneeded = function(e) {
					let db = e.target.result;
					db.createObjectStore('cachedForms', {keyPath:'id', autoIncrement: true});
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
					let addReq = trans.objectStore('cachedForms').add(ob);

					addReq.onerror = function(e) {
						console.log('error storing data');
						console.error(e);
					}

					trans.oncomplete = function(e) {
						console.log('data stored');
					}
				}
			}

			function doImageTest() {
				console.log('doImageTest');
				let image = document.querySelector('#image');
				let recordToLoad = 1 //parseInt(document.querySelector('#recordToLoad').value,10);
				//if(recordToLoad === '') recordToLoad = 1;

				let trans = db.transaction(['cachedForms'], 'readonly');
				//hard coded id
				let req = trans.objectStore('cachedForms').get(recordToLoad);
				req.onsuccess = function(e) {
					let record = e.target.result;
					console.log('get success', record);
					image.src = 'data:image/jpeg;base64,' + btoa(record.data);
				}
			}