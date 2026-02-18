// ============================================================
// YouthPulse Ghana — Comprehensive Mock Data
// AI-Powered National Youth & Sports Intelligence Platform
// Ministry of Youth Development & Empowerment +
// Ministry of Sports & Recreation, Ghana
// ============================================================

// ────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ────────────────────────────────────────────────────────────

export type RegionCode =
  | 'GA' | 'AS' | 'NR' | 'VR' | 'ER' | 'WR' | 'CR'
  | 'UE' | 'UW' | 'BO' | 'BE' | 'AH' | 'SV' | 'NE'
  | 'OT' | 'WN';

export type FacilityStatus = 'good' | 'fair' | 'needs_repair' | 'critical';

export type TalentTier =
  | 'community' | 'district' | 'regional' | 'national' | 'international';

export type AlertLevel = 'promising' | 'exceptional' | 'elite';

export type PaymentStatus = 'paid' | 'processing' | 'pending' | 'approved';

export type TrendDirection = 'rising' | 'stable' | 'declining';

export type SportName =
  | 'Football' | 'Athletics' | 'Boxing' | 'Basketball' | 'Volleyball'
  | 'Tennis' | 'Swimming' | 'Hockey' | 'Handball' | 'Table Tennis'
  | 'Weightlifting' | 'Judo' | 'Taekwondo' | 'Cricket' | 'Rugby'
  | 'Cycling' | 'Armwrestling';

export interface Region {
  code: RegionCode;
  name: string;
  capital: string;
  youthRegistered: number;
  jobsMatched: number;
  skillGapScore: number;
  facilitiesCount: number;
  facilitiesHealthScore: number;
  athletesTracked: number;
  topSport: string;
  participationRate: number;
  unemploymentRate: number;
  population: number;
  youthPopulation: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  registrations: number;
  jobsMatched: number;
  placements: number;
  trainingEnrollments: number;
}

export interface SkillDemand {
  name: string;
  sector: string;
  demandCount: number;
  supplyCount: number;
  gapRatio: number;
  trend: TrendDirection;
  avgSalaryGHS: number;
}

export interface Facility {
  id: string;
  name: string;
  type: string;
  region: string;
  regionCode: RegionCode;
  district: string;
  capacity: number;
  yearBuilt: number;
  status: FacilityStatus;
  overallScore: number;
  sports: string[];
  hasFloodlights: boolean;
  lastInspection: string;
  estimatedRepairCostGHS: number;
  photo: string;
}

export interface FundAllocationEntry {
  category: string;
  amountGHS: number;
  disbursedGHS: number;
  percentOfTotal: number;
  color: string;
}

export interface FundAllocations {
  totalBudgetGHS: number;
  disbursedGHS: number;
  allocations: FundAllocationEntry[];
}

export interface FundByRegionEntry {
  region: string;
  allocated: number;
  disbursed: number;
  utilizationRate: number;
}

export interface Athlete {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  region: string;
  sport: string;
  tier: TalentTier;
  potentialScore: number;
  personalBest: string;
  event: string;
  dropoutRisk: number;
}

export interface TalentPipeline {
  community: number;
  district: number;
  regional: number;
  national: number;
  international: number;
}

export interface TalentAlert {
  id: string;
  athleteName: string;
  sport: string;
  event: string;
  performance: string;
  percentile: number;
  alertLevel: AlertLevel;
  region: string;
  date: string;
  recommendation: string;
}

export interface SportParticipation {
  sport: string;
  total: number;
  male: number;
  female: number;
  growthPercent: number;
}

export interface Programme {
  name: string;
  enrolled: number;
  completed: number;
  employedAfter: number;
  completionRate: number;
  employmentRate: number;
  avgIncomeAfterGHS: number;
  costPerOutcomeGHS: number;
  sector: string;
}

export interface AthletePayment {
  id: string;
  athleteName: string;
  type: string;
  competitionName: string;
  amountGHS: number;
  status: PaymentStatus;
  paymentMethod: string;
  date: string;
}

export interface OverviewKPIs {
  totalYouthRegistered: number;
  registrationGrowth: number;
  totalJobsMatched: number;
  matchSuccessRate: number;
  totalFacilities: number;
  facilitiesCritical: number;
  facilitiesNeedRepair: number;
  totalAthletes: number;
  athleteGrowth: number;
  talentAlertsThisMonth: number;
  pendingPayments: number;
  sportsFundUtilization: number;
  avgTimeToEmploymentDays: number;
  programmeCompletionRate: number;
  activeTrainingEnrollments: number;
  skillGapTrend: string;
}

export interface RegionalMapEntry {
  code: RegionCode;
  name: string;
  x: number;
  y: number;
  value: number;
}

export interface EmploymentBySector {
  sector: string;
  jobCount: number;
  percentOfTotal: number;
}

export interface AgeDistribution {
  ageGroup: '15-19' | '20-24' | '25-29' | '30-35';
  male: number;
  female: number;
}


// ────────────────────────────────────────────────────────────
// 1. REGIONS
// All 16 administrative regions of Ghana
// Total youthRegistered: 847,293
// ────────────────────────────────────────────────────────────

export const REGIONS: Region[] = [
  {
    code: 'GA',
    name: 'Greater Accra',
    capital: 'Accra',
    youthRegistered: 168420,
    jobsMatched: 5814,
    skillGapScore: 0.42,
    facilitiesCount: 54,
    facilitiesHealthScore: 0.68,
    athletesTracked: 2847,
    topSport: 'Football',
    participationRate: 34.2,
    unemploymentRate: 32.1,
    population: 5455068,
    youthPopulation: 1854723,
    color: '#F59E0B',
  },
  {
    code: 'AS',
    name: 'Ashanti',
    capital: 'Kumasi',
    youthRegistered: 142350,
    jobsMatched: 4726,
    skillGapScore: 0.48,
    facilitiesCount: 47,
    facilitiesHealthScore: 0.54,
    athletesTracked: 2513,
    topSport: 'Football',
    participationRate: 31.8,
    unemploymentRate: 35.4,
    population: 5432485,
    youthPopulation: 1793718,
    color: '#10B981',
  },
  {
    code: 'NR',
    name: 'Northern',
    capital: 'Tamale',
    youthRegistered: 78540,
    jobsMatched: 1893,
    skillGapScore: 0.71,
    facilitiesCount: 28,
    facilitiesHealthScore: 0.41,
    athletesTracked: 1342,
    topSport: 'Football',
    participationRate: 22.5,
    unemploymentRate: 44.2,
    population: 2310939,
    youthPopulation: 808829,
    color: '#3B82F6',
  },
  {
    code: 'VR',
    name: 'Volta',
    capital: 'Ho',
    youthRegistered: 52180,
    jobsMatched: 1247,
    skillGapScore: 0.58,
    facilitiesCount: 22,
    facilitiesHealthScore: 0.52,
    athletesTracked: 987,
    topSport: 'Athletics',
    participationRate: 26.1,
    unemploymentRate: 39.7,
    population: 1651342,
    youthPopulation: 561456,
    color: '#8B5CF6',
  },
  {
    code: 'ER',
    name: 'Eastern',
    capital: 'Koforidua',
    youthRegistered: 62470,
    jobsMatched: 1582,
    skillGapScore: 0.53,
    facilitiesCount: 26,
    facilitiesHealthScore: 0.55,
    athletesTracked: 1104,
    topSport: 'Football',
    participationRate: 25.3,
    unemploymentRate: 37.8,
    population: 2633154,
    youthPopulation: 868341,
    color: '#F97316',
  },
  {
    code: 'WR',
    name: 'Western',
    capital: 'Sekondi-Takoradi',
    youthRegistered: 54890,
    jobsMatched: 1461,
    skillGapScore: 0.49,
    facilitiesCount: 24,
    facilitiesHealthScore: 0.58,
    athletesTracked: 943,
    topSport: 'Football',
    participationRate: 27.4,
    unemploymentRate: 36.5,
    population: 1924577,
    youthPopulation: 635110,
    color: '#EC4899',
  },
  {
    code: 'CR',
    name: 'Central',
    capital: 'Cape Coast',
    youthRegistered: 56230,
    jobsMatched: 1378,
    skillGapScore: 0.55,
    facilitiesCount: 25,
    facilitiesHealthScore: 0.49,
    athletesTracked: 1028,
    topSport: 'Football',
    participationRate: 24.8,
    unemploymentRate: 40.1,
    population: 2201863,
    youthPopulation: 726615,
    color: '#14B8A6',
  },
  {
    code: 'UE',
    name: 'Upper East',
    capital: 'Bolgatanga',
    youthRegistered: 31260,
    jobsMatched: 724,
    skillGapScore: 0.76,
    facilitiesCount: 14,
    facilitiesHealthScore: 0.38,
    athletesTracked: 612,
    topSport: 'Athletics',
    participationRate: 19.8,
    unemploymentRate: 46.3,
    population: 1046545,
    youthPopulation: 345360,
    color: '#EF4444',
  },
  {
    code: 'UW',
    name: 'Upper West',
    capital: 'Wa',
    youthRegistered: 24870,
    jobsMatched: 542,
    skillGapScore: 0.79,
    facilitiesCount: 11,
    facilitiesHealthScore: 0.35,
    athletesTracked: 487,
    topSport: 'Boxing',
    participationRate: 18.2,
    unemploymentRate: 48.7,
    population: 801142,
    youthPopulation: 264377,
    color: '#6366F1',
  },
  {
    code: 'BO',
    name: 'Bono',
    capital: 'Sunyani',
    youthRegistered: 42150,
    jobsMatched: 1064,
    skillGapScore: 0.52,
    facilitiesCount: 19,
    facilitiesHealthScore: 0.56,
    athletesTracked: 784,
    topSport: 'Football',
    participationRate: 24.1,
    unemploymentRate: 38.9,
    population: 1208649,
    youthPopulation: 398854,
    color: '#84CC16',
  },
  {
    code: 'BE',
    name: 'Bono East',
    capital: 'Techiman',
    youthRegistered: 35640,
    jobsMatched: 873,
    skillGapScore: 0.61,
    facilitiesCount: 16,
    facilitiesHealthScore: 0.47,
    athletesTracked: 624,
    topSport: 'Football',
    participationRate: 21.6,
    unemploymentRate: 41.3,
    population: 1098746,
    youthPopulation: 362586,
    color: '#F59E0B',
  },
  {
    code: 'AH',
    name: 'Ahafo',
    capital: 'Goaso',
    youthRegistered: 22340,
    jobsMatched: 518,
    skillGapScore: 0.64,
    facilitiesCount: 10,
    facilitiesHealthScore: 0.44,
    athletesTracked: 398,
    topSport: 'Football',
    participationRate: 20.3,
    unemploymentRate: 42.5,
    population: 564536,
    youthPopulation: 186297,
    color: '#22D3EE',
  },
  {
    code: 'SV',
    name: 'Savannah',
    capital: 'Damongo',
    youthRegistered: 21480,
    jobsMatched: 467,
    skillGapScore: 0.82,
    facilitiesCount: 9,
    facilitiesHealthScore: 0.32,
    athletesTracked: 374,
    topSport: 'Athletics',
    participationRate: 16.7,
    unemploymentRate: 51.2,
    population: 649627,
    youthPopulation: 214377,
    color: '#A855F7',
  },
  {
    code: 'NE',
    name: 'North East',
    capital: 'Nalerigu',
    youthRegistered: 18320,
    jobsMatched: 382,
    skillGapScore: 0.84,
    facilitiesCount: 8,
    facilitiesHealthScore: 0.30,
    athletesTracked: 312,
    topSport: 'Boxing',
    participationRate: 15.4,
    unemploymentRate: 52.8,
    population: 587920,
    youthPopulation: 194014,
    color: '#FB923C',
  },
  {
    code: 'OT',
    name: 'Oti',
    capital: 'Dambai',
    youthRegistered: 19780,
    jobsMatched: 421,
    skillGapScore: 0.73,
    facilitiesCount: 12,
    facilitiesHealthScore: 0.39,
    athletesTracked: 356,
    topSport: 'Volleyball',
    participationRate: 17.9,
    unemploymentRate: 47.6,
    population: 742664,
    youthPopulation: 245079,
    color: '#2DD4BF',
  },
  {
    code: 'WN',
    name: 'Western North',
    capital: 'Sefwi Wiawso',
    youthRegistered: 16373,
    jobsMatched: 355,
    skillGapScore: 0.68,
    facilitiesCount: 17,
    facilitiesHealthScore: 0.43,
    athletesTracked: 498,
    topSport: 'Football',
    participationRate: 19.1,
    unemploymentRate: 43.9,
    population: 904895,
    youthPopulation: 298615,
    color: '#E879F9',
  },
];


// ────────────────────────────────────────────────────────────
// 2. MONTHLY TRENDS
// 12 months of data: Mar 2025 through Feb 2026
// Shows realistic growth trajectory
// ────────────────────────────────────────────────────────────

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { month: "Mar '25", registrations: 42150,  jobsMatched: 1120,  placements: 387,  trainingEnrollments: 680  },
  { month: "Apr '25", registrations: 48320,  jobsMatched: 1285,  placements: 421,  trainingEnrollments: 745  },
  { month: "May '25", registrations: 55470,  jobsMatched: 1410,  placements: 468,  trainingEnrollments: 812  },
  { month: "Jun '25", registrations: 61890,  jobsMatched: 1587,  placements: 524,  trainingEnrollments: 893  },
  { month: "Jul '25", registrations: 68240,  jobsMatched: 1742,  placements: 578,  trainingEnrollments: 978  },
  { month: "Aug '25", registrations: 72580,  jobsMatched: 1896,  placements: 641,  trainingEnrollments: 1045 },
  { month: "Sep '25", registrations: 78930,  jobsMatched: 2104,  placements: 712,  trainingEnrollments: 1132 },
  { month: "Oct '25", registrations: 84210,  jobsMatched: 2287,  placements: 784,  trainingEnrollments: 1198 },
  { month: "Nov '25", registrations: 89640,  jobsMatched: 2453,  placements: 843,  trainingEnrollments: 1267 },
  { month: "Dec '25", registrations: 82370,  jobsMatched: 2198,  placements: 738,  trainingEnrollments: 1089 },
  { month: "Jan '26", registrations: 93450,  jobsMatched: 2687,  placements: 921,  trainingEnrollments: 1342 },
  { month: "Feb '26", registrations: 98120,  jobsMatched: 2878,  placements: 994,  trainingEnrollments: 1419 },
];


// ────────────────────────────────────────────────────────────
// 3. SKILLS DEMAND
// Top 15 skills across Ghana's labour market
// ────────────────────────────────────────────────────────────

export const SKILLS_DEMAND: SkillDemand[] = [
  {
    name: 'Solar Installation',
    sector: 'Renewable Energy',
    demandCount: 4820,
    supplyCount: 1240,
    gapRatio: 3.89,
    trend: 'rising',
    avgSalaryGHS: 2850,
  },
  {
    name: 'Mobile Money Agent Operations',
    sector: 'ICT & Digital Services',
    demandCount: 6340,
    supplyCount: 3870,
    gapRatio: 1.64,
    trend: 'rising',
    avgSalaryGHS: 1680,
  },
  {
    name: 'Cocoa Processing',
    sector: 'Agriculture & Agribusiness',
    demandCount: 3560,
    supplyCount: 1890,
    gapRatio: 1.88,
    trend: 'stable',
    avgSalaryGHS: 1920,
  },
  {
    name: 'Welding & Metal Fabrication',
    sector: 'Construction & Building Trades',
    demandCount: 5210,
    supplyCount: 2640,
    gapRatio: 1.97,
    trend: 'rising',
    avgSalaryGHS: 2340,
  },
  {
    name: 'Carpentry & Woodwork',
    sector: 'Construction & Building Trades',
    demandCount: 4170,
    supplyCount: 2980,
    gapRatio: 1.40,
    trend: 'stable',
    avgSalaryGHS: 2100,
  },
  {
    name: 'Digital Marketing',
    sector: 'ICT & Digital Services',
    demandCount: 3890,
    supplyCount: 1120,
    gapRatio: 3.47,
    trend: 'rising',
    avgSalaryGHS: 3200,
  },
  {
    name: 'Web Development',
    sector: 'ICT & Digital Services',
    demandCount: 3240,
    supplyCount: 890,
    gapRatio: 3.64,
    trend: 'rising',
    avgSalaryGHS: 4500,
  },
  {
    name: 'Hairdressing & Cosmetology',
    sector: 'Beauty & Fashion',
    demandCount: 4680,
    supplyCount: 5230,
    gapRatio: 0.89,
    trend: 'stable',
    avgSalaryGHS: 1450,
  },
  {
    name: 'Tailoring & Fashion Design',
    sector: 'Beauty & Fashion',
    demandCount: 5120,
    supplyCount: 4870,
    gapRatio: 1.05,
    trend: 'stable',
    avgSalaryGHS: 1580,
  },
  {
    name: 'Auto Mechanic',
    sector: 'Automotive & Mechanical',
    demandCount: 4930,
    supplyCount: 3210,
    gapRatio: 1.54,
    trend: 'stable',
    avgSalaryGHS: 2050,
  },
  {
    name: 'Plumbing',
    sector: 'Construction & Building Trades',
    demandCount: 3780,
    supplyCount: 1560,
    gapRatio: 2.42,
    trend: 'rising',
    avgSalaryGHS: 2280,
  },
  {
    name: 'Electrical Wiring & Installation',
    sector: 'Construction & Building Trades',
    demandCount: 4450,
    supplyCount: 1940,
    gapRatio: 2.29,
    trend: 'rising',
    avgSalaryGHS: 2560,
  },
  {
    name: 'Catering & Food Service',
    sector: 'Hospitality & Tourism',
    demandCount: 3640,
    supplyCount: 3120,
    gapRatio: 1.17,
    trend: 'stable',
    avgSalaryGHS: 1350,
  },
  {
    name: 'Data Entry & Office Administration',
    sector: 'ICT & Digital Services',
    demandCount: 2980,
    supplyCount: 4510,
    gapRatio: 0.66,
    trend: 'declining',
    avgSalaryGHS: 1280,
  },
  {
    name: 'Agricultural Technology',
    sector: 'Agriculture & Agribusiness',
    demandCount: 2870,
    supplyCount: 680,
    gapRatio: 4.22,
    trend: 'rising',
    avgSalaryGHS: 2750,
  },
];


// ────────────────────────────────────────────────────────────
// 4. FACILITIES
// 15 real and realistic Ghana sports facilities
// ────────────────────────────────────────────────────────────

export const FACILITIES: Facility[] = [
  {
    id: 'FAC-001',
    name: 'Baba Yara Sports Stadium',
    type: 'Stadium',
    region: 'Ashanti',
    regionCode: 'AS',
    district: 'Kumasi Metropolitan',
    capacity: 40528,
    yearBuilt: 1959,
    status: 'critical',
    overallScore: 0.22,
    sports: ['Football', 'Athletics'],
    hasFloodlights: true,
    lastInspection: '2025-11-14',
    estimatedRepairCostGHS: 45000000,
    photo: '',
  },
  {
    id: 'FAC-002',
    name: 'Accra Sports Stadium',
    type: 'Stadium',
    region: 'Greater Accra',
    regionCode: 'GA',
    district: 'Accra Metropolitan',
    capacity: 40000,
    yearBuilt: 1952,
    status: 'fair',
    overallScore: 0.58,
    sports: ['Football', 'Athletics'],
    hasFloodlights: true,
    lastInspection: '2025-12-02',
    estimatedRepairCostGHS: 18500000,
    photo: '',
  },
  {
    id: 'FAC-003',
    name: 'Cape Coast Stadium',
    type: 'Stadium',
    region: 'Central',
    regionCode: 'CR',
    district: 'Cape Coast Metropolitan',
    capacity: 15000,
    yearBuilt: 2016,
    status: 'needs_repair',
    overallScore: 0.45,
    sports: ['Football'],
    hasFloodlights: true,
    lastInspection: '2025-10-28',
    estimatedRepairCostGHS: 12800000,
    photo: '',
  },
  {
    id: 'FAC-004',
    name: 'Borteyman Sports Complex',
    type: 'Multi-Sport Complex',
    region: 'Greater Accra',
    regionCode: 'GA',
    district: 'Tema Metropolitan',
    capacity: 5000,
    yearBuilt: 2023,
    status: 'good',
    overallScore: 0.91,
    sports: ['Basketball', 'Volleyball', 'Handball', 'Table Tennis'],
    hasFloodlights: true,
    lastInspection: '2026-01-15',
    estimatedRepairCostGHS: 850000,
    photo: '',
  },
  {
    id: 'FAC-005',
    name: 'Tamale Sports Stadium',
    type: 'Stadium',
    region: 'Northern',
    regionCode: 'NR',
    district: 'Tamale Metropolitan',
    capacity: 20000,
    yearBuilt: 2008,
    status: 'needs_repair',
    overallScore: 0.43,
    sports: ['Football', 'Athletics'],
    hasFloodlights: true,
    lastInspection: '2025-09-18',
    estimatedRepairCostGHS: 14200000,
    photo: '',
  },
  {
    id: 'FAC-006',
    name: 'Essipong Stadium',
    type: 'Stadium',
    region: 'Western',
    regionCode: 'WR',
    district: 'Sekondi-Takoradi Metropolitan',
    capacity: 20000,
    yearBuilt: 2008,
    status: 'fair',
    overallScore: 0.56,
    sports: ['Football'],
    hasFloodlights: true,
    lastInspection: '2025-11-22',
    estimatedRepairCostGHS: 9400000,
    photo: '',
  },
  {
    id: 'FAC-007',
    name: 'University of Ghana Stadium',
    type: 'Stadium',
    region: 'Greater Accra',
    regionCode: 'GA',
    district: 'Accra Metropolitan',
    capacity: 10000,
    yearBuilt: 2017,
    status: 'good',
    overallScore: 0.82,
    sports: ['Football', 'Athletics'],
    hasFloodlights: true,
    lastInspection: '2026-01-08',
    estimatedRepairCostGHS: 2100000,
    photo: '',
  },
  {
    id: 'FAC-008',
    name: 'Sunyani Coronation Park',
    type: 'Stadium',
    region: 'Bono',
    regionCode: 'BO',
    district: 'Sunyani Municipal',
    capacity: 10000,
    yearBuilt: 1978,
    status: 'needs_repair',
    overallScore: 0.39,
    sports: ['Football'],
    hasFloodlights: false,
    lastInspection: '2025-08-30',
    estimatedRepairCostGHS: 11500000,
    photo: '',
  },
  {
    id: 'FAC-009',
    name: 'Ho Sports Stadium',
    type: 'Stadium',
    region: 'Volta',
    regionCode: 'VR',
    district: 'Ho Municipal',
    capacity: 10000,
    yearBuilt: 2005,
    status: 'fair',
    overallScore: 0.52,
    sports: ['Football', 'Athletics'],
    hasFloodlights: false,
    lastInspection: '2025-10-12',
    estimatedRepairCostGHS: 8700000,
    photo: '',
  },
  {
    id: 'FAC-010',
    name: 'Koforidua Regional Stadium',
    type: 'Stadium',
    region: 'Eastern',
    regionCode: 'ER',
    district: 'New Juaben South Municipal',
    capacity: 12000,
    yearBuilt: 2002,
    status: 'fair',
    overallScore: 0.54,
    sports: ['Football'],
    hasFloodlights: true,
    lastInspection: '2025-11-05',
    estimatedRepairCostGHS: 7200000,
    photo: '',
  },
  {
    id: 'FAC-011',
    name: 'Bolgatanga Community Sports Ground',
    type: 'Community Field',
    region: 'Upper East',
    regionCode: 'UE',
    district: 'Bolgatanga Municipal',
    capacity: 3000,
    yearBuilt: 1995,
    status: 'critical',
    overallScore: 0.18,
    sports: ['Football', 'Athletics'],
    hasFloodlights: false,
    lastInspection: '2025-07-22',
    estimatedRepairCostGHS: 5800000,
    photo: '',
  },
  {
    id: 'FAC-012',
    name: 'Wa Sports Complex',
    type: 'Mini Stadium',
    region: 'Upper West',
    regionCode: 'UW',
    district: 'Wa Municipal',
    capacity: 5000,
    yearBuilt: 2010,
    status: 'needs_repair',
    overallScore: 0.37,
    sports: ['Football', 'Boxing'],
    hasFloodlights: false,
    lastInspection: '2025-09-04',
    estimatedRepairCostGHS: 6300000,
    photo: '',
  },
  {
    id: 'FAC-013',
    name: 'Bukom Boxing Arena',
    type: 'Boxing Arena',
    region: 'Greater Accra',
    regionCode: 'GA',
    district: 'Accra Metropolitan',
    capacity: 4000,
    yearBuilt: 2017,
    status: 'good',
    overallScore: 0.78,
    sports: ['Boxing'],
    hasFloodlights: true,
    lastInspection: '2026-01-20',
    estimatedRepairCostGHS: 1500000,
    photo: '',
  },
  {
    id: 'FAC-014',
    name: 'Techiman Community Field',
    type: 'Community Field',
    region: 'Bono East',
    regionCode: 'BE',
    district: 'Techiman Municipal',
    capacity: 2500,
    yearBuilt: 1988,
    status: 'critical',
    overallScore: 0.21,
    sports: ['Football'],
    hasFloodlights: false,
    lastInspection: '2025-06-14',
    estimatedRepairCostGHS: 4200000,
    photo: '',
  },
  {
    id: 'FAC-015',
    name: 'Damongo Youth Resource Centre',
    type: 'Youth Resource Centre',
    region: 'Savannah',
    regionCode: 'SV',
    district: 'Damongo District',
    capacity: 1500,
    yearBuilt: 2019,
    status: 'fair',
    overallScore: 0.61,
    sports: ['Basketball', 'Volleyball'],
    hasFloodlights: false,
    lastInspection: '2025-12-10',
    estimatedRepairCostGHS: 2800000,
    photo: '',
  },
];


// ────────────────────────────────────────────────────────────
// 5. FUND ALLOCATIONS
// Ghana Sports Fund distribution for fiscal year 2025/2026
// ────────────────────────────────────────────────────────────

export const FUND_ALLOCATIONS: FundAllocations = {
  totalBudgetGHS: 200000000,
  disbursedGHS: 128500000,
  allocations: [
    {
      category: 'Infrastructure Development & Maintenance',
      amountGHS: 80000000,
      disbursedGHS: 54200000,
      percentOfTotal: 40,
      color: '#3B82F6',
    },
    {
      category: 'Athlete Welfare & Allowances',
      amountGHS: 44000000,
      disbursedGHS: 31800000,
      percentOfTotal: 22,
      color: '#10B981',
    },
    {
      category: 'Grassroots Development',
      amountGHS: 30000000,
      disbursedGHS: 18400000,
      percentOfTotal: 15,
      color: '#F59E0B',
    },
    {
      category: 'Competition & Travel',
      amountGHS: 24000000,
      disbursedGHS: 14700000,
      percentOfTotal: 12,
      color: '#8B5CF6',
    },
    {
      category: 'Administration & Governance',
      amountGHS: 12000000,
      disbursedGHS: 5200000,
      percentOfTotal: 6,
      color: '#64748B',
    },
    {
      category: 'Parasport & Inclusion',
      amountGHS: 10000000,
      disbursedGHS: 4200000,
      percentOfTotal: 5,
      color: '#EC4899',
    },
  ],
};


// ────────────────────────────────────────────────────────────
// 6. FUND BY REGION
// Sports Fund allocation and disbursement per region
// ────────────────────────────────────────────────────────────

export const FUND_BY_REGION: FundByRegionEntry[] = [
  { region: 'Greater Accra',  allocated: 28500000, disbursed: 21200000, utilizationRate: 74.4 },
  { region: 'Ashanti',        allocated: 26400000, disbursed: 18700000, utilizationRate: 70.8 },
  { region: 'Northern',       allocated: 16800000, disbursed: 10200000, utilizationRate: 60.7 },
  { region: 'Volta',          allocated: 12200000, disbursed: 7800000,  utilizationRate: 63.9 },
  { region: 'Eastern',        allocated: 13500000, disbursed: 8900000,  utilizationRate: 65.9 },
  { region: 'Western',        allocated: 13800000, disbursed: 9400000,  utilizationRate: 68.1 },
  { region: 'Central',        allocated: 14200000, disbursed: 9100000,  utilizationRate: 64.1 },
  { region: 'Upper East',     allocated: 10800000, disbursed: 6200000,  utilizationRate: 57.4 },
  { region: 'Upper West',     allocated: 10200000, disbursed: 5400000,  utilizationRate: 52.9 },
  { region: 'Bono',           allocated: 11500000, disbursed: 7100000,  utilizationRate: 61.7 },
  { region: 'Bono East',      allocated: 10100000, disbursed: 5800000,  utilizationRate: 57.4 },
  { region: 'Ahafo',          allocated: 8400000,  disbursed: 4600000,  utilizationRate: 54.8 },
  { region: 'Savannah',       allocated: 8200000,  disbursed: 4100000,  utilizationRate: 50.0 },
  { region: 'North East',     allocated: 7800000,  disbursed: 3700000,  utilizationRate: 47.4 },
  { region: 'Oti',            allocated: 8600000,  disbursed: 4200000,  utilizationRate: 48.8 },
  { region: 'Western North',  allocated: 8700000,  disbursed: 4400000,  utilizationRate: 50.6 },
];


// ────────────────────────────────────────────────────────────
// 7. ATHLETES
// 20 realistic Ghanaian athletes across various sports
// ────────────────────────────────────────────────────────────

export const ATHLETES: Athlete[] = [
  {
    id: 'ATH-001',
    name: 'Kwadwo Amoako',
    age: 19,
    gender: 'Male',
    region: 'Ashanti',
    sport: 'Athletics',
    tier: 'national',
    potentialScore: 0.92,
    personalBest: '10.41s',
    event: '100m Sprint',
    dropoutRisk: 0.08,
  },
  {
    id: 'ATH-002',
    name: 'Abena Osei-Bonsu',
    age: 17,
    gender: 'Female',
    region: 'Greater Accra',
    sport: 'Swimming',
    tier: 'regional',
    potentialScore: 0.84,
    personalBest: '28.9s',
    event: '50m Freestyle',
    dropoutRisk: 0.22,
  },
  {
    id: 'ATH-003',
    name: 'Ibrahim Yakubu',
    age: 22,
    gender: 'Male',
    region: 'Northern',
    sport: 'Boxing',
    tier: 'national',
    potentialScore: 0.89,
    personalBest: '14 KOs in 18 fights',
    event: 'Welterweight',
    dropoutRisk: 0.12,
  },
  {
    id: 'ATH-004',
    name: 'Efua Mensah',
    age: 16,
    gender: 'Female',
    region: 'Central',
    sport: 'Athletics',
    tier: 'regional',
    potentialScore: 0.87,
    personalBest: '1.68m',
    event: 'High Jump',
    dropoutRisk: 0.15,
  },
  {
    id: 'ATH-005',
    name: 'Samuel Tetteh',
    age: 24,
    gender: 'Male',
    region: 'Greater Accra',
    sport: 'Football',
    tier: 'national',
    potentialScore: 0.78,
    personalBest: '22 goals in 2025 season',
    event: 'Striker',
    dropoutRisk: 0.05,
  },
  {
    id: 'ATH-006',
    name: 'Priscilla Adjei',
    age: 20,
    gender: 'Female',
    region: 'Eastern',
    sport: 'Volleyball',
    tier: 'regional',
    potentialScore: 0.76,
    personalBest: '285cm spike reach',
    event: 'Outside Hitter',
    dropoutRisk: 0.28,
  },
  {
    id: 'ATH-007',
    name: 'Yussif Alhassan',
    age: 18,
    gender: 'Male',
    region: 'Upper East',
    sport: 'Athletics',
    tier: 'district',
    potentialScore: 0.81,
    personalBest: '4:12.3',
    event: '1500m',
    dropoutRisk: 0.35,
  },
  {
    id: 'ATH-008',
    name: 'Akosua Frimpong',
    age: 21,
    gender: 'Female',
    region: 'Ashanti',
    sport: 'Weightlifting',
    tier: 'national',
    potentialScore: 0.88,
    personalBest: '98kg Clean & Jerk',
    event: '64kg Class',
    dropoutRisk: 0.10,
  },
  {
    id: 'ATH-009',
    name: 'Daniel Nartey',
    age: 23,
    gender: 'Male',
    region: 'Greater Accra',
    sport: 'Boxing',
    tier: 'international',
    potentialScore: 0.95,
    personalBest: '2024 African Championships Bronze',
    event: 'Middleweight',
    dropoutRisk: 0.04,
  },
  {
    id: 'ATH-010',
    name: 'Fatima Abdulai',
    age: 16,
    gender: 'Female',
    region: 'Northern',
    sport: 'Athletics',
    tier: 'district',
    potentialScore: 0.79,
    personalBest: '12.4s',
    event: '100m Sprint',
    dropoutRisk: 0.42,
  },
  {
    id: 'ATH-011',
    name: 'Kofi Agyeman',
    age: 25,
    gender: 'Male',
    region: 'Western',
    sport: 'Football',
    tier: 'regional',
    potentialScore: 0.72,
    personalBest: '15 assists in 2025 season',
    event: 'Midfielder',
    dropoutRisk: 0.18,
  },
  {
    id: 'ATH-012',
    name: 'Adwoa Boateng',
    age: 19,
    gender: 'Female',
    region: 'Bono',
    sport: 'Basketball',
    tier: 'regional',
    potentialScore: 0.82,
    personalBest: '18.4 PPG average',
    event: 'Point Guard',
    dropoutRisk: 0.20,
  },
  {
    id: 'ATH-013',
    name: 'Emmanuel Asare',
    age: 17,
    gender: 'Male',
    region: 'Volta',
    sport: 'Athletics',
    tier: 'regional',
    potentialScore: 0.86,
    personalBest: '6.42m',
    event: 'Long Jump',
    dropoutRisk: 0.14,
  },
  {
    id: 'ATH-014',
    name: 'Grace Tawiah',
    age: 22,
    gender: 'Female',
    region: 'Greater Accra',
    sport: 'Tennis',
    tier: 'national',
    potentialScore: 0.80,
    personalBest: 'Ghana National Runner-Up 2025',
    event: 'Singles',
    dropoutRisk: 0.16,
  },
  {
    id: 'ATH-015',
    name: 'Rashid Issahaku',
    age: 20,
    gender: 'Male',
    region: 'Savannah',
    sport: 'Athletics',
    tier: 'community',
    potentialScore: 0.74,
    personalBest: '51.8s',
    event: '400m',
    dropoutRisk: 0.48,
  },
  {
    id: 'ATH-016',
    name: 'Millicent Agbeko',
    age: 18,
    gender: 'Female',
    region: 'Greater Accra',
    sport: 'Boxing',
    tier: 'regional',
    potentialScore: 0.83,
    personalBest: 'Regional Champion 2025',
    event: 'Flyweight',
    dropoutRisk: 0.19,
  },
  {
    id: 'ATH-017',
    name: 'Benjamin Owusu',
    age: 26,
    gender: 'Male',
    region: 'Ashanti',
    sport: 'Cycling',
    tier: 'national',
    potentialScore: 0.77,
    personalBest: '2:18:42',
    event: '100km Road Race',
    dropoutRisk: 0.22,
  },
  {
    id: 'ATH-018',
    name: 'Naomi Amankwa',
    age: 15,
    gender: 'Female',
    region: 'Eastern',
    sport: 'Table Tennis',
    tier: 'district',
    potentialScore: 0.85,
    personalBest: 'District U-17 Champion',
    event: 'Singles',
    dropoutRisk: 0.25,
  },
  {
    id: 'ATH-019',
    name: 'Sulemana Haruna',
    age: 21,
    gender: 'Male',
    region: 'Upper West',
    sport: 'Football',
    tier: 'community',
    potentialScore: 0.68,
    personalBest: '12 goals community league',
    event: 'Forward',
    dropoutRisk: 0.52,
  },
  {
    id: 'ATH-020',
    name: 'Comfort Dzifa',
    age: 23,
    gender: 'Female',
    region: 'Volta',
    sport: 'Handball',
    tier: 'national',
    potentialScore: 0.81,
    personalBest: '47 goals in national league',
    event: 'Left Back',
    dropoutRisk: 0.13,
  },
];


// ────────────────────────────────────────────────────────────
// 8. TALENT PIPELINE
// Breakdown of athletes by development tier
// Total: 15,209
// ────────────────────────────────────────────────────────────

export const TALENT_PIPELINE: TalentPipeline = {
  community: 8347,
  district: 3891,
  regional: 1987,
  national: 872,
  international: 112,
};


// ────────────────────────────────────────────────────────────
// 9. TALENT ALERTS
// 8 recent alerts for exceptional performances
// ────────────────────────────────────────────────────────────

export const TALENT_ALERTS: TalentAlert[] = [
  {
    id: 'TA-001',
    athleteName: 'Kwadwo Amoako',
    sport: 'Athletics',
    event: '100m Sprint',
    performance: '10.41s',
    percentile: 98.7,
    alertLevel: 'elite',
    region: 'Ashanti',
    date: '2026-02-14',
    recommendation: 'Fast-track to National U-23 Athletics Camp. Performance exceeds African Junior qualifying standard.',
  },
  {
    id: 'TA-002',
    athleteName: 'Efua Mensah',
    sport: 'Athletics',
    event: 'High Jump',
    performance: '1.68m',
    percentile: 96.2,
    alertLevel: 'exceptional',
    region: 'Central',
    date: '2026-02-11',
    recommendation: 'Refer to Ghana Athletics Association for advanced training. Consider for African Youth Games selection.',
  },
  {
    id: 'TA-003',
    athleteName: 'Naomi Amankwa',
    sport: 'Table Tennis',
    event: 'Singles',
    performance: '4-1 win over regional seed',
    percentile: 94.1,
    alertLevel: 'exceptional',
    region: 'Eastern',
    date: '2026-02-09',
    recommendation: 'Connect with Ghana Table Tennis Association national youth programme. Exceptional hand-eye coordination at 15.',
  },
  {
    id: 'TA-004',
    athleteName: 'Emmanuel Asare',
    sport: 'Athletics',
    event: 'Long Jump',
    performance: '6.42m',
    percentile: 95.8,
    alertLevel: 'exceptional',
    region: 'Volta',
    date: '2026-02-07',
    recommendation: 'Register for Regional Athletics Championships. Also test for triple jump potential based on physical profile.',
  },
  {
    id: 'TA-005',
    athleteName: 'Millicent Agbeko',
    sport: 'Boxing',
    event: 'Flyweight',
    performance: 'TKO Round 2 (Regional Championships)',
    percentile: 93.4,
    alertLevel: 'promising',
    region: 'Greater Accra',
    date: '2026-02-05',
    recommendation: 'Advance to National Boxing Trials. Strong Bukom pedigree and technical ability.',
  },
  {
    id: 'TA-006',
    athleteName: 'Adwoa Boateng',
    sport: 'Basketball',
    event: 'Point Guard',
    performance: '24 pts, 8 assists, 5 steals',
    percentile: 91.2,
    alertLevel: 'promising',
    region: 'Bono',
    date: '2026-02-03',
    recommendation: 'Invite to Ghana Basketball Association national youth development camp. Outstanding court vision.',
  },
  {
    id: 'TA-007',
    athleteName: 'Yussif Alhassan',
    sport: 'Athletics',
    event: '1500m',
    performance: '4:12.3',
    percentile: 90.8,
    alertLevel: 'promising',
    region: 'Upper East',
    date: '2026-01-30',
    recommendation: 'Refer to regional athletics coach for structured endurance training. High dropout risk — provide stipend support.',
  },
  {
    id: 'TA-008',
    athleteName: 'Abena Osei-Bonsu',
    sport: 'Swimming',
    event: '50m Freestyle',
    performance: '28.9s',
    percentile: 92.6,
    alertLevel: 'promising',
    region: 'Greater Accra',
    date: '2026-01-27',
    recommendation: 'Advance to Ghana Swimming Association national squad trials. Rare swimming talent — priority support needed.',
  },
];


// ────────────────────────────────────────────────────────────
// 10. SPORT PARTICIPATION
// Participation across major sports nationally
// ────────────────────────────────────────────────────────────

export const SPORT_PARTICIPATION: SportParticipation[] = [
  { sport: 'Football',       total: 487200,  male: 398300,  female: 88900,   growthPercent: 4.2  },
  { sport: 'Athletics',      total: 124800,  male: 68400,   female: 56400,   growthPercent: 18.7 },
  { sport: 'Boxing',         total: 42300,   male: 35100,   female: 7200,    growthPercent: 12.4 },
  { sport: 'Basketball',     total: 38900,   male: 22400,   female: 16500,   growthPercent: 22.1 },
  { sport: 'Volleyball',     total: 31200,   male: 14800,   female: 16400,   growthPercent: 15.3 },
  { sport: 'Handball',       total: 24600,   male: 11200,   female: 13400,   growthPercent: 9.8  },
  { sport: 'Table Tennis',   total: 19400,   male: 11800,   female: 7600,    growthPercent: 14.2 },
  { sport: 'Swimming',       total: 12800,   male: 7200,    female: 5600,    growthPercent: 28.5 },
  { sport: 'Tennis',         total: 8900,    male: 5400,    female: 3500,    growthPercent: 11.6 },
  { sport: 'Weightlifting',  total: 6700,    male: 4800,    female: 1900,    growthPercent: 19.4 },
  { sport: 'Hockey',         total: 5200,    male: 2900,    female: 2300,    growthPercent: 7.3  },
  { sport: 'Cycling',        total: 4100,    male: 3200,    female: 900,     growthPercent: 24.8 },
];


// ────────────────────────────────────────────────────────────
// 11. PROGRAMMES
// Government training and employment programmes
// ────────────────────────────────────────────────────────────

export const PROGRAMMES: Programme[] = [
  {
    name: 'Adwumawura Project (Master Craftsperson)',
    enrolled: 4280,
    completed: 3412,
    employedAfter: 2548,
    completionRate: 79.7,
    employmentRate: 74.7,
    avgIncomeAfterGHS: 2450,
    costPerOutcomeGHS: 3200,
    sector: 'Construction & Building Trades',
  },
  {
    name: '1 Million Coders Initiative',
    enrolled: 8920,
    completed: 5148,
    employedAfter: 3296,
    completionRate: 57.7,
    employmentRate: 64.0,
    avgIncomeAfterGHS: 4200,
    costPerOutcomeGHS: 1800,
    sector: 'ICT & Digital Services',
  },
  {
    name: 'Youth in Agriculture Programme',
    enrolled: 6340,
    completed: 4738,
    employedAfter: 3412,
    completionRate: 74.7,
    employmentRate: 72.0,
    avgIncomeAfterGHS: 1850,
    costPerOutcomeGHS: 2600,
    sector: 'Agriculture & Agribusiness',
  },
  {
    name: 'NVTI Skills Training Programme',
    enrolled: 3860,
    completed: 3088,
    employedAfter: 2347,
    completionRate: 80.0,
    employmentRate: 76.0,
    avgIncomeAfterGHS: 2200,
    costPerOutcomeGHS: 4100,
    sector: 'Automotive & Mechanical',
  },
  {
    name: 'Solar Energy Technicians Programme',
    enrolled: 1450,
    completed: 1189,
    employedAfter: 1035,
    completionRate: 82.0,
    employmentRate: 87.0,
    avgIncomeAfterGHS: 2850,
    costPerOutcomeGHS: 5200,
    sector: 'Renewable Energy',
  },
  {
    name: 'Hospitality & Tourism Youth Scheme',
    enrolled: 2740,
    completed: 1918,
    employedAfter: 1227,
    completionRate: 70.0,
    employmentRate: 64.0,
    avgIncomeAfterGHS: 1680,
    costPerOutcomeGHS: 3800,
    sector: 'Hospitality & Tourism',
  },
  {
    name: 'National Entrepreneurship & Innovation (NEIP)',
    enrolled: 5210,
    completed: 3647,
    employedAfter: 2553,
    completionRate: 70.0,
    employmentRate: 70.0,
    avgIncomeAfterGHS: 3100,
    costPerOutcomeGHS: 4500,
    sector: 'Creative Arts & Media',
  },
];


// ────────────────────────────────────────────────────────────
// 12. ATHLETE PAYMENTS
// Recent payment transactions for athletes
// ────────────────────────────────────────────────────────────

export const ATHLETE_PAYMENTS: AthletePayment[] = [
  {
    id: 'PAY-001',
    athleteName: 'Daniel Nartey',
    type: 'Competition Bonus',
    competitionName: '2024 African Boxing Championships',
    amountGHS: 15000,
    status: 'paid',
    paymentMethod: 'MTN Mobile Money',
    date: '2026-02-10',
  },
  {
    id: 'PAY-002',
    athleteName: 'Kwadwo Amoako',
    type: 'Training Allowance',
    competitionName: 'National Athletics Camp',
    amountGHS: 3500,
    status: 'processing',
    paymentMethod: 'MTN Mobile Money',
    date: '2026-02-12',
  },
  {
    id: 'PAY-003',
    athleteName: 'Akosua Frimpong',
    type: 'Travel Allowance',
    competitionName: 'Commonwealth Weightlifting Qualifiers',
    amountGHS: 8200,
    status: 'approved',
    paymentMethod: 'Bank Transfer',
    date: '2026-02-14',
  },
  {
    id: 'PAY-004',
    athleteName: 'Grace Tawiah',
    type: 'Training Allowance',
    competitionName: 'National Tennis Training Camp',
    amountGHS: 2800,
    status: 'paid',
    paymentMethod: 'Vodafone Cash',
    date: '2026-02-08',
  },
  {
    id: 'PAY-005',
    athleteName: 'Comfort Dzifa',
    type: 'Competition Bonus',
    competitionName: 'West African Handball Championship',
    amountGHS: 5000,
    status: 'pending',
    paymentMethod: 'MTN Mobile Money',
    date: '2026-02-15',
  },
  {
    id: 'PAY-006',
    athleteName: 'Benjamin Owusu',
    type: 'Medical Allowance',
    competitionName: 'Tour of Volta Cycling Race',
    amountGHS: 4200,
    status: 'paid',
    paymentMethod: 'MTN Mobile Money',
    date: '2026-02-06',
  },
  {
    id: 'PAY-007',
    athleteName: 'Ibrahim Yakubu',
    type: 'Training Allowance',
    competitionName: 'National Boxing Preparation Camp',
    amountGHS: 3800,
    status: 'processing',
    paymentMethod: 'AirtelTigo Money',
    date: '2026-02-13',
  },
  {
    id: 'PAY-008',
    athleteName: 'Samuel Tetteh',
    type: 'Competition Bonus',
    competitionName: 'Ghana Premier League Match Day 18',
    amountGHS: 6500,
    status: 'paid',
    paymentMethod: 'Bank Transfer',
    date: '2026-02-04',
  },
  {
    id: 'PAY-009',
    athleteName: 'Abena Osei-Bonsu',
    type: 'Travel Allowance',
    competitionName: 'African Swimming Championships',
    amountGHS: 12400,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    date: '2026-02-16',
  },
  {
    id: 'PAY-010',
    athleteName: 'Efua Mensah',
    type: 'Training Allowance',
    competitionName: 'Regional Athletics Development Camp',
    amountGHS: 1800,
    status: 'approved',
    paymentMethod: 'MTN Mobile Money',
    date: '2026-02-17',
  },
];


// ────────────────────────────────────────────────────────────
// 13. OVERVIEW KPIs
// National-level key performance indicators
// ────────────────────────────────────────────────────────────

export const OVERVIEW_KPIS: OverviewKPIs = {
  totalYouthRegistered: 847293,
  registrationGrowth: 12.4,
  totalJobsMatched: 23847,
  matchSuccessRate: 34.2,
  totalFacilities: 342,
  facilitiesCritical: 18,
  facilitiesNeedRepair: 47,
  totalAthletes: 15209,
  athleteGrowth: 22.1,
  talentAlertsThisMonth: 43,
  pendingPayments: 67,
  sportsFundUtilization: 64.3,
  avgTimeToEmploymentDays: 47,
  programmeCompletionRate: 71.8,
  activeTrainingEnrollments: 12450,
  skillGapTrend: 'closing',
};


// ────────────────────────────────────────────────────────────
// 14. REGIONAL MAP DATA
// Geographic positioning for visual dashboard map
// x/y are approximate visual positions (0-100 scale)
// ────────────────────────────────────────────────────────────

export const REGIONAL_MAP_DATA: RegionalMapEntry[] = [
  { code: 'UW', name: 'Upper West',    x: 25, y: 10, value: 24870  },
  { code: 'UE', name: 'Upper East',    x: 55, y: 8,  value: 31260  },
  { code: 'NE', name: 'North East',    x: 65, y: 15, value: 18320  },
  { code: 'NR', name: 'Northern',      x: 45, y: 22, value: 78540  },
  { code: 'SV', name: 'Savannah',      x: 30, y: 28, value: 21480  },
  { code: 'OT', name: 'Oti',           x: 72, y: 35, value: 19780  },
  { code: 'BE', name: 'Bono East',     x: 55, y: 38, value: 35640  },
  { code: 'BO', name: 'Bono',          x: 38, y: 42, value: 42150  },
  { code: 'AH', name: 'Ahafo',         x: 35, y: 48, value: 22340  },
  { code: 'AS', name: 'Ashanti',       x: 50, y: 50, value: 142350 },
  { code: 'VR', name: 'Volta',         x: 75, y: 50, value: 52180  },
  { code: 'ER', name: 'Eastern',       x: 62, y: 55, value: 62470  },
  { code: 'WN', name: 'Western North', x: 30, y: 58, value: 16373  },
  { code: 'WR', name: 'Western',       x: 22, y: 68, value: 54890  },
  { code: 'CR', name: 'Central',       x: 45, y: 68, value: 56230  },
  { code: 'GA', name: 'Greater Accra', x: 60, y: 65, value: 168420 },
];


// ────────────────────────────────────────────────────────────
// 15. EMPLOYMENT BY SECTOR
// Job distribution across major economic sectors
// ────────────────────────────────────────────────────────────

export const EMPLOYMENT_BY_SECTOR: EmploymentBySector[] = [
  { sector: 'Agriculture & Agribusiness',     jobCount: 4527,  percentOfTotal: 19.0 },
  { sector: 'Construction & Building Trades', jobCount: 3815,  percentOfTotal: 16.0 },
  { sector: 'ICT & Digital Services',         jobCount: 3338,  percentOfTotal: 14.0 },
  { sector: 'Hospitality & Tourism',          jobCount: 2862,  percentOfTotal: 12.0 },
  { sector: 'Automotive & Mechanical',        jobCount: 2385,  percentOfTotal: 10.0 },
  { sector: 'Beauty & Fashion',               jobCount: 2146,  percentOfTotal: 9.0  },
  { sector: 'Health Services',                jobCount: 1669,  percentOfTotal: 7.0  },
  { sector: 'Renewable Energy',               jobCount: 1431,  percentOfTotal: 6.0  },
  { sector: 'Creative Arts & Media',          jobCount: 954,   percentOfTotal: 4.0  },
  { sector: 'Mining & Extractives',           jobCount: 720,   percentOfTotal: 3.0  },
];


// ────────────────────────────────────────────────────────────
// 16. AGE DISTRIBUTION
// Registered youth by age group and gender
// ────────────────────────────────────────────────────────────

export const AGE_DISTRIBUTION: AgeDistribution[] = [
  { ageGroup: '15-19', male: 98420,  female: 87340  },
  { ageGroup: '20-24', male: 142680, female: 128910 },
  { ageGroup: '25-29', male: 118430, female: 104270 },
  { ageGroup: '30-35', male: 92140,  female: 75103  },
];
