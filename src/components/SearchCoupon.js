import React, { useEffect, useState, useRef, useContext } from 'react'
import config from '../config';
import Button from './Button';
import { AppContext } from "../context/appContext";
import searchIco from '../assets/icon_search.svg'
import logo from '../assets/logo.png'
import Error from './Error';
import Spinner from './Spinner';
import { Filter } from './Filter';


const SearchCoupon = ({ value }) => {

    const [category, setCategory] = useState([]);
    const [checkz, setCheckz] = useState([]);
    const [store, setStore] = useState("");
    const [discount, setDiscount] = useState("");
    const [sort, setSort] = useState("");
    const [err, setErr] = useState("");
    const [total, setTotal] = useState(0);
    const [val, setValue] = useState("");
    const [isFilterActive, setIsFilterActive] = useState("");
    const [isMore, setIsMore] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecksAvail, setIsChecksAvail] = useState(false);
    const [incItems, setIncItems] = useState(5);
    const [data, setData] = useState([]);
    const [searchedCoupons, setSearchedCoupons] = useState();

    const getLength = arr => arr.flat(Infinity).length;

    const searchAndShow = async (url, isView) => {
        try {
            setIsLoading(true);
            setSpinner(true);
            const response = await fetch(url);
            const json = await response.json();
            if (json.success === false) {
                setErr(json.message);
                setIsMore(false);
                // console.log("falsed");
            }
            else if (json.length != 0 || json.success != false) {
                // console.log(url);
                setIsMore(true);
                setData(json);
                // if (isView) {
                //     setSearchedCoupons(...searchedCoupons, json);
                // } else { 
                setSearchedCoupons(json);
                // }
                setIsFilterActive(ref.current.value);

                // console.log(searchedCoupons);
                setErr("");
            }
            else {
                setErr("No Result Found!");
            }

            // setIsMore(true)

            setSpinner(false);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setSpinner(false);
            console.log(error);
            setIsMore(false)
            setTotal(0);
            setSearchedCoupons([]);
        }
    }



    const HandleEffect = () => {
        setTimeout(() => {
            activeSearch(false, ref.current.value);
            setSpinner(false);

        }, 2000);
        setSpinner(true);
    }

    const [peopleInfo, setPeopleInfo] = useState([]);
    const ref = useRef(null);
    const refCategory = useRef([]);
    const refDiscount = useRef([null]);
    const refMinPrice = useRef([null]);
    const refMaxPrice = useRef([null]);
    const refSort = useRef(0);
    const refStore = useRef(null);
    const refChecks = useRef([]);

    const activeSearch = (isView, valu) => {
        setIncItems(5);
        let url = `https://discounts-space.com/public/api/coupons?token=${config.AUTH_TOKEN}&type=&category_ids=${refCategory.current.length > 0 ? `[${refCategory.current}]` : ""}&store_id=${refStore.current.value}&discount=${refDiscount.current.value}&sort=${refSort.current.value}&min_price=${refMinPrice.current.value}&max_price=${refMaxPrice.current.value}&search=${valu}`;
        searchAndShow(url, isView);

        console.log(url);
    }

    const handleViewMore = () => {
        if (searchedCoupons.length > 5) {
            setIsMore(true);
            if (incItems > searchedCoupons.length) {
                setIsMore(false);
                setErr("No More Coupons Found!");
            }
        }
        else {
            setIsMore(false);
            setErr("No Coupon Found!");
        }
        if (incItems > searchedCoupons.length) {
            setIsMore(false);
            setErr("No More Coupons Found!");
        }
        setIncItems(incItems + 5);
    }

    const handleChecks = (e) => {
        if (!e.currentTarget.checked) {
            const isMatch = (value) => value != e.target.value;
            const even = refChecks.current.filter(isMatch);
            refChecks.current = even
        }
        else {
            let temp = e.target.value;
            refChecks.current = [...refChecks.current, temp];
        }
        if (refChecks.current.length > 0) {
            setIsChecksAvail(true)
        }
        else {
            setIsChecksAvail(false);
        }
    };

    const openAllUrlz = () => {
        for (let i = 0; i < refChecks.current.length; i++) {
            window.open(refChecks.current[i], '_blank');
            // console.log("eeee");
        }
    };

    return (

        <div id="profile" className="cards tab-pane" role="tabpanel" aria-labelledby="profile-tab">

            <div className="row">
                <div className="col-12 mainHead">
                    <div className="row">
                        <div className="col-12">
                            <div className="close position-absolute">
                                {/* <button
                                    className="fa fa-close fs-4 border-0 bg-transparent close-popup cp-main"
                                    id="searchByKeyword"><img src={searchIco} alt="search" onClick={() => activeSearch(false)}
                                        className="w-100" /></button> */}
                            </div>
                        </div>
                        <div className="col-12 d-flex align-items-center py-3 text-start h-fx">
                            <div className="w-100 searchDeals position-relative overflow-hidden">
                                {/* <img src={logo} alt="Logo" width="26px" height="42px" /> */}
                                <img src={searchIco} alt="search" width="26px" height="42px" />
                                <input type="text" placeholder="Search Coupons & Deals Here..." ref={ref} onChange={() => setValue(ref.current.value)} defaultValue={val} value={val} style={{ "fontSize": "14px" }} className="w-75 bg-transparent border-0 shadow-none outline-none ps-1" id="searchStores" />
                                <button class="btn btn-main position-absolute top-0 end-0 h-100 py-1" onClick={HandleEffect}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row" style={{ 'marginTop': '86px' }}>
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            {/* <h6 className="paraLg text-dark">
                                Trending Stores
                            </h6> */}
                            {/* <a href="https://discounts-space.com/" target="_blank">View All</a> */}
                        </div>
                        <div className="col-12 px-0" id="searchedCoupons">

                            {/* {searchedCoupons} */}
                            {/* <>a</> */}

                            <Filter setStore={setStore} openAllUrlz={openAllUrlz} isChecksAvail={isChecksAvail} raf={isFilterActive} refCategory={refCategory} refDiscount={refDiscount} refMinPrice={refMinPrice} refMaxPrice={refMaxPrice} sorf={sort} refStore={refStore} refSort={refSort} setDiscount={setDiscount} setSort={setSort} setCategory={setCategory} category={category} HandleEffect={HandleEffect} />
                            {data.length === 0 ? <div></div> :
                                searchedCoupons.slice(0, incItems).map((item) => {
                                    return (
                                        <div div key={item.coupon.id} className="coupon-code-card d-flex justify-content-between align-items-center p-3" >
                                            <div className='d-flex align-items-center maincoupon gap-2'>
                                                {/* <input type="checkbox" class="urlz form-check-input" onChange={(e) => handleChecks(e)} value={item.coupon.affiliate_url} /> */}
                                                <div className="couponImg">
                                                    <img draggable="false" src={`${item.image_path}/${item.media.image}`} className="w-100" alt="logo" />
                                                </div>
                                                <div>
                                                    <a href={`${item.single_coupon_url}`} target="_blank" className="fs-6 mb-0 para text-dark text-start fw-light titleA text-truncate-2">
                                                        {item.coupon.title}
                                                    </a>
                                                    <div className="couponCt text-start my-1">
                                                        <p className="mb-0">
                                                            <strike>${item.coupon.compare_price}</strike>
                                                        </p>
                                                        <p className="mb-0 text-main">
                                                            ${item.coupon.regular_price}
                                                        </p>
                                                        <div className="batchMain">
                                                            <div id="" className="gold-0-3-73 goldBadge-0-3-74 goldBadge-d2-0-3-83">
                                                                <span className="labelSpn">${item.coupon.discount}% off</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="label text-start">
                                                        <p className="mb-0 fs-12">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="none" className="injected-svg"
                                                                data-src="https://cdn.honey.io/images/icon-2_0/coupon_mini-fill-16.svg"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink">
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                    d="M11.4 4a.6.6 0 0 1 .6.6v3.876l-3.961 3.789a1 1 0 0 1-1.411-.029l-2.944-3.05a1 1 0 0 1 .014-1.404L7.5 4h3.9zM10 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                                                                    fill="#212121" className="fill"></path>
                                                            </svg>   {item.category.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='button'>
                                                <a href={`${item.coupon.affiliate_url}`} target="_blank" className="fs-6 mb-0 para text-dark text-start fw-light titleA text-truncate-2 affLink">
                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ "width": "34px", "height": "34px" }} viewBox="0 0 24 24"><g data-name="Circle Up Right"><circle cx="12" cy="12" r="10" style={{ 'fill': "#fff4dc" }} /><path d="M16 7h-4a1 1 0 0 0 0 2h1.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 10.414V12a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z" style={{ "fill": "#ff8e31" }} /></g></svg>
                                                </a>
                                            </div>
                                            <input type="hidden" name='since_id' className='sinceId' value={`&since_id=${item.coupon.id}`} defaultValue="Search..." />
                                        </div>
                                    )
                                })
                            }

                            {spinner && <Spinner />}

                            {/* {total <= 5 ?
                                <Error err="" />
                                :

                                <div> 
                                    <div onClick={() => { activeSearch(true) }}>
                                        <Button isLoading={isLoading} Text="View More" />
                                    </div>
                                </div> Areee Bhaee

                            } */}
                            {isMore &&
                                <div>
                                    <div onClick={handleViewMore}>
                                        <Button isLoading={isLoading} Text="View More" />
                                    </div>
                                </div>
                            }
                            {err && <Error err={err} />}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SearchCoupon