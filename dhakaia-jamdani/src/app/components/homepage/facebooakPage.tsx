'use client'
import React, { useEffect } from 'react';

interface FacebookPageEmbedProps {
  pageUrl: string;
  tabName?: string;
}

const FacebookPageEmbed = ({ pageUrl, tabName = 'timeline' }: FacebookPageEmbedProps) => {
  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      // Cleanup
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-base-100 rounded-lg shadow-lg">
      <div 
        className="fb-page" 
        data-href={pageUrl}
        data-tabs={tabName}
        data-width="500"
        data-height="700"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote 
          cite={pageUrl}
          className="fb-xfbml-parse-ignore"
        >
          <a href={pageUrl}>Loading Facebook Page...</a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookPageEmbed;