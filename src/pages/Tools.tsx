
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPublishedTools } from "@/data/tools";

const Tools = () => {
  const { t, language } = useLanguage();
  const tools = getPublishedTools();

  // SEO optimization for tools page
  useSEO({
    title: "Tools & Resources - Stratum PR Data Analytics Tools",
    description: "Explore Stratum PR's collection of data analytics tools and resources designed to help your business make better data-driven decisions.",
    keywords: "data analytics tools, business intelligence tools, ROI calculator, data assessment, Puerto Rico data consulting",
    canonical: "https://www.stratumpr.com/tools",
    ogType: "website"
  }, "tools");

  const handleToolClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-5xl md:text-6xl text-primary mb-6">
            {t('tools.hero.title')}
          </h1>
          <p className="font-telegraf text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t('tools.hero.description')}
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map(tool => (
                <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden h-full">
                  {tool.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={tool.image} 
                        alt={tool.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tool.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-telegraf bg-primary/10 text-primary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-telegraf font-semibold text-xl text-primary mb-3 group-hover:text-secondary transition-colors">
                      {tool.title[language]}
                    </h3>
                    <p className="font-telegraf text-gray-600 mb-6 leading-relaxed">
                      {tool.description[language]}
                    </p>
                    <Button 
                      onClick={() => handleToolClick(tool.ctaUrl)}
                      className="w-full bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
                    >
                      {tool.ctaText[language]}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="font-telegraf font-semibold text-2xl text-gray-700 mb-4">
                Coming Soon
              </h2>
              <p className="font-telegraf text-gray-600 max-w-md mx-auto">
                We're preparing powerful tools to help you make better data-driven decisions. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-telegraf font-bold text-4xl md:text-5xl mb-6">
            {t('tools.cta.title')}
          </h2>
          <p className="font-telegraf text-xl mb-8 text-primary-100">
            {t('tools.cta.description')}
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-600 text-black font-telegraf font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
              {t('tools.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Tools;
