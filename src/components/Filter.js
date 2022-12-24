import React, { useContext, useState } from 'react';
import { AppContext } from "../context/appContext";

export const Filter = ({ raf, category, HandleEffect, refDiscount, refStore, refSort, refCategory, openAllUrlz, refMinPrice, refMaxPrice, isChecksAvail }) => {
    const { FilterCategory, FilterStore } = useContext(AppContext);

    const handleCategory = (e) => {
        if (!e.currentTarget.checked) {
            const isMatch = (value) => value != e.target.value;
            const even = refCategory.current.filter(isMatch);
            refCategory.current = [even]
        }
        else {
            let temp = e.target.value;
            refCategory.current = [...refCategory.current, temp]


        }
        HandleEffect();
        // console.log(raf);
    };

    return (
        <>
            <div className="col-12 my-2">
                <div className='d-flex justify-content-between align-items-center'>

                    <h3 className="parabdr text-start mb-0" id='btttn'>Search Coupons</h3>
                    <div className='toggleFilter'>
                        {raf.length > 0 &&
                            <div>
                                <button className=' btn btn-main my-auto py-1'>Filter</button>
                            </div>
                        }
                    </div>

                </div>
                <div id="btttnz">
                    {raf.length > 0 &&
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 className="parabdr text-start mb-0 fs-smmm py-2">Search Results For "{raf}"</h3>
                            {isChecksAvail &&
                                <button className='btn btn-main' onClick={openAllUrlz}>Open Selected Items</button>
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="row py-4 pt-0 px-3 justify-content-center w-100 mx-auto" id="main_filter">
                <div className="col-sm-12 col-md-12 col-lg-12 py-2 px-0">
                    <div className="price d-flex flex-column w-100">
                        <div className="price-head" id="clear-price">
                            <span className="name">PRICE</span>
                        </div>
                        <input className="c_type onslect" type="hidden" name="c_type" value="coupon" />
                        <div className="line-price d-flex align-items-center w-100">
                            <div className="d-flex align-items-center w-50">
                                <label>$</label>
                                <input id="search_low_price" name="min_price" ref={refMinPrice} onChange={HandleEffect} type="number" min="1" className="w-100 ms-2 bd-soft min_price onslect" />
                            </div>
                            <div className="d-flex align-items-center w-50 mx-2">
                                <label>$</label>
                                <input min="1" id="search_high_price" ref={refMaxPrice} onChange={HandleEffect} name="max_price" className="w-100 ms-2 bd-soft max_price onslect" type="number" />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-12 px-0">
                    <div className="row">

                        <div className='col-6'>

                            <div className="py-2 px-0">
                                <div className="discount-head mb-2">
                                    <span className="name text-uppercase">discount</span>
                                </div>
                                <div className="selectMain">
                                    <select name="discount" ref={refDiscount} onChange={HandleEffect} className="disc onslect w-100">
                                        <option value="all">All Discount</option>
                                        <option value='a:2:{s:3:"min";i:20;s:3:"max";i:49;}'>20% off - 49%</option>
                                        <option value='a:2:{s:3:"min";i:50;s:3:"max";i:79;}'> 50% off - 79%</option>
                                        <option value='a:2:{s:3:"min";i:80;s:3:"max";i:99;}'> 80% off - 99%</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='col-6'>

                            <div className=" py-2 d-flex px-0 justify-content-start flex-column ">
                                <div className="Coupon-head mb-2">
                                    <span className="name text-uppercase">Coupon</span>
                                </div>
                                <div className="selectMain">
                                    <select name="fullfilled" ref={refStore} onChange={HandleEffect} className="fullfilled onslect w-100">
                                        <option value="">All</option>
                                        {FilterStore && FilterStore.map((item, index) => {
                                            return <option value={`${item.id}`} key={index}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>

                            <div className="py-2 d-flex px-0 justify-content-start flex-column">
                                <div className="Category-head mb-2">
                                    <span className="name text-uppercase">Category</span>
                                </div>
                                <div className="dropdown">
                                    <button className="dropdown-toggle bg-white bd-soft border-0 categ-dd w-100 text-start d-flex justify-content-between align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Categories
                                    </button>
                                    <ul className="dropdown-menu categ-dropd w-100 rounded-0" aria-labelledby="dropdownMenuButton1">
                                        {FilterCategory && FilterCategory.map((item, index) => {
                                            return <li className="d-flex px-2" key={index}>
                                                <input className="form-check-input category onslect pe-2" type="checkbox" onClick={(e) => handleCategory(e)} name="category" value={`${item.id}`} id={`flexCheckDefault${item.id}`} />
                                                <label className="form-check-label text-truncate" htmlFor={`flexCheckDefault${item.id}`}>
                                                    {item.title}
                                                </label>
                                            </li>
                                        })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className=" py-2 d-flex px-0 justify-content-start flex-column">
                                <div className="Range-head mb-2">
                                    <span className="name text-uppercase">Range</span>
                                </div>
                                <div className="selectMain">
                                    <select name="range" className="range onslect w-100" ref={refSort} onChange={HandleEffect}>
                                        <option value="0">default rank</option>
                                        <option value="1">price: Low to high</option>
                                        <option value="2">Discount: High to Low</option>
                                        <option value="3">Newest</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
