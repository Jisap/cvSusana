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
  name: 'Susana Guzmán Vázquez',
  headline: 'Encargada de tienda · Asesora de ventas y retail de moda',
  available: 'Disponible para incorporación inmediata',
  summary:
    'Profesional del retail y la moda con más de 20 años de experiencia en atención personalizada, venta consultiva y gestión de puntos de venta en primeras marcas y corners en El Corte Inglés (IKKS, Roberto Verino, Mayoral). Experiencia consolidada como responsable de tienda, liderando equipos, control de stock, escaparatismo y cumplimiento de objetivos comerciales con un marcado don de gentes.',
  location: 'Málaga, España',
  email: 'jisapjisap@yahoo.es',
  phone: '+34 657 86 23 47',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/susanaguzmanvazquezmalaga' },
  ],
  stats: [
    { value: '20+', label: 'Años en retail y moda' },
    { value: 'El Corte Inglés', label: 'Especialista en corners' },
    { value: '100%', label: 'Enfoque al cliente y equipo' },
  ],
  skills: [
    {
      group: 'Venta y cliente',
      items: [
        'Atención personalizada',
        'Venta consultiva',
        'Fidelización de clientela',
        'Asesoramiento de imagen',
        'Resolución de incidencias',
        'Don de gentes y empatía',
      ],
    },
    {
      group: 'Gestión y operativa',
      items: [
        'Responsable y encargada de tienda',
        'Control y gestión de stock',
        'Inventarios y reposición',
        'Gestión de caja y TPV',
        'Arqueos y contabilidad de caja',
        'Supervisión de objetivos de venta',
      ],
    },
    {
      group: 'Visual y escaparatismo',
      items: [
        'Escaparatismo',
        'Visual merchandising',
        'Montaje de colecciones',
        'Imagen de marca',
        'Coordinación de producto',
      ],
    },
    {
      group: 'Herramientas digitales',
      items: [
        'TPV y sistemas de cobro',
        'Microsoft Excel',
        'Microsoft Word',
        'PowerPoint',
        'Photoshop',
        'InDesign',
        'Illustrator',
      ],
    },
    {
      group: 'Competencias',
      items: [
        'Liderazgo y gestión de equipos',
        'Selección y formación de personal',
        'Organización y detalle',
        'Capacidad de adaptación',
        'Trabajo en equipo y compañerismo',
      ],
    },
  ],
  experience: [
    {
      role: 'Asesora de ventas y atención al cliente',
      company: 'IKKS (Corner en El Corte Inglés)',
      location: 'Málaga',
      start: '03/2022',
      end: 'Presente',
      summary:
        'Venta, asesoramiento y fidelización de clientes para la firma francesa de moda en corner de El Corte Inglés.',
      tags: ['Moda', 'El Corte Inglés', 'Atención al cliente', 'Ventas'],
      bullets: [
        {
          text: 'Atención personalizada y asesoramiento de imagen a clientela nacional e internacional en el espacio IKKS.',
          tags: ['atencion', 'ventas', 'vip', 'idiomas'],
          priority: 1,
        },
        {
          text: 'Superación constante de objetivos de venta y fidelización de clientela recurrente de la firma.',
          tags: ['ventas', 'objetivos', 'fidelizacion', 'kpi'],
          priority: 1,
        },
        {
          text: 'Control de stocks, reposición continua y mantenimiento de los estándares visuales de la marca en El Corte Inglés.',
          tags: ['stock', 'reposicion', 'visual', 'inventario'],
          priority: 2,
        },
        {
          text: 'Manejo de caja, TPV de El Corte Inglés, gestión de reservas, pedidos especiales y devoluciones.',
          tags: ['caja', 'tpv'],
          priority: 2,
        },
      ],
    },
    {
      role: 'Asesora de moda y ventas (Corners El Corte Inglés)',
      company: 'Mayoral · Tutto Piccolo · Pan con Chocolate',
      location: 'Málaga',
      start: '12/2019',
      end: '12/2021',
      summary:
        'Gestión de corners de moda infantil y juvenil de primer nivel en El Corte Inglés en sucesivas campañas y periodos clave.',
      tags: ['El Corte Inglés', 'Moda', 'Campañas'],
      bullets: [
        {
          text: 'Venta activa y atención al cliente en corners de firmas líderes (Mayoral, Tutto Piccolo, Pan con Chocolate).',
          tags: ['atencion', 'ventas', 'campanas'],
          priority: 1,
        },
        {
          text: 'Gestión ágil de picos de venta en campañas de Navidad y temporada alta con alto volumen de afluencia.',
          tags: ['ventas', 'campanas', 'atencion'],
          priority: 1,
        },
        {
          text: 'Recepción de mercancía, doblado, planchado, reposición y control riguroso de tallas en sala de ventas.',
          tags: ['stock', 'reposicion', 'inventario'],
          priority: 2,
        },
        {
          text: 'Cobro, gestión de TPV, fidelización y resolución de consultas con la política de calidad de El Corte Inglés.',
          tags: ['caja', 'tpv', 'fidelizacion'],
          priority: 2,
        },
      ],
    },
    {
      role: 'Asesora de ventas y atención al cliente',
      company: 'Roberto Verino (Corner en El Corte Inglés)',
      location: 'Málaga',
      start: '10/2018',
      end: '10/2019',
      summary:
        'Venta consultiva de moda y sastrería de alta gama en el corner de Roberto Verino en El Corte Inglés.',
      tags: ['Moda de lujo', 'El Corte Inglés', 'Venta consultiva'],
      bullets: [
        {
          text: 'Venta consultiva y estilismo personalizado orientado a moda prêt-à-porter y sastrería de alta gama.',
          tags: ['venta-consultiva', 'ventas', 'vip'],
          priority: 1,
        },
        {
          text: 'Fidelización de clientela exclusiva y seguimiento personalizado de compras y encargos especiales.',
          tags: ['fidelizacion', 'vip', 'crm'],
          priority: 1,
        },
        {
          text: 'Cuidado exhaustivo de la imagen del corner, colocación de producto según directrices de marca y control de stock.',
          tags: ['visual', 'stock', 'inventario'],
          priority: 2,
        },
        {
          text: 'Gestión integral de cobros, arqueos diarios de caja y coordinación con la gerencia de planta de El Corte Inglés.',
          tags: ['caja', 'tpv'],
          priority: 2,
        },
      ],
    },
    {
      role: 'Asesora de moda, dependienta y escaparatista',
      company: 'Carlos Rodríguez S.L.',
      location: 'Málaga',
      start: '11/2009',
      end: '01/2018',
      summary:
        'Más de 8 años como pieza clave en tienda de moda: asesoramiento de estilo, diseño de escaparates y operativa integral.',
      tags: ['Moda', 'Escaparatismo', 'Caja', 'Ventas'],
      bullets: [
        {
          text: 'Asesoramiento personalizado de moda y estilismo, construyendo relaciones de confianza con clientela habitual a lo largo de 8 años.',
          tags: ['atencion', 'fidelizacion', 'ventas'],
          priority: 1,
        },
        {
          text: 'Diseño, montaje y renovación periódica de escaparates y espacios interiores de la tienda (visual merchandising).',
          tags: ['visual', 'escaparatismo'],
          priority: 1,
        },
        {
          text: 'Responsable de apertura, arqueo de caja, gestión de TPV y cuadre diario de ventas.',
          tags: ['caja', 'tpv'],
          priority: 2,
        },
        {
          text: 'Control de inventario, recepción de género de proveedores, etiquetado y organización del almacén.',
          tags: ['stock', 'inventario', 'reposicion'],
          priority: 2,
        },
      ],
    },
    {
      role: 'Dependienta y escaparatista',
      company: 'Rayan Modas S.L.',
      location: 'Málaga',
      start: '05/2006',
      end: '09/2009',
      summary:
        'Venta de moda, escaparatismo, arqueo de caja y atención directa en tienda multimarca.',
      tags: ['Moda', 'Escaparatismo', 'Caja'],
      bullets: [
        {
          text: 'Atención al cliente y venta activa de colecciones de moda.',
          tags: ['atencion', 'ventas'],
          priority: 1,
        },
        {
          text: 'Creación de escaparates atractivos y dinamización del punto de venta.',
          tags: ['visual', 'escaparatismo'],
          priority: 1,
        },
        {
          text: 'Cobro en caja, arqueos y control de existencias.',
          tags: ['caja', 'stock'],
          priority: 2,
        },
      ],
    },
    {
      role: 'Responsable y encargada de tienda',
      company: 'Modalid S.L.',
      location: 'Málaga',
      start: '04/1999',
      end: '04/2006',
      summary:
        '7 años como encargada general de tienda, coordinando personal, finanzas de caja, compras y objetivos de facturación.',
      tags: ['Encargada', 'Liderazgo', 'Gestión', 'Stock'],
      bullets: [
        {
          text: 'Dirección operativa y comercial de la tienda durante 7 años, liderando el equipo de dependientas y supervisando objetivos de venta.',
          tags: ['liderazgo', 'equipo', 'objetivos', 'kpi'],
          priority: 1,
        },
        {
          text: 'Selección, acogida y formación continua del personal en técnicas de venta y atención al cliente.',
          tags: ['formacion', 'equipo', 'liderazgo'],
          priority: 1,
        },
        {
          text: 'Gestión integral y control de stocks, auditorías de inventario y pedidos a central.',
          tags: ['stock', 'inventario'],
          priority: 2,
        },
        {
          text: 'Contabilidad de caja, arqueos diarios, cierres mensuales y gestión de incidencias.',
          tags: ['caja', 'tpv'],
          priority: 2,
        },
      ],
    },
    {
      role: 'Dependienta de moda y lencería',
      company: 'VFB Lingerie Europe (Corner El Corte Inglés)',
      location: 'Málaga',
      start: '05/2018',
      end: '08/2018',
      bullets: [],
      condensed:
        'Venta y asesoramiento personalizado en corner de lencería de alta gama en El Corte Inglés.',
    },
    {
      role: 'Dependienta y merchandising',
      company: 'Modas Phineas',
      location: 'Málaga',
      start: '05/1994',
      end: '07/1997',
      bullets: [],
      condensed:
        'Atención al cliente, merchandising, manejo de caja y escaparatismo.',
    },
    {
      role: 'Dependienta de refuerzo',
      company: 'El Corte Inglés S.A.',
      location: 'Málaga',
      start: '12/1991',
      end: '01/1992',
      bullets: [],
      condensed:
        'Campaña de Navidad en El Corte Inglés: merchandising, atención al cliente y caja.',
    },
  ],
  education: [
    {
      degree: 'Diplomada en Magisterio (Educación Especial)',
      institution: 'Universidad de Málaga',
      location: 'Málaga',
      start: '1990',
      end: '1993',
      detail:
        'Formación pedagógica que aporta gran empatía, comunicación asertiva, resolución de conflictos y trato cercano con las personas.',
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Nivel intermedio para atención al público' },
  ],
} satisfies CVData;
