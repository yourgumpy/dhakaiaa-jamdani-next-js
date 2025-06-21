import React from "react";
import FacebookPageEmbed from "./facebooakPage";

const SocialMediaSection = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      url: "https://instagram.com/dhakaiaajamdani",
    },
    {
      name: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-8 h-8"
          stroke="currentColor"
          viewBox="0 0 50 50"
        >
          <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
        </svg>
      ),
      url: "https://twitter.com/dhakaiaajamdani",
    },
    {
      name: "YouTube",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
      url: "https://youtube.com/@DhakaiaaJamdani",
    },
    {
      name: "TikTok",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 1 5 5"></path>
        </svg>
      ),
      url: "https://tiktok.com/@dhakaiaa.jamdani",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 bg-base-100 rounded-lg shadow-lg mb-5">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 text-lg">
          Connect with us across social platforms
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Social Icons - Centered Layout */}
        <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-6 lg:gap-8">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col lg:flex-row items-center justify-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="lg:w-16 mb-4 lg:mb-0 lg:mr-4 text-primary group-hover:text-primary-focus transition-colors duration-300">
                {social.icon}
              </div>
              <span className="text-xl font-semibold text-gray-700 group-hover:text-primary-focus transition-colors duration-300">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* Facebook Embed - Centered Card */}
        <div className="w-full lg:w-1/3 max-w-3xl animate-fadeIn">
          <FacebookPageEmbed
            pageUrl="https://www.facebook.com/dhakaiaajamdani"
            tabName="timeline"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
