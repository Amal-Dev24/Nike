function changeColor(colorName) {
    let html = document.querySelector("html"),
        newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);
    html.style.setProperty("--main-color", newColor);
};

function updateImge(imgName, imgEle, commonName) {
    let currentSrc = imgEle.src,
        currentSrcArr = currentSrc.split('/');

    currentSrcArr[currentSrcArr.length - 1] = `${imgName}-${commonName}.png`;
    newSrc = currentSrcArr.join('/');
    imgEle.setAttribute('src', newSrc);

};

function checkScrolledNav() {
    if (this.window.scrollY > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

function currentSection(sectionId) {
    let section = document.querySelector(`#${sectionId}`),
        sectionTop = section.offsetTop,
        sectionHieght = section.clientHeight,
        sectionBottom = sectionHieght + sectionTop;
    if (window.scrollY > sectionTop && window.scrollY < sectionBottom) {
        let sectionId = section.getAttribute('id'),
            currentLink = nav.querySelector(".nav-link.active"),
            navLink = nav.querySelector(`a[href="#${sectionId}"]`);
        currentLink.classList.remove("active")
        navLink.classList.add("active")
    }
};

function preperImgList(imageList, isProduct = false) {
    let liElements = "";

    imageList.forEach(function (image) {

        liElements += `
         <li class="p-2 ${(isProduct) ? '' : ' mainBorder rounded-3'} ">
            <img src="./images_Nike/images/products/${image}" class="img-fluid "  onclick="changeSelectedImg('${image}',this)"  alt="">
         </li>

        `;

    })

    return liElements;
};

function preperPrice(price, discount) {

    return `
        <p>
            <span class="text-decoration-line-through mainColor ${(discount == 0) ? 'd-none' : ''}">${price}<sup>$</sup></span>
            <span class= "">${(price * (1 - discount)).toFixed(2)}<sup>$</sup></span>
        </p>
    `
};

function preperColorList(ColorList, isProductIntoCart = null) {
    let liElements = "";

    ColorList.forEach(function (color, index) {
        if (isProductIntoCart == null) {

            liElements += `
            <li class="mainbutton rounded-circle d-flex justify-content-center align-items-center rounded-2      ${(index == 0) ? 'active' : ''}  "
                onclick=" changeActive(this);updateColor('${color}', this) " style="background-color:${color} ;">
            </li>
        `;
        } else {
            liElements += `
            <li class="mainbutton rounded-circle d-flex justify-content-center align-items-center rounded-2    ${(isProductIntoCart.color == color) ? 'active' : ''} "
                onclick=" changeActive(this);updateColor('${color}', this) " style="background-color:${color} ;">
            </li>
        `;
        }

    })

    return liElements;
};

function preperSizesList(sizesList, isProductIntoCart = null) {
    let liElements = "";

    sizesList.forEach(function (size, index) {

        if (isProductIntoCart == null) {
            liElements += `
         <li
            class="mainbutton d-flex justify-content-center align-items-center rounded-2  ${(index == 0) ? 'active' : ''}  " onclick = " changeActive(this) ; updateSize('${size}', this) " >
            ${size}</li>

        `;
        } else {

            liElements += `
         <li
            class="mainbutton d-flex justify-content-center align-items-center rounded-2  ${(isProductIntoCart.size == size) ? 'active' : ''}  " onclick = " changeActive(this) ; updateSize('${size}', this) " >
            ${size}</li>

        `;
        }

    })

    return liElements;
};

function preperLiList(imageList) {
    let liElements = "";

    imageList.forEach(function (image, index) {

        liElements += `
        
          <li class="mainBorder  ${(index == 0) ? 'active' : ''}"  onclick = "changeSelectedImg('${image}',this) ;
           changeActive(this) "></li>

        `;

    })

    return liElements;
};

function changeSelectedImg(imgName, that) {


    let selectedImg = that.closest(".product").querySelector(".selectedImg img"),
        srcArr = selectedImg.src.split("/");

    srcArr[srcArr.length - 1] = imgName;
    selectedImg.setAttribute('src', srcArr.join("/"));


};

function changeActive(that) {

    let currentActive = that.parentElement.querySelector('.active');

    currentActive.classList.remove("active");
    that.classList.add("active");

};

function openPopup(popupName) {
    let popupEle = document.querySelector(`.popup[data-popup-name="${popupName}"]`);

    popupEle.classList.add('active');

    setTimeout(function () {

        popupEle.classList.add('show');

    }, 0)

};

function closePopup() {

    let popupEle = document.querySelector(".popup.active");

    popupEle.classList.remove('show');

    setTimeout(function () {

        popupEle.classList.remove('active');

    }, 1000)

};

function getProduct(productId) {
    return products.filter(product => product.id == productId)[0];
};

function showProduct(productId) {

    let product = getProduct(productId),
        popupProduct = document.querySelector(".popup[data-popup-name='product'] .box");
    let isProductIntoCart = checkProductIntoCart(product.id);
    popupProduct.innerHTML = `
        <div class="row product"
         data-selected-size = '${isProductIntoCart?.size ?? product.sizes[0]}'
            data-selected-color = '${isProductIntoCart?.color ?? product.colors[0]}'
        
        >
                    <div class="col-sm-6 box1">
                        <div class="item ">
                            <div class="selectedImg text-center">
                                <img src="./images_Nike/images/products/${product.images[0]}" alt="" class="img-fluid">
                            </div>
                            <ul class="list-unstyled d-flex mb-0">
                               ${preperImgList(product.images, true)}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 box2">
                        <div class="item">
                            <h4>${product.name}</h4>
                            ${preperPrice(product.price, product.discount)}
                            <hr>
                            <p>
                               ${product.description}
                            </p>
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

                            <div class="Color d-flex">
                                <div class="lable me-3">
                                    <p class="fw-bolder">Color :</p>
                                </div>
                                <div class="value">
                                    <ul class="list-unstyled active d-flex column-gap-2">

                                        ${preperColorList(product.colors, isProductIntoCart)};
                                        
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
    `




    openPopup('product');
};

function addToCart(productId, that) {
    let productEle = that.closest('.product'),
        newOrder =
        {
            id: productId,
            size: productEle.dataset.selectedSize,
            color: productEle.dataset.selectedColor,
        };
    cartProduct.push(newOrder);
    updateLocalStorage();
    toggleOrderBtn(that, 'remove');
    that.setAttribute('onclick', `removeFromCart(${productId}, this)`);
};

function removeFromCart(productId, that) {
    cartProduct = cartProduct.filter((product) => product.id != productId);
    updateLocalStorage();

    if (that != null) {

        toggleOrderBtn(that, 'add');
        that.setAttribute('onclick', `addToCart(${productId}, this)`);
    };

};

function toggleOrderBtn(btn, status) {

    if (status == 'add') {
        btn.classList.remove('remove');
        btn.textContent = 'Add To Cart';

    }
    else if (status == 'remove') {
        btn.classList.add('remove');
        btn.textContent = 'Remove From Cart';
    }
};

function updateSize(size, that) {

    let productEle = that.closest('.product');

    productEle.dataset.selectedSize = size;

};

function updateColor(color, that) {

    let productEle = that.closest('.product');

    productEle.dataset.selectedColor = color;

};

function updateLocalStorage() {
    localStorage.setItem('cartProduct', JSON.stringify(cartProduct));
};

function checkProductIntoCart(productId) {
    let result = cartProduct.filter((product) => product.id == productId);
    return result.length == 1 ? result[0] : null;
}

function showCart(that) {

    let content = document.querySelector(`.popup[data-popup-name="shop"] .row`);

    if (cartProduct.length == 0) {

        content.innerHTML = `
        <p class=" alert alert-warning text-center ">There are no products</p>
        `

    } else {
        content.innerHTML = "";

        cartProduct.forEach(function (cart) {
            let product = getProduct(cart.id);
            content.innerHTML += `
         <div class="col-md-4 col-sm-6 ">
                        <div class="item">
                            <div class="product bg-light p-3 mt-3" data-product-id ="${product.id}" >
                                <img src="./images_Nike/images/products/${product.images[0]}" class="img-fluid" alt="">
                                <h5>${product.name.slice(0, 12)}...</h5 >
                                

                            <div class="Size d-flex">
                                <div class="lable me-3">
                                    <p class="fw-bolder">Size :</p>
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

                                        
                                    ${preperSizesList([cart.size])}


                                    </ul>
                                </div>

                            </div>

                            <div class="Color d-flex">
                                <div class="lable me-3">
                                    <p class="fw-bolder">Color :</p>
                                </div>
                                <div class="value">
                                    <ul class="list-unstyled active d-flex column-gap-2">

                                        ${preperColorList([cart.color])}
                                        
                                    </ul>
                                </div>

                            </div>

                        <button class=" btn w-100 btn-danger " onclick = "removeFromShop(${product.id})" >Remove</button>
                            </div >
                        </div >
                    </div >
    `;

        });
    }
    openPopup('shop');
}

function removeFromShop(productId) {
    let product = document.querySelector(`.popup[data-popup-name="shop"] .row .product[data-product-id="${productId}"]`);
    product.parentElement.parentElement.remove();

    let buttonsOffLatest = document.querySelector(`#latestv.product[data-product-id="${productId}"] button`);


    removeFromCart(productId, that)
    if (cartProduct.length == 0) {
        let content = document.querySelector(`.popup[data-popup-name="shop"] .row`);
        content.innerHTML = `
        <p class=" alert alert-warning text-center ">There are no products</p>
        `

    }
}