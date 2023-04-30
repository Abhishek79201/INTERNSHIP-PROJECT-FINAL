/* eslint-disable import/order */
/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';

import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
// eslint-disable-next-line import/order
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SiShopware } from 'react-icons/si';

const App = () => {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [formFilled, setFormFilled] = useState(true);

  const { isLoggedin, setisLoggedin } = useStateContext();
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const localData = JSON.parse(localStorage.getItem('UserDetail'));

  function initUser() {
    if (localData === null) {
      return [];
    }
    return localData;
  }
  const regName = useRef(null);
  const regPassword = useRef(null);
  const signupBtn = useRef(null);
  const regEmail = useRef(null);
  const regUsername = useRef(null);
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  const [userDetail, setuserDetail] = useState(initUser);
  function initCurrentUser() {
    const localDataForCurrent = JSON.parse(
      localStorage.getItem('currentUserDetail')
    );
    if (!localDataForCurrent) {
      return {};
    }
    return localDataForCurrent;
  }
  const [currentUserDetail, setcurrentUserDetail] = useState(initCurrentUser);
  const checkIfUserExists = (email, username) => {
    const userData = JSON.parse(localStorage.getItem('UserDetail'));
    if (!userData) {
      return false; // if no data is saved in local storage, return false
    }
    const emailExists = userData.some((user) => user.regEmail === email);
    const usernameExists = userData.some(
      (user) => user.regUsername === username
    );
    return emailExists || usernameExists;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = regName.current.value;
    const email = regEmail.current.value;
    const username = regUsername.current.value;
    const password = regPassword.current.value;
    if (checkIfUserExists(email, username)) {
      // user already exists
      alert('User already exists');
    } else {
      // add user to local storage

      const newUser = {
        name,
        regEmail: email,
        regUsername: username,
        regPassword: password,
      };
      const userData = JSON.parse(localStorage.getItem('UserDetail')) || [];

      localStorage.setItem(
        'UserDetail',
        JSON.stringify([...userData, newUser])
      );
      alert('New User Created');

      // set current user and login status
      setcurrentUserDetail(newUser);
      setisLoggedin(true);
    }
  };

  useEffect(() => {
    if (userDetail.length > 0) {
      localStorage.setItem('UserDetail', JSON.stringify(userDetail));
    }
  }, [userDetail]);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = loginEmail.current.value;
    const password = loginPassword.current.value;
    const userData = JSON.parse(localStorage.getItem('UserDetail'));
    if (!userData) {
      setisLoggedin(false);
      return;
    }
    const loggedInUser = userData.find(
      (user) => user.regEmail === email && user.regPassword === password
    );
    if (loggedInUser) {
      localStorage.setItem(
        'currentUserDetail',
        JSON.stringify({
          email: loggedInUser.regEmail,
          name: loggedInUser.name,
        })
      );
      setcurrentUserDetail(loggedInUser);
      setisLoggedin(true);
    } else {
      alert('user is not registered !!!!');
      setisLoggedin(false);
    }
  };

  localStorage.setItem('currentUserDetail', JSON.stringify(currentUserDetail));

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      {isLoggedin ? (
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={<Ecommerce />} />
                  <Route path="/ecommerce" element={<Ecommerce />} />

                  {/* pages  */}
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />

                  {/* apps  */}
                  <Route path="/kanban" element={<Kanban />} />
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/color-picker" element={<ColorPicker />} />

                  {/* charts  */}
                  <Route path="/line" element={<Line />} />
                  <Route path="/area" element={<Area />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/color-mapping" element={<ColorMapping />} />
                  <Route path="/pyramid" element={<Pyramid />} />
                  <Route path="/stacked" element={<Stacked />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      ) : (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          >
            <MDBContainer className="p-3 my-5 w-100  d-flex gap-4 align-items-center">
              <SiShopware size={70} />
              <h1>Hi,Welcome to Manager</h1>
            </MDBContainer>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick('tab1')}
                active={justifyActive === 'tab1'}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick('tab2')}
                active={justifyActive === 'tab2'}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === 'tab1'}>
              <form onSubmit={handleLogin}>
                <div className="text-center mb-3">
                  <p>Sign in with:</p>

                  <div
                    className="d-flex justify-content-between mx-auto"
                    style={{ width: '40%' }}
                  >
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>

                  <p className="text-center mt-3">or:</p>
                </div>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  ref={loginEmail}
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  ref={loginPassword}
                  id="form2"
                  type="password"
                />

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />
                  <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn className="mb-4 w-100" type="submit">
                  Sign in
                </MDBBtn>
                <p className="text-center">
                  Not a Authorized? Click on Register
                </p>
              </form>
            </MDBTabsPane>

            <MDBTabsPane id="tab2" show={justifyActive === 'tab2'}>
              <form onSubmit={handleSignUp}>
                <div className="text-center mb-3">
                  <p>Sign up with:</p>

                  <div
                    className="d-flex justify-content-between mx-auto"
                    style={{ width: '40%' }}
                  >
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>

                  <p className="text-center mt-3">or:</p>
                </div>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  ref={regName}
                  id="form1"
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  ref={regUsername}
                  id="form1"
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  ref={regEmail}
                  id="form1"
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  ref={regPassword}
                  id="form1"
                  type="password"
                />

                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    label="I have read and agree to the terms"
                  />
                </div>

                <MDBBtn
                  className="mb-4 w-100"
                  ref={signupBtn}
                  disable={formFilled}
                  type="submit"
                >
                  Sign up
                </MDBBtn>
              </form>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
      )}
    </div>
  );
};

export default App;
