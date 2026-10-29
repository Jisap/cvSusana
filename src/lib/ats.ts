import {
  type Bullet,
  type CVData,
  type Education,
  type Job,
  type Language,
  type Link,
  type SkillGroup,
  type Stat,
} from '../data/cv';
import { variants, type Variant } from '../data/variants';

export interface CondensedJob {
  role: string;
  company: string;
  start: string;
  end: string;
  line: string;
}

export interface BuiltCV {
  variant: Variant;
  name: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  links: Link[];
  stats: Stat[];
  skills: SkillGroup[];
  experience: Job[];
  older: CondensedJob[];
  education: Education[];
  languages: Language[];
  keywordsFound: string[];
  keywordsMissing: string[];
}

export interface TermMatch {
  term: string;
  count: number;
  matched: boolean;
  matchedAs?: string;
}

export interface Analysis {
  score: number;
  matched: number;
  total: number;
  terms: TermMatch[];
}

export interface AuditIssue {
  level: 'error' | 'warn' | 'info';
  message: string;
}

export const STOPWORDS = [
  'de', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'u',
  'en', 'con', 'para', 'por', 'al', 'del', 'se', 'su', 'sus', 'que', 'como',
  'mas', 'sin', 'sobre', 'entre', 'este', 'esta', 'estos', 'estas', 'ser', 'es',
  'son', 'esta', 'estan', 'has', 'ha', 'han', 'tu', 'tus', 'nuestro', 'nuestra',
  'le', 'les', 'lo', 'no', 'si', 'muy', 'tambien', 'asi', 'cada', 'todo', 'toda',
  'todos', 'todas', 'otro', 'otra', 'cuando', 'donde', 'desde', 'hasta',
  'durante', 'mediante', 'segun', 'tras', 'ante', 'bajo', 'contra', 'hacia',
  'pero', 'porque', 'aunque', 'mientras', 'tanto', 'tan', 'aqui', 'alli', 'ya',
  'solo', 'puede', 'pueden', 'debe', 'deben', 'sera', 'seran', 'somos', 'eres',
  'soy', 'hay', 'tener', 'tiene', 'tienen', 'hacer', 'hace', 'hacen', 'anos',
  'ano', 'experiencia', 'minima', 'minimo', 'minimos', 'minimas', 'valorable',
  'imprescindible', 'deseable', 'requerimos', 'ofrecemos', 'buscamos',
  'funciones', 'requisitos', 'empresa', 'puesto', 'candidato', 'candidata',
  'persona', 'personas', 'incorporacion', 'jornada', 'contrato', 'salario',
  'beneficios', 'trabajo', 'trabajar', 'conocimientos', 'dominio', 'nivel',
  'alto', 'alta', 'buena', 'buen', 'gran', 'capacidad', 'habilidades',
  'aptitudes', 'actitud', 'orientacion', 'orientado', 'orientada', 'proactivo',
  'proactiva', 'dinamico', 'dinamica', 'responsable', 'compromiso', 'completa',
  'completo', 'estable', 'the', 'and',
  'for', 'with', 'you', 'your', 'our', 'we', 'are', 'is', 'be', 'to', 'of',
  'in', 'on', 'at', 'as', 'an', 'a', 'or', 'will', 'have', 'has', 'from',
  'this', 'that', 'by', 'its', 'their', 'full', 'part',
];

export const SYNONYM_GROUPS: string[][] = [
  [
    'dependienta',
    'dependiente',
    'vendedora',
    'vendedor',
    'asesora de ventas',
    'asesor de ventas',
    'asesora comercial',
    'asesor comercial',
    'sales assistant',
    'client advisor',
  ],
  [
    'atencion al cliente',
    'atencion al publico',
    'servicio al cliente',
    'customer service',
  ],
  ['venta consultiva', 'venta asesorada', 'consultative selling', 'asesoramiento'],
  ['fidelizacion', 'clienteling', 'retencion de clientes', 'fidelizacion de clientes'],
  ['visual merchandising', 'merchandising visual', 'escaparatismo'],
  ['reposicion', 'reabastecimiento', 'replenishment'],
  ['inventario', 'control de stock', 'gestion de stock', 'inventory'],
  ['caja', 'cobro', 'arqueo de caja', 'cash desk'],
  ['tpv', 'pos', 'punto de venta', 'terminal punto de venta'],
  ['upselling', 'cross-selling', 'venta cruzada', 'ventas cruzadas'],
  ['objetivos', 'kpi', 'indicadores', 'metas', 'targets', 'resultados'],
  ['equipo', 'trabajo en equipo', 'teamwork'],
  ['moda de lujo', 'lujo', 'luxury', 'moda premium'],
];

const synonymIndex = new Map<string, string[]>();

for (const group of SYNONYM_GROUPS) {
  const normalized = group.map(normalize);
  for (const term of normalized) {
    synonymIndex.set(term, normalized);
  }
}

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function expandTerm(term: string): string[] {
  const key = normalize(term);
  return synonymIndex.get(key) ?? [key];
}

export function termAppears(text: string, term: string): boolean {
  const haystack = normalize(text);
  return expandTerm(term).some((candidate) => haystack.includes(candidate));
}

export function getVariant(id: string): Variant | undefined {
  return variants.find((variant) => variant.id === id);
}

function bulletScore(bullet: Bullet, variant: Variant): number {
  const priority = bullet.priority ?? 2;
  const tagScore = (bullet.tags ?? []).reduce(
    (total, tag) => total + (variant.priorityTags.includes(tag) ? 2 : 0),
    0,
  );
  const quantified = /\d/.test(bullet.text) ? 1 : 0;
  return (4 - priority) * 3 + tagScore + quantified;
}

function pickBullets(job: Job, variant: Variant): Bullet[] {
  return job.bullets
    .map((bullet, index) => ({
      bullet,
      index,
      score: bulletScore(bullet, variant),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, variant.maxBulletsPerRole)
    .sort((a, b) => a.index - b.index)
    .map((entry) => entry.bullet);
}

function orderedSkills(skills: SkillGroup[], variant: Variant): SkillGroup[] {
  const groupScore = (group: SkillGroup) => {
    const content = [group.group, ...group.items].join(' ');
    return variant.keywords.reduce(
      (total, keyword) => total + (termAppears(content, keyword) ? 1 : 0),
      0,
    );
  };

  return skills
    .map((group, index) => ({ group, index, score: groupScore(group) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ group }) => ({
      ...group,
      items: group.items
        .map((item, index) => ({
          item,
          index,
          score: variant.keywords.reduce(
            (total, keyword) => total + (termAppears(item, keyword) ? 1 : 0),
            0,
          ),
        }))
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .map((entry) => entry.item),
    }));
}

export function buildCV(data: CVData, variant: Variant): BuiltCV {
  const detailed = data.experience.slice(0, variant.maxDetailedRoles);
  const olderSource = data.experience.slice(variant.maxDetailedRoles);

  const experience = detailed.map((job) => ({
    ...job,
    bullets: pickBullets(job, variant),
  }));

  const older = olderSource.map((job) => ({
    role: job.role,
    company: job.company,
    start: job.start,
    end: job.end,
    line:
      job.condensed ??
      job.summary ??
      job.bullets[0]?.text ??
      '',
  }));

  const built: BuiltCV = {
    variant,
    name: data.name,
    headline: variant.headline,
    summary: variant.summary,
    location: data.location,
    email: data.email,
    phone: data.phone,
    links: data.links,
    stats: data.stats,
    skills: orderedSkills(data.skills, variant),
    experience,
    older,
    education: data.education,
    languages: data.languages,
    keywordsFound: [],
    keywordsMissing: [],
  };

  const text = documentText(built);
  built.keywordsFound = variant.keywords.filter((keyword) =>
    termAppears(text, keyword),
  );
  built.keywordsMissing = variant.keywords.filter(
    (keyword) => !termAppears(text, keyword),
  );

  return built;
}

export function documentText(doc: BuiltCV): string {
  const parts: string[] = [
    doc.name,
    doc.headline,
    doc.summary,
    doc.location,
    doc.email,
    doc.links.map((link) => link.label).join(' '),
    doc.languages
      .map((language) => `${language.name} ${language.level}`)
      .join(' '),
  ];

  for (const group of doc.skills) {
    parts.push(group.group, ...group.items);
  }

  for (const job of doc.experience) {
    parts.push(job.role, job.company, job.location, job.start, job.end);
    if (job.summary) parts.push(job.summary);
    if (job.tags) parts.push(...job.tags);
    for (const bullet of job.bullets) parts.push(bullet.text);
  }

  for (const job of doc.older) {
    parts.push(job.role, job.company, job.start, job.end, job.line);
  }

  for (const item of doc.education) {
    parts.push(item.degree, item.institution, item.location, item.start, item.end);
    if (item.detail) parts.push(item.detail);
  }

  return parts.filter(Boolean).join(' ');
}

export function documentEvidence(doc: BuiltCV): string {
  const parts: string[] = [];

  for (const group of doc.skills) {
    parts.push(group.group, ...group.items);
  }

  for (const job of doc.experience) {
    parts.push(job.role, job.company, job.location);
    if (job.summary) parts.push(job.summary);
    if (job.tags) parts.push(...job.tags);
    for (const bullet of job.bullets) parts.push(bullet.text);
  }

  for (const job of doc.older) {
    parts.push(job.role, job.company, job.line);
  }

  for (const item of doc.education) {
    parts.push(item.degree, item.institution);
    if (item.detail) parts.push(item.detail);
  }

  for (const language of doc.languages) {
    parts.push(language.name, language.level);
  }

  return parts.filter(Boolean).join(' ');
}

export function estimatePages(doc: BuiltCV): number {
  const characters = documentText(doc).length;
  return Math.max(1, Math.round((characters / 3300) * 10) / 10);
}

function extractTerms(text: string): Array<{ term: string; count: number }> {
  const tokens = normalize(text).split(' ').filter(Boolean);
  const isMeaningful = (word: string) =>
    word.length >= 3 && !STOPWORDS.includes(word) && !/^\d+$/.test(word);

  const counts = new Map<string, number>();

  for (const word of tokens) {
    if (!isMeaningful(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return Array.from(counts, ([term, count]) => ({ term, count })).sort(
    (a, b) => b.count - a.count || a.term.localeCompare(b.term),
  );
}

export function analyzeText(jobText: string, cvText: string): Analysis {
  const haystack = normalize(cvText);
  const terms = extractTerms(jobText).map(({ term, count }) => {
    const candidates = expandTerm(term);
    const hit = candidates.find((candidate) => haystack.includes(candidate));
    return {
      term,
      count,
      matched: Boolean(hit),
      matchedAs: hit && hit !== normalize(term) ? hit : undefined,
    };
  });

  const total = terms.length;
  const matched = terms.filter((term) => term.matched).length;

  return {
    score: total === 0 ? 0 : Math.round((matched / total) * 100),
    matched,
    total,
    terms,
  };
}

export function auditCV(
  data: CVData,
  variant: Variant,
  doc: BuiltCV,
): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const bullets = doc.experience.flatMap((job) => job.bullets);
  const pages = estimatePages(doc);

  if (doc.keywordsMissing.length > 0) {
    issues.push({
      level: 'warn',
      message: `Faltan palabras clave de la variante: ${doc.keywordsMissing.join(', ')}.`,
    });
  }

  if (bullets.length > 12) {
    issues.push({
      level: 'warn',
      message: `La variante muestra ${bullets.length} viñetas; mantén 12 o menos para no pasar de dos páginas.`,
    });
  }

  const longBullets = bullets.filter((bullet) => bullet.text.length > 240);
  if (longBullets.length > 0) {
    issues.push({
      level: 'warn',
      message: `${longBullets.length} viñeta(s) superan los 240 caracteres. Resume para que se lean de un vistazo.`,
    });
  }

  const unquantified = bullets.filter((bullet) => !/\d/.test(bullet.text));
  if (unquantified.length > 0) {
    issues.push({
      level: 'info',
      message: `${unquantified.length} viñeta(s) no incluyen cifras. Añade métricas reales cuando sea posible.`,
    });
  }

  if (pages > 2) {
    issues.push({
      level: 'warn',
      message: `Longitud estimada de ${pages} páginas. Reduce viñetas o condensa puestos antiguos.`,
    });
  }

  const olderWithoutLine = data.experience
    .slice(variant.maxDetailedRoles)
    .filter((job) => !job.condensed && (job.summary || job.bullets.length > 0));
  if (olderWithoutLine.length > 0) {
    issues.push({
      level: 'info',
      message: `${olderWithoutLine.length} puesto(s) antiguos no tienen el campo "condensed"; se usa su resumen o primera viñeta.`,
    });
  }

  const emptyOlder = doc.older.filter((job) => !job.line);
  if (emptyOlder.length > 0) {
    issues.push({
      level: 'error',
      message: `${emptyOlder.length} puesto(s) antiguos se quedan sin texto en la versión condensada.`,
    });
  }

  if (issues.length === 0) {
    issues.push({
      level: 'info',
      message: 'Sin avisos: la variante cabe en el presupuesto y cubre sus palabras clave.',
    });
  }

  return issues;
}
