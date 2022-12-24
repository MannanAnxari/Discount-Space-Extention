import React, { useState, useContext, useEffect, useRef } from 'react';
import Button from './Button';
import { AppContext } from "../context/appContext";
import Error from './Error';
import Spinner from './Spinner';
import config from '../config';


const Wishlist = () => {
    const { isUserLogin, userName, cookie, getCookie, ref } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const fetchHomeData = async (url) => {
        try {
            setIsLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setSpinner(false);
            console.log(data);
            setIsLoading(false);
        } catch (error) {
            console.log("Catch");
            setSpinner(false);
            setIsLoading(false);
            setErr("Your Wishlist is Empty!")
        }
    }
    useEffect(() => {
        if (isUserLogin) {
            let url = `https://discounts-space.com/public/api/getSavedItemByCookies?token=${config.AUTH_TOKEN}&cookies=${cookie}`;
            console.log(url);
            fetchHomeData(url);
            console.log("Eff");
        }
        else {
            console.log("Else");
            setSpinner(false);
            setIsLoading(false);
            setErr("An Error Occurred!")
        }

        // let url = `https://discounts-space.com/public/api/getSavedItemByCookies?token=152784823qtjzdfg213&cookies=145493236401111120221669896256655`;
        // console.log(isUserLogin);

    }, [isUserLogin]);
    const [isChecksAvail, setIsChecksAvail] = useState(false);

    const refChecks = useRef([]);

    const handleChecks = (e) => {
        if (!e.currentTarget.checked) {
            const isMatch = (value) => { console.log(value); return value != e.target.value; };
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
    return (
        <div className="row">
            <div className="col-12 px-0" style={{ 'marginTop': '86px' }}>
                <div className="row">
                    {!isUserLogin ?
                        <div className="col-10 mx-auto">
                            <h1 className="paraLg text-dark text-start">
                                Join Discount Space
                            </h1>
                            <div className="" onClick={() => { ref.current.click(); }}>
                                <Button isLoading={isLoading} Text="Login" />
                            </div>
                            <h2 className="hrLine"><span className="hrLineSpn">OR</span></h2>
                            <div className="aggree">
                                <p className="mb-2 text-start text-dark fw-light fs-9">By joining, I
                                    agree to
                                    Discount Space TOS and Privacy.
                                </p>
                            </div>
                            <div className="join ">
                                <p className="fs-6 text-start">
                                    Don't Have An Account <a target={'_blank'} href="https://discounts-space.com/"> Sign Up</a>
                                </p>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="col-12 px-0 d-flex align-items-center justify-content-between" id='btttnn'>
                                <h3 className="parabdr text-start mb-0">
                                    Saved Items
                                </h3>
                                {isChecksAvail &&
                                    <button className='btn btn-main' >Open Selected Items</button>
                                }
                            </div>
                            <div className="col-12">

                                {data.length != 0 ?
                                    <div>
                                        {
                                            data.map((item) => {
                                                return (
                                                    <div key={item.coupon.id} className="coupon-code-card d-flex justify-content-between align-items-center p-3">
                                                        <div className="d-flex justify-content-between align-items-center w-100">

                                                            <input type="checkbox" class="urlz form-check-input" onChange={(e) => handleChecks(e)} value={item.coupon.affiliate_url}></input>
                                                            <div className='d-flex align-items-center gap-2'>
                                                                <div className="couponImg">
                                                                    <img draggable="false" src={`${item.image_path}/${item.media[0].image}`} className="w-100" alt="logo" />
                                                                </div>
                                                                <div>
                                                                    <a href={`${item.single_coupon_url}`} className="fs-6 mb-0 para text-dark text-start fw-light text-truncate-2">
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
                                                                            <div id=""
                                                                                className="gold-0-3-73 goldBadge-0-3-74 goldBadge-d2-0-3-83">
                                                                                <span className="labelSpn">{item.coupon.discount}% off</span>
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
                                                                            </svg>
                                                                            {item.category.title}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='button'>
                                                                <a href={`${item.coupon.affiliate_url}`} target="_blank" className="fs-6 mb-0 para text-dark text-start fw-light titleA text-truncate-2 affLink">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ "width": "34px", "height": "34px" }} viewBox="0 0 24 24"><g data-name="Circle Up Right"><circle cx="12" cy="12" r="10" style={{ 'fill': "#fff4dc" }} /><path d="M16 7h-4a1 1 0 0 0 0 2h1.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 10.414V12a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z" style={{ "fill": "#ff8e31" }} /></g></svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <Button URL={"https://discounts-space.com/"} isLoading={false} Text="View All" /> */}
                                    </div>
                                    : <div> {err && <Error err={err} />}</div>
                                }
                                {spinner && <Spinner />}

                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Wishlist