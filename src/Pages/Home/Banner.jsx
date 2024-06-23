import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const onChange = (index) => {
    // console.log(`Slide changed to: ${index}`);
  };

  const onClickItem = (index) => {
    // console.log(`Item clicked: ${index}`);
  };

  const onClickThumb = (index) => {
    // console.log(`Thumbnail clicked: ${index}`);
  };
  return (
    <>
      <div className="text-center">
        <Carousel
          showArrows={true}
          onChange={onChange}
          onClickItem={onClickItem}
          onClickThumb={onClickThumb}
        >
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/dVY9Mt21/beth-jnr-ok-UB5th8-Qt-Q-unsplash.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/rpYnL2yP/faizur-rehman-p-HPzd-EHN6-Os-unsplash.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/mk78McYv/lee-campbell-Dt-Dl-Vpy-vv-Q-unsplash.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/XJG2j1p7/muhammad-raufan-yusup-r-YRE6ju-2-K8-unsplash.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/g0cQWKVn/nubelson-fernandes-i-E71-TMrrk-E-unsplash.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Banner;

// export default function App() {
//   return (

//   );
// }
