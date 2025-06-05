
import { Tool } from '@/types/content';

export const tools: Tool[] = [
  {
    id: 'data-health-check',
    slug: 'data-health-check',
    published: true,
    title: {
      en: 'Data Health Check',
      es: 'Verificación de Salud de Datos'
    },
    description: {
      en: 'Get a comprehensive assessment of your current data infrastructure and identify areas for improvement.',
      es: 'Obtén una evaluación integral de tu infraestructura de datos actual e identifica áreas de mejora.'
    },
    image: '/img/data-health-check.jpg',
    ctaText: {
      en: 'Start Assessment',
      es: 'Iniciar Evaluación'
    },
    ctaUrl: 'https://calendly.com/jrodriguez4917/data-health-check',
    tags: ['Assessment', 'Data Quality', 'Infrastructure']
  },
  {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    published: false, // Set to true when ready
    title: {
      en: 'Data Analytics ROI Calculator',
      es: 'Calculadora de ROI de Analítica de Datos'
    },
    description: {
      en: 'Calculate the potential return on investment for your data analytics initiatives.',
      es: 'Calcula el retorno potencial de inversión para tus iniciativas de analítica de datos.'
    },
    ctaText: {
      en: 'Calculate ROI',
      es: 'Calcular ROI'
    },
    ctaUrl: '#',
    tags: ['ROI', 'Calculator', 'Business Case']
  }
  // Add more tools here as needed
];

export const getPublishedTools = (): Tool[] => {
  return tools.filter(tool => tool.published);
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find(tool => tool.slug === slug && tool.published);
};
