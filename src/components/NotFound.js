import React from "react";
import "../App.css"

function NotFound() {
  return (
    <div>
        <div className="container background-image-404 flex relative"></div>
        <div className="container px-2 mx-auto absolute flex flex-col justify-center items-center sm:max-w-screen-sm sm:top-1/3 md:max-w-screen-md lg:max-w-screen-lg lg:top-1/2 xl:max-w-screen-xl xl:w-5/12 2xl:max-screen-2xl 2xl:w-1/2">
            <h1 className="font-semibold text-3xl">404 - Not Found</h1>
            <p className="pt-4 text-xl">The page you are looking for does not exist.</p>
        </div>
    </div>
  );
}

export default NotFound;
