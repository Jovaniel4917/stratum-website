
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBlogPostBySlug } from "@/data/blogPosts";
import { format } from "date-fns";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  // SEO optimization for individual blog posts
  useSEO({
    title: post ? `${post.title[language]} - Stratum PR Blog` : "Blog Post - Stratum PR",
    description: post ? post.excerpt[language] : "Read insights and updates from Stratum PR data analytics experts.",
    keywords: post ? post.tags.join(', ') + ', Stratum PR, data analytics' : "data analytics, business intelligence, Puerto Rico",
    canonical: `https://www.stratumpr.com/blog/${slug}`,
    ogType: "article",
    ogImage: post?.image,
    structuredData: post ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title[language],
      "description": post.excerpt[language],
      "image": post.image,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Organization",
        "name": "Stratum PR"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Stratum PR"
      }
    } : undefined
  }, `blog-${slug}`);

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-telegraf font-bold text-4xl text-gray-700 mb-4">
            Post Not Found
          </h1>
          <p className="font-telegraf text-gray-600 mb-8">
            The blog post you're looking for doesn't exist or isn't published yet.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-8 font-telegraf">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.publishDate), 'MMMM dd, yyyy')}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} {t('blog.readTime')}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-sm font-telegraf bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-telegraf font-bold text-4xl md:text-5xl text-primary mb-6">
            {post.title[language]}
          </h1>
          
          {post.author && (
            <p className="font-telegraf text-gray-600">
              By {post.author}
            </p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img 
              src={post.image} 
              alt={post.title[language]}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none font-telegraf prose-headings:font-telegraf prose-h1:text-primary prose-h2:text-primary prose-h3:text-primary prose-a:text-primary hover:prose-a:text-secondary"
            dangerouslySetInnerHTML={{ 
              __html: post.content[language].replace(/\n/g, '<br>').replace(/# /g, '<h1>').replace(/## /g, '<h2>').replace(/### /g, '<h3>') 
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            Ready to Apply These Insights?
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            Let's discuss how these strategies can be implemented in your business.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
