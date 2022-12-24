
(function () {
    var mainPopup = document.createElement("div");
    mainPopup.id = "mainPageFixedPopup";



    var toggler = document.createElement('div');

    var header = `<div class="col-12 outerr">
    
    <div class="row"><div class="col-12">
    <div class="close position-absolute" id="closePopup">
    </div>
    </div>
    
    <div class="col-12 d-flex align-items-center py-3 text-start h-fx">
    <img src="https://discounts-space.com/images/faviconn.ico" alt="search" width="36px" >
     
    </div>
    </div>
    </div>
    </div>`;

    toggler.id = "couponSidebarToggler";

    var calledToggleBtn;

    document.querySelector("body").appendChild(mainPopup);

    document.querySelector("#mainPageFixedPopup").innerHTML = header;

    var currentSite = window.location.hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)[1];



    const fetchStore = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();

            toggler.setAttribute('count-data', json.length);

            for (let i = 0; i < json.length; i++) {
                const item = json[i];
                var coupon = `<div class="coupon-code-card d-flex justify-content-between align-items-center p-3">
                <div class='d-flex align-items-center maincoupon gap-2'>
                    <div class="couponImg">
                        <img draggable="false" src="${item.image_path}/${item.media.image}" class="w-100" alt="logo" />
                    </div>
                    <div>
                        <a href=${item.single_coupon_url} target='_blank' class="fs-6 mb-0 para text-dark text-start fw-light text-truncate-2">
                            ${item.coupon.title}
                        </a>
                        <div class="couponCt pop d-flex text-start my-1 align-items-center">
                            <p class="mb-0">
                                <strike>${item.coupon.compare_price}</strike>
                            </p>
                            <p class="mb-0 text-main">
                                ${item.coupon.regular_price}
                            </p>
        
                            <div class="batchMain">
                                <div id=""
                                    class="gold-0-3-73 goldBadge-0-3-74 goldBadge-d2-0-3-83">
                                   
                                    <span class="labelSpn">${item.coupon.discount}% off</span>
                                </div>
                            </div>
                        </div>
                        <div class="label text-start">
                            <p class="mb-0 fs-12">
        
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="none" class="injected-svg"
                                    data-src="https://cdn.honey.io/images/icon-2_0/coupon_mini-fill-16.svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M11.4 4a.6.6 0 0 1 .6.6v3.876l-3.961 3.789a1 1 0 0 1-1.411-.029l-2.944-3.05a1 1 0 0 1 .014-1.404L7.5 4h3.9zM10 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                                        fill="#212121" class="fill"></path>
                                </svg>
                                ${item.category.title}
                            </p>
                        </div>
                    </div>
                </div>
                <div class='button'>
                    <button  class="copyCode btn btn-main">
                        Copy Code
                    </button>
                    <button  class="applyCode btn btn-main">
                        Apply Code
                    </button>
                    <input type="hidden" class="couponCode" value="${item.coupon.coupon_code}">
                </div>
                
            </div>`;
                document.querySelector("#mainPageFixedPopup").innerHTML += coupon;
            }


            document.querySelector("body").appendChild(toggler);


            calledToggleBtn = document.getElementById("couponSidebarToggler");

            calledToggleBtn.innerHTML = `<img src="https://discounts-space.com/images/logo-exe.png">`;
            // calledToggleBtn.innerHTML = `${json.length} Coupons Found!`;

            json.length === 0 ? calledToggleBtn.style.right = "-100%" : calledToggleBtn.style.right = "0%";

            const applyOrCopy = (selectorr, cond) => {
                var anchors = document.querySelectorAll(selectorr);
                for (var i = 0; i < anchors.length; i++) {
                    var anchor = anchors[i];
                    anchor.onclick = function () {
                        if (cond === "isCopy") {
                            navigator.clipboard.writeText(this.parentNode.querySelector(".couponCode").value);
                            this.innerHTML = "Copied!";
                            setTimeout(() => {
                                this.innerHTML = "Copy Code";
                            }, 1500);
                        }
                        else if (cond === "isApply") {
                            this.innerHTML = "Applied!";
                            document.querySelector("input.pmts-claim-code").value = this.parentNode.querySelector(".couponCode").value
                            setTimeout(() => {
                                this.innerHTML = "Apply Coupon";
                            }, 1500);

                            document.querySelector(".pmts-claim-code-apply-button input").click();

                        }
                        else {
                            document.querySelectorAll("#mainPageFixedPopup .button").remove();
                        }
                    }
                }

            }

            calledToggleBtn.addEventListener('click', () => {
                document.querySelector('#closePopup').addEventListener("click", () => {
                    document.querySelector("#mainPageFixedPopup").style.display = "none";
                })
                if (document.querySelector("input.pmts-claim-code")) {
                    const elementz = document.querySelectorAll('.copyCode');

                    elementz.forEach(box => {
                        box.remove();
                    });



                    applyOrCopy("button.applyCode", "isApply");
                }
                else {
                    const elementz = document.querySelectorAll('.applyCode');
                    elementz.forEach(box => {
                        box.remove();
                    });

                    applyOrCopy("button.copyCode", "isCopy");



                }
                document.getElementById("mainPageFixedPopup").style.display === "none" ? document.getElementById("mainPageFixedPopup").style.display = "block" : document.getElementById("mainPageFixedPopup").style.display = "none";
            })


        } catch (error) {
            console.log("error", error);
        }
    }

    fetchStore(`https://discounts-space.com/public/api/CouponAgainstDomain?token=152784823qtjzdfg213&domain_name=${currentSite}`);

})();

