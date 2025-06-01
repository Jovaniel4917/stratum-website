
// Add global gtag declaration for TypeScript
declare global {
  function gtag(...args: any[]): void;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
}

export const updateSEO = (seoData: SEOData) => {
  // Update title
  document.title = seoData.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Update meta tags
  updateMetaTag('description', seoData.description);
  updateMetaTag('keywords', seoData.keywords);
  updateMetaTag('og:title', seoData.title, true);
  updateMetaTag('og:description', seoData.description, true);
  updateMetaTag('og:url', seoData.canonical, true);
  updateMetaTag('twitter:title', seoData.title);
  updateMetaTag('twitter:description', seoData.description);

  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, true);
    updateMetaTag('twitter:image', seoData.ogImage);
  }

  if (seoData.ogType) {
    updateMetaTag('og:type', seoData.ogType, true);
  }

  // Update canonical link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seoData.canonical);

  // Add structured data if provided
  if (seoData.structuredData) {
    const existingScript = document.querySelector('script[type="application/ld+json"][data-page]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page', 'true');
    script.textContent = JSON.stringify(seoData.structuredData);
    document.head.appendChild(script);
  }
};

export const generateImageAlt = (imageSrc: string, context: string = ''): string => {
  const filename = imageSrc.split('/').pop()?.split('.')[0] || '';
  const contextPrefix = context ? `${context} - ` : '';
  
  // Generate meaningful alt text based on filename and context
  const altText = `${contextPrefix}${filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
  return altText;
};

export const trackPageView = (pageName: string) => {
  // Google Analytics 4 page view tracking
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-XXXXXXXXXX', {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: { custom_parameter: pageName }
    });
  }
};
