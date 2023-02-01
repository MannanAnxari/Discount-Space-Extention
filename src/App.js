
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { AppContext } from "./context/appContext";
import HomeCoupons from './components/HomeCoupons';
import SearchCoupon from './components/SearchCoupon';
import Login from './components/Login';
import CreateGoals from './components/CreateGoals';
import Wishlist from './components/Wishlist';
import config from './config';
import { Toaster } from 'react-hot-toast';
import { TagsHeader } from './components/TagsHeader';

function App() {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentTag, setCurrentTag] = useState('');
  const [userToken, setUserToken] = useState("");
  const [couponItems, setCouponItems] = useState([]);
  const [FilterCategory, setFilterCategory] = useState([]);
  const [FilterStore, setFilterStore] = useState([]);
  const [heartedTags, setHeartedTags] = useState([]);
  const [keywords, setKeywords] = useState([]);

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
        setUserName(getCookie("USER_NAME"));
        setUserToken(getCookie("USER_TOKEN"));
        setIsUserLogin(true);


        fetch(`https://discounts-space.com/public/api/web/getgoals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_token: getCookie("USER_TOKEN") })
        })
          .then((response) => response.json())
          .then((actualData) => {
            setHeartedTags(JSON.parse(actualData[0].keywords));
            console.log(actualData);
          })
        fetch(`https://discounts-space.com/public/api/web/keywords`)
          .then((response) => response.json())
          .then((actualData) => { setKeywords(actualData); })
          .catch((err) => {
          }
          );

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

  const goals = useRef(null);
 

  return (
    <AppContext.Provider
      value={{
        isUserLogin, userName, cookie, getCookie, keywords, userToken, currentTag, setCurrentTag, heartedTags, setHeartedTags, setUserToken, setIsUserLogin, setUserName, setCookie, ref, setCouponItems, couponItems, setFilterCategory, FilterStore, setFilterStore, FilterCategory
      }}
    >
      <div className="App">
        <div className="main-popup shadow h-100">
          <div className="container h-100 pb-3">
            <div className="row h-100">
              <Header />
              <div className="col-12 w-100">
                <Toaster />
                <div className="row " style={{ 'paddingBottom': '3.5em', 'overflowY': 'auto' }}>
                  <div className="col-12">
                    <ul className="tabs d-flex justify-content-around ps-0 nav-tabs" role="tablist">
                      <li className="tab text-uppercase fw-bold popup-btn nav-item list-unstyled active nav-link  " href="#home" role="tab" aria-controls="home" data-bs-toggle="tab">
                        Home
                      </li>
                      <li className="tab text-uppercase fw-bold popup-btn nav-item list-unstyled nav-link" href="#profile" role="tab" aria-controls="profile" data-bs-toggle="tab">
                        Search
                      </li>
                      <li className="tab text-uppercase fw-bold popup-btn nav-item list-unstyled nav-link d-none" ref={goals} href="#goals" role="tab" aria-controls="goals" data-bs-toggle="tab">
                        goals
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
                      <div className="col-12" style={{ 'marginTop': '86px' }}>
                        {isUserLogin && heartedTags.length != 0 ?
                          <TagsHeader /> : ""
                        }
                      </div>
                      <div className="col-12 cont p-0">
                        <div className="row" >
                          <div className="col-12 home p-4">
                            <div className="row">
                              <div className="col-5"></div>
                            </div>
                          </div>
                        </div>
                      </div>

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
                      <Login goals={goals} />
                    </div>
                    <div id="goals" role="tabpanel" className="cards tab-pane fade accordion-item h-100" aria-labelledby="goals-tab">
                      <CreateGoals />
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
