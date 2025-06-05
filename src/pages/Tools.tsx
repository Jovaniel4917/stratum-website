
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import { tools } from "@/data/tools";
import OptimizedImage from "@/components/OptimizedImage";

const Tools = () => {
  const { t, language } = useLanguage();

  useSEO({
    title: "Interactive Tools & Calculators - Stratum PR Data Analytics",
    description: "Free data analytics tools and calculators to help you make informed business decisions. ROI calculators, assessment tools, and more.",
    keywords: "data analytics tools, ROI calculator, business assessment tools, free analytics calculators, data maturity assessment",
    canonical: "https://www.stratumpr.com/tools",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Interactive Tools & Calculators",
      "description": "Free data analytics tools and calculators to help you make informed business decisions.",
      "url": "https://www.stratumpr.com/tools"
    }
  }, "tools");

  const publishedTools = tools.filter(tool => tool.isPublished);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-primary-800 to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-telegraf font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
            {t('tools.hero.title')}
          </h1>
          <p className="font-telegraf text-lg sm:text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            {t('tools.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedTools.map((tool) => (
              <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg h-full">
                <CardHeader className="p-0">
                  {tool.image && (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        src={tool.image}
                        alt={tool.imageAlt?.[language] || tool.title[language]}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {tool.category && (
                        <Badge className="absolute top-4 left-4 bg-primary text-white">
                          {tool.category[language]}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <CardTitle className="font-telegraf text-xl sm:text-2xl text-primary mb-4 group-hover:text-secondary transition-colors">
                      {tool.title[language]}
                    </CardTitle>
                    <CardDescription className="font-telegraf text-gray-600 text-base leading-relaxed">
                      {tool.description[language]}
                    </CardDescription>
                  </div>
                  <div className="pt-6 mt-auto">
                    <Button 
                      asChild 
                      className="w-full bg-primary hover:bg-primary-700 text-white font-telegraf font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                    >
                      <Link to={tool.ctaUrl}>
                        {tool.ctaText[language]}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {publishedTools.length === 0 && (
            <div className="text-center py-16">
              <h3 className="font-telegraf text-2xl text-gray-600 mb-4">
                {t('tools.card.comingSoon')}
              </h3>
              <p className="font-telegraf text-gray-500">
                We're working on exciting new tools for you. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tools;
