// console.log('testing')
// https://api.unsplash.com/
const apiUrl = MY_API_KEY (must prvide here)
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//function for automation of setAttribute
function setAttributes(item, attributes) {
	for (const key in attributes) {
		item.setAttribute(key, attributes[key]);
	}
}

//image loaded funcrion
const imageLoaded = () => {
    //console.log(imagesLoaded)
    imagesLoaded ++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        //console.log('ready= ', ready)
    }
}

function displayPhotos() {
	photosArray.forEach((photo) => {
        imagesLoaded = 0;
        totalImages = photosArray.length;
      //  console.log('totalimages =  ', totalImages)
		const item = document.createElement('a');
		// item.setAttribute('href', photo.links.html);
		// item.setAttribute('target', '_blank');
		setAttributes(item, {
			href   : photo.links.html,
			target : '_blank'
		});

		const img = document.createElement('img');
		// img.setAttribute('src', photo.urls.regular);
		// img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded)
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		//console.log(photosArray);
		displayPhotos();
	} catch (err) {
		console.log(err);
	}
}

//add addEventListener to scroll
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        //console.log('load more')
        ready = false;
        getPhotos();
    }
})

getPhotos();