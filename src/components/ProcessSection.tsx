
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProcessSection = () => {
  const { t } = useLanguage();

  const process = [
    {
      step: "01",
      title: t('services.process.step1.title'),
      description: t('services.process.step1.description')
    },
    {
      step: "02",
      title: t('services.process.step2.title'),
      description: t('services.process.step2.description')
    },
    {
      step: "03",
      title: t('services.process.step3.title'),
      description: t('services.process.step3.description')
    },
    {
      step: "04",
      title: t('services.process.step4.title'),
      description: t('services.process.step4.description')
    }
  ];

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="process-heading" className="font-telegraf font-bold text-4xl text-primary mb-6">
            {t('services.process.title')}
          </h2>
          <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.process.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((phase, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full text-2xl font-telegraf font-bold mb-6">
                  {phase.step}
                </div>
                <h3 className="font-telegraf font-semibold text-xl text-primary mb-4">
                  {phase.title}
                </h3>
                <p className="font-telegraf text-gray-600 leading-relaxed">
                  {phase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
