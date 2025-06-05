
import type { Tool } from '@/types/content';

export const tools: Tool[] = [
  {
    id: 'roi-calculator',
    slug: 'data-analytics-roi-calculator',
    title: {
      en: 'Data Analytics ROI Calculator',
      es: 'Calculadora de ROI de Análisis de Datos'
    },
    description: {
      en: 'Calculate the potential return on investment for your data analytics initiatives. Input your current metrics and see projected improvements.',
      es: 'Calcula el retorno potencial de inversión para tus iniciativas de análisis de datos. Ingresa tus métricas actuales y ve las mejoras proyectadas.'
    },
    image: '/img/roi-calculator-preview.jpg',
    imageAlt: {
      en: 'ROI calculator interface showing data analytics investment returns',
      es: 'Interfaz de calculadora ROI mostrando retornos de inversión en análisis de datos'
    },
    ctaText: {
      en: 'Calculate Your ROI',
      es: 'Calcula Tu ROI'
    },
    ctaUrl: '/tools/roi-calculator',
    publishDate: '2024-11-15T09:00:00Z',
    isPublished: true,
    featured: true,
    category: {
      en: 'Analytics',
      es: 'Análisis'
    }
  },
  {
    id: 'data-maturity-assessment',
    slug: 'data-maturity-assessment-tool',
    title: {
      en: 'Data Maturity Assessment',
      es: 'Evaluación de Madurez de Datos'
    },
    description: {
      en: 'Assess your organization\'s data maturity level and get personalized recommendations for improvement.',
      es: 'Evalúa el nivel de madurez de datos de tu organización y obtén recomendaciones personalizadas para mejorar.'
    },
    ctaText: {
      en: 'Take Assessment',
      es: 'Realizar Evaluación'
    },
    ctaUrl: '/tools/data-maturity',
    publishDate: '2024-11-01T10:00:00Z',
    isPublished: true,
    featured: false,
    category: {
      en: 'Assessment',
      es: 'Evaluación'
    }
  }
  // More tools can be easily added here
];

// Helper function to get recent tools (published in last 30 days)
export const getRecentTools = (): Tool[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return tools.filter(tool => 
    tool.isPublished && 
    new Date(tool.publishDate) >= thirtyDaysAgo
  );
};

// Helper function to get featured tools
export const getFeaturedTools = (): Tool[] => {
  return tools.filter(tool => tool.isPublished && tool.featured);
};

// Helper function to get tool by slug
export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find(tool => tool.slug === slug && tool.isPublished);
};
