
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Newspaper, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRecentBlogPosts, getFeaturedBlogPosts } from "@/data/blogPosts";
import { getRecentTools, getFeaturedTools } from "@/data/tools";
import OptimizedImage from "@/components/OptimizedImage";
import { format } from "date-fns";
import type { BlogPost, Tool } from "@/types/content";

type FeaturedBlogPost = BlogPost & { type: 'blog'; isRecent: boolean };
type FeaturedTool = Tool & { type: 'tool'; isRecent: boolean };
type FeaturedContent = FeaturedBlogPost | FeaturedTool;

const FeaturedResources = () => {
  const { t, language } = useLanguage();

  // Get recent and featured content
  const recentPosts = getRecentBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();
  const recentTools = getRecentTools();
  const featuredTools = getFeaturedTools();

  // Combine and limit to show the most relevant items
  const featuredContent: FeaturedContent[] = [
    ...recentPosts.slice(0, 2).map(post => ({ ...post, type: 'blog' as const, isRecent: true })),
    ...featuredPosts.filter(post => !recentPosts.includes(post)).slice(0, 1).map(post => ({ ...post, type: 'blog' as const, isRecent: false })),
    ...recentTools.slice(0, 2).map(tool => ({ ...tool, type: 'tool' as const, isRecent: true })),
    ...featuredTools.filter(tool => !recentTools.includes(tool)).slice(0, 1).map(tool => ({ ...tool, type: 'tool' as const, isRecent: false }))
  ].slice(0, 6); // Limit to 6 items total

  // Don't show the section if there's no content to display
  if (featuredContent.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const getItemUrl = (item: FeaturedContent) => {
    if (item.type === 'blog') {
      return `/blog/${item.slug}`;
    } else {
      return item.ctaUrl;
    }
  };

  const getItemCTA = (item: FeaturedContent) => {
    if (item.type === 'blog') {
      return t('blog.card.readMore');
    } else {
      return item.ctaText[language];
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50 section-container" aria-labelledby="featured-resources-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="featured-resources-heading" className="font-telegraf font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-6">
            {t('featured.title')}
          </h2>
          <p className="font-telegraf text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredContent.map((item) => (
            <Card key={`${item.type}-${item.id}`} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg h-full">
              <CardHeader className="p-0">
                {item.image && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <OptimizedImage
                      src={item.image}
                      alt={'imageAlt' in item && item.imageAlt ? item.imageAlt[language] : item.title[language]}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${item.type === 'blog' ? 'bg-primary' : 'bg-secondary'} text-white flex items-center gap-1`}>
                        {item.type === 'blog' ? <Newspaper className="h-3 w-3" /> : <Wrench className="h-3 w-3" />}
                        {item.type === 'blog' ? t('featured.newBlogPost') : t('featured.newTool')}
                      </Badge>
                      {item.isRecent && (
                        <Badge className="bg-accent text-black font-semibold">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(item.publishDate)}</span>
                    {item.type === 'tool' && 'category' in item && item.category && (
                      <>
                        <span>•</span>
                        <span>{item.category[language]}</span>
                      </>
                    )}
                  </div>
                  
                  <CardTitle className="font-telegraf text-xl text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    {item.title[language]}
                  </CardTitle>
                  
                  <CardDescription className="font-telegraf text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {item.description[language]}
                  </CardDescription>
                </div>
                
                <div className="pt-6 mt-auto">
                  <Button 
                    asChild 
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white font-telegraf font-medium py-2 rounded-lg transition-all duration-300"
                  >
                    <Link to={getItemUrl(item)}>
                      {getItemCTA(item)}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white font-telegraf font-semibold">
            <Link to="/blog" className="flex items-center gap-2">
              {t('featured.viewAll')} Blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white font-telegraf font-semibold">
            <Link to="/tools" className="flex items-center gap-2">
              {t('featured.viewAll')} Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
