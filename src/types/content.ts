
export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  content: {
    en: string;
    es: string;
  };
  image?: string;
  imageAlt?: {
    en: string;
    es: string;
  };
  publishDate: string;
  author: {
    en: string;
    es: string;
  };
  tags?: string[];
  isPublished: boolean;
  featured?: boolean;
}

export interface Tool {
  id: string;
  slug: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  image?: string;
  imageAlt?: {
    en: string;
    es: string;
  };
  ctaText: {
    en: string;
    es: string;
  };
  ctaUrl: string;
  publishDate: string;
  isPublished: boolean;
  featured?: boolean;
  category?: {
    en: string;
    es: string;
  };
}

export interface ContentMetadata {
  type: 'blog' | 'tool';
  publishDate: string;
  isPublished: boolean;
  featured?: boolean;
}
