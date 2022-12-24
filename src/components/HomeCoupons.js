import React, { useEffect, useState, useContext } from 'react'
import config from '../config';
import Button from './Button';
import Error from './Error';
import Spinner from './Spinner';
import { AppContext } from "../context/appContext";

const HomeCoupons = () => {
    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const { setCouponItems } = useContext(AppContext);
    const [err, setErr] = useState("");

    useEffect(() => {
        let url = `https://discounts-space.com/public/api/coupons?token=${config.AUTH_TOKEN}&paginate=20&graph=featured&type=deals`;
        fetchHomeData(url);
    }, []);

    const fetchHomeData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setSpinner(false);
            // console.log(json);
            // setCouponItems(json);
        } catch (error) {
            setSpinner(false);
            console.log("error", error);
            setErr("An Error Occurred");
        }
    }
    return (
        <div>

            {spinner && <Spinner />}

            {data.length != 0 &&
                <div>
                    {
                        data.slice(0, 20).map((item) => {
                            return (
                                <div key={item.coupon.id} className="coupon-code-card d-flex justify-content-between align-items-center p-3">
                                    <div className='d-flex align-items-center maincoupon gap-2'>
                                        <div className="couponImg">
                                            <img draggable="false" src={`${item.image_path}/${item.media.image}`} className="w-100" alt="logo" />
                                        </div>
                                        <div>
                                            <a href={item.single_coupon_url} target={'_blank'} className="fs-6 mb-0 para text-dark text-start fw-light text-truncate-2">
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
                                                        {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="12" cy="12" r="11" fill="#ffc74f">
                                                        </circle>
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M7.084 6.4a1.4 1.4 0 0 1 1.4-1.4h7a1.4 1.4 0 0 1 1.4 1.4v.7h.864c.706 0 1.292.531 1.213 1.233-.19 1.692-1.062 4.328-4.177 4.367l-1.4 1.867a3.5 3.5 0 0 0-.676 1.687c1.556.244 2.252 1.261 2.555 1.987.162.388-.15.759-.572.759H9.277c-.421 0-.734-.37-.572-.76.303-.724 1-1.742 2.554-1.986a3.499 3.499 0 0 0-.675-1.687l-1.4-1.867c-3.115-.04-3.987-2.675-4.177-4.367C4.928 7.63 5.514 7.1 6.22 7.1h.864v-.7Zm9.78 1.89a6.301 6.301 0 0 1-1.076 3.06c.554-.186.93-.517 1.206-.896.451-.618.681-1.436.773-2.163l-.019-.001h-.883Zm-9.761 0H6.2c.093.728.323 1.546.774 2.164.276.379.652.71 1.206.896a6.3 6.3 0 0 1-1.077-3.06Zm8.73-1.19a.35.35 0 1 0-.7 0V7.151a6.533 6.533 0 0 1-.082.766 6.534 6.534 0 0 1-.58 1.826 9.994 9.994 0 0 1-.93 1.522 6.386 6.386 0 0 1-.381.463l-.02.02-.004.004a.35.35 0 0 0 .495.495l.002-.001.002-.003.008-.008a3.054 3.054 0 0 0 .125-.136c.082-.094.197-.232.333-.414.274-.365.636-.908.996-1.629a7.23 7.23 0 0 0 .645-2.023 7.218 7.218 0 0 0 .092-.911V7.1Z"
                                                            fill="#003087"></path>
                                                    </svg> */}
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
                            )
                        })
                    }
                    {/* <Button URL={"https://discounts-space.com/"} isLoading={false} Text="View All" /> */}
                </div>
            }
            {err && <Error err={err} />}
        </div>
    )
}

export default HomeCoupons