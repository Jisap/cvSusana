export interface Link {
  label: string;
  url: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export type Priority = 1 | 2 | 3;

export interface Bullet {
  text: string;
  tags?: string[];
  priority?: Priority;
}

export interface Job {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary?: string;
  bullets: Bullet[];
  tags?: string[];
  condensed?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  detail?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface CVData {
  name: string;
  headline: string;
  available: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  links: Link[];
  stats: Stat[];
  skills: SkillGroup[];
  experience: Job[];
  education: Education[];
  languages: Language[];
}

export const cv = {
  name: 'Susana Apellido',
  headline: 'Asesora de ventas senior · Moda de lujo',
  available: 'Disponible para incorporación inmediata',
  summary:
    'Asesora de ventas con más de 12 años de experiencia en firmas de moda de lujo y prêt-à-porter. Especializada en venta consultiva, atención personalizada y fidelización de clientela nacional e internacional. Historial constante de superación de objetivos, mejora del ticket medio y construcción de relaciones duraderas con el cliente.',
  location: 'Madrid, España · Disponibilidad para viajar',
  email: 'susana@ejemplo.com',
  phone: '+34 600 000 000',
  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/susana' },
  ],
  stats: [
    { value: '12+', label: 'Años en retail de moda' },
    { value: '+18%', label: 'Ticket medio' },
    { value: '3', label: 'Firmas internacionales' },
  ],
  skills: [
    {
      group: 'Venta y cliente',
      items: [
        'Venta consultiva',
        'Atención al cliente',
        'Atención personalizada',
        'Upselling y cross-selling',
        'Fidelización',
        'Clientela VIP',
        'Gestión de objeciones',
      ],
    },
    {
      group: 'Operativa de tienda',
      items: [
        'Gestión de caja y TPV',
        'Inventario y reposición',
        'Control de stock',
        'Apertura y cierre',
        'Normativa de tienda',
      ],
    },
    {
      group: 'Visual merchandising',
      items: [
        'Visual merchandising',
        'Escaparatismo',
        'Colocación de producto',
        'Planogramas',
        'Imagen de marca',
      ],
    },
    {
      group: 'Herramientas',
      items: ['CRM', 'TPV', 'Excel', 'Microsoft 365', 'WhatsApp Business'],
    },
    {
      group: 'Competencias',
      items: [
        'Comunicación',
        'Trabajo en equipo',
        'Gestión del tiempo',
        'Adaptabilidad',
        'Mentoría',
        'Liderazgo',
        'Formación de equipos',
      ],
    },
  ],
  experience: [
    {
      role: 'Asesora de ventas senior',
      company: 'Firma de moda de lujo',
      location: 'Madrid',
      start: '2019',
      end: 'Presente',
      summary:
        'Referente de venta y atención a clientela VIP en boutique de lujo, con seguimiento personalizado y coordinación con visual merchandising.',
      tags: ['Lujo', 'CRM', 'Clientela VIP', 'Visual merchandising'],
      bullets: [
        {
          text: 'Superé el objetivo de ventas anual entre un 112% y un 128%, con un ticket medio un 18% superior al de la tienda.',
          tags: ['ventas', 'kpi', 'objetivos'],
          priority: 1,
        },
        {
          text: 'Desarrollé una cartera de más de 120 clientes VIP gestionada con CRM, con una tasa de recompra del 64%.',
          tags: ['crm', 'fidelizacion', 'vip'],
          priority: 1,
        },
        {
          text: 'Implementé un protocolo de venta consultiva y seguimiento posventa que aumentó la conversión de visitas a ventas un 21%.',
          tags: ['venta-consultiva', 'conversion'],
          priority: 2,
        },
        {
          text: 'Organicé eventos privados y presentaciones de colección para clientela internacional, coordinando agenda, producto y equipo.',
          tags: ['eventos', 'idiomas', 'vip'],
          priority: 2,
        },
        {
          text: 'Coordiné reposición, inventario y colocación de producto con visual merchandising para mantener la imagen de la firma.',
          tags: ['stock', 'inventario', 'visual'],
          priority: 2,
        },
        {
          text: 'Formé a tres nuevas incorporaciones en protocolo de atención, TPV y estándares de la casa.',
          tags: ['formacion', 'equipo'],
          priority: 3,
        },
      ],
    },
    {
      role: 'Asesora de ventas',
      company: 'Firma de prêt-à-porter',
      location: 'Madrid',
      start: '2014',
      end: '2019',
      summary:
        'Venta y asesoramiento de imagen en tienda de moda contemporánea, con gestión diaria de stock y objetivos mensuales.',
      tags: ['Prêt-à-porter', 'KPI', 'TPV'],
      bullets: [
        {
          text: 'Cumplí objetivos mensuales de venta durante 18 trimestres consecutivos, con seguimiento diario de KPI y acción sobre producto.',
          tags: ['kpi', 'ventas', 'objetivos'],
          priority: 1,
        },
        {
          text: 'Aumenté las ventas cruzadas de complementos un 15% mediante recomendación activa y coordinación de looks.',
          tags: ['cross-selling', 'upselling', 'ventas'],
          priority: 1,
        },
        {
          text: 'Gestioné inventario, reposición y recuentos cíclicos, reduciendo las diferencias de stock por debajo del 1%.',
          tags: ['inventario', 'stock', 'reposicion'],
          priority: 2,
        },
        {
          text: 'Realicé apertura y cierre de caja, arqueos y cierre diario de TPV sin incidencias.',
          tags: ['caja', 'tpv'],
          priority: 2,
        },
        {
          text: 'Colaboré en cambios de escaparate y campañas de temporada según las directrices de marca.',
          tags: ['visual', 'campanas'],
          priority: 3,
        },
      ],
    },
    {
      role: 'Dependienta',
      company: 'Firma de moda urbana',
      location: 'Valencia',
      start: '2011',
      end: '2014',
      summary:
        'Atención en tienda de alto tráfico, con rotación constante de producto y apoyo en campañas de Navidad y rebajas.',
      tags: ['Retail', 'Atención al cliente', 'Reposición'],
      bullets: [
        {
          text: 'Atendí a más de 80 clientes diarios en temporada alta, combinando probador, recomendación de producto y caja.',
          tags: ['atencion', 'ventas', 'probadores'],
          priority: 1,
        },
        {
          text: 'Mantuve la reposición y el orden del lineal para garantizar disponibilidad de tallas.',
          tags: ['reposicion', 'stock'],
          priority: 2,
        },
        {
          text: 'Resolví devoluciones, cambios y reclamaciones con criterio de marca y enfoque de fidelización.',
          tags: ['postventa', 'fidelizacion'],
          priority: 2,
        },
        {
          text: 'Apoyé en la formación del personal de refuerzo durante campañas de Navidad y rebajas.',
          tags: ['formacion', 'campanas', 'equipo'],
          priority: 3,
        },
      ],
    },
    {
      role: 'Dependienta',
      company: 'Firma de complementos',
      location: 'Valencia',
      start: '2009',
      end: '2011',
      bullets: [],
      condensed:
        'Atención al cliente, venta de complementos, reposición y caja en tienda de centro comercial.',
    },
    {
      role: 'Auxiliar de tienda',
      company: 'Firma de moda joven',
      location: 'Valencia',
      start: '2008',
      end: '2009',
      bullets: [],
      condensed:
        'Apoyo en reposición, probadores y atención al cliente en tienda de moda joven.',
    },
  ],
  education: [
    {
      degree: 'Técnico Superior en Gestión de Ventas y Espacios Comerciales',
      institution: 'Centro de Formación Profesional',
      location: 'Madrid',
      start: '2006',
      end: '2008',
      detail:
        'Técnicas de venta, escaparatismo, gestión comercial y atención al cliente.',
    },
    {
      degree: 'Curso de Visual Merchandising y Escaparatismo',
      institution: 'Escuela de Diseño y Comunicación',
      location: 'Madrid',
      start: '2018',
      end: '2018',
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'C1 · Profesional' },
    { name: 'Francés', level: 'B1' },
  ],
} satisfies CVData;
