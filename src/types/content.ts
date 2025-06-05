
export interface BlogPost {
  id: string;
  slug: string;
  published: boolean;
  publishDate: string;
  title: {
    en: string;
    es: string;
  };
  excerpt: {
    en: string;
    es: string;
  };
  content: {
    en: string;
    es: string;
  };
  image?: string;
  tags: string[];
  author?: string;
  readTime?: number;
}

export interface Tool {
  id: string;
  slug: string;
  published: boolean;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  image?: string;
  ctaText: {
    en: string;
    es: string;
  };
  ctaUrl: string;
  tags: string[];
}
