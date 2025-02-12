import React from 'react';
import FacebookPageEmbed from './facebooakPage';

const SocialMediaSection = () => {
  const socialLinks = [
    { name: 'Instagram', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ), url: 'https://instagram.com/yourgumpy' },
    { name: 'Twitter', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
    ), url: 'https://twitter.com/yourgumpy' },
    { name: 'YouTube', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ), url: 'https://youtube.com/@yourgumpy' },
    { name: 'TikTok', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 1 5 5"></path>
      </svg>
    ), url: 'https://tiktok.com/@yourgumpy' }
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Connect With Us</h2>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
        {/* Social Icons - Left Side */}
        <div className="w-full lg:w-1/3 flex flex-wrap lg:flex-col justify-center gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-lg hover:bg-base-200 transition-all duration-300 transform hover:scale-105"
              style={{
                animation: `fadeInLeft 0.5s ease-out ${index * 0.2}s both`
              }}
            >
              <div className="text-primary group-hover:text-primary-focus transition-colors duration-300">
                {social.icon}
              </div>
              <span className="text-lg font-medium group-hover:text-primary-focus transition-colors duration-300">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* Facebook Embed - Right Side */}
        <div className="w-full lg:w-2/3 animate-fadeIn">
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