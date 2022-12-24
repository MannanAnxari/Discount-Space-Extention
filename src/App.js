
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { AppContext } from "./context/appContext";
import HomeCoupons from './components/HomeCoupons';
import SearchCoupon from './components/SearchCoupon';
import Login from './components/Login';
import Wishlist from './components/Wishlist';
import config from './config';

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [couponItems, setCouponItems] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [FilterStore, setFilterStore] = useState([]);

  const [cookie, setCookie] = useState(getCookie("USER_ID"));
  const ref = useRef(null);

  // console.log(getCookie("USER_ID"));
  // console.log(getCookie("IS_USER_LOGIN"));
  // console.log(getCookie("USER_NAME"));
  useEffect(() => {
    let categ = `https://discounts-space.com/api/category?token=${config.AUTH_TOKEN}&type=coupon`;
    let store = `https://discounts-space.com/api/top-stores?token=${config.AUTH_TOKEN}&since_id=0&paginate=20`;
    let isUserAvail = `https://discounts-space.com/public/api/getUserByCookies?token=152784823qtjzdfg213&cookies=${cookie}`;
    // console.log(url);
    fetchCateg(categ);
    fetchStore(store);
    fetchHomeData(isUserAvail);
  }, [cookie]);

  const fetchStore = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFilterStore(json);
    } catch (error) {
      console.log("error", error);
    }
  }
  const fetchCateg = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFilterCategory(json.data);
      // setData(json);
      // setSpinner(false)
    } catch (error) {
      // setSpinner(false);
      console.log("error", error);
      // setErr("An Error Occurred")
    }
  }
  const fetchHomeData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json.success) {
        setIsUserLogin(true)
        setUserName(getCookie("USER_NAME"));
      }
      else {
        setIsUserLogin(false)
      }
    } catch (error) {
      console.log("error", error);
    }
  }




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


  return (
    <AppContext.Provider
      value={{
        isUserLogin, userName, cookie, getCookie, setIsUserLogin, setUserName, setCookie, ref, setCouponItems, couponItems, setFilterCategory, FilterStore, setFilterStore, FilterCategory
      }}
    >
      <div className="App">
        <div className="main-popup shadow h-100">
          <div className="container h-100 pb-3">
            <div className="row h-100">
              <Header />
              <div className="col-12 w-100">
                <div className="row " style={{ 'paddingBottom': '3.5em', 'overflowY': 'auto' }}>
                  <div className="col-12">
                    <ul className="tabs d-flex justify-content-around ps-0 nav-tabs" role="tablist">
                      <li className="tab text-uppercase fw-bold popup-btn nav-item list-unstyled active nav-link  " href="#home" role="tab" aria-controls="home" data-bs-toggle="tab">
                        Home
                      </li>
                      <li className="tab text-uppercase fw-bold popup-btn nav-item list-unstyled nav-link" href="#profile" role="tab" aria-controls="profile" data-bs-toggle="tab">
                        Search
                      </li>
                      {isUserLogin &&
                        <li
                          className="tab text-uppercase fw-bold popup-btn nav-item list-unstyled nav-link" href="#messages" role="tab" aria-controls="messages" data-bs-toggle="tab">
                          Saved Items
                        </li>
                      }
                      <li ref={ref}
                        className="tab text-uppercase fw-bold popup-btn nav-item list-unstyled nav-link" href="#login" id='userLogin' role="tab" aria-controls="login" data-bs-toggle="tab">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="28px" height="28px" viewBox="0 0 28 28" version="1.1">
                          <title>icon_account</title>
                          <desc>Created with Sketch.</desc>
                          <defs />
                          <g id="styleguidelines" stroke="none" strokeWidth="1" fill="none"
                            fillRule="evenodd">
                            <g id="Assets" transform="translate(-554.000000, -903.000000)" fill="#292929">
                              <g id="Group-4-Copy-7" transform="translate(79.000000, 148.000000)">
                                <g id="icon_28" transform="translate(219.000000, 755.000000)">
                                  <g id="account" transform="translate(256.000000, 0.000000)">
                                    <path
                                      d="M24,24 L4,24 C4,19 9.16256815,16 14,16 C18.8374319,16 24,19 24,24 Z M14,14 C10.8888889,14 10,10.5103852 10,8 C10,5.48961477 11.5454011,4 14,4 C16.4545989,4 18,5.48961477 18,8 C18,10.5103852 17.1111111,14 14,14 Z"
                                      id="Combined-Shape" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content text-center">
                    <div className="active flex-column row text-start tab-pane" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div className="col-12 cont p-0">
                        <div className="row" style={{ 'marginTop': '86px' }}>
                          <div className="col-12 home p-4">
                            <div className="row">
                              <div className="col-5"></div>
                              {/* <div className="col-7">
                                <h1> Welcome To <br /> Discount Space!</h1>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-12 bg-white py-3">
                        <p className="paraLg">Look for the orange <svg xmlns="http://www.w3.org/2000/svg" width="22"
                          height="22" viewBox="0 0 36 36" fill="none">
                          <rect width="36" height="36" rx="3" fill="#FF7227" />
                          <g opacity="0.9">
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M15.6024 11.9903C15.6411 11.027 15.8486 9.75098 16.4826 8.99625C17.376 7.94152 19.1883 8.11106 19.4862 9.63373C19.6284 10.3763 19.434 11.2874 19.0973 11.9254C18.3859 13.3181 17.065 14.4637 15.5762 14.8545C15.5893 13.9825 15.5768 12.8496 15.6024 11.9903ZM27.7453 25.4519C26.9941 26.3244 26.0365 27.001 25.117 26.9619C24.0815 26.9233 24.185 25.6341 24.185 24.9053V21.8457C24.1981 21.2599 24.1981 20.6742 24.1333 20.1012C23.9649 18.3958 22.9681 17.0289 21.091 16.8985C17.8292 16.768 16.5344 19.9322 15.5768 22.5354V16.8335C18.4246 16.3909 22.3727 14.7896 22.4893 11.1442C22.6837 4.9469 12.2627 4.72613 12.3014 12.5243C12.3144 13.1232 12.3144 14.2688 12.3144 14.8677C10.9161 14.6591 9.79018 12.6025 9.27215 11.3782C9.20734 11.2092 9.02647 11.1184 8.85815 11.1701C6.90316 11.6782 6.61879 13.748 7.9392 15.154C9.02647 16.3127 10.7609 16.7553 12.2883 16.8335C12.2757 21.3508 12.2757 24.1373 12.2757 28.6414C12.3406 29.2794 13.2078 29.449 13.7127 29.4616C14.282 29.4748 15.3436 29.3058 15.3954 28.5638C15.5768 26.3503 17.4533 19.8149 20.0037 19.8149C20.5991 19.8149 20.884 20.2052 20.884 20.7783V26.1031C20.884 28.3161 22.127 29.8002 24.392 29.8134C26.3988 29.8134 28.1593 28.1471 29.0396 26.233C29.3114 25.6214 28.1468 24.9961 27.7453 25.4519Z"
                              fill="white" />
                          </g>
                        </svg> to save</p>
                        <p className="para">
                          If you’re shopping online and the <svg xmlns="http://www.w3.org/2000/svg" width="22"
                            height="22" viewBox="0 0 36 36" fill="none">
                            <rect width="36" height="36" rx="3" fill="#FF7227" />
                            <g opacity="0.9">
                              <path fillRule="evenodd" clipRule="evenodd"
                                d="M15.6024 11.9903C15.6411 11.027 15.8486 9.75098 16.4826 8.99625C17.376 7.94152 19.1883 8.11106 19.4862 9.63373C19.6284 10.3763 19.434 11.2874 19.0973 11.9254C18.3859 13.3181 17.065 14.4637 15.5762 14.8545C15.5893 13.9825 15.5768 12.8496 15.6024 11.9903ZM27.7453 25.4519C26.9941 26.3244 26.0365 27.001 25.117 26.9619C24.0815 26.9233 24.185 25.6341 24.185 24.9053V21.8457C24.1981 21.2599 24.1981 20.6742 24.1333 20.1012C23.9649 18.3958 22.9681 17.0289 21.091 16.8985C17.8292 16.768 16.5344 19.9322 15.5768 22.5354V16.8335C18.4246 16.3909 22.3727 14.7896 22.4893 11.1442C22.6837 4.9469 12.2627 4.72613 12.3014 12.5243C12.3144 13.1232 12.3144 14.2688 12.3144 14.8677C10.9161 14.6591 9.79018 12.6025 9.27215 11.3782C9.20734 11.2092 9.02647 11.1184 8.85815 11.1701C6.90316 11.6782 6.61879 13.748 7.9392 15.154C9.02647 16.3127 10.7609 16.7553 12.2883 16.8335C12.2757 21.3508 12.2757 24.1373 12.2757 28.6414C12.3406 29.2794 13.2078 29.449 13.7127 29.4616C14.282 29.4748 15.3436 29.3058 15.3954 28.5638C15.5768 26.3503 17.4533 19.8149 20.0037 19.8149C20.5991 19.8149 20.884 20.2052 20.884 20.7783V26.1031C20.884 28.3161 22.127 29.8002 24.392 29.8134C26.3988 29.8134 28.1593 28.1471 29.0396 26.233C29.3114 25.6214 28.1468 24.9961 27.7453 25.4519Z"
                                fill="white" />
                            </g>
                          </svg> is orange, that means you’re on one of
                          the 40,000+ sites where Honey automatically tests coupons.

                        </p>
                        <p className="para">

                          If the Honey is gray, that means you’re on an unsupported site.
                        </p>
                        <p className="para">
                          For a demo of how Honey works on supported sites <a href="#"> click here.</a>
                        </p>
                      </div> */}
                      <div className="col-12 px-0">
                        <h3 className="parabdr mb-0">
                          Featured Coupons
                        </h3>
                      </div>
                      <div className="col-12 p-0">
                        <HomeCoupons />
                      </div>
                    </div>

                    <SearchCoupon />
                    <div id="messages" role="tabpanel" className="cards tab-pane fade accordion-item h-100" aria-labelledby="messages-tab">
                      <Wishlist />
                    </div>
                    <div id="login" role="tabpanel" className="cards tab-pane fade accordion-item bg-white h-100" >
                      <Login />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>

  );
}

export default App;
