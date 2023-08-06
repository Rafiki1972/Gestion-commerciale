/* The line `import Cookies from 'js-cookie';` is importing the `js-cookie` library into the current
JavaScript file. This allows you to use the functions and methods provided by the `js-cookie`
library in your code. */

import Cookies from 'js-cookie';
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import router from 'next/router'


export function setCookie(key, value) {
  Cookies.set(key, value, { expires: 1 }); // Set cookie with a 1-day expiration
}

export function getCookie(key) {
  return Cookies.get(key);
}

export function removeCookie(key) {
  Cookies.remove(key);
}

// darkm mode
if(!getCookie('darkMode')){
  setCookie('darkMode',false)
}

// darkm mode

const LogoutButton = () => {
  if (process.browser) {
    const router = useRouter(); // Initialize useRouter
    if (!getCookie('username')) {
      router.push('/'); // Navigate to the "About" page if username exists
    };
  }
  return (
    <></>
  );
};

export default LogoutButton;

