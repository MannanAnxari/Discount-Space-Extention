let url = 'https://discounts-space.com/public/api/coupons?token=152784823qtjzdfg213&paginate=10&graph=featured&type=deals';
loader = '<div class="row"><div class="col-6 text-center mx-auto"><div class="spinner-border text-secondary my-3 mx-auto" role="status"><span class="visually-hidden">Loading...</span></div></div></div>';

Trending.innerHTML = loader;


fetch(url)
    .then(response => response.json())
    .then(data => {
        viewAll.style.display = "block";
        trHTML = '';
        for (let i = 0; i < data.length; i++) {
            const e = data[i];
            var category = e.category.title ? e.category.title : "Hey";
            trHTML +=
                `
                <div
                class="coupon-code-card d-flex justify-content-start align-items-center p-3">
                <div class="couponImg">
                    <img draggable="false" src="${e.image_path}/${e.media.image}" class="w-100" alt="logo">
                </div>
                <div> 
                        <h1 class="fs-6 mb-0 para text-dark text-start fw-light text-truncate-2">
                           ${e.coupon.title} 
                        </h1> 
                  <div class="couponCt text-start my-1">
                  <p class="mb-0 text-main">
                  ${e.coupon.regular_price}
                    </p>
                     <p class="mb-0">
               
                        <strike>${e.coupon.compare_price}</strike>
                        </p> 
                        
                     <div class="batchMain">
                     <div id=""
                         class="gold-0-3-73 goldBadge-0-3-74 goldBadge-d2-0-3-83">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                             <circle cx="12" cy="12" r="11" fill="#ffc74f">
                             </circle>
                             <path fillRule="evenodd" clip-rule="evenodd"
                                 d="M7.084 6.4a1.4 1.4 0 0 1 1.4-1.4h7a1.4 1.4 0 0 1 1.4 1.4v.7h.864c.706 0 1.292.531 1.213 1.233-.19 1.692-1.062 4.328-4.177 4.367l-1.4 1.867a3.5 3.5 0 0 0-.676 1.687c1.556.244 2.252 1.261 2.555 1.987.162.388-.15.759-.572.759H9.277c-.421 0-.734-.37-.572-.76.303-.724 1-1.742 2.554-1.986a3.499 3.499 0 0 0-.675-1.687l-1.4-1.867c-3.115-.04-3.987-2.675-4.177-4.367C4.928 7.63 5.514 7.1 6.22 7.1h.864v-.7Zm9.78 1.89a6.301 6.301 0 0 1-1.076 3.06c.554-.186.93-.517 1.206-.896.451-.618.681-1.436.773-2.163l-.019-.001h-.883Zm-9.761 0H6.2c.093.728.323 1.546.774 2.164.276.379.652.71 1.206.896a6.3 6.3 0 0 1-1.077-3.06Zm8.73-1.19a.35.35 0 1 0-.7 0V7.151a6.533 6.533 0 0 1-.082.766 6.534 6.534 0 0 1-.58 1.826 9.994 9.994 0 0 1-.93 1.522 6.386 6.386 0 0 1-.381.463l-.02.02-.004.004a.35.35 0 0 0 .495.495l.002-.001.002-.003.008-.008a3.054 3.054 0 0 0 .125-.136c.082-.094.197-.232.333-.414.274-.365.636-.908.996-1.629a7.23 7.23 0 0 0 .645-2.023 7.218 7.218 0 0 0 .092-.911V7.1Z"
                                 fill="#003087"></path>
                         </svg><span class="labelSpn">${e.coupon.discount}% off</span>
                     </div>
                 </div>
     
                        
                    </div> 
                    <div class="label text-start">
                    <p class="mb-0 fs-12">

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="none" class="injected-svg"
                    data-src="https://cdn.honey.io/images/icon-2_0/coupon_mini-fill-16.svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path fillRule="evenodd" clip-rule="evenodd"
                        d="M11.4 4a.6.6 0 0 1 .6.6v3.876l-3.961 3.789a1 1 0 0 1-1.411-.029l-2.944-3.05a1 1 0 0 1 .014-1.404L7.5 4h3.9zM10 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                        fill="#212121" class="fill"></path>
                </svg> ${category}
                       </p> 
                    </div>
                </div>
            </div>
        `;
        }
        Trending.innerHTML = trHTML;
    }).catch(err => Trending.innerHTML = "Please Check Your Connection!");
var lastItm;

const searchByKeywords = (val, i) => {
    console.log(i);
    searchedCoupons.innerHTML = "";
    searchAndAdd(`https://discounts-space.com/public/api/coupons?token=152784823qtjzdfg213&paginate=5&graph=featured&search=${val}`)
}
const searchAndAdd = (url) => {
    searchSpinner.innerHTML = loader
    fetch(url)
        .then(response => response.json())
        .then(data => {
            load_More.style.display = "block";
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                var category = e.category.title ? e.category.title : "Hey";
                searchedCoupons.innerHTML +=
                    `<div class="coupon-code-card d-flex justify-content-start align-items-center p-3">
                        <div class="couponImg">
                            <img draggable="false" src="${e.image_path}/${e.media.image}" class="w-100" alt="logo">
                        </div>
                    <div> 
                <a href="${e.coupon.affiliate_url}" target="_blank" class="fs-6 mb-0 para text-dark text-start fw-light titleA text-truncate-2">
                    ${e.coupon.title} 
                </a> 
                <div class="couponCt text-start my-1">
                  <p class="mb-0 text-main">
                  ${e.coupon.regular_price}
                    </p>
                     <p class="mb-0"> 
                        <strike>${e.coupon.compare_price}</strike>
                        </p>  
                     <div class="batchMain">
                     <div id=""
                         class="gold-0-3-73 goldBadge-0-3-74 goldBadge-d2-0-3-83">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                             <circle cx="12" cy="12" r="11" fill="#ffc74f">
                             </circle>
                             <path fillRule="evenodd" clip-rule="evenodd"
                                 d="M7.084 6.4a1.4 1.4 0 0 1 1.4-1.4h7a1.4 1.4 0 0 1 1.4 1.4v.7h.864c.706 0 1.292.531 1.213 1.233-.19 1.692-1.062 4.328-4.177 4.367l-1.4 1.867a3.5 3.5 0 0 0-.676 1.687c1.556.244 2.252 1.261 2.555 1.987.162.388-.15.759-.572.759H9.277c-.421 0-.734-.37-.572-.76.303-.724 1-1.742 2.554-1.986a3.499 3.499 0 0 0-.675-1.687l-1.4-1.867c-3.115-.04-3.987-2.675-4.177-4.367C4.928 7.63 5.514 7.1 6.22 7.1h.864v-.7Zm9.78 1.89a6.301 6.301 0 0 1-1.076 3.06c.554-.186.93-.517 1.206-.896.451-.618.681-1.436.773-2.163l-.019-.001h-.883Zm-9.761 0H6.2c.093.728.323 1.546.774 2.164.276.379.652.71 1.206.896a6.3 6.3 0 0 1-1.077-3.06Zm8.73-1.19a.35.35 0 1 0-.7 0V7.151a6.533 6.533 0 0 1-.082.766 6.534 6.534 0 0 1-.58 1.826 9.994 9.994 0 0 1-.93 1.522 6.386 6.386 0 0 1-.381.463l-.02.02-.004.004a.35.35 0 0 0 .495.495l.002-.001.002-.003.008-.008a3.054 3.054 0 0 0 .125-.136c.082-.094.197-.232.333-.414.274-.365.636-.908.996-1.629a7.23 7.23 0 0 0 .645-2.023 7.218 7.218 0 0 0 .092-.911V7.1Z"
                                 fill="#003087"></path>
                         </svg><span class="labelSpn">${e.coupon.discount}% off</span>
                     </div>
                 </div> 
                    </div> 
                    <div class="label text-start">
                    <p class="mb-0 fs-12">

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="none" class="injected-svg"
                    data-src="https://cdn.honey.io/images/icon-2_0/coupon_mini-fill-16.svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path fillRule="evenodd" clip-rule="evenodd"
                        d="M11.4 4a.6.6 0 0 1 .6.6v3.876l-3.961 3.789a1 1 0 0 1-1.411-.029l-2.944-3.05a1 1 0 0 1 .014-1.404L7.5 4h3.9zM10 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                        fill="#212121" class="fill"></path>
                </svg> ${category}
                       </p> 
                    </div>
                </div>
            </div>
        `;
                lastItm = `&since_id=` + e.coupon.id;
                searchSpinner.innerHTML = ""
            }
        }).catch(err => { console.log(err); searchSpinner.innerHTML = "Please Check Your Connection!" })
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
console.log(getCookie('cookies'));

function setCookie(name, value) {
    document.cookie = name + "=" + (value || "");
}
setCookie('ck', 'this is another cookie')
searchByKeyword.addEventListener('click', () => searchByKeywords(searchStores.value, 0));
load_More.addEventListener('click', () => searchAndAdd(`https://discounts-space.com/public/api/coupons?token=152784823qtjzdfg213&since_id=${lastItm}&paginate=5&graph=featured&search=${searchStores.value}`));



$(document).ready(function (e) {
    $("li[role='tabpanel']").on('click', () => {
        $("#home").css('display', "block");
    })
    $("li[data-tab-target='#search'],li[data-tab-target='#user']").on('click', () => {
        $("#home").css('display', "none");
    })
    $("li[data-tab-target='#home']").on('click', () => {
        $("#home").css('display', "block");
    })
});

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

$('#submitForm').on('click', function () {

})
const getRandom = () => {
    let date = new Date();
    let ms = date.getTime();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let rand = Math.floor(Math.random() * new Date().getTime());
    return `${rand}${day}${month}${year}${ms}`;
}
$(document).ready(function () {

    if (getCookie("USER_ID")) {
        console.log(getCookie("USER_ID"));
        fetch(`https://discounts-space.com/public/api/getUserByCookies?token=152784823qtjzdfg213&cookies=${getCookie("USER_ID")}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loggedDetails.innerHTML = '<button class="btn btn-main w-100" id="logout">Logout</button>'
                }
            }).catch(err => { console.log(err) })
    }
    else {
        console.log("Err");
    }


    $('form.login').submit((e) => {
        e.preventDefault();
        e.stopPropagation();

        cookie = getRandom();

        let emailD = email.value;
        let passwordD = password.value;
        console.log(emailD, passwordD);
        $.post("https://www.discounts-space.com/api/signin", { email: emailD, password: passwordD, cookies: cookie }, function (data) {
            if (data.success != false) {
                console.log("Success!");
                setCookie("USER_ID", cookie);
                console.log(getCookie("USER_ID"));
                loggedDetails.innerHTML = '<button class="btn btn-main w-100" id="logout">Logout</button>'
                $('form.login').find('input').css('border', '2px solid #198754')
            } else {
                console.log("Invalid Crediantials");
                $('form.login').find('input').css('border', '2px solid #dc3545')
            }
        })
    })
})