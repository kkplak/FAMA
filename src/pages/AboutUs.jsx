import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div id="top-of-page" className="about-us-container container">
      {/* Title */}
      <div className="about-us-title">
        <h1 className="text-4xl font-bold text-center my-8 mb-24">About Us</h1>
      </div>

      {/* Person 1 */}
      <div className="person-section flex flex-col md:flex-row items-center my-12 mb-24">
        <div className="person-image md:w-1/2">
          <img
            src="/media/krzys.jpeg"
            alt="Person 1"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="person-info md:w-1/2 md:pl-8 mt-6 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Krzysztof Sosnowski</h2>
          <p className="text-lg">
            [Insert a brief biography or introduction about person 1 here.
            Describe their role in the company, experience, and passion for
            videography.]
          </p>
        </div>
      </div>

      {/* Person 2 */}
      <div className="person-section flex flex-col md:flex-row items-center my-12">
        <div className="person-image md:w-1/2 md:order-2">
          <img
            src="/media/magda.jpeg"
            alt="Person 2"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="person-info md:w-1/2 md:pr-8 mt-6 md:mt-0 md:order-1">
          <h2 className="text-2xl font-semibold mb-4">Magdalena Dabrowska</h2>
          <p className="text-lg">
            [Insert a brief biography or introduction about person 2 here.
            Describe their role in the company, experience, and passion for
            videography.]
          </p>
        </div>
      </div>

      {/* BTS Pictures Section */}
      <div className="bts-section my-12 mt-64 ">
        <h2 className="text-3xl font-bold text-center mb-16">
          Behind the Scenes
        </h2>
        <div className="bts-gallery grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="bts-image">
            <img
              src="/media/bts1.jpeg"
              alt="Behind the Scenes 1"
              className="rounded-lg shadow-md"
            />
            <p className="text-center mt-2 text-sm">
              On set during our latest shoot
            </p>
          </div>
          <div className="bts-image">
            <img
              src="/media/bts2.jpeg"
              alt="Behind the Scenes 1"
              className="rounded-lg shadow-md"
            />
            <p className="text-center mt-2 text-sm">
              On set during our latest shoot
            </p>
          </div>
          <div className="bts-image">
            <img
              src="/media/bts3.jpeg"
              alt="Behind the Scenes 1"
              className="rounded-lg shadow-md"
            />
            <p className="text-center mt-2 text-sm">
              On set during our latest shoot
            </p>
          </div>
          <div className="bts-image">
            <img
              src="/media/bts4.jpeg"
              alt="Behind the Scenes 1"
              className="rounded-lg shadow-md"
            />
            <p className="text-center mt-2 text-sm">
              On set during our latest shoot
            </p>
          </div>
          <div className="bts-image">
            <img
              src="/media/bts5.jpeg"
              alt="Behind the Scenes 1"
              className="rounded-lg shadow-md"
            />
            <p className="text-center mt-2 text-sm">
              On set during our latest shoot
            </p>
          </div>
          <div className="bts-image">
            <img
              src="/media/bts6.jpeg"
              alt="Behind the Scenes 1"
              className="rounded-lg shadow-md"
            />
            <p className="text-center mt-2 text-sm">
              On set during our latest shoot
            </p>
          </div>
          {/* Add more images as needed */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
