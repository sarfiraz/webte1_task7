//getting Elements by query selector
const gallery = document.querySelector('#gallery');
const filter = document.querySelector('#filter');
let images=[];  //we create this list to append data from json to use it later

//checking if the local storage is empty
if (localStorage.getItem("search") === null) {
    localStorage.setItem("search", '');
}

//setting the value of local storage to be shown in input bar
filter.value = localStorage.getItem("search");

//main function for our program to create elements like div and store images
//in them.
const todoFunction = (image, gallery) =>{

    const div = document.createElement('div');
    const link = document.createElement('a');
    const img = document.createElement('img');
    div.classList.add('item');
    link.classList.add('big');
    img.classList.add('small');
    img.src = image.link;
    link.href = image.src;

    //setting some necessary attributes for our link element
    link.setAttribute('data-fancybox','MyGallery');
    link.setAttribute('class', 'fancybox');
    link.setAttribute('data-caption', image.title);
    link.appendChild(img);
    div.appendChild(link);
    gallery.appendChild(div);

    //using the fancybox js library in order to show images using fancybox js.
    $('.fancybox').fancybox({
        playSpeed: 1000,  //set the speed for playing images as animation
        slideShow: {
            autoStart: false,   //setting autoStart to false to avoid auto play
            speed: 1500    //speed for every image 1.5 sec
        },
        loop: true      //looping set to true to loop animating
    });

    //using sortable js library to apply drag and drop on our images.
    new Sortable(gallery, {
        animation: 150,
        ghostClass: 'blue-background-class'
    });
}
//adding filter to our input element
filter.addEventListener('input',event =>{
    localStorage.setItem("search",event.target.value);   //set input value to storage
    gallery.innerHTML='';   //and then display nothing to our div where we store images
    //checking if the entered char is at any image and then call our function
    images
        .filter(image => image.description.indexOf(event.target.value)!==-1 || image.title.indexOf(event.target.value)!==-1)
        .forEach(image => todoFunction(image,gallery))
})
//using fetch api take images from json file
fetch('./photos.json')
    .then(res => res.json())
    .then(data=> {
        images.push(...data)
        data
            .filter(image => image.description.indexOf(localStorage.getItem("search"))!==-1 || image.title.indexOf(localStorage.getItem("search"))!==-1)
            .forEach(image => todoFunction(image,gallery));
})

