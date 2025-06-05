
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/data/blogPosts";
import OptimizedImage from "@/components/OptimizedImage";
import { format } from "date-fns";

const Blog = () => {
  const { t, language } = useLanguage();

  useSEO({
    title: "Blog & Insights - Stratum PR Data Analytics Expert Articles",
    description: "Expert insights on data analytics, business intelligence, digital transformation, and AI automation. Latest trends and best practices from Stratum PR.",
    keywords: "data analytics blog, business intelligence insights, digital transformation articles, AI automation, data science trends, Puerto Rico analytics",
    canonical: "https://www.stratumpr.com/blog",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Stratum PR Blog & Insights",
      "description": "Expert insights on data analytics, business intelligence, and digital transformation.",
      "url": "https://www.stratumpr.com/blog",
      "author": {
        "@type": "Organization",
        "name": "Stratum PR"
      }
    }
  }, "blog");

  const publishedPosts = blogPosts.filter(post => post.isPublished);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-primary-800 to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-telegraf font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
            {t('blog.hero.title')}
          </h1>
          <p className="font-telegraf text-lg sm:text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            {t('blog.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg h-full">
                <CardHeader className="p-0">
                  {post.image && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        src={post.image}
                        alt={post.imageAlt?.[language] || post.title[language]}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {post.featured && (
                        <Badge className="absolute top-4 left-4 bg-accent text-black font-semibold">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <CardTitle className="font-telegraf text-xl sm:text-2xl text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title[language]}
                    </CardTitle>
                    <CardDescription className="font-telegraf text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
                      {post.description[language]}
                    </CardDescription>
                    
                    {/* Post Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author[language]}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 mt-auto">
                    <Button 
                      asChild 
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white font-telegraf font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                      <Link to={`/blog/${post.slug}`}>
                        {t('blog.card.readMore')}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {publishedPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="font-telegraf text-2xl text-gray-600 mb-4">
                Coming Soon
              </h3>
              <p className="font-telegraf text-gray-500">
                We're working on exciting new content for you. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
