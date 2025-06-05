
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPublishedBlogPosts } from "@/data/blogPosts";
import { format } from "date-fns";

const Blog = () => {
  const { t, language } = useLanguage();
  const blogPosts = getPublishedBlogPosts();

  // SEO optimization for blog page
  useSEO({
    title: "Blog - Stratum PR Data Analytics Insights",
    description: "Stay informed with the latest trends, best practices, and insights in data analytics and business intelligence from Stratum PR experts.",
    keywords: "data analytics blog, business intelligence insights, Puerto Rico data consulting, data operations best practices",
    canonical: "https://www.stratumpr.com/blog",
    ogType: "website"
  }, "blog");

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
            {t('blog.hero.title')}
          </h1>
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t('blog.hero.description')}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden cursor-pointer h-full">
                    {post.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title[language]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(post.publishDate), 'MMM dd, yyyy')}</span>
                        </div>
                        {post.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime} {t('blog.readTime')}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs font-telegraf bg-primary/10 text-primary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="font-telegraf font-semibold text-xl text-primary mb-3 group-hover:text-secondary transition-colors">
                        {post.title[language]}
                      </h3>
                      
                      <p className="font-telegraf text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt[language]}
                      </p>
                      
                      <div className="flex items-center text-primary hover:text-secondary transition-colors group/link">
                        <span className="font-telegraf">{t('blog.readMore')}</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-telegraf font-semibold text-3xl text-gray-700 mb-4">
                {t('blog.noArticles.title')}
              </h2>
              <p className="font-telegraf text-xl text-gray-600 max-w-md mx-auto mb-8">
                {t('blog.noArticles.description')}
              </p>
              <Button asChild className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-6 py-3 rounded-lg">
                <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                  {t('nav.schedule')}
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="font-telegraf text-xl mb-8 text-primary-100">
              Let's discuss how these insights can be applied to your specific business challenges.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Blog;
