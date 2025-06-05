
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import { getBlogPostBySlug } from "@/data/blogPosts";
import OptimizedImage from "@/components/OptimizedImage";
import { format } from "date-fns";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  if (!slug) {
    return <NotFound />;
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  useSEO({
    title: `${post.title[language]} - Stratum PR Blog`,
    description: post.description[language],
    keywords: post.tags?.join(', ') || 'data analytics, business intelligence',
    canonical: `https://www.stratumpr.com/blog/${post.slug}`,
    ogType: "article",
    ogImage: post.image,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title[language],
      "description": post.description[language],
      "image": post.image ? `https://www.stratumpr.com${post.image}` : undefined,
      "author": {
        "@type": "Organization",
        "name": post.author[language]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Stratum PR",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.stratumpr.com/StratumPR_Logo4.svg"
        }
      },
      "datePublished": post.publishDate,
      "dateModified": post.publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.stratumpr.com/blog/${post.slug}`
      }
    }
  }, `blog-${post.slug}`);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title[language],
      text: post.description[language],
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-20">
      {/* Back Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('blog.post.backToBlog')}
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <OptimizedImage
                src={post.image}
                alt={post.imageAlt?.[language] || post.title[language]}
                className="w-full h-64 sm:h-96 object-cover"
                loading="eager"
                priority
              />
            </div>
          )}

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{t('blog.card.publishedOn')} {formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{t('blog.card.by')} {post.author[language]}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="ml-auto flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                {t('blog.post.shareArticle')}
              </Button>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-6">
              {post.title[language]}
            </h1>

            <p className="font-telegraf text-lg sm:text-xl text-gray-600 leading-relaxed">
              {post.description[language]}
            </p>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none font-telegraf prose-headings:font-telegraf prose-headings:text-primary prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:font-semibold hover:prose-a:text-secondary prose-strong:text-primary prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content[language] }}
          />

          {/* Call to Action */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-center">
            <h3 className="font-telegraf font-bold text-2xl mb-4">
              Ready to Transform Your Business with Data?
            </h3>
            <p className="font-telegraf text-lg mb-6 text-primary-100">
              Let's discuss how our data analytics solutions can help you achieve your goals.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                {t('nav.schedule')}
              </a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
