let
    scCarousel = document.querySelector("#sc-carousel"),
    nextSlide = document.querySelector(".next"),
    prevSlide = document.querySelector(".prev"),
    logoEle = document.querySelector("#logo"),
    correctEle = document.querySelectorAll('.title img'),
    nav = document.querySelector('nav.navbar'),
    navLinks = nav.querySelectorAll(".nav-link"),
    latestContent = document.querySelector("#latest .content"),
    featuredContent = document.querySelector("#featured .content .row"),
    popupBoxes = document.querySelectorAll(".popup .box"),
    cartProduct = [],
    buttonNav = document.querySelector('nav button'),
    menu = document.querySelector("nav.navbar .navbar-collapse");


checkScrolledNav();
if (localStorage.getItem('cartProduct') == null) {
    updateLocalStorage();
} else {
    cartProduct = JSON.parse(localStorage.getItem('cartProduct'));
};



nextSlide.addEventListener("click", function (e) {
    let currentSlide = scCarousel.querySelector(".section.active"),
        newSlide = currentSlide.nextElementSibling ?? scCarousel.firstElementChild,
        currentColor = newSlide.dataset.colorName;


    currentSlide.classList.remove("active");
    newSlide.classList.add("active");

    changeColor(currentColor);
    updateImge(currentColor, logoEle, 'logo');
    correctEle.forEach(function (correctEle) {
        updateImge(currentColor, correctEle, 'correct');
    })


});

prevSlide.addEventListener("click", function (e) {
    let currentSlide = scCarousel.querySelector(".section.active"),
        newSlide = currentSlide.previousElementSibling ?? scCarousel.lastElementChild,
        currentColor = newSlide.dataset.colorName;

    currentSlide.classList.remove("active");
    newSlide.classList.add("active");


    changeColor(currentColor);
    updateImge(currentColor, logoEle, 'logo');
    correctEle.forEach(function (correctEle) {
        updateImge(currentColor, correctEle, 'correct');
    })





});

window.addEventListener("scroll", function (e) {

    checkScrolledNav();
    currentSection('latest');
    currentSection('featured');
    currentSection('home');

});

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function (e) {
        e.preventDefault()
        let currentLink = nav.querySelector(".nav-link.active"),
            currentId = navLink.getAttribute('href'),
            currentSection = document.querySelector(currentId),
            topOfSection = currentSection.offsetTop;

        currentLink.classList.remove("active");

        navLink.classList.add("active");
        window.scrollTo(0, topOfSection - nav.clientHeight);
    })
});

window.addEventListener('DOMContentLoaded', function () {
    let loadingPage = document.querySelector('section.loadingPage');
    loadingPage.classList.add("hide");
    setTimeout(function () {
        loadingPage.classList.add("d-none");
    }, 1000)
});

latest.forEach(function (product) {
    let isProductIntoCart = checkProductIntoCart(product.id);
    latestContent.innerHTML += `
        <div 
            class="product mainBorder mb-3 rounded-3 p-3  bg-white  "
            data-selected-size = '${isProductIntoCart?.size ?? product.sizes[0]}'
            data-selected-color = '${isProductIntoCart?.color ?? product.colors[0]}'
            data-product-id = '${product.id}'
        >
                    <div class="row">
                        <div class="col-lg-6 part1">
                            <div class="item">
                                <div class="row">
                                    <div class="col-lg-3 col-md-2 col-xl-2 box1">
                                        <div class="item">
                                            <ul class="list-unstyled d-flex flex-lg-column row-gap-lg-2 flex-row  column-gap-2  mb-0">
                                                    ${preperImgList(product.images)}  
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-9   col-md-10 col-xl-10  box2   my-auto">
                                        <div class="item">
                                            <div class="selectedImg">
                                                <img src="./images_Nike/images/products/${product.images[0]}" class="img-fluid"
                                                    alt="${product.name}">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 part2  ">
                            <div class="item">
                                <h2 class="">${product.name}</h2>
                                <p>${product.description}
                                </p>
                                <div class="price d-flex ">
                                    <div class="lable me-3">
                                        <p class="fw-bolder">Price :</p>
                                    </div>
                                    <div class="value">
                                       ${preperPrice(product.price, product.discount)}
                                    </div>


                                </div>
                                <div class="Size d-flex">
                                    <div class="lable me-3">
                                        <p class="fw-bolder">Size :</p>
                                    </div>
                                    <div class="value">
                                        <ul class="list-unstyled active d-flex column-gap-2">
                                            ${preperSizesList(product.sizes, isProductIntoCart)}
                                           
                                        </ul>
                                    </div>

                                </div>
                                ${(isProductIntoCart == null) ?
            `<button class="mainbutton btn " onclick =" addToCart(${product.id}, this)" >Add To Card</button>`
            :
            `<button class="mainbutton btn remove" onclick =" removeFromCart(${product.id}, this)" >Remove From Card</button>`
        }
                               
                            </div>
                        </div>
                    </div>
                </div>
    
    `

});

features.forEach(function (product) {

    featuredContent.innerHTML += `
        <div class="col-lg-3 col-sm-6 ">
            <div class="item">
                <div class="product text-center bg-white rounded-3 py-3 position-relative mt-5">
                    <p class="text-center position-absolute w-100 discount ${(product.discount == 0) ? 'd-none' : ''} ">-${product.discount * 100}%</p>
                    <div class="head">
                        <div class="selectedImg">
                            <img src="./images_Nike/images/products/${product.images[0]}" class="img-fluid" alt="${product.name}">
                        </div>
                        <i
                            class="fa-solid fa-magnifying-glass d-flex justify-content-center align-items-center m-auto icon" onclick = "showProduct(${product.id})">
                        </i>
                        <ul class="list-unstyled d-flex justify-content-center column-gap-2 ">
                            
                            ${preperLiList(product.images)}

                        </ul>
                    </div>
                    <div class="body">

                        <h6>    ${product.name}
                        </h6>
                        ${preperPrice(product.price, product.discount)}
                    </div>
                </div>
            </div>
        </div>`







});

popupBoxes.forEach(function (box) {
    box.addEventListener('click', function (e) {
        e.stopPropagation();

    });

});

buttonNav.addEventListener("click", function (e) {
    menu.classList.toggle("open");


})