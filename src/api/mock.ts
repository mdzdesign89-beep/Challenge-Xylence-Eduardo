import type { Startup, StartupFilters, Stage, Sector, Country } from "@/types";

const STARTUPS: Startup[] = [
  {
    id: "stp_01",
    name: "Clavo",
    stage: "Series A",
    sector: ["FinTech", "B2B SaaS"],
    country: "MX",
    convictionScore: 87,
    trend: "up",
    fundingAmount: 14_500_000,
    foundedYear: 2021,
    description:
      "Infraestructura de pagos cross-border para PyMEs mexicanas que exportan a EE. UU. Reduce el costo de FX en 60%.",
    signals: [
      { type: "team", label: "2 fundadores ex-Kavak, 1 ex-Stripe", weight: 0.9 },
      { type: "market", label: "TAM de USD 38B en remesas B2B LATAM", weight: 0.85 },
      { type: "traction", label: "ARR creció 4.2x en 12 meses", weight: 0.92 },
      { type: "product", label: "NPS 72 entre clientes activos", weight: 0.78 },
    ],
    website: "clavopay.mx",
    newsItems: [
      { title: "Clavo cierra ronda Series A de USD 14.5M", summary: "Liderada por Kaszek Ventures para expandir operaciones en México y Colombia.", date: "Mar 2025" },
      { title: "Clavo reduce el costo de FX para 500 PyMEs", summary: "Nuevo informe revela ahorros acumulados de USD 3.2M en comisiones cambiarias.", date: "Ene 2025" },
    ],
  },
  {
    id: "stp_02",
    name: "Pampa Health",
    stage: "Seed",
    sector: ["HealthTech"],
    country: "AR",
    convictionScore: 71,
    trend: "up",
    fundingAmount: 3_200_000,
    foundedYear: 2022,
    description:
      "Telemedicina especializada en salud mental con modelo de suscripción corporativa. Cobertura en 6 provincias argentinas.",
    signals: [
      { type: "team", label: "CEO médico psiquiatra, 12 años de práctica", weight: 0.72 },
      { type: "market", label: "Mercado corporativo de bienestar en expansión", weight: 0.68 },
      { type: "traction", label: "42 clientes enterprise firmados", weight: 0.74 },
      { type: "product", label: "Retención mensual 91%", weight: 0.8 },
    ],
    website: "pampahealth.ar",
    newsItems: [
      { title: "Pampa Health suma 12 nuevas empresas en Q1", summary: "El crecimiento corporativo supera las proyecciones iniciales; apunta a Brasil en 2026.", date: "Abr 2025" },
      { title: "Estudio revela impacto en ausentismo laboral", summary: "Clientes de Pampa Health reportaron 34% menos días de baja por salud mental.", date: "Feb 2025" },
    ],
  },
  {
    id: "stp_03",
    name: "Cafetero",
    stage: "Pre-seed",
    sector: ["AgriTech", "Marketplace"],
    country: "CO",
    convictionScore: 58,
    trend: "neutral",
    fundingAmount: 750_000,
    foundedYear: 2023,
    description:
      "Marketplace directo productor-comprador para café de especialidad. Trazabilidad blockchain por lote.",
    signals: [
      { type: "team", label: "Fundadora hija de caficultor, 3ra generación", weight: 0.65 },
      { type: "market", label: "Demanda premium creciente en EE. UU. y EU", weight: 0.7 },
      { type: "traction", label: "180 productores onboarded, GMV modesto", weight: 0.45 },
      { type: "product", label: "MVP funcional, falta escalar ops", weight: 0.55 },
    ],
    website: "cafetero.co",
    newsItems: [
      { title: "Cafetero llega a ferias de specialty coffee en Portland", summary: "Primera participación internacional conecta a productores de Huila con compradores de EE. UU.", date: "Mar 2025" },
    ],
  },
  {
    id: "stp_04",
    name: "Verdera",
    stage: "Series A",
    sector: ["ClimaTech", "B2B SaaS"],
    country: "CL",
    convictionScore: 82,
    trend: "up",
    fundingAmount: 11_000_000,
    foundedYear: 2020,
    description:
      "Plataforma de medición y reporte de huella de carbono para empresas con obligaciones regulatorias en LATAM.",
    signals: [
      { type: "team", label: "CTO ex-Google, PhD en ML aplicado", weight: 0.88 },
      { type: "market", label: "Regulación CSRD extiende compliance a LATAM", weight: 0.9 },
      { type: "traction", label: "62 clientes, logos enterprise en Chile y México", weight: 0.8 },
      { type: "product", label: "Integraciones con 14 ERPs", weight: 0.75 },
    ],
    website: "verdera.cl",
    newsItems: [
      { title: "Verdera integra reporte CSRD en su plataforma", summary: "Primera solución LATAM certificada para cumplir la nueva normativa europea de sostenibilidad.", date: "Abr 2025" },
      { title: "CMPC adopta Verdera para su reporte ESG 2025", summary: "La papelera chilena suma Verdera como proveedor oficial de medición de huella de carbono.", date: "Feb 2025" },
    ],
  },
  {
    id: "stp_05",
    name: "Raíz Logistics",
    stage: "Series B+",
    sector: ["LogiTech", "B2B SaaS"],
    country: "BR",
    convictionScore: 91,
    trend: "up",
    fundingAmount: 48_000_000,
    foundedYear: 2018,
    description:
      "SaaS de optimización de última milla para e-commerce brasileño. Reduce costo por entrega en 23% promedio.",
    signals: [
      { type: "team", label: "Equipo fundador ex-Rappi y ex-iFood", weight: 0.94 },
      { type: "market", label: "E-commerce BR creció 27% YoY 2024", weight: 0.88 },
      { type: "traction", label: "Rentable desde Q2 2024, ARR USD 22M", weight: 1.0 },
      { type: "product", label: "12 patentes de ruteo optimizado", weight: 0.85 },
    ],
    website: "raizlogistics.com.br",
    newsItems: [
      { title: "Raíz Logistics alcanza ARR de USD 22M", summary: "La compañía confirma rentabilidad sostenida y prepara expansión a Argentina y Colombia.", date: "Mar 2025" },
      { title: "Raíz lanza módulo de devoluciones inteligentes", summary: "Nuevo feature reduce el costo de reverse logistics hasta un 31% para retailers.", date: "Ene 2025" },
    ],
  },
  {
    id: "stp_06",
    name: "Mensura",
    stage: "Seed",
    sector: ["FinTech"],
    country: "BR",
    convictionScore: 85,
    trend: "down",
    fundingAmount: 2_800_000,
    foundedYear: 2022,
    description:
      "Scoring crediticio alternativo para trabajadores informales usando datos de apps de delivery y ride-sharing.",
    signals: [
      { type: "team", label: "Founder ex-Nubank, equipo pequeño", weight: 0.68 },
      { type: "market", label: "60M de informales en Brasil sin crédito", weight: 0.82 },
      { type: "traction", label: "Default rate subió 3pts últimos 2Q", weight: 0.38 },
      { type: "product", label: "Modelo ML requiere recalibración", weight: 0.48 },
    ],
    website: "mensura.com.br",
    newsItems: [
      { title: "Mensura anuncia recalibración de modelo crediticio", summary: "La startup trabaja con un equipo externo de data science para reducir tasas de default.", date: "Abr 2025" },
    ],
  },
  {
    id: "stp_07",
    name: "Aulabit",
    stage: "Pre-seed",
    sector: ["EdTech"],
    country: "PE",
    convictionScore: 52,
    trend: "neutral",
    foundedYear: 2024,
    description:
      "Tutorías 1-a-1 con estudiantes universitarios como mentores para secundaria. Foco en matemáticas y ciencias.",
    signals: [
      { type: "team", label: "Founder solo, primer emprendimiento", weight: 0.45 },
      { type: "market", label: "Educación privada peruana en crecimiento", weight: 0.6 },
      { type: "traction", label: "380 usuarios pagos en 4 meses", weight: 0.58 },
      { type: "product", label: "App mobile, features básicos", weight: 0.5 },
    ],
    website: "aulabit.pe",
    newsItems: [
      { title: "Aulabit supera 380 estudiantes en su primer semestre", summary: "La plataforma conecta tutores universitarios de la PUCP con alumnos de secundaria limeños.", date: "Mar 2025" },
    ],
  },
  {
    id: "stp_08",
    name: "Terra Viva",
    stage: "Seed",
    sector: ["AgriTech", "ClimaTech"],
    country: "MX",
    convictionScore: 76,
    trend: "up",
    fundingAmount: 4_100_000,
    foundedYear: 2021,
    description:
      "Sensores IoT + IA para agricultura regenerativa. Mide salud del suelo y recomienda rotación de cultivos.",
    signals: [
      { type: "team", label: "Co-fundadores ingeniero agrónomo + ex-Microsoft", weight: 0.8 },
      { type: "market", label: "Presión ESG en agroexportadores mexicanos", weight: 0.72 },
      { type: "traction", label: "18,000 hectáreas bajo monitoreo activo", weight: 0.78 },
      { type: "product", label: "Hardware propio, margen operativo retador", weight: 0.7 },
    ],
    website: "terraviva.mx",
    newsItems: [
      { title: "Terra Viva supera 18,000 hectáreas monitoreadas", summary: "La startup expande operaciones a Sinaloa y Sonora tras acuerdo con cooperativas agrícolas.", date: "Abr 2025" },
      { title: "Terra Viva gana premio LATAM ClimaTech 2025", summary: "Reconocida como la mejor solución de agricultura regenerativa en la región.", date: "Feb 2025" },
    ],
  },
  {
    id: "stp_09",
    name: "Mira Salud",
    stage: "Series A",
    sector: ["HealthTech", "B2B SaaS"],
    country: "CO",
    convictionScore: 79,
    trend: "up",
    fundingAmount: 9_500_000,
    foundedYear: 2020,
    description:
      "Historia clínica electrónica para clínicas medianas en Colombia y Perú. Certificada para el sistema de salud público.",
    signals: [
      { type: "team", label: "CEO segunda vez, exit previo en SaaS", weight: 0.85 },
      { type: "market", label: "Digitalización obligatoria en sector salud CO", weight: 0.78 },
      { type: "traction", label: "210 clínicas activas, churn anual 6%", weight: 0.82 },
      { type: "product", label: "Certificación RESE completada 2024", weight: 0.76 },
    ],
    website: "mirasalud.co",
    newsItems: [
      { title: "Mira Salud certifica integración con sistema SISPRO", summary: "La plataforma cumple todos los requisitos técnicos del MSPS para interoperabilidad.", date: "Mar 2025" },
      { title: "Expansión a Perú: 30 clínicas firmadas en Lima", summary: "Mira Salud duplica su presencia internacional cerrando contratos con clínicas privadas.", date: "Ene 2025" },
    ],
  },
  {
    id: "stp_10",
    name: "Corporación Financiera Andes del Sur",
    stage: "Series B+",
    sector: ["FinTech", "Consumer"],
    country: "CL",
    convictionScore: 68,
    trend: "down",
    fundingAmount: 32_000_000,
    foundedYear: 2017,
    description:
      "Neobanco chileno para profesionales jóvenes.",
    signals: [
      { type: "team", label: "Equipo senior, rotación alta en C-level", weight: 0.6 },
      { type: "market", label: "Competencia intensa con incumbentes", weight: 0.55 },
      { type: "traction", label: "620k usuarios, CAC en aumento", weight: 0.65 },
      { type: "product", label: "App con buena UX, rating 4.6 en stores", weight: 0.82 },
    ],
    website: "andesdelsur.cl",
    newsItems: [
      { title: "Andes del Sur reporta alza en CAC de 22% en Q1", summary: "La presión competitiva de Nubank y MACH obliga a revisar estrategia de adquisición.", date: "Abr 2025" },
    ],
  },
  {
    id: "stp_11",
    name: "Predio",
    stage: "Seed",
    sector: ["PropTech", "Marketplace"],
    country: "MX",
    convictionScore: 73,
    trend: "up",
    fundingAmount: 5_200_000,
    foundedYear: 2022,
    description:
      "Marketplace de arrendamiento sin aval para CDMX y Monterrey. Underwriting basado en historial de ingresos digitales.",
    signals: [
      { type: "team", label: "Fundadores ex-Casai y ex-La Haus", weight: 0.82 },
      { type: "market", label: "35% de arrendatarios no pueden conseguir aval", weight: 0.78 },
      { type: "traction", label: "1,400 contratos firmados, default 2.1%", weight: 0.7 },
      { type: "product", label: "Flujo de aprobación en 4 horas", weight: 0.72 },
    ],
    website: "predio.mx",
    newsItems: [
      { title: "Predio lanza operaciones en Monterrey con 200 propiedades", summary: "La expansión al norte del país llega tras validar el modelo en CDMX con 1,400 contratos.", date: "Mar 2025" },
      { title: "Predio reduce default a 2.1% con nuevo modelo de underwriting", summary: "Integración con datos de nómina digital mejora la precisión del score de arrendatario.", date: "Dic 2024" },
    ],
  },
  {
    id: "stp_12",
    name: "Cielo Carga",
    stage: "Pre-seed",
    sector: ["LogiTech"],
    country: "AR",
    convictionScore: 49,
    trend: "neutral",
    fundingAmount: 600_000,
    foundedYear: 2023,
    description:
      "Plataforma de consolidación de carga aérea para exportadores argentinos de productos perecederos.",
    signals: [
      { type: "team", label: "Un solo founder con experiencia operativa", weight: 0.5 },
      { type: "market", label: "Nicho pequeño pero con alto valor unitario", weight: 0.58 },
      { type: "traction", label: "12 clientes piloto, ingresos modestos", weight: 0.42 },
      { type: "product", label: "Plataforma aún muy manual", weight: 0.45 },
    ],
    website: "cielocarga.ar",
    newsItems: [
      { title: "Cielo Carga suma 12 exportadores en prueba piloto", summary: "La plataforma procesa sus primeros envíos consolidados de frutas finas hacia Miami.", date: "Feb 2025" },
    ],
  },
  {
    id: "stp_13",
    name: "Solecito",
    stage: "Seed",
    sector: ["ClimaTech", "Consumer"],
    country: "BR",
    convictionScore: 69,
    trend: "up",
    fundingAmount: 3_800_000,
    foundedYear: 2022,
    description:
      "Financiamiento de paneles solares residenciales con modelo de suscripción sin enganche.",
    signals: [
      { type: "team", label: "CEO ex-Creditas, CTO ex-QuintoAndar", weight: 0.78 },
      { type: "market", label: "Tarifa eléctrica BR subió 18% en 2024", weight: 0.8 },
      { type: "traction", label: "4,200 instalaciones completadas", weight: 0.7 },
      { type: "product", label: "Ciclo de instalación 35 días promedio", weight: 0.62 },
    ],
    website: "solecito.com.br",
    newsItems: [
      { title: "Solecito supera 4,200 instalaciones solares", summary: "La startup brasileña aprovecha el alza de tarifas eléctricas para acelerar su crecimiento.", date: "Abr 2025" },
      { title: "Solecito lanza plan familiar con descuento en segunda instalación", summary: "Nuevo producto busca reducir el ciclo de ventas aprovechando referidos.", date: "Feb 2025" },
    ],
  },
  {
    id: "stp_14",
    name: "Mentora AI",
    stage: "Seed",
    sector: ["EdTech", "B2B SaaS"],
    country: "AR",
    convictionScore: 74,
    trend: "up",
    fundingAmount: 4_600_000,
    foundedYear: 2023,
    description:
      "Copiloto de IA para profesores universitarios que genera evaluaciones, rubricas y retroalimentación personalizada.",
    signals: [
      { type: "team", label: "Equipo técnico sólido, 2 PhDs en NLP", weight: 0.85 },
      { type: "market", label: "Adopción IA en universidades acelera", weight: 0.78 },
      { type: "traction", label: "14 universidades firmadas, 8,000 profes activos", weight: 0.72 },
      { type: "product", label: "Modelo propietario fine-tuneado en español", weight: 0.76 },
    ],
    website: "mentoraai.com",
    newsItems: [
      { title: "Mentora AI firma acuerdo con UBA y UdeChile", summary: "Las dos universidades más grandes de LATAM adoptarán el copiloto a partir del segundo semestre.", date: "Abr 2025" },
      { title: "Mentora AI publica benchmark de evaluaciones en español", summary: "El modelo supera a GPT-4 en generación de rúbricas para disciplinas STEM en castellano.", date: "Mar 2025" },
    ],
  },
  {
    id: "stp_15",
    name: "Origami Finance",
    stage: "Series A",
    sector: ["FinTech", "Consumer"],
    country: "CO",
    convictionScore: 84,
    trend: "up",
    fundingAmount: 16_800_000,
    foundedYear: 2020,
    description:
      "App de inversiones para retail colombiano con ETFs fraccionados y portafolios automatizados desde USD 1.",
    signals: [
      { type: "team", label: "Founders ex-Rappi Pay y ex-Bancolombia", weight: 0.88 },
      { type: "market", label: "Solo 8% de colombianos invierte en bolsa", weight: 0.85 },
      { type: "traction", label: "AUM USD 140M, 290k usuarios activos", weight: 0.87 },
      { type: "product", label: "Licencia SFC vigente, compliance sólido", weight: 0.82 },
    ],
    website: "origamifinance.co",
    newsItems: [
      { title: "Origami Finance supera USD 140M en activos bajo gestión", summary: "La app colombiana alcanza un hito histórico con 290,000 inversionistas activos.", date: "Mar 2025" },
      { title: "Origami lanza portafolios ESG para millennials", summary: "Nueva línea de productos alineada con criterios de sostenibilidad y gobiernos corporativos.", date: "Ene 2025" },
    ],
  },
  {
    id: "stp_16",
    name: "Pluma Legal",
    stage: "Pre-seed",
    sector: ["B2B SaaS"],
    country: "PE",
    convictionScore: 61,
    trend: "neutral",
    fundingAmount: 900_000,
    foundedYear: 2023,
    description:
      "Automatización de contratos legales con IA para estudios jurídicos medianos en la región andina.",
    signals: [
      { type: "team", label: "Abogada + ingeniera ML, complementariedad fuerte", weight: 0.72 },
      { type: "market", label: "Legal tech LATAM aún incipiente", weight: 0.55 },
      { type: "traction", label: "22 firmas en piloto pago", weight: 0.58 },
      { type: "product", label: "Precisión 94% en revisión de cláusulas", weight: 0.7 },
    ],
    website: "plumalegal.pe",
    newsItems: [
      { title: "Pluma Legal alcanza 94% de precisión en revisión de contratos", summary: "Benchmark interno confirma ventaja técnica frente a soluciones genéricas del mercado.", date: "Mar 2025" },
    ],
  },
  {
    id: "stp_17",
    name: "Íntegra",
    stage: "Pre-seed",
    sector: ["B2B SaaS"],
    country: "MX",
    convictionScore: 44,
    trend: "neutral",
    foundedYear: 2027,
    description:
      "Stealth. Levantó pre-seed recientemente; aún sin señales públicas confiables.",
    signals: [],
    website: "integra.mx",
    newsItems: [],
  },
];

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const delay = (min = 300, max = 500) =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min),
  );

function matchesFilters(startup: Startup, filters: StartupFilters): boolean {
  if (filters.stages?.length && !filters.stages.includes(startup.stage)) return false;
  if (filters.countries?.length && !filters.countries.includes(startup.country)) return false;
  if (filters.sectors?.length && !filters.sectors.some((s) => startup.sector.includes(s))) return false;
  if (filters.search) {
    const needle = filters.search.trim().toLowerCase();
    if (needle && !startup.name.toLowerCase().includes(needle)) return false;
  }
  return true;
}

function sortStartups(list: Startup[], filters: StartupFilters): Startup[] {
  const { sortBy, sortOrder = "desc" } = filters;
  if (!sortBy) return list;
  const direction = sortOrder === "asc" ? 1 : -1;
  return [...list].sort((a, b) => {
    const av = (a[sortBy] ?? 0) as number;
    const bv = (b[sortBy] ?? 0) as number;
    return (av - bv) * direction;
  });
}

export async function fetchStartups(filters: StartupFilters = {}): Promise<Startup[]> {
  await delay();
  const filtered = STARTUPS.filter((startup) => matchesFilters(startup, filters));
  return sortStartups(filtered, filters);
}

export async function fetchStartupById(id: string): Promise<Startup> {
  await delay(150, 300);
  const startup = STARTUPS.find((s) => s.id === id);
  if (!startup) throw new ApiError(`Startup ${id} not found`, 404);
  return startup;
}

// ── UI option lists ────────────────────────────────────────────────────────
export const STAGE_OPTIONS: Stage[]   = ["Pre-seed", "Seed", "Series A", "Series B+"];
export const SECTOR_OPTIONS: Sector[] = ["AgriTech", "B2B SaaS", "ClimaTech", "Consumer", "EdTech", "FinTech", "HealthTech", "LogiTech", "Marketplace", "PropTech"];
export const COUNTRY_OPTIONS: Country[] = ["AR", "BR", "CL", "CO", "MX", "PE"];
