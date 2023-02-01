
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { TagsList } from './TagList';
import { AppContext } from '../context/appContext';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

export const TagsHeader = () => {

    const { heartedTags, setCurrentTag, currentTag, isUserLogin, userToken } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [itmsFrom, setItemFrom] = useState('');

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setCurrentTag("");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }



    const handleTag = (item) => {
        console.log(item);
        setIsLoading(true);
        setData([]);
        fetch(`https://discounts-space.com/public/api/web/react-items?user_token=${userToken}&type=save&search=${item}`).then(res => res.json()).then(json => {
            if (json.length) {
                setItemFrom("cart");
                setData(json);
                setIsLoading(false);
            }
            else {
                setItemFrom("global");
                fetch(`https://discounts-space.com/public/api/web/coupons?search=${item}`).then(res => res.json()).then(json => {
                    setIsLoading(false);
                    setData(json);
                }).catch(err => {
                    setIsLoading(false);
                    toast.error("Something went wrong!");
                })
            }

        }).catch(err => {
            setIsLoading(false);
            toast.error("Something went wrong!");
        })



        if (currentTag === item) {
            setCurrentTag("");
        }
        else {
            setCurrentTag(item);
        }
    }


    return (
        <div className='container-fluid px-0' ref={wrapperRef}>
            {/* <div class="wrapper px-0">
                <div class="icon"><i id="left" class="fa-solid fa-angle-left"><CaretLeftOutlined /></i></div>
                <ul class="tabs-box">
                    {heartedTags.map((item, i) => {
                        return <li key={i} class={`tab ${currentTag === item && "active"}`} onClick={() => handleTag(item)}>{item}</li>
                    })}
                </ul>
                <div class="icon"><i id="right" class="fa-solid fa-angle-right"><CaretRightOutlined /></i></div>
            </div> */}

            <div className="navv">
                <Tabs onTabClick={(e) => handleTag(e)}
                    items={heartedTags.map((item, i) => {
                        return {
                            label: item,
                            key: item,
                        };
                    })}
                />


            </div>

            <div class={`shopping-cart ${!currentTag && "cart-opened"}`} >
                <div class="shopping-cart-header row">
                    <div className="col-12">

                        <div className="d-flex justify-content-between">

                            <h1 className="heading">
                                {!isLoading && (itmsFrom === 'cart' ? `'${currentTag}' From Cart` : `Search Result for '${currentTag}'`)}
                            </h1>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mx-auto">
                        <div className='row w-100 mx-auto'>
                            {isLoading ?

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-main" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                                :
                                <>





                                    {
                                        !data.length && isLoading === false ?
                                            "No Data!" : data && data.slice(0, itmsFrom === "cart" ? data.length : 10).map((item) => {
                                                return <TagsList style={"Grid"} singleurl={item.coupon.slug} itemPerRow={'3'} key={item.coupon.id} item={item} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                            })
                                    }

                                    {data.length > 10 ?
                                        <div className='w-100 text-center mt-3'>

                                            {itmsFrom === "global"

                                                ?

                                                <a href={`/search/&?query_search=${currentTag}`} className="bg-signature text-white btn">
                                                    See More
                                                </a>

                                                :
                                                ""

                                            }

                                        </div>
                                        : ""
                                    }

                                </>


                            }
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}
