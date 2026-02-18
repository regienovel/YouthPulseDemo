# CLAUDE.md — YouthPulse Ghana: Complete Build Specification

> **Project:** YouthPulse Ghana — AI-Powered National Youth & Sports Intelligence Platform
> **Version:** 1.0.0
> **Target:** Ministry of Youth Development & Empowerment + Ministry of Sports & Recreation, Ghana
> **Stack:** 100% Open Source
> **Primary Language:** English (with Twi, Ga, Ewe, Dagbani, Hausa, Fante, Nzema support)
> **License:** AGPL-3.0

---

## TABLE OF CONTENTS

1. [Project Vision & Context](#1-project-vision--context)
2. [Ghanaian Context & Localization](#2-ghanaian-context--localization)
3. [System Architecture](#3-system-architecture)
4. [Technology Stack (All Open Source)](#4-technology-stack)
5. [Database Schema](#5-database-schema)
6. [Module 1: Youth Employment & Skills Intelligence](#6-module-1-youth-employment--skills-intelligence)
7. [Module 2: Sports Infrastructure & Funding Optimization](#7-module-2-sports-infrastructure--funding-optimization)
8. [Module 3: Grassroots Talent Discovery & Multi-Sport Development](#8-module-3-grassroots-talent-discovery--multi-sport-development)
9. [Access Layer 1: USSD Interface](#9-access-layer-1-ussd-interface)
10. [Access Layer 2: WhatsApp AI Assistant](#10-access-layer-2-whatsapp-ai-assistant)
11. [Access Layer 3: Web Dashboard](#11-access-layer-3-web-dashboard)
12. [Access Layer 4: Coach/Field Officer Mobile App](#12-access-layer-4-coach-mobile-app)
13. [AI/ML Models Specification](#13-aiml-models-specification)
14. [API Specification](#14-api-specification)
15. [Authentication & Authorization](#15-authentication--authorization)
16. [Deployment & Infrastructure](#16-deployment--infrastructure)
17. [Data Privacy & Compliance](#17-data-privacy--compliance)
18. [Testing Strategy](#18-testing-strategy)
19. [File & Folder Structure](#19-file--folder-structure)
20. [Build & Run Instructions](#20-build--run-instructions)

---

## 1. PROJECT VISION & CONTEXT

### 1.1 The Problem

Ghana faces three interconnected crises that the Ministry of Youth and Sports has identified as national priorities:

1. **Youth Unemployment Crisis:** 38.8% youth unemployment. 68% of employed youth in vulnerable, unstable jobs. Over 20% of 15-35 year olds are NEET (Not in Education, Employment, or Training). This is officially classified as a national security risk.

2. **Chronic Sports Infrastructure Deficit:** 8 of 16 regions lack modern stadia. Baba Yara Stadium banned by CAF due to poor condition. Athletes self-fund international competition. No systematic maintenance culture. Parliament passed the Ghana Sports Fund Bill 2025 to address chronic underfunding.

3. **Collapsed Grassroots Development Pipeline:** Overwhelming financial bias toward football (Black Stars World Cup campaigns cost GHS 19M, 9.6M, 14M in 2010/2014/2022). Athletes in athletics, boxing, volleyball self-fund. No systematic talent identification. No data on youth sports participation.

### 1.2 The Solution

YouthPulse Ghana is a unified AI-powered platform with three modules and four access layers:

**Modules (The Intelligence):**
- Module 1: Youth Employment & Skills Matching Engine
- Module 2: Sports Infrastructure & Funding Optimizer
- Module 3: Grassroots Talent Discovery & Multi-Sport Development

**Access Layers (The Interfaces):**
- Layer 1: USSD (*714*44#) — Any phone, zero data, for youth in all regions
- Layer 2: WhatsApp AI Assistant — Conversational AI for smartphone users
- Layer 3: Web Dashboard — Rich analytics for ministry officials and decision-makers
- Layer 4: Mobile App (Flutter) — For coaches, PE teachers, and field officers

### 1.3 Design Philosophy

- **Ghana-first:** Every decision prioritizes what works in Ghana, not what looks impressive in Silicon Valley
- **Offline-first:** Core functionality must work without reliable internet
- **Inclusive access:** USSD on feature phones is not a fallback — it is the primary channel
- **Data generates intelligence:** Every interaction creates data that feeds the AI engine
- **Open source, no vendor lock-in:** Every component is replaceable, forkable, auditable

---

## 2. GHANAIAN CONTEXT & LOCALIZATION

### 2.1 Ghana's 16 Regions

All data, dashboards, and reports must be organized by Ghana's 16 administrative regions:

```python
GHANA_REGIONS = {
    "greater_accra": {"name": "Greater Accra", "capital": "Accra", "code": "GA"},
    "ashanti": {"name": "Ashanti", "capital": "Kumasi", "code": "AS"},
    "northern": {"name": "Northern", "capital": "Tamale", "code": "NR"},
    "volta": {"name": "Volta", "capital": "Ho", "code": "VR"},
    "eastern": {"name": "Eastern", "capital": "Koforidua", "code": "ER"},
    "western": {"name": "Western", "capital": "Sekondi-Takoradi", "code": "WR"},
    "central": {"name": "Central", "capital": "Cape Coast", "code": "CR"},
    "upper_east": {"name": "Upper East", "capital": "Bolgatanga", "code": "UE"},
    "upper_west": {"name": "Upper West", "capital": "Wa", "code": "UW"},
    "bono": {"name": "Bono", "capital": "Sunyani", "code": "BO"},
    "bono_east": {"name": "Bono East", "capital": "Techiman", "code": "BE"},
    "ahafo": {"name": "Ahafo", "capital": "Goaso", "code": "AH"},
    "savannah": {"name": "Savannah", "capital": "Damongo", "code": "SV"},
    "north_east": {"name": "North East", "capital": "Nalerigu", "code": "NE"},
    "oti": {"name": "Oti", "capital": "Dambai", "code": "OT"},
    "western_north": {"name": "Western North", "capital": "Sefwi Wiawso", "code": "WN"},
}
```

### 2.2 Supported Languages

The platform MUST support these Ghanaian languages for USSD and WhatsApp interfaces:

```python
SUPPORTED_LANGUAGES = {
    "en": {"name": "English", "native": "English", "direction": "ltr"},
    "tw": {"name": "Twi (Akan)", "native": "Twi", "direction": "ltr"},
    "ga": {"name": "Ga", "native": "Gã", "direction": "ltr"},
    "ee": {"name": "Ewe", "native": "Eʋegbe", "direction": "ltr"},
    "dag": {"name": "Dagbani", "native": "Dagbanli", "direction": "ltr"},
    "ha": {"name": "Hausa", "native": "Hausa", "direction": "ltr"},
    "fat": {"name": "Fante", "native": "Mfantse", "direction": "ltr"},
    "nzi": {"name": "Nzema", "native": "Nzema", "direction": "ltr"},
}
```

### 2.3 Localized UI Strings (Examples)

```json
{
  "welcome": {
    "en": "Welcome to YouthPulse Ghana",
    "tw": "Akwaaba YouthPulse Ghana",
    "ga": "Ojekoo YouthPulse Ghana",
    "ee": "Woezɔ ɖe YouthPulse Ghana",
    "dag": "Anta ni YouthPulse Ghana",
    "ha": "Barka da zuwa YouthPulse Ghana"
  },
  "find_jobs": {
    "en": "Find jobs near me",
    "tw": "Hwehwɛ adwuma a ɛbɛn me",
    "ga": "Jɛ dɔŋ lɛ mi naa fɛɛ",
    "ee": "Dí dɔwɔƒe si le ɖokuiwò",
    "dag": "Bɔri tuma ka be ni m pam",
    "ha": "Nemo aiki kusa da ni"
  },
  "register_skills": {
    "en": "Register my skills",
    "tw": "Kyerɛ me nsɛm a menim",
    "ga": "Ŋmaa oshwɛ alɛ mi",
    "ee": "Ŋlɔ nye nunya siwo",
    "dag": "Sabi n baŋsim",
    "ha": "Yi rajista na ƙwarewa na"
  },
  "report_facility": {
    "en": "Report sports facility condition",
    "tw": "Ka agoru beaeɛ tebea ho asɛm",
    "ga": "Kɛ jeŋ lɛ hiewo lɛ",
    "ee": "Gblɔ balekpokpo ƒe nɔnɔme",
    "dag": "Yɛli waa saha shɛli yɛltɔɣa",
    "ha": "Bayar da yanayin wurin wasa"
  },
  "athlete_register": {
    "en": "Register as athlete",
    "tw": "Kyerɛ wo ho sɛ agorɔni",
    "ga": "Ŋmaa atsiɛwɔlɔ",
    "ee": "Ŋlɔ ŋuwò abe balekpola",
    "dag": "Sabi a ni ka waa nirba",
    "ha": "Yi rajista a matsayin ɗan wasa"
  }
}
```

### 2.4 Ghana-Specific Data Constants

```python
# Currency
CURRENCY = "GHS"  # Ghana Cedi
CURRENCY_SYMBOL = "GH₵"
CURRENCY_LOCALE = "en_GH"

# Phone number format
PHONE_PREFIX = "+233"
PHONE_REGEX = r"^\+233[0-9]{9}$"  # e.g., +233241234567

# Mobile Network Operators
MOBILE_OPERATORS = {
    "mtn": {"name": "MTN Ghana", "ussd_prefix": "*170#", "momo": True},
    "vodafone": {"name": "Vodafone Ghana", "ussd_prefix": "*110#", "momo": True},
    "airteltigo": {"name": "AirtelTigo", "ussd_prefix": "*500#", "momo": True},
}

# National identification
GHANA_CARD_REGEX = r"^GHA-\d{9}-\d$"  # Ghana Card format

# Ghana Post GPS (Digital Address System)
GHANA_GPS_REGEX = r"^[A-Z]{2}-\d{3,4}-\d{4}$"  # e.g., GA-021-5765

# Academic calendar
ACADEMIC_TERMS = {
    "term_1": {"start": "September", "end": "December"},
    "term_2": {"start": "January", "end": "April"},
    "term_3": {"start": "May", "end": "July"},
}

# National Sports Authority Districts (261 MMDAs)
TOTAL_DISTRICTS = 261

# Youth definition per Ghana National Youth Policy
YOUTH_AGE_RANGE = (15, 35)

# Minimum wage (2025)
DAILY_MINIMUM_WAGE_GHS = 18.15
```

### 2.5 Ghana Sports Disciplines

```python
GHANA_SPORTS = {
    "football": {"federation": "Ghana Football Association", "code": "GFA", "priority": "high"},
    "athletics": {"federation": "Ghana Athletics Association", "code": "GAA", "priority": "high"},
    "boxing": {"federation": "Ghana Boxing Authority", "code": "GBA", "priority": "high"},
    "basketball": {"federation": "Ghana Basketball Association", "code": "GBBA", "priority": "medium"},
    "volleyball": {"federation": "Ghana Volleyball Association", "code": "GVA", "priority": "medium"},
    "tennis": {"federation": "Ghana Tennis Federation", "code": "GTF", "priority": "medium"},
    "swimming": {"federation": "Ghana Swimming Association", "code": "GSA", "priority": "medium"},
    "hockey": {"federation": "Ghana Hockey Association", "code": "GHA", "priority": "medium"},
    "handball": {"federation": "Ghana Handball Association", "code": "GHBA", "priority": "medium"},
    "table_tennis": {"federation": "Ghana Table Tennis Association", "code": "GTTA", "priority": "medium"},
    "weightlifting": {"federation": "Ghana Weightlifting Federation", "code": "GWF", "priority": "medium"},
    "judo": {"federation": "Ghana Judo Association", "code": "GJA", "priority": "low"},
    "taekwondo": {"federation": "Ghana Taekwondo Federation", "code": "GTF", "priority": "low"},
    "cricket": {"federation": "Ghana Cricket Association", "code": "GCA", "priority": "low"},
    "rugby": {"federation": "Ghana Rugby Football Union", "code": "GRFU", "priority": "low"},
    "cycling": {"federation": "Ghana Cycling Federation", "code": "GCF", "priority": "low"},
    "armwrestling": {"federation": "Ghana Armwrestling Federation", "code": "GAF", "priority": "low"},
    "amputee_football": {"federation": "Ghana Amputee Football Association", "code": "GAFA", "priority": "parasport"},
    "wheelchair_basketball": {"federation": "Ghana Wheelchair Basketball", "code": "GWB", "priority": "parasport"},
    "deaf_sports": {"federation": "Ghana Deaf Sports Federation", "code": "GDSF", "priority": "parasport"},
    "blind_sports": {"federation": "Ghana Blind Sports Association", "code": "GBSA", "priority": "parasport"},
}
```

### 2.6 Ghana Employment Sectors (for Skills Matching)

```python
EMPLOYMENT_SECTORS = {
    "agriculture_agribusiness": {
        "name_en": "Agriculture & Agribusiness",
        "name_tw": "Kuafo adwuma ne Nnɔbae adwuma",
        "subsectors": ["crop_farming", "livestock", "fisheries", "agro_processing", "cocoa", "shea"]
    },
    "construction_trades": {
        "name_en": "Construction & Building Trades",
        "name_tw": "Ɛdan si ne Nkwadanfo adwuma",
        "subsectors": ["masonry", "carpentry", "plumbing", "electrical", "welding", "tiling", "painting"]
    },
    "ict_digital": {
        "name_en": "ICT & Digital Services",
        "name_tw": "ICT ne Digital Dwumadie",
        "subsectors": ["software_dev", "web_dev", "data_entry", "graphic_design", "digital_marketing", "bpo"]
    },
    "automotive_mechanical": {
        "name_en": "Automotive & Mechanical",
        "name_tw": "Akɛdɛ ne Mfiri adwuma",
        "subsectors": ["auto_mechanic", "auto_electrician", "spray_painting", "panel_beating", "ac_repair"]
    },
    "hospitality_tourism": {
        "name_en": "Hospitality & Tourism",
        "name_tw": "Ahɔhoasefo ne Akwantuo adwuma",
        "subsectors": ["hotel_management", "catering", "tour_guide", "event_management"]
    },
    "health_services": {
        "name_en": "Health Services",
        "name_tw": "Apɔmuden Dwumadie",
        "subsectors": ["community_health", "pharmacy_tech", "lab_tech", "nursing_aide"]
    },
    "beauty_fashion": {
        "name_en": "Beauty & Fashion",
        "name_tw": "Ahoɔfɛ ne Ntade adwuma",
        "subsectors": ["hairdressing", "tailoring", "fashion_design", "cosmetology"]
    },
    "renewable_energy": {
        "name_en": "Renewable Energy",
        "name_tw": "Ahoɔden Foforo Dwumadie",
        "subsectors": ["solar_installation", "solar_maintenance", "biogas", "energy_audit"]
    },
    "creative_arts": {
        "name_en": "Creative Arts & Media",
        "name_tw": "Adwene mu Adwuma ne Media",
        "subsectors": ["music_production", "video_production", "photography", "content_creation"]
    },
    "mining_extractives": {
        "name_en": "Mining & Extractives",
        "name_tw": "Sika Tutuutu ne Ade a wɔtutuu",
        "subsectors": ["small_scale_mining", "quarry", "mineral_processing"]
    },
}
```

### 2.7 TVET Institutions Reference Data

```python
TVET_INSTITUTIONS = [
    {"name": "Accra Technical University", "region": "greater_accra", "type": "technical_university"},
    {"name": "Kumasi Technical University", "region": "ashanti", "type": "technical_university"},
    {"name": "Tamale Technical University", "region": "northern", "type": "technical_university"},
    {"name": "Cape Coast Technical University", "region": "central", "type": "technical_university"},
    {"name": "Takoradi Technical University", "region": "western", "type": "technical_university"},
    {"name": "Koforidua Technical University", "region": "eastern", "type": "technical_university"},
    {"name": "Ho Technical University", "region": "volta", "type": "technical_university"},
    {"name": "Sunyani Technical University", "region": "bono", "type": "technical_university"},
    {"name": "Bolgatanga Technical University", "region": "upper_east", "type": "technical_university"},
    {"name": "Wa Technical University", "region": "upper_west", "type": "technical_university"},
    # NVTI Centres (National Vocational Training Institute)
    {"name": "NVTI Accra", "region": "greater_accra", "type": "nvti"},
    {"name": "NVTI Kumasi", "region": "ashanti", "type": "nvti"},
    {"name": "NVTI Tema", "region": "greater_accra", "type": "nvti"},
    # Opportunity Industrialization Centers
    {"name": "OIC Accra", "region": "greater_accra", "type": "oic"},
    {"name": "OIC Kumasi", "region": "ashanti", "type": "oic"},
]
```

---

## 3. SYSTEM ARCHITECTURE

### 3.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      ACCESS LAYERS (Users)                       │
├──────────┬──────────┬──────────────────┬────────────────────────┤
│  USSD    │ WhatsApp │  Web Dashboard   │  Coach Mobile App      │
│ *714*44# │   Bot    │  React + Superset│  Flutter (Android/iOS) │
│ Feature  │ Rasa AI  │  Ministry Staff  │  Coaches & PE Teachers │
│ phones   │ Smartphone│  Decision-makers │  Field Officers        │
└────┬─────┴────┬─────┴────────┬─────────┴──────────┬─────────────┘
     │          │              │                     │
     ▼          ▼              ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY (Kong)                        │
│              Rate Limiting · Auth · Load Balancing                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                    BACKEND SERVICES (FastAPI)                     │
├──────────────────────────┼──────────────────────────────────────┤
│  ┌──────────────┐ ┌──────┴───────┐ ┌────────────────────┐       │
│  │ Youth        │ │ Sports       │ │ Talent             │       │
│  │ Employment   │ │ Infrastructure│ │ Discovery          │       │
│  │ Service      │ │ Service      │ │ Service            │       │
│  └──────┬───────┘ └──────┬───────┘ └────────┬───────────┘       │
│         │                │                   │                   │
│  ┌──────┴────────────────┴───────────────────┴───────────┐       │
│  │              SHARED SERVICES                           │       │
│  │  Auth · Notifications · File Storage · Localization    │       │
│  └───────────────────────┬───────────────────────────────┘       │
└──────────────────────────┼──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                    AI/ML ENGINE                                   │
├──────────────────────────┼──────────────────────────────────────┤
│  ┌────────────────┐ ┌────┴──────────┐ ┌──────────────────┐       │
│  │ NLP / Skills   │ │ Computer      │ │ Talent           │       │
│  │ Matching       │ │ Vision        │ │ Analytics        │       │
│  │ (Hugging Face) │ │ (YOLOv8)     │ │ (scikit-learn)   │       │
│  └────────────────┘ └───────────────┘ └──────────────────┘       │
│  ┌────────────────┐ ┌───────────────┐ ┌──────────────────┐       │
│  │ Conversational │ │ Predictive    │ │ Optimization     │       │
│  │ AI (Rasa/LLM)  │ │ Maintenance   │ │ (OR-Tools)      │       │
│  └────────────────┘ └───────────────┘ └──────────────────┘       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                    DATA LAYER                                    │
├──────────┬───────────┬───┴────────┬──────────┬──────────────────┤
│PostgreSQL│TimescaleDB│   Redis    │ MinIO    │ Apache Kafka     │
│+ PostGIS │(time-series│  (cache)  │(file/img)│ (event stream)   │
│(primary) │ perf data) │           │          │                  │
└──────────┴───────────┴────────────┴──────────┴──────────────────┘
```

### 3.2 Service Communication

- **Synchronous:** REST APIs via FastAPI (JSON)
- **Asynchronous:** Apache Kafka for event streaming (job matches, talent alerts, facility alerts)
- **Real-time:** WebSockets for dashboard live updates
- **Offline sync:** Conflict-free Replicated Data Types (CRDTs) for mobile app offline data

---

## 4. TECHNOLOGY STACK

### 4.1 Complete Stack (All Open Source)

| Layer | Technology | License | Purpose |
|-------|-----------|---------|---------|
| **API Framework** | FastAPI (Python 3.12+) | MIT | REST APIs, WebSocket |
| **API Gateway** | Kong (OSS) | Apache 2.0 | Rate limiting, routing, auth |
| **Primary Database** | PostgreSQL 16 + PostGIS | PostgreSQL License | Relational data, geospatial |
| **Time-Series DB** | TimescaleDB | Apache 2.0 | Athlete performance over time |
| **Cache** | Redis 7 | BSD-3 | Session cache, real-time data |
| **Message Queue** | Apache Kafka | Apache 2.0 | Event streaming between services |
| **Task Queue** | Celery + Redis | BSD-3 | Async jobs (scraping, ML inference) |
| **Object Storage** | MinIO | AGPL-3.0 | Images, documents, model artifacts |
| **Search Engine** | Meilisearch | MIT | Full-text search (jobs, skills) |
| **Web Dashboard** | React 18 + Vite | MIT | Ministry dashboard frontend |
| **Charting** | Apache ECharts | Apache 2.0 | Interactive data visualizations |
| **Map Visualization** | Leaflet + OpenStreetMap | BSD-2 | Regional maps, facility locations |
| **CSS Framework** | Tailwind CSS | MIT | Utility-first styling |
| **Mobile App** | Flutter 3 (Dart) | BSD-3 | Coach/field officer app |
| **USSD Framework** | Africa's Talking SDK | MIT | USSD gateway integration |
| **WhatsApp Integration** | Baileys (WA Web API) | MIT | WhatsApp bot connection |
| **Conversational AI** | Rasa Open Source 3.x | Apache 2.0 | NLU + Dialogue management |
| **LLM (Local)** | Ollama + Llama 3.1 8B | Llama 3.1 Community | Natural language queries, reports |
| **LLM Framework** | LangChain | MIT | RAG, chains, prompt management |
| **NLP Models** | Hugging Face Transformers | Apache 2.0 | Skills extraction, classification |
| **ML Framework** | scikit-learn, XGBoost | BSD-3 | Classical ML models |
| **Deep Learning** | PyTorch | BSD-3 | Custom model training |
| **Computer Vision** | YOLOv8 (Ultralytics) | AGPL-3.0 | Facility condition assessment |
| **Data Annotation** | Label Studio | Apache 2.0 | Training data labeling |
| **Optimization** | Google OR-Tools | Apache 2.0 | Fund allocation optimization |
| **Forecasting** | Prophet | MIT | Time-series forecasting |
| **Data Pipelines** | Apache Airflow | Apache 2.0 | ETL orchestration |
| **Web Scraping** | Scrapy | BSD-3 | Job board scraping |
| **BI / Analytics** | Apache Superset | Apache 2.0 | Advanced analytics dashboards |
| **ML Ops** | MLflow | Apache 2.0 | Model versioning, deployment |
| **Auth** | Keycloak | Apache 2.0 | IAM, SSO, RBAC |
| **Containerization** | Docker + Docker Compose | Apache 2.0 | Service packaging |
| **Orchestration** | Kubernetes (K3s) | Apache 2.0 | Production orchestration |
| **CI/CD** | Gitea + Drone CI | MIT / Apache 2.0 | Version control + pipelines |
| **Monitoring** | Prometheus + Grafana | Apache 2.0 | Metrics + dashboards |
| **Logging** | Loki + Promtail | AGPL-3.0 | Centralized logging |
| **Error Tracking** | Sentry (self-hosted) | BSL-1.1 → Apache 2.0 | Error monitoring |
| **Secrets** | HashiCorp Vault (OSS) | BSL-1.1 | Secrets management |
| **Reverse Proxy** | Nginx | BSD-2 | TLS termination, static files |
| **SSL** | Let's Encrypt (Certbot) | Apache 2.0 | Free TLS certificates |
| **ERP (Payments)** | ERPNext | GPL-3.0 | Athlete allowance tracking |
| **PDF Reports** | WeasyPrint | BSD-3 | Generate PDF reports |
| **Data Collection** | ODK (Open Data Kit) | Apache 2.0 | Offline mobile data collection |

### 4.2 Development Tools

```bash
# Python environment
python >= 3.12
poetry  # dependency management

# Node.js environment
node >= 20 LTS
pnpm  # package manager

# Flutter
flutter >= 3.19
dart >= 3.3

# Database tools
pgcli  # PostgreSQL CLI
redis-cli
```

---

## 5. DATABASE SCHEMA

### 5.1 Core Schema (PostgreSQL)

```sql
-- ============================================================
-- YOUTHPULSE GHANA - DATABASE SCHEMA
-- PostgreSQL 16 with PostGIS extension
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Fuzzy text search

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE region_code AS ENUM (
    'GA', 'AS', 'NR', 'VR', 'ER', 'WR', 'CR', 'UE', 'UW',
    'BO', 'BE', 'AH', 'SV', 'NE', 'OT', 'WN'
);
CREATE TYPE language_code AS ENUM ('en', 'tw', 'ga', 'ee', 'dag', 'ha', 'fat', 'nzi');
CREATE TYPE employment_status AS ENUM (
    'unemployed', 'underemployed', 'employed_informal', 'employed_formal',
    'self_employed', 'apprentice', 'student', 'neet'
);
CREATE TYPE education_level AS ENUM (
    'none', 'basic', 'jhs', 'shs', 'tvet_certificate', 'tvet_diploma',
    'hnd', 'bachelors', 'masters', 'doctorate'
);
CREATE TYPE facility_status AS ENUM ('good', 'fair', 'needs_repair', 'critical', 'condemned');
CREATE TYPE facility_type AS ENUM (
    'stadium', 'mini_stadium', 'training_ground', 'swimming_pool',
    'gymnasium', 'tennis_court', 'basketball_court', 'boxing_arena',
    'athletics_track', 'community_field', 'youth_resource_centre'
);
CREATE TYPE talent_tier AS ENUM ('community', 'district', 'regional', 'national', 'international');
CREATE TYPE sport_code AS ENUM (
    'football', 'athletics', 'boxing', 'basketball', 'volleyball',
    'tennis', 'swimming', 'hockey', 'handball', 'table_tennis',
    'weightlifting', 'judo', 'taekwondo', 'cricket', 'rugby',
    'cycling', 'armwrestling', 'amputee_football', 'wheelchair_basketball',
    'deaf_sports', 'blind_sports'
);

-- ============================================================
-- CORE TABLES
-- ============================================================

-- USERS (all platform users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) UNIQUE NOT NULL,  -- +233XXXXXXXXX
    ghana_card_id VARCHAR(15) UNIQUE,   -- GHA-XXXXXXXXX-X
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender gender_type,
    region region_code NOT NULL,
    district VARCHAR(100),
    community VARCHAR(255),
    gps_address VARCHAR(20),            -- Ghana Post GPS: GA-021-5765
    preferred_language language_code DEFAULT 'en',
    location GEOGRAPHY(POINT, 4326),    -- PostGIS point
    user_type VARCHAR(20) NOT NULL DEFAULT 'youth',  -- youth, coach, official, admin
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_region ON users(region);
CREATE INDEX idx_users_district ON users(district);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_location ON users USING GIST(location);

-- ============================================================
-- MODULE 1: YOUTH EMPLOYMENT & SKILLS
-- ============================================================

-- YOUTH PROFILES (extended profile for job seekers)
CREATE TABLE youth_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    education_level education_level,
    school_name VARCHAR(255),
    graduation_year INTEGER,
    employment_status employment_status DEFAULT 'unemployed',
    years_experience INTEGER DEFAULT 0,
    willing_to_relocate BOOLEAN DEFAULT FALSE,
    preferred_sectors TEXT[],           -- Array of sector codes
    monthly_income_ghs DECIMAL(10,2),  -- Current income if employed
    has_disability BOOLEAN DEFAULT FALSE,
    disability_type VARCHAR(100),
    bio TEXT,
    cv_file_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- SKILLS (master list)
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) NOT NULL,
    name_tw VARCHAR(100),
    name_ga VARCHAR(100),
    name_ee VARCHAR(100),
    name_dag VARCHAR(100),
    name_ha VARCHAR(100),
    sector VARCHAR(50) NOT NULL,
    subsector VARCHAR(50),
    is_digital BOOLEAN DEFAULT FALSE,
    is_trade BOOLEAN DEFAULT FALSE,
    demand_score FLOAT DEFAULT 0.0,     -- 0-1, updated by AI
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skills_sector ON skills(sector);

-- YOUTH SKILLS (junction table)
CREATE TABLE youth_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    youth_profile_id UUID NOT NULL REFERENCES youth_profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id),
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    is_certified BOOLEAN DEFAULT FALSE,
    certification_body VARCHAR(100),     -- e.g., "NVTI", "City & Guilds"
    years_practice INTEGER DEFAULT 0,
    UNIQUE(youth_profile_id, skill_id)
);

-- JOBS (scraped + manually posted)
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    employer_name VARCHAR(255) NOT NULL,
    employer_phone VARCHAR(15),
    description TEXT,
    sector VARCHAR(50) NOT NULL,
    region region_code NOT NULL,
    district VARCHAR(100),
    location GEOGRAPHY(POINT, 4326),
    salary_min_ghs DECIMAL(10,2),
    salary_max_ghs DECIMAL(10,2),
    job_type VARCHAR(30) NOT NULL,      -- full_time, part_time, apprenticeship, contract, internship
    required_skills UUID[],             -- Array of skill IDs
    required_education education_level,
    is_active BOOLEAN DEFAULT TRUE,
    source VARCHAR(50) DEFAULT 'manual', -- manual, scraped, partner
    source_url VARCHAR(500),
    posted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jobs_region ON jobs(region);
CREATE INDEX idx_jobs_sector ON jobs(sector);
CREATE INDEX idx_jobs_active ON jobs(is_active);
CREATE INDEX idx_jobs_location ON jobs USING GIST(location);

-- JOB MATCHES (AI-generated)
CREATE TABLE job_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    youth_profile_id UUID NOT NULL REFERENCES youth_profiles(id),
    job_id UUID NOT NULL REFERENCES jobs(id),
    match_score FLOAT NOT NULL,         -- 0-1 confidence
    match_reasons JSONB,                -- {"skills_match": 0.8, "location": 0.9, "education": 0.7}
    status VARCHAR(20) DEFAULT 'pending', -- pending, viewed, applied, rejected, hired
    notified BOOLEAN DEFAULT FALSE,
    notified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(youth_profile_id, job_id)
);

-- TRAINING PROGRAMMES
CREATE TABLE training_programmes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    description TEXT,
    sector VARCHAR(50),
    skills_taught UUID[],
    region region_code,
    district VARCHAR(100),
    location GEOGRAPHY(POINT, 4326),
    duration_weeks INTEGER,
    cost_ghs DECIMAL(10,2) DEFAULT 0,   -- 0 = free
    certification VARCHAR(100),          -- "NVTI Level 1", "CBT Certificate"
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    source VARCHAR(50) DEFAULT 'manual',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROGRAMME ENROLLMENTS (tracks whether training leads to employment)
CREATE TABLE programme_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    youth_profile_id UUID NOT NULL REFERENCES youth_profiles(id),
    programme_id UUID NOT NULL REFERENCES training_programmes(id),
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    dropped_out_at TIMESTAMPTZ,
    dropout_reason VARCHAR(255),
    employed_after BOOLEAN,
    employed_within_months INTEGER,      -- months to employment after completion
    employer_name VARCHAR(255),
    monthly_income_after_ghs DECIMAL(10,2),
    UNIQUE(youth_profile_id, programme_id)
);

-- SKILLS DEMAND (AI-analyzed labour market intelligence)
CREATE TABLE skills_demand (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID NOT NULL REFERENCES skills(id),
    region region_code NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    demand_count INTEGER DEFAULT 0,      -- number of job postings requiring this skill
    supply_count INTEGER DEFAULT 0,      -- number of youth with this skill
    gap_score FLOAT,                     -- demand/supply ratio
    trend VARCHAR(20),                   -- rising, stable, declining
    avg_salary_ghs DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(skill_id, region, period_start)
);

-- ============================================================
-- MODULE 2: SPORTS INFRASTRUCTURE
-- ============================================================

-- SPORTS FACILITIES
CREATE TABLE sports_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    facility_type facility_type NOT NULL,
    region region_code NOT NULL,
    district VARCHAR(100),
    community VARCHAR(255),
    gps_address VARCHAR(20),
    location GEOGRAPHY(POINT, 4326),
    capacity INTEGER,
    year_built INTEGER,
    last_renovation_year INTEGER,
    owning_authority VARCHAR(100),       -- "National Sports Authority", "District Assembly", "Private"
    managing_body VARCHAR(100),
    current_status facility_status DEFAULT 'fair',
    sports_supported sport_code[],
    has_floodlights BOOLEAN DEFAULT FALSE,
    has_changing_rooms BOOLEAN DEFAULT FALSE,
    has_spectator_seating BOOLEAN DEFAULT FALSE,
    has_running_water BOOLEAN DEFAULT FALSE,
    overall_condition_score FLOAT,       -- 0-1, AI-assessed
    caf_compliant BOOLEAN DEFAULT FALSE,
    fifa_compliant BOOLEAN DEFAULT FALSE,
    photo_urls TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_facilities_region ON sports_facilities(region);
CREATE INDEX idx_facilities_status ON sports_facilities(current_status);
CREATE INDEX idx_facilities_type ON sports_facilities(facility_type);
CREATE INDEX idx_facilities_location ON sports_facilities USING GIST(location);

-- FACILITY CONDITION REPORTS (submitted by field officers + AI assessed)
CREATE TABLE facility_condition_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID NOT NULL REFERENCES sports_facilities(id),
    reported_by UUID NOT NULL REFERENCES users(id),
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,
    overall_status facility_status NOT NULL,
    pitch_condition INTEGER CHECK (pitch_condition BETWEEN 1 AND 10),
    structural_condition INTEGER CHECK (structural_condition BETWEEN 1 AND 10),
    amenities_condition INTEGER CHECK (amenities_condition BETWEEN 1 AND 10),
    safety_rating INTEGER CHECK (safety_rating BETWEEN 1 AND 10),
    photo_urls TEXT[],
    ai_condition_score FLOAT,           -- AI computer vision assessment
    ai_issues_detected JSONB,           -- [{"issue": "waterlogged_pitch", "severity": 0.8}]
    notes TEXT,
    maintenance_recommended BOOLEAN DEFAULT FALSE,
    estimated_repair_cost_ghs DECIMAL(12,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MAINTENANCE RECORDS
CREATE TABLE maintenance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID NOT NULL REFERENCES sports_facilities(id),
    description TEXT NOT NULL,
    maintenance_type VARCHAR(50),        -- preventive, corrective, emergency
    cost_ghs DECIMAL(12,2),
    funded_by VARCHAR(100),             -- "Ghana Sports Fund", "District Assembly", "Private"
    started_at DATE,
    completed_at DATE,
    contractor VARCHAR(255),
    status VARCHAR(20) DEFAULT 'planned', -- planned, in_progress, completed, cancelled
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PREDICTED MAINTENANCE (AI-generated)
CREATE TABLE predicted_maintenance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID NOT NULL REFERENCES sports_facilities(id),
    predicted_issue VARCHAR(255),
    predicted_date DATE,
    confidence FLOAT,
    estimated_cost_ghs DECIMAL(12,2),
    priority VARCHAR(10),               -- high, medium, low
    model_version VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GHANA SPORTS FUND ALLOCATIONS
CREATE TABLE fund_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fiscal_year INTEGER NOT NULL,
    allocation_type VARCHAR(50),         -- infrastructure, athlete_welfare, training, competition
    recipient_type VARCHAR(50),          -- facility, federation, athlete, programme
    recipient_id UUID,                   -- polymorphic reference
    recipient_name VARCHAR(255),
    amount_ghs DECIMAL(14,2) NOT NULL,
    disbursed_amount_ghs DECIMAL(14,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'approved', -- proposed, approved, disbursed, completed
    purpose TEXT,
    region region_code,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    disbursed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ATHLETE ALLOWANCES & PAYMENTS
CREATE TABLE athlete_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    athlete_id UUID NOT NULL REFERENCES users(id),
    payment_type VARCHAR(50),            -- training_allowance, competition_bonus, travel, medical
    competition_name VARCHAR(255),
    amount_ghs DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, processing, paid, failed
    payment_method VARCHAR(30),          -- momo_mtn, momo_vodafone, momo_airteltigo, bank_transfer
    payment_reference VARCHAR(100),
    approved_by UUID REFERENCES users(id),
    paid_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MODULE 3: TALENT DISCOVERY
-- ============================================================

-- ATHLETE PROFILES
CREATE TABLE athlete_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    primary_sport sport_code NOT NULL,
    secondary_sports sport_code[],
    talent_tier talent_tier DEFAULT 'community',
    height_cm FLOAT,
    weight_kg FLOAT,
    dominant_hand VARCHAR(10),           -- left, right, ambidextrous
    school_name VARCHAR(255),
    coach_id UUID REFERENCES users(id),
    federation_registered BOOLEAN DEFAULT FALSE,
    federation_id VARCHAR(50),
    national_team_eligible BOOLEAN DEFAULT FALSE,
    injury_history JSONB,
    personal_best JSONB,                -- {"100m": "12.1s", "high_jump": "1.52m"}
    ai_sport_recommendations JSONB,     -- [{"sport": "athletics", "event": "high_jump", "fit_score": 0.92}]
    ai_potential_score FLOAT,           -- 0-1 overall potential
    dropout_risk_score FLOAT,           -- 0-1 dropout probability
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

CREATE INDEX idx_athletes_sport ON athlete_profiles(primary_sport);
CREATE INDEX idx_athletes_tier ON athlete_profiles(talent_tier);
CREATE INDEX idx_athletes_potential ON athlete_profiles(ai_potential_score DESC);

-- PERFORMANCE RECORDS (time-series in TimescaleDB)
CREATE TABLE performance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    athlete_id UUID NOT NULL REFERENCES athlete_profiles(id),
    recorded_by UUID NOT NULL REFERENCES users(id),  -- coach who recorded
    sport sport_code NOT NULL,
    event_name VARCHAR(100),            -- "100m sprint", "high jump", "shot put"
    event_category VARCHAR(50),         -- "speed", "power", "endurance", "skill", "agility"
    value FLOAT NOT NULL,               -- The measurement value
    unit VARCHAR(20) NOT NULL,          -- "seconds", "meters", "kg", "points"
    is_personal_best BOOLEAN DEFAULT FALSE,
    competition_name VARCHAR(255),
    competition_level VARCHAR(50),      -- school, district, regional, national, international
    location VARCHAR(255),
    weather_conditions VARCHAR(100),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    synced_at TIMESTAMPTZ,              -- When offline data was synced
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Convert to TimescaleDB hypertable for efficient time-series queries
SELECT create_hypertable('performance_records', 'recorded_at');

CREATE INDEX idx_performance_athlete ON performance_records(athlete_id, recorded_at DESC);
CREATE INDEX idx_performance_sport ON performance_records(sport, event_name);

-- NATIONAL BENCHMARKS (what "good" looks like for each age/gender/sport)
CREATE TABLE national_benchmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sport sport_code NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    gender gender_type NOT NULL,
    age_min INTEGER NOT NULL,
    age_max INTEGER NOT NULL,
    percentile_50 FLOAT,                -- Median performance
    percentile_75 FLOAT,                -- Good
    percentile_90 FLOAT,                -- Excellent
    percentile_95 FLOAT,                -- Elite / National potential
    percentile_99 FLOAT,                -- International potential
    unit VARCHAR(20) NOT NULL,
    source VARCHAR(100),                -- "IAAF Standards", "Ghana Athletics", "World Athletics"
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TALENT ALERTS (AI-generated when exceptional performance detected)
CREATE TABLE talent_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    athlete_id UUID NOT NULL REFERENCES athlete_profiles(id),
    performance_record_id UUID REFERENCES performance_records(id),
    alert_type VARCHAR(50),             -- "exceptional_performance", "rapid_improvement", "multi_sport_potential"
    sport sport_code NOT NULL,
    event_name VARCHAR(100),
    percentile_rank FLOAT,              -- Where they rank nationally
    recommended_action TEXT,
    recommended_pathway VARCHAR(100),   -- "Regional Athletics Camp", "National U-17 Trials"
    status VARCHAR(20) DEFAULT 'new',   -- new, reviewed, action_taken, dismissed
    reviewed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SPORTS PARTICIPATION (aggregate tracking by district)
CREATE TABLE sports_participation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region region_code NOT NULL,
    district VARCHAR(100) NOT NULL,
    sport sport_code NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_participants INTEGER DEFAULT 0,
    male_participants INTEGER DEFAULT 0,
    female_participants INTEGER DEFAULT 0,
    age_15_19 INTEGER DEFAULT 0,
    age_20_24 INTEGER DEFAULT 0,
    age_25_29 INTEGER DEFAULT 0,
    age_30_35 INTEGER DEFAULT 0,
    organized_events INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(region, district, sport, period_start)
);

-- ============================================================
-- SYSTEM TABLES
-- ============================================================

-- USSD SESSIONS
CREATE TABLE ussd_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    user_id UUID REFERENCES users(id),
    current_state VARCHAR(100),
    state_data JSONB,
    language language_code DEFAULT 'en',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- WHATSAPP CONVERSATIONS
CREATE TABLE whatsapp_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) NOT NULL,
    user_id UUID REFERENCES users(id),
    context JSONB,                       -- Rasa conversation context
    language language_code DEFAULT 'en',
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    channel VARCHAR(20) NOT NULL,        -- ussd, whatsapp, sms, email, push
    message_en TEXT NOT NULL,
    message_local TEXT,                  -- In user's preferred language
    notification_type VARCHAR(50),       -- job_match, talent_alert, facility_alert, payment_update
    reference_type VARCHAR(50),          -- job_match, talent_alert, etc.
    reference_id UUID,
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMPTZ,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT LOG
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    changes JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI MODEL REGISTRY
CREATE TABLE ai_model_registry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    model_type VARCHAR(50),             -- classification, regression, nlp, cv, optimization
    purpose VARCHAR(255),
    metrics JSONB,                      -- {"accuracy": 0.87, "f1": 0.83}
    artifact_path VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    deployed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(model_name, model_version)
);
```

---

## 6. MODULE 1: YOUTH EMPLOYMENT & SKILLS INTELLIGENCE

### 6.1 Features

| Feature | Description | AI Component |
|---------|-------------|-------------|
| **Skills Registration** | Youth register skills via USSD/WhatsApp/Web | NLP skill extraction from free text |
| **Job Scraping** | Automated scraping of Ghana job boards | NLP job classification & skill extraction |
| **Smart Matching** | Match youth to jobs/training by skills, location, preferences | Recommendation engine (collaborative + content-based) |
| **Skills Heat Map** | Regional visualization of supply vs demand | Clustering + gap analysis |
| **Programme Tracking** | Track whether training leads to employment | Survival analysis + ROI computation |
| **Labour Market Intelligence** | Trend analysis of which skills are rising/declining | Time-series forecasting |

### 6.2 Job Scraping Pipeline

```python
# File: services/employment/scraper/pipelines.py

GHANA_JOB_SOURCES = [
    {
        "name": "Jobberman Ghana",
        "url": "https://www.jobberman.com.gh",
        "type": "web_scrape",
        "frequency": "daily"
    },
    {
        "name": "JobWeb Ghana",
        "url": "https://www.jobwebghana.com",
        "type": "web_scrape",
        "frequency": "daily"
    },
    {
        "name": "Ghana Job Portal",
        "url": "https://www.ghanajob.com",
        "type": "web_scrape",
        "frequency": "daily"
    },
    {
        "name": "BrighterMonday Ghana",
        "url": "https://www.brightermonday.com/gh",
        "type": "web_scrape",
        "frequency": "daily"
    },
    {
        "name": "Youth Employment Agency",
        "url": "https://www.yea.gov.gh",
        "type": "web_scrape",
        "frequency": "weekly"
    },
    {
        "name": "NEIP (National Entrepreneurship)",
        "url": "https://neip.gov.gh",
        "type": "api",
        "frequency": "weekly"
    },
]

# Scraping pipeline stages:
# 1. Crawl → 2. Parse → 3. Deduplicate → 4. NLP Skill Extraction → 5. Classify → 6. Store → 7. Match
```

### 6.3 Skills Matching Algorithm

```python
# File: services/employment/matching/engine.py

"""
YouthPulse Skills Matching Engine

Uses hybrid approach:
1. Content-based: Match youth skills → job required skills (cosine similarity on skill embeddings)
2. Location-based: Distance penalty (prefer closer jobs, weighted by region infrastructure)
3. Education-based: Required education level match
4. Collaborative: "Youth with similar profiles were successful in these roles"
5. Trend-based: Boost matches for skills with rising demand

Final score = weighted combination of all signals
"""

MATCHING_WEIGHTS = {
    "skills_similarity": 0.35,
    "location_proximity": 0.20,
    "education_match": 0.15,
    "collaborative_signal": 0.15,
    "demand_trend": 0.10,
    "salary_match": 0.05,
}

# Location proximity tiers (Ghana-specific)
PROXIMITY_TIERS = {
    "same_community": {"km": 5, "score": 1.0},
    "same_district": {"km": 20, "score": 0.85},
    "same_region": {"km": 100, "score": 0.6},
    "adjacent_region": {"km": 200, "score": 0.3},
    "distant": {"km": 500, "score": 0.1},
}
```

### 6.4 Programme Effectiveness Model

```python
# File: services/employment/analytics/programme_effectiveness.py

"""
Tracks whether government youth employment programmes actually lead to jobs.

Key metrics per programme:
- Completion rate (% who finish)
- Employment rate at 3/6/12 months post-completion
- Average income improvement (GHS)
- Cost per successful employment outcome
- Regional variation in effectiveness
- Comparison vs. control group (similar youth who didn't participate)

Uses survival analysis (Kaplan-Meier) to model time-to-employment
Uses propensity score matching to estimate causal effect
"""

TRACKED_PROGRAMMES = [
    "Adwumawura Project",
    "1 Million Coders Initiative",
    "Youth in Agriculture",
    "Nation Builders Corps (NABCO)",
    "Youth Employment Agency (YEA)",
    "NVTI Skills Training",
    "Mastercard Foundation Partnerships",
]
```

---

## 7. MODULE 2: SPORTS INFRASTRUCTURE & FUNDING OPTIMIZATION

### 7.1 Features

| Feature | Description | AI Component |
|---------|-------------|-------------|
| **Facility Registry** | Database of all sports facilities in Ghana | Geospatial mapping |
| **Condition Assessment** | Photo-based AI assessment of facility conditions | YOLOv8 computer vision |
| **Predictive Maintenance** | Predict when facilities will degrade | Prophet time-series + XGBoost |
| **Fund Allocation Optimizer** | Optimal distribution of Ghana Sports Fund | Google OR-Tools linear programming |
| **Athlete Payment Tracker** | Track allowances from approval to disbursement | Workflow automation |
| **Facility Alert System** | Automatic alerts when conditions deteriorate | Anomaly detection |

### 7.2 Computer Vision: Facility Condition Model

```python
# File: services/infrastructure/cv/facility_assessment.py

"""
YOLOv8-based facility condition assessment.

Trained to detect:
- Waterlogged/flooded pitch areas
- Cracked/broken concrete structures
- Missing/damaged goal posts
- Overgrown grass/weeds on playing surfaces
- Damaged seating/bleachers
- Missing/broken floodlights
- Damaged running track surfaces
- Rusty/corroded metal structures
- Standing water / drainage issues
- Broken fencing / perimeter walls

Training data: Label Studio annotations of Ghana facility photos
Initial dataset: 5,000 annotated images from NSA facility audits + crowdsourced

Condition score formula:
  score = 1.0 - (Σ(issue_severity × issue_weight) / max_possible_score)
  
  Where:
    issue_severity = model confidence × area_affected_ratio
    issue_weight = category importance (structural > cosmetic)
"""

FACILITY_ISSUE_WEIGHTS = {
    "structural_damage": 1.0,       # Highest priority
    "waterlogged_surface": 0.9,
    "damaged_goal_posts": 0.7,
    "broken_floodlights": 0.7,
    "damaged_track_surface": 0.8,
    "overgrown_vegetation": 0.4,
    "damaged_seating": 0.5,
    "broken_fencing": 0.6,
    "rusty_structures": 0.5,
    "drainage_issues": 0.8,
}
```

### 7.3 Fund Allocation Optimization

```python
# File: services/infrastructure/optimizer/fund_allocation.py

"""
Ghana Sports Fund Allocation Optimizer

Uses Google OR-Tools to solve constrained optimization:

OBJECTIVE: Maximize national sports development impact

CONSTRAINTS:
1. Total allocation ≤ available fund balance
2. Each region gets minimum 5% of total (equity constraint)
3. Parasport allocation ≥ 10% of total (inclusion mandate)
4. No single federation receives > 25% (anti-football-dominance)
5. Emergency facility repairs take priority (safety constraint)
6. Infrastructure investment ≥ 40% of total
7. Athlete welfare ≥ 20% of total

IMPACT SCORING:
- Facility repair: weighted by severity × users_affected × region_deprivation_index
- Athlete training: weighted by medal_potential × development_stage
- Grassroots: weighted by participation_growth × youth_population
- Competition: weighted by international_visibility × qualification_probability
"""
```

---

## 8. MODULE 3: GRASSROOTS TALENT DISCOVERY

### 8.1 Features

| Feature | Description | AI Component |
|---------|-------------|-------------|
| **Performance Recording** | Coaches enter sprint times, jump distances etc. | Mobile app (offline-capable) |
| **Talent Identification** | Flag exceptional performers vs national benchmarks | Statistical ranking + ML |
| **Sport-Fit Matching** | Recommend best sport for athlete's physical profile | Multi-class classification (XGBoost) |
| **Dropout Prediction** | Predict which athletes will drop out of development | Logistic regression + survival analysis |
| **Participation Dashboards** | Track who's playing what sport where | Aggregation + visualization |
| **Development Pathway** | Track athlete journey from community to national | State machine + milestone tracking |

### 8.2 Sport-Fit Matching Model

```python
# File: services/talent/models/sport_fit.py

"""
Given an athlete's physical measurements and performance data,
predict which sport(s) they're most likely to excel in.

Features:
- Age, gender
- Height (cm), weight (kg), BMI
- Arm span (cm), leg length (cm)
- Sprint times (30m, 60m, 100m)
- Vertical jump (cm)
- Standing long jump (cm)
- Shuttle run (seconds)
- Endurance (beep test level)
- Grip strength (kg)
- Flexibility (sit-and-reach cm)
- Reaction time (ms)
- Throwing distance (various implements)

Target: Multi-label classification across all sports
Output: Ranked list of sports with fit scores

Model: XGBoost multi-output classifier
Training data: International sports science literature + Ghana athlete profiles
"""

PHYSICAL_PROFILES = {
    "athletics_sprints": {
        "key_features": ["speed", "power", "reaction_time"],
        "ideal_height_range": (165, 195),
        "ideal_bmi_range": (20, 24),
    },
    "athletics_jumps": {
        "key_features": ["power", "height", "speed"],
        "ideal_height_range": (175, 200),
        "ideal_bmi_range": (19, 23),
    },
    "athletics_throws": {
        "key_features": ["power", "strength", "size"],
        "ideal_height_range": (175, 200),
        "ideal_bmi_range": (25, 35),
    },
    "athletics_endurance": {
        "key_features": ["endurance", "efficiency", "leanness"],
        "ideal_height_range": (160, 180),
        "ideal_bmi_range": (17, 22),
    },
    "boxing": {
        "key_features": ["power", "speed", "reaction_time", "endurance"],
        "ideal_height_range": (160, 195),
        "ideal_bmi_range": (20, 26),
    },
    "swimming": {
        "key_features": ["arm_span", "height", "endurance", "flexibility"],
        "ideal_height_range": (170, 200),
        "ideal_bmi_range": (20, 25),
    },
    "basketball": {
        "key_features": ["height", "vertical_jump", "speed", "agility"],
        "ideal_height_range": (180, 210),
        "ideal_bmi_range": (21, 26),
    },
    "weightlifting": {
        "key_features": ["strength", "power", "leverage"],
        "ideal_height_range": (155, 180),
        "ideal_bmi_range": (24, 35),
    },
    "football": {
        "key_features": ["speed", "endurance", "agility", "skill"],
        "ideal_height_range": (165, 195),
        "ideal_bmi_range": (20, 25),
    },
}
```

### 8.3 Talent Alert Thresholds

```python
# File: services/talent/alerts/thresholds.py

"""
When a coach records a performance, the system checks against national
benchmarks. If the performance exceeds the 90th percentile for their
age/gender group, a talent alert is generated.

Alert levels:
- NOTABLE (top 25%): Logged, no alert
- PROMISING (top 10%): Alert to district sports officer
- EXCEPTIONAL (top 5%): Alert to regional sports director
- ELITE (top 1%): Alert to national federation + ministry dashboard
"""

ALERT_LEVELS = {
    "notable": {"percentile": 75, "notify": []},
    "promising": {"percentile": 90, "notify": ["district_sports_officer"]},
    "exceptional": {"percentile": 95, "notify": ["regional_sports_director", "district_sports_officer"]},
    "elite": {"percentile": 99, "notify": ["national_federation", "ministry_dashboard", "regional_sports_director"]},
}
```

---

## 9. ACCESS LAYER 1: USSD INTERFACE

### 9.1 USSD Flow Architecture

```
*714*44#
│
├── Language Selection
│   ├── 1. English
│   ├── 2. Twi
│   ├── 3. Ga
│   ├── 4. Ewe
│   ├── 5. Dagbani
│   └── 6. Hausa
│
├── 1. Register / Update Profile
│   ├── Full name
│   ├── Date of birth
│   ├── Region → District
│   ├── Education level
│   ├── Skills (select from categories)
│   └── Employment status
│
├── 2. Find Jobs Near Me
│   ├── By sector
│   ├── By location
│   ├── View AI-matched jobs
│   └── Apply (sends SMS notification to employer)
│
├── 3. Training Programmes
│   ├── Browse by region
│   ├── Browse by sector
│   ├── View details
│   └── Register interest
│
├── 4. Report Sports Facility
│   ├── Select facility (by region/district)
│   ├── Rate condition (1-5)
│   ├── Describe issues
│   └── Confirmation
│
├── 5. Register as Athlete
│   ├── Personal details
│   ├── Primary sport
│   ├── Current level
│   ├── Coach name/phone
│   └── Confirmation
│
├── 6. Check My Status
│   ├── Job match updates
│   ├── Application status
│   ├── Training registration status
│   └── Athlete profile status
│
└── 0. Akwaaba / Help
    ├── About YouthPulse
    ├── Contact support
    └── Privacy information
```

### 9.2 USSD Session Handler

```python
# File: services/ussd/handler.py

"""
USSD sessions are stateless HTTP requests. Each user input triggers a new request.
State is maintained in Redis with session_id as key.

CRITICAL CONSTRAINTS:
- Max message length: 182 characters (160 for some networks)
- Session timeout: 180 seconds (varies by MNO)
- Must respond within 10 seconds
- No special characters in some MNOs (avoid emojis)
- All text must be plain ASCII-safe

Integration: Africa's Talking USSD API
Endpoint: POST /api/v1/ussd/callback
"""

from fastapi import APIRouter, Form
from services.ussd.state_machine import USSDStateMachine
from services.ussd.localization import get_text

router = APIRouter(prefix="/api/v1/ussd", tags=["ussd"])

@router.post("/callback")
async def ussd_callback(
    sessionId: str = Form(...),
    serviceCode: str = Form(...),
    phoneNumber: str = Form(...),
    text: str = Form(""),  # User input, pipe-delimited for multi-step
):
    """
    Africa's Talking USSD Callback Handler
    
    text format: "" (first request) or "1" or "1*2*Kwame" (chained inputs)
    
    Response format:
    - "CON ..." → Continue session (expect more input)  
    - "END ..." → End session (final message)
    """
    machine = USSDStateMachine(sessionId, phoneNumber)
    response = await machine.process(text)
    return response
```

### 9.3 USSD Localized Messages

```python
# File: services/ussd/messages.py

USSD_MESSAGES = {
    "main_menu": {
        "en": "CON YouthPulse Ghana\n1. Register/Update Profile\n2. Find Jobs\n3. Training Programmes\n4. Report Facility\n5. Register Athlete\n6. My Status\n0. Help",
        "tw": "CON YouthPulse Ghana\n1. Kyerɛ wo ho\n2. Hwehwɛ Adwuma\n3. Adesua Nhyehyɛe\n4. Ka Agoru beaeɛ ho\n5. Kyerɛ wo ho sɛ Agorɔni\n6. Me nkɔmsɛm\n0. Mmoa",
        "ga": "CON YouthPulse Ghana\n1. Ŋmaa oshwɛ\n2. Jɛ dɔŋ\n3. Suɔmɔ lɛ\n4. Kɛ jeŋ lɛ ho\n5. Ŋmaa atsiɛwɔlɔ\n6. Mi nkɛ\n0. Kpakpa",
        "ee": "CON YouthPulse Ghana\n1. Ŋlɔ ŋuwò\n2. Dí dɔwɔƒe\n3. Nufiala ƒe dɔwɔƒe\n4. Gblɔ balekpokpo ho\n5. Ŋlɔ abe balekpola\n6. Nye nɔnɔme\n0. Kpekpeɖeŋu",
        "dag": "CON YouthPulse Ghana\n1. Sabi a ni\n2. Bɔri tuma\n3. Karimbu shɛli\n4. Yɛli waa saha shɛli\n5. Sabi ni ka waa nirba\n6. N yɛltɔɣa\n0. Sɔŋ",
        "ha": "CON YouthPulse Ghana\n1. Yi rajista\n2. Nemo aiki\n3. Shirye-shiryen horo\n4. Bayar da wurin wasa\n5. Rajista a matsayin wasa\n6. Yanayi na\n0. Taimako",
    },
    "job_found": {
        "en": "CON We found {count} jobs for you:\n{jobs}\n\nReply with number for details\n0. Back",
        "tw": "CON Yɛahu adwuma {count} ma wo:\n{jobs}\n\nKa nɔma no mu bi ma yɛnkyerɛ wo\n0. San",
        "ga": "CON Míkɛ dɔŋ {count} ha ni:\n{jobs}\n\nKaaa nɔmba lɛ\n0. Gbɛ",
    },
    "no_jobs_found": {
        "en": "END No jobs found matching your skills in your area right now. We'll SMS you when new jobs appear!",
        "tw": "END Yɛnhuu adwuma biara a ɛne wo nsɛm a wonim hyia. Yɛbɛma wo amanneɛ sɛ adwuma foforo ba a!",
        "ga": "END Dɔŋ kome nɔ lɛ yɛ jɛ bo. Míbaa SMS ni ha ni lɛ dɔŋ foɔi lɛ ba!",
    },
    "registration_success": {
        "en": "END Ayekoo! You're registered on YouthPulse. We'll match you with jobs and training. Check back anytime at *714*44#",
        "tw": "END Ayekoo! Wode wo ho akyerɛ YouthPulse so. Yɛbɛhwehwɛ adwuma ne adesua ama wo. San bra *714*44#",
        "ga": "END Ayekoo! Oŋmaa oshwɛ YouthPulse lɛ dzi. Míbaa jɛ dɔŋ kɛ suɔmɔ ha ni. Bra *714*44#",
    },
    "athlete_registration_success": {
        "en": "END Ayekoo Champion! You're registered as an athlete. Your coach can now record your performance. Ghana needs you! 🇬🇭",
        "tw": "END Ayekoo Sɛbea! Wode wo ho akyerɛ sɛ agorɔni. Wo kyerɛkyerɛfo betumi akyerɛ wo agorɔ ho nsɛm. Ghana hia wo! 🇬🇭",
    },
}
```

---

## 10. ACCESS LAYER 2: WHATSAPP AI ASSISTANT

### 10.1 Rasa Configuration

```yaml
# File: services/whatsapp/rasa/config.yml

recipe: default.v1
language: en

pipeline:
  - name: WhitespaceTokenizer
  - name: RegexFeaturizer
  - name: LexicalSyntacticFeaturizer
  - name: CountVectorsFeaturizer
  - name: CountVectorsFeaturizer
    analyzer: char_wb
    min_ngram: 1
    max_ngram: 4
  - name: DIETClassifier
    epochs: 100
    constrain_similarities: true
  - name: EntitySynonymMapper
  - name: ResponseSelector
    epochs: 100
  - name: FallbackClassifier
    threshold: 0.3
    ambiguity_threshold: 0.1

policies:
  - name: MemoizationPolicy
  - name: RulePolicy
  - name: TEDPolicy
    max_history: 5
    epochs: 100
```

### 10.2 Rasa Intents (NLU Training Data)

```yaml
# File: services/whatsapp/rasa/data/nlu.yml

version: "3.1"
nlu:
  - intent: greet
    examples: |
      - hello
      - hi
      - hey
      - good morning
      - good afternoon
      - good evening
      - maakye (Twi: good morning)
      - maaha (Twi: good afternoon)
      - maadwo (Twi: good evening)
      - agoo (Akan: knock knock / hello)
      - akwaaba (Twi: welcome)
      - ojekoo (Ga: hello)
      - woezɔ (Ewe: welcome)
      - anta ni (Dagbani: greetings)
      - sannu (Hausa: hello)
      - barka (Hausa: greetings)
      - charley (Ghanaian slang: hey man)
      - herh (Ghanaian slang: hey)
      - boss
      - please

  - intent: find_jobs
    examples: |
      - I'm looking for a job
      - find me work
      - any jobs available
      - I need a job
      - merehwehwɛ adwuma (Twi: I'm looking for work)
      - adwuma wɔ hɔ? (Twi: is there work?)
      - I want to work
      - job opportunities near me
      - I just finished school and need work
      - I'm unemployed
      - I dey find work (Pidgin)
      - work dey? (Pidgin)
      - I need apprenticeship
      - any welding jobs?
      - I want to learn a trade
      - find [construction](sector) jobs
      - find [farming](sector) work
      - jobs in [Tamale](location)
      - work in [Kumasi](location)
      - I need [mechanic](skill) work

  - intent: register_skills
    examples: |
      - I want to register my skills
      - I can do welding
      - I'm a [carpenter](skill)
      - I know how to [sew](skill)
      - I have experience in [farming](sector)
      - I studied [electrical engineering](qualification)
      - register me
      - sign me up
      - I'm a trained [hairdresser](skill)
      - I finished [NVTI](institution) in [plumbing](skill)
      - I did [HND](education_level) at [Accra Poly](institution)

  - intent: check_training
    examples: |
      - what training programmes are available
      - I want to learn something new
      - any free training near me
      - I want to go for training
      - where can I learn [coding](skill)
      - I want to learn [solar installation](skill)
      - TVET programmes in [Accra](location)
      - apprenticeship available?
      - mepe sɛ mesua ade foforo (Twi: I want to learn something new)

  - intent: report_facility
    examples: |
      - I want to report a sports facility
      - the stadium is in bad condition
      - [Baba Yara](facility) pitch is damaged
      - the training ground is waterlogged
      - our community field has no goal posts
      - the [Cape Coast stadium](facility) needs repairs

  - intent: register_athlete
    examples: |
      - I want to register as an athlete
      - I'm a sprinter
      - I play [football](sport)
      - I do [boxing](sport)
      - I run [100 meters](event)
      - I want to be a professional [athlete](sport)
      - my child is talented in [athletics](sport)
      - mepe sɛ meyɛ agorɔni (Twi: I want to be an athlete)

  - intent: check_status
    examples: |
      - what's my status
      - any updates for me
      - check my applications
      - have I been matched to any job?
      - any new opportunities
      - what's happening with my registration

  - intent: change_language
    examples: |
      - speak Twi
      - change to [Twi](language)
      - ka Twi (Twi: speak Twi)
      - I want [English](language)
      - switch to [Ewe](language)
      - [Dagbani](language) please
      - [Hausa](language)

  - intent: ask_help
    examples: |
      - help
      - what can you do
      - how does this work
      - boa me (Twi: help me)
      - what is YouthPulse
      - deɛn na wobɛtumi ayɛ (Twi: what can you do)
```

### 10.3 Rasa Responses

```yaml
# File: services/whatsapp/rasa/domain.yml (partial - responses section)

responses:
  utter_greet:
    - text: "Akwaaba! 🇬🇭 Welcome to YouthPulse Ghana. I'm your AI assistant. I can help you:\n\n1️⃣ Find jobs & apprenticeships\n2️⃣ Discover training programmes\n3️⃣ Register your skills\n4️⃣ Report a sports facility\n5️⃣ Register as an athlete\n\nWhat would you like to do?"

  utter_greet_tw:
    - text: "Akwaaba! 🇬🇭 Wo akwaaba YouthPulse Ghana. Meyɛ wo AI boafo. Metumi aboa wo:\n\n1️⃣ Hwehwɛ adwuma\n2️⃣ Hu adesua nhyehyɛe\n3️⃣ Kyerɛ wo nsɛm a wonim\n4️⃣ Ka agoru beaeɛ ho asɛm\n5️⃣ Kyerɛ wo ho sɛ agorɔni\n\nDeɛn na wopɛ sɛ woyɛ?"

  utter_job_results:
    - text: "Ayekoo! I found {count} opportunities matching your skills in {region}:\n\n{job_list}\n\nReply with the number to get details, or say 'more' to see more results."

  utter_no_jobs:
    - text: "I couldn't find exact matches right now, but don't worry! I've registered your skills and will message you as soon as new opportunities come up in {region}. Keep pushing! 💪🇬🇭"

  utter_registration_complete:
    - text: "Ayekoo! 🎉 You're now registered on YouthPulse Ghana!\n\n📋 Name: {name}\n📍 Region: {region}\n🛠️ Skills: {skills}\n\nI'll start matching you with opportunities right away. You'll receive messages when we find something good for you!"

  utter_facility_report_thanks:
    - text: "Medaase! 🙏 Thank you for reporting the condition of {facility_name}. Your report has been logged and the National Sports Authority will be notified.\n\nReport ID: {report_id}\nStatus: Under Review\n\nGhana's sports infrastructure improves when citizens like you speak up! 🇬🇭"

  utter_athlete_registered:
    - text: "Ayekoo Champion! 🏃‍♂️🇬🇭\n\nYou're now registered as an athlete on YouthPulse!\n\n🏅 Sport: {sport}\n📍 Region: {region}\n🎯 Level: {level}\n\nYour coach can now record your performance data. If you don't have a coach yet, ask at your nearest District Sports Office.\n\nGhana needs you — keep training hard! 💪"

  utter_talent_alert:
    - text: "🌟 TALENT ALERT! 🌟\n\nGreat news about {athlete_name}!\n\nTheir recent {event} performance of {value}{unit} places them in the top {percentile}% nationally for their age group.\n\n🎯 Recommended: {recommendation}\n\nThis could be a future star for Ghana! 🇬🇭⭐"
```

---

## 11. ACCESS LAYER 3: WEB DASHBOARD

### 11.1 Dashboard Architecture

```
React 18 + Vite + TypeScript
├── Layout
│   ├── Sidebar Navigation
│   ├── Top Bar (user info, notifications, language switch)
│   └── Main Content Area
│
├── Pages
│   ├── /dashboard          → National Overview (default)
│   ├── /employment         → Youth Employment Module
│   │   ├── /employment/overview     → KPIs, trends
│   │   ├── /employment/skills-map   → Interactive skills heat map
│   │   ├── /employment/programmes   → Programme effectiveness
│   │   ├── /employment/matches      → Recent job matches
│   │   └── /employment/labour-market → Labour market intelligence
│   │
│   ├── /infrastructure     → Sports Infrastructure Module
│   │   ├── /infrastructure/facilities  → Facility map & status
│   │   ├── /infrastructure/alerts      → Condition alerts
│   │   ├── /infrastructure/maintenance → Maintenance schedules
│   │   ├── /infrastructure/fund        → Sports Fund allocations
│   │   └── /infrastructure/payments    → Athlete payment tracker
│   │
│   ├── /talent             → Talent Discovery Module
│   │   ├── /talent/overview      → Pipeline overview
│   │   ├── /talent/athletes      → Athlete directory
│   │   ├── /talent/alerts        → Talent alerts
│   │   ├── /talent/sport-fit     → Sport-fit analysis
│   │   ├── /talent/participation → Participation by region/sport
│   │   └── /talent/dropouts      → Dropout risk dashboard
│   │
│   ├── /ask-ai             → Natural Language Query Interface
│   ├── /reports            → Automated Report Generation
│   └── /settings           → System Configuration
│
└── Components
    ├── charts/             → ECharts wrappers
    ├── maps/               → Leaflet map components
    ├── tables/             → Data tables with sorting/filtering
    ├── cards/              → KPI cards, stat cards
    ├── forms/              → Input forms
    └── ai/                 → AI query interface components
```

### 11.2 Key Dashboard Metrics

```typescript
// File: dashboard/src/types/metrics.ts

// ============================================================
// NATIONAL OVERVIEW DASHBOARD METRICS
// These are the metrics that matter to the Minister and officials
// ============================================================

interface NationalOverviewMetrics {
  // Youth Employment KPIs
  totalYouthRegistered: number;
  registrationGrowthPercent: number;
  totalJobsMatched: number;
  matchSuccessRate: number;          // % of matches that led to employment
  activeTrainingEnrollments: number;
  programmeCompletionRate: number;
  averageTimeToEmploymentDays: number;
  
  // Skills Intelligence
  topDemandSkills: SkillDemand[];     // Top 10 most demanded skills nationally
  criticalSkillGaps: SkillGap[];     // Regions where supply << demand
  skillGapTrend: TrendDirection;      // Is the gap closing or widening?
  
  // Sports Infrastructure KPIs
  totalFacilitiesMonitored: number;
  facilitiesInCriticalCondition: number;
  facilitiesNeedingRepair: number;
  maintenanceCompletionRate: number;
  sportsFundDisbursedGHS: number;
  sportsFundUtilizationPercent: number;
  pendingAthletePayments: number;
  overduePaymentCount: number;
  
  // Talent Pipeline KPIs
  totalAthletesTracked: number;
  talentAlertsThisMonth: number;
  athletesByTier: Record<TalentTier, number>;
  sportDiversityIndex: number;       // 0-1, higher = more balanced across sports
  dropoutRiskCount: number;          // Athletes flagged as at-risk
  participationGrowthPercent: number;
  
  // Regional breakdown
  regionalData: RegionalMetrics[];
}

interface RegionalMetrics {
  region: RegionCode;
  regionName: string;
  youthRegistered: number;
  jobsMatched: number;
  skillGapScore: number;             // 0-1, higher = bigger gap
  facilitiesCount: number;
  facilitiesHealthScore: number;     // 0-1
  athletesTracked: number;
  topSport: SportCode;
  participationRate: number;
}

interface SkillDemand {
  skillName: string;
  sector: string;
  demandCount: number;
  supplyCount: number;
  gapRatio: number;
  trendDirection: 'rising' | 'stable' | 'declining';
  avgSalaryGHS: number;
}

// ============================================================
// THE "ASK AI" INTERFACE
// Minister can ask questions in plain English (or Twi)
// ============================================================

interface AskAIQuery {
  question: string;                   // "How many youth found jobs in Northern Region this quarter?"
  language: LanguageCode;
  context?: string;                   // Additional context
}

interface AskAIResponse {
  answer: string;                     // Natural language answer
  data?: any;                         // Supporting data/chart
  visualization?: ChartConfig;        // Auto-generated chart
  sources: string[];                  // Which data tables were queried
  confidence: number;
}

// Example queries the AI should handle:
const EXAMPLE_QUERIES = [
  "How many youth in Northern Region found jobs this quarter?",
  "Which facilities need urgent maintenance before the next CAF inspection?",
  "Show me athletes with international potential outside of football",
  "What's the ROI of the Adwumawura programme vs the coding initiative?",
  "Which regions have the worst skills gaps in construction trades?",
  "How many female athletes are in the talent pipeline?",
  "Compare sports participation rates across all 16 regions",
  "What is the dropout risk for athletes in Upper East Region?",
  "How much of the Sports Fund has been disbursed this fiscal year?",
  "Sɛn na adwuma hwehwɛ kɔ so wɔ Ashanti Region?" // Twi: How is job seeking going in Ashanti Region?
];
```

### 11.3 Dashboard Color System & Ghana Theme

```typescript
// File: dashboard/src/theme/ghana-theme.ts

/**
 * YouthPulse Ghana Dashboard Theme
 * 
 * DESIGN PHILOSOPHY:
 * - Ghana flag colors as accent palette (Red, Gold, Green, Black Star)
 * - Dark mode primary (reduces eye strain for officials working long hours)
 * - High contrast for readability
 * - Accessible color combinations (WCAG AA minimum)
 * - Animations should feel energetic but professional
 */

export const GHANA_THEME = {
  // Core palette inspired by Ghana flag
  colors: {
    // Primary actions and highlights
    gold: '#F59E0B',          // Ghana flag gold — primary accent
    goldLight: '#FCD34D',
    goldDark: '#D97706',
    
    // Success, growth, positive
    green: '#10B981',          // Ghana flag green
    greenLight: '#34D399',
    greenDark: '#059669',
    
    // Alerts, warnings, critical
    red: '#EF4444',            // Ghana flag red
    redLight: '#F87171',
    redDark: '#DC2626',
    
    // Black Star — used for text and primary dark surfaces
    starBlack: '#0A0E1A',
    
    // Supporting colors
    blue: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F97316',
    
    // Dark mode surfaces
    bgPrimary: '#0A0E1A',     // Deepest background
    bgSecondary: '#111827',    // Card backgrounds
    bgTertiary: '#1E293B',     // Input backgrounds, hover states
    
    // Text
    textPrimary: '#E2E8F0',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    
    // Borders
    border: '#1E293B',
    borderLight: '#334155',
  },
  
  // Typography — use fonts that render well across African locales
  fonts: {
    heading: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    body: "'Inter', 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  
  // Map tile layer (OpenStreetMap — no API key needed)
  map: {
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
    defaultCenter: [7.9465, -1.0232],  // Geographic center of Ghana
    defaultZoom: 7,
    regionZoom: 9,
    districtZoom: 11,
  },
  
  // Animation presets
  animation: {
    pageTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cardHover: 'transform 0.2s ease, box-shadow 0.2s ease',
    numberCount: 1500, // ms for counting animations on KPI cards
    chartReveal: 800,  // ms for chart data reveal
  },
  
  // Regional colors (for map and charts — distinct for each region)
  regionColors: {
    GA: '#F59E0B', AS: '#10B981', NR: '#3B82F6', VR: '#8B5CF6',
    ER: '#F97316', WR: '#EC4899', CR: '#14B8A6', UE: '#EF4444',
    UW: '#6366F1', BO: '#84CC16', BE: '#F59E0B', AH: '#22D3EE',
    SV: '#A855F7', NE: '#FB923C', OT: '#2DD4BF', WN: '#E879F9',
  },
} as const;
```

### 11.4 Dashboard Component: National Overview Page

```tsx
// File: dashboard/src/pages/NationalOverview.tsx
// This is the landing page — what the Minister sees first

/**
 * LAYOUT:
 * ┌────────────────────────────────────────────────────────────┐
 * │ 🇬🇭 YouthPulse Ghana — National Overview     [Feb 2026 ▾] │
 * │ Real-time data across 16 regions • Updated 2 min ago       │
 * ├────────┬────────┬────────┬────────────────────────────────┤
 * │ Youth  │ Jobs   │Facilit.│ Athletes                       │
 * │Regist. │Matched │Monitor.│ Tracked                        │
 * │847,293 │23,847  │342     │ 15,209                         │
 * │+12.4%  │+8.2%   │18 alert│ +22.1%                         │
 * ├────────┴────────┴────────┴────────────────────────────────┤
 * │                                                            │
 * │  ┌─ Regional Skills Gap Heat Map ──┐  ┌─ Facility Status ┐│
 * │  │ [Interactive map of Ghana with  ]│  │ Baba Yara  ⚠ RED ││
 * │  │ [color-coded regions showing    ]│  │ Cape Coast ⚡ WARN││
 * │  │ [skills gap severity            ]│  │ Tamale     🔍 REV││
 * │  │ [Click region for drill-down    ]│  │ Borteyman  ✅ OK  ││
 * │  └──────────────────────────────────┘  └──────────────────┘│
 * │                                                            │
 * │  ┌─ Employment Trends (12 months) ─┐  ┌─ Talent Pipeline ┐│
 * │  │ [Line chart: registrations,     ]│  │ Football   ████▓▒││
 * │  │ [matches, placements over time  ]│  │ Athletics  ██▓▒▒▒││
 * │  │ [Split by region if filtered    ]│  │ Boxing     █▓▒▒▒▒││
 * │  └──────────────────────────────────┘  │ Swimming   ▓▒▒▒▒▒││
 * │                                        └──────────────────┘│
 * │  ┌─ Ask AI ───────────────────────────────────────────────┐│
 * │  │ 💬 "Ask me anything about Ghana's youth & sports..."   ││
 * │  └────────────────────────────────────────────────────────┘│
 * └────────────────────────────────────────────────────────────┘
 * 
 * KEY INTERACTIONS:
 * - KPI cards animate on load (count up from 0)
 * - Map regions are clickable → drill down to region view
 * - Facility alerts are clickable → jump to facility detail
 * - Charts have hover tooltips with exact values
 * - "Ask AI" bar is always visible at bottom
 * - All data auto-refreshes every 5 minutes via WebSocket
 */
```

---

## 12. ACCESS LAYER 4: COACH MOBILE APP

### 12.1 Flutter App Architecture

```
lib/
├── main.dart
├── app/
│   ├── app.dart
│   ├── routes.dart
│   └── theme.dart                    // Ghana theme
│
├── core/
│   ├── constants/
│   │   ├── ghana_regions.dart
│   │   ├── sports.dart
│   │   ├── languages.dart
│   │   └── benchmarks.dart
│   ├── network/
│   │   ├── api_client.dart
│   │   └── offline_sync.dart         // CRITICAL: offline-first
│   ├── storage/
│   │   ├── local_db.dart             // SQLite for offline
│   │   └── secure_storage.dart
│   └── localization/
│       ├── app_localizations.dart
│       └── l10n/
│           ├── intl_en.arb
│           ├── intl_tw.arb           // Twi
│           ├── intl_ga.arb           // Ga
│           ├── intl_ee.arb           // Ewe
│           └── intl_dag.arb          // Dagbani
│
├── features/
│   ├── auth/
│   │   ├── login_screen.dart         // Phone number + OTP
│   │   └── auth_provider.dart
│   │
│   ├── athlete_recording/
│   │   ├── screens/
│   │   │   ├── select_athlete.dart
│   │   │   ├── record_performance.dart
│   │   │   ├── performance_result.dart  // Shows AI talent alert
│   │   │   └── athlete_history.dart
│   │   ├── models/
│   │   │   ├── performance_entry.dart
│   │   │   └── talent_alert.dart
│   │   └── providers/
│   │       └── recording_provider.dart
│   │
│   ├── facility_reporting/
│   │   ├── screens/
│   │   │   ├── select_facility.dart
│   │   │   ├── capture_photos.dart
│   │   │   ├── rate_condition.dart
│   │   │   └── report_submitted.dart
│   │   └── models/
│   │       └── condition_report.dart
│   │
│   ├── athlete_management/
│   │   ├── screens/
│   │   │   ├── register_athlete.dart
│   │   │   ├── athlete_profile.dart
│   │   │   └── athlete_list.dart
│   │   └── models/
│   │       └── athlete.dart
│   │
│   └── dashboard/
│       ├── screens/
│       │   ├── coach_home.dart        // Overview for coach
│       │   └── my_athletes.dart       // Athletes under this coach
│       └── widgets/
│           ├── recent_recordings.dart
│           └── talent_alert_card.dart
│
└── shared/
    ├── widgets/
    │   ├── ghana_app_bar.dart
    │   ├── offline_banner.dart        // Shows when offline
    │   ├── sync_indicator.dart
    │   └── performance_input.dart     // Specialized numeric input
    └── utils/
        ├── unit_converter.dart
        └── benchmark_calculator.dart
```

### 12.2 Offline-First Data Sync

```dart
// File: lib/core/network/offline_sync.dart

/// YouthPulse Coach App — Offline Sync Strategy
/// 
/// CRITICAL REQUIREMENT: Coaches often work in areas with no connectivity
/// (rural schools, community fields). The app MUST work fully offline.
///
/// Strategy:
/// 1. All data is first written to local SQLite database
/// 2. A sync queue tracks all unsynced changes
/// 3. When connectivity is detected, sync queue is processed FIFO
/// 4. Server responds with server-side changes (new benchmarks, alerts)
/// 5. Conflict resolution: Last-write-wins with timestamp comparison
/// 6. Photos are compressed and queued for upload separately
///
/// Sync indicators:
/// - Green dot: All data synced
/// - Yellow dot: Pending sync (N items)
/// - Red dot: Sync failed (will retry)
/// - Grey dot: Offline mode (working locally)
```

---

## 13. AI/ML MODELS SPECIFICATION

### 13.1 Model Registry

| Model | Type | Framework | Purpose | Input | Output |
|-------|------|-----------|---------|-------|--------|
| `skills-extractor-v1` | NER | Hugging Face (BERT) | Extract skills from free text | Job descriptions, youth profiles | Skill entities |
| `job-classifier-v1` | Classification | scikit-learn (XGBoost) | Classify jobs by sector | Job title + description | Sector label |
| `skills-matcher-v1` | Recommendation | PyTorch | Match youth to jobs | Youth profile + job features | Match score 0-1 |
| `facility-assessor-v1` | Object Detection | YOLOv8 | Detect facility issues from photos | Facility photo | Issue labels + bboxes |
| `maintenance-predictor-v1` | Regression | Prophet + XGBoost | Predict facility degradation | Condition history + weather | Days to critical |
| `fund-optimizer-v1` | Optimization | Google OR-Tools | Optimize fund allocation | Constraints + priorities | Allocation plan |
| `sport-fit-v1` | Multi-class | XGBoost | Recommend best sport for athlete | Physical + performance data | Sport probabilities |
| `dropout-predictor-v1` | Binary Classification | Logistic Regression | Predict athlete dropout risk | Engagement + demographic | Risk score 0-1 |
| `talent-ranker-v1` | Ranking | Statistical | Rank athletes vs benchmarks | Performance record | Percentile rank |
| `query-ai-v1` | Text-to-SQL + RAG | LangChain + Llama 3 | Answer natural language questions | English/Twi question | Answer + data |

### 13.2 LLM Configuration (Local Deployment)

```python
# File: services/ai/llm/config.py

"""
Local LLM for the "Ask AI" feature and report generation.
Runs on Ollama — no external API calls, full data sovereignty.

Model: Llama 3.1 8B (fits on single GPU or good CPU)
Fallback: Mistral 7B
Quantization: Q4_K_M (balanced quality/speed)

Uses RAG (Retrieval-Augmented Generation):
1. User asks question in English or Twi
2. LangChain converts to SQL query or data retrieval
3. Retrieves relevant data from PostgreSQL
4. LLM generates natural language answer with data context
"""

LLM_CONFIG = {
    "primary_model": "llama3.1:8b-instruct-q4_K_M",
    "fallback_model": "mistral:7b-instruct-q4_K_M",
    "temperature": 0.1,        # Low temperature for factual responses
    "max_tokens": 1024,
    "system_prompt": """You are the YouthPulse Ghana AI Assistant. You help Ghana's 
Ministry of Youth and Sports officials understand data about youth employment, 
sports infrastructure, and athlete development across Ghana's 16 regions.

Always respond with specific numbers and data. Reference regions by their full names.
Use Ghana Cedis (GH₵) for all monetary values. Be concise and actionable.

You understand both English and Twi. If asked in Twi, respond in Twi.

Key context:
- Ghana has 16 administrative regions and 261 MMDAs
- Youth = ages 15-35 (per Ghana National Youth Policy)
- Currency is Ghana Cedi (GHS / GH₵)
- The Ghana Sports Fund was established in 2025
- The ministry was split in 2025 into Sports & Recreation + Youth Development & Empowerment
""",
}
```

---

## 14. API SPECIFICATION

### 14.1 API Structure

```
BASE URL: https://api.youthpulse.gov.gh/v1

Authentication: Bearer token (Keycloak JWT)
Rate Limiting: 100 req/min (public), 1000 req/min (authenticated)
Response Format: JSON
Pagination: Cursor-based (?cursor=xxx&limit=50)

ENDPOINTS:

# ── Youth Employment ──
POST   /employment/youth/register          # Register youth profile
GET    /employment/youth/{id}              # Get youth profile
PUT    /employment/youth/{id}              # Update youth profile
GET    /employment/youth/{id}/matches      # Get job matches for youth
POST   /employment/youth/{id}/skills       # Add skills to profile
GET    /employment/jobs                     # List/search jobs
GET    /employment/jobs/{id}               # Get job details
POST   /employment/jobs                     # Post a job (employers)
GET    /employment/skills/demand            # Skills demand data
GET    /employment/skills/heatmap           # Regional skills gap map
GET    /employment/programmes               # List training programmes
POST   /employment/programmes/{id}/enroll   # Enrol in programme
GET    /employment/analytics/overview       # Employment KPIs

# ── Sports Infrastructure ──
GET    /infrastructure/facilities            # List/search facilities
GET    /infrastructure/facilities/{id}       # Facility details
POST   /infrastructure/facilities/{id}/report # Submit condition report
GET    /infrastructure/facilities/{id}/history # Condition history
GET    /infrastructure/alerts                # Active alerts
GET    /infrastructure/maintenance           # Maintenance schedule
GET    /infrastructure/fund/allocations      # Fund allocation data
GET    /infrastructure/fund/balance          # Current fund balance
POST   /infrastructure/payments              # Create athlete payment
GET    /infrastructure/payments/{id}         # Payment status
GET    /infrastructure/analytics/overview    # Infrastructure KPIs

# ── Talent Discovery ──
POST   /talent/athletes/register             # Register athlete
GET    /talent/athletes                      # List/search athletes
GET    /talent/athletes/{id}                 # Athlete profile
POST   /talent/athletes/{id}/performance     # Record performance
GET    /talent/athletes/{id}/performance     # Performance history
GET    /talent/athletes/{id}/sport-fit       # Sport recommendations
GET    /talent/alerts                        # Talent alerts
GET    /talent/benchmarks                    # National benchmarks
GET    /talent/participation                 # Participation stats
GET    /talent/analytics/overview            # Talent KPIs

# ── AI / Analytics ──
POST   /ai/ask                              # Natural language query
POST   /ai/report/generate                  # Generate PDF report
GET    /ai/models                           # Active model registry

# ── System ──
POST   /ussd/callback                       # USSD gateway callback
POST   /whatsapp/webhook                    # WhatsApp webhook
GET    /dashboard/overview                  # National overview metrics
GET    /dashboard/regional/{region_code}    # Regional drill-down
POST   /auth/login                          # Phone + OTP login
POST   /auth/verify                         # OTP verification
GET    /notifications                       # User notifications
```

---

## 15. AUTHENTICATION & AUTHORIZATION

### 15.1 Auth Strategy

```yaml
# Keycloak Realm: youthpulse-ghana

Roles:
  - super_admin:          # Full system access
      description: "System administrators (Anthropic/dev team)"
  
  - minister:             # Read all data, approve fund allocations
      description: "Minister and Deputy Ministers"
  
  - director:             # Read all data for their ministry
      description: "Ministry Directors"
  
  - regional_director:    # Read/write data for their region
      description: "Regional Sports Directors, Regional Youth Officers"
  
  - district_officer:     # Read/write data for their district
      description: "District Sports Officers, District Youth Officers"
  
  - coach:                # Register athletes, record performance
      description: "Coaches, PE Teachers, Community Sports Organizers"
  
  - youth:                # Own profile, view matches, apply to jobs
      description: "Registered youth (via USSD/WhatsApp/Web)"
  
  - employer:             # Post jobs, view candidate matches
      description: "Employers, Training Providers"
  
  - federation:           # View athletes in their sport
      description: "National Sports Federation officials"

Auth Flow (Mobile/USSD):
  1. User provides phone number
  2. System sends OTP via SMS (Africa's Talking)
  3. User enters OTP
  4. System issues JWT token (short-lived: 1 hour)
  5. Refresh token (long-lived: 30 days)

Auth Flow (Web Dashboard):
  1. Username + password via Keycloak login page
  2. Optional 2FA for minister/director roles
  3. SSO with Ghana.GOV if available
```

---

## 16. DEPLOYMENT & INFRASTRUCTURE

### 16.1 Docker Compose (Development)

```yaml
# File: docker-compose.yml

version: "3.9"

services:
  # ── Databases ──
  postgres:
    image: postgis/postgis:16-3.4
    environment:
      POSTGRES_DB: youthpulse
      POSTGRES_USER: youthpulse
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  timescaledb:
    image: timescale/timescaledb:latest-pg16
    environment:
      POSTGRES_DB: youthpulse_ts
      POSTGRES_USER: youthpulse
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - timescale_data:/var/lib/postgresql/data
    ports:
      - "5433:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # ── Message Queue ──
  kafka:
    image: bitnami/kafka:3.7
    environment:
      KAFKA_CFG_NODE_ID: 0
      KAFKA_CFG_PROCESS_ROLES: controller,broker
      KAFKA_CFG_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: 0@kafka:9093
      KAFKA_CFG_CONTROLLER_LISTENER_NAMES: CONTROLLER
    ports:
      - "9092:9092"

  # ── Object Storage ──
  minio:
    image: minio/minio:latest
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: youthpulse
      MINIO_ROOT_PASSWORD: ${MINIO_PASSWORD}
    volumes:
      - minio_data:/data
    ports:
      - "9000:9000"
      - "9001:9001"

  # ── Search ──
  meilisearch:
    image: getmeili/meilisearch:v1.7
    environment:
      MEILI_MASTER_KEY: ${MEILI_KEY}
    volumes:
      - meili_data:/meili_data
    ports:
      - "7700:7700"

  # ── Auth ──
  keycloak:
    image: quay.io/keycloak/keycloak:24.0
    command: start-dev
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_PASSWORD}
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: youthpulse
      KC_DB_PASSWORD: ${DB_PASSWORD}
    ports:
      - "8080:8080"

  # ── Backend Services ──
  api:
    build: ./services
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    volumes:
      - ./services:/app
    environment:
      DATABASE_URL: postgresql://youthpulse:${DB_PASSWORD}@postgres:5432/youthpulse
      REDIS_URL: redis://redis:6379
      KAFKA_BROKER: kafka:9092
      MINIO_URL: http://minio:9000
      MEILI_URL: http://meilisearch:7700
      KEYCLOAK_URL: http://keycloak:8080
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
      - kafka
      - minio

  # ── Rasa (WhatsApp AI) ──
  rasa:
    build: ./services/whatsapp/rasa
    command: run --enable-api --cors "*"
    volumes:
      - ./services/whatsapp/rasa:/app
    ports:
      - "5005:5005"

  # ── Rasa Actions ──
  rasa-actions:
    build: ./services/whatsapp/rasa
    command: run actions
    volumes:
      - ./services/whatsapp/rasa:/app
    ports:
      - "5055:5055"

  # ── LLM (Ollama) ──
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          memory: 8G

  # ── Web Dashboard ──
  dashboard:
    build: ./dashboard
    command: pnpm dev --host 0.0.0.0
    volumes:
      - ./dashboard:/app
      - /app/node_modules
    ports:
      - "3000:3000"

  # ── Task Queue ──
  celery-worker:
    build: ./services
    command: celery -A tasks worker --loglevel=info
    volumes:
      - ./services:/app
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://youthpulse:${DB_PASSWORD}@postgres:5432/youthpulse
    depends_on:
      - redis
      - postgres

  celery-beat:
    build: ./services
    command: celery -A tasks beat --loglevel=info
    volumes:
      - ./services:/app
    depends_on:
      - redis

  # ── Monitoring ──
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3001:3000"

  # ── Data Pipeline ──
  airflow:
    image: apache/airflow:2.8.1
    environment:
      AIRFLOW__CORE__EXECUTOR: LocalExecutor
      AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql://youthpulse:${DB_PASSWORD}@postgres:5432/airflow
    volumes:
      - ./pipelines/dags:/opt/airflow/dags
    ports:
      - "8081:8080"

volumes:
  postgres_data:
  timescale_data:
  redis_data:
  minio_data:
  meili_data:
  ollama_data:
  grafana_data:
```

---

## 17. DATA PRIVACY & COMPLIANCE

### 17.1 Ghana Data Protection Act (Act 843) Compliance

```python
# File: services/core/privacy/compliance.py

"""
YouthPulse Ghana — Data Protection Compliance
Per Ghana Data Protection Act, 2012 (Act 843)

KEY REQUIREMENTS:
1. DATA MINIMIZATION: Only collect data necessary for stated purpose
2. CONSENT: Explicit consent before data collection (via USSD confirmation / WhatsApp opt-in)
3. PURPOSE LIMITATION: Data used only for stated purposes
4. RETENTION: Define retention periods for all data categories
5. ACCESS RIGHTS: Users can view, correct, and delete their data
6. SECURITY: Appropriate technical and organizational measures
7. BREACH NOTIFICATION: Notify Data Protection Commission within 72 hours
8. CHILDREN: Extra protections for users under 18 (parental consent)

SENSITIVE DATA HANDLING:
- Disability status: Encrypted at rest, accessible only with explicit consent
- Health/injury data: Encrypted, restricted to authorized medical/coaching staff
- Location data: Anonymized for analytics, precise only for service delivery
- Financial data: PCI-DSS equivalent protections for payment information
"""

DATA_RETENTION_POLICY = {
    "youth_profiles": {"retention_years": 10, "after_action": "anonymize"},
    "job_matches": {"retention_years": 3, "after_action": "delete"},
    "performance_records": {"retention_years": 20, "after_action": "anonymize"},
    "facility_reports": {"retention_years": 10, "after_action": "archive"},
    "ussd_sessions": {"retention_days": 90, "after_action": "delete"},
    "whatsapp_conversations": {"retention_days": 180, "after_action": "delete"},
    "audit_logs": {"retention_years": 7, "after_action": "archive"},
    "athlete_payments": {"retention_years": 10, "after_action": "archive"},
}

CONSENT_TEXT = {
    "en": "YouthPulse Ghana collects your data to match you with jobs, training, and sports opportunities. Your data is protected under Ghana's Data Protection Act (Act 843). You can delete your data anytime by dialing *714*44# and selecting 'Delete My Data'. Do you consent? Reply 1 for Yes, 2 for No.",
    "tw": "YouthPulse Ghana fa wo ho nsɛm de hwehwɛ adwuma, adesua, ne agorɔ ama wo. Ghana Data Protection Act (Act 843) bɔ wo ho nsɛm ho ban. Wobɛtumi apopa wo ho nsɛm bere biara. Wopene so? Ka 1 sɛ Aane, 2 sɛ Daabi.",
}
```

---

## 18. TESTING STRATEGY

```python
# Testing pyramid for YouthPulse Ghana

"""
TESTING LAYERS:

1. UNIT TESTS (pytest)
   - All matching algorithms
   - Skills extraction NLP
   - USSD state machine logic
   - Benchmark comparison calculations
   - Fund optimization constraints
   - Data validation functions

2. INTEGRATION TESTS (pytest + testcontainers)
   - API endpoints (FastAPI TestClient)
   - Database queries (with test PostgreSQL)
   - Kafka message processing
   - Redis caching behavior
   - Keycloak auth flows

3. E2E TESTS (Playwright for web, Patrol for Flutter)
   - Complete USSD flow (register → find job → apply)
   - Dashboard login → view data → generate report
   - Coach app: record performance → see talent alert
   - WhatsApp conversation flow

4. ML MODEL TESTS (pytest + custom metrics)
   - Skills matcher: precision@k, recall@k, nDCG
   - Facility assessor: mAP, IoU
   - Sport-fit: accuracy, weighted F1
   - Dropout predictor: AUC-ROC, calibration

5. LOAD TESTS (Locust)
   - 10,000 concurrent USSD sessions
   - 5,000 WhatsApp messages/minute
   - 500 concurrent dashboard users
   - 1,000 simultaneous coach app syncs

6. ACCESSIBILITY TESTS
   - USSD: All flows work in all 6 languages
   - Dashboard: WCAG AA compliance
   - Mobile: Screen reader support
"""
```

---

## 19. FILE & FOLDER STRUCTURE

```
youthpulse-ghana/
├── CLAUDE.md                          # THIS FILE — complete spec
├── README.md                          # Project readme
├── LICENSE                            # AGPL-3.0
├── docker-compose.yml                 # Development environment
├── docker-compose.prod.yml            # Production environment
├── .env.example                       # Environment variables template
├── Makefile                           # Common commands
│
├── services/                          # Backend (Python/FastAPI)
│   ├── main.py                        # FastAPI application entry
│   ├── pyproject.toml                 # Poetry dependencies
│   ├── Dockerfile
│   ├── core/
│   │   ├── config.py                  # Settings (pydantic-settings)
│   │   ├── database.py                # SQLAlchemy setup
│   │   ├── security.py                # Auth helpers
│   │   ├── ghana.py                   # Ghana constants (regions, languages)
│   │   └── privacy/
│   │       └── compliance.py
│   ├── employment/                    # Module 1
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── service.py
│   │   ├── scraper/
│   │   │   ├── pipelines.py
│   │   │   └── spiders/
│   │   ├── matching/
│   │   │   └── engine.py
│   │   └── analytics/
│   │       └── programme_effectiveness.py
│   ├── infrastructure/                # Module 2
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── service.py
│   │   ├── cv/
│   │   │   └── facility_assessment.py
│   │   └── optimizer/
│   │       └── fund_allocation.py
│   ├── talent/                        # Module 3
│   │   ├── router.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── service.py
│   │   ├── models_ml/
│   │   │   ├── sport_fit.py
│   │   │   └── dropout_predictor.py
│   │   └── alerts/
│   │       └── thresholds.py
│   ├── ussd/                          # USSD Layer
│   │   ├── handler.py
│   │   ├── state_machine.py
│   │   ├── messages.py
│   │   └── localization.py
│   ├── whatsapp/                      # WhatsApp Layer
│   │   ├── webhook.py
│   │   └── rasa/
│   │       ├── config.yml
│   │       ├── domain.yml
│   │       ├── data/
│   │       │   ├── nlu.yml
│   │       │   ├── stories.yml
│   │       │   └── rules.yml
│   │       └── actions/
│   │           └── actions.py
│   ├── ai/                            # AI/LLM Service
│   │   ├── llm/
│   │   │   ├── config.py
│   │   │   ├── query_handler.py
│   │   │   └── report_generator.py
│   │   └── models/
│   │       └── registry.py
│   └── tasks/                         # Celery tasks
│       ├── __init__.py
│       ├── scraping.py
│       ├── matching.py
│       ├── notifications.py
│       └── analytics.py
│
├── dashboard/                         # Web Dashboard (React)
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── theme/
│   │   │   └── ghana-theme.ts
│   │   ├── pages/
│   │   │   ├── NationalOverview.tsx
│   │   │   ├── employment/
│   │   │   ├── infrastructure/
│   │   │   ├── talent/
│   │   │   ├── AskAI.tsx
│   │   │   └── Reports.tsx
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   ├── maps/
│   │   │   ├── cards/
│   │   │   └── ai/
│   │   ├── hooks/
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── metrics.ts
│   └── public/
│       └── ghana-coat-of-arms.svg
│
├── mobile/                            # Coach App (Flutter)
│   ├── pubspec.yaml
│   ├── lib/
│   │   └── [see Section 12.1]
│   ├── android/
│   └── ios/
│
├── ml/                                # ML Model Training
│   ├── notebooks/
│   │   ├── skills_extraction.ipynb
│   │   ├── facility_assessment.ipynb
│   │   ├── sport_fit_model.ipynb
│   │   └── dropout_prediction.ipynb
│   ├── training/
│   │   ├── train_skills_extractor.py
│   │   ├── train_facility_assessor.py
│   │   ├── train_sport_fit.py
│   │   └── train_dropout_predictor.py
│   └── data/
│       ├── benchmarks/
│       │   └── athletics_benchmarks.csv
│       └── seed/
│           ├── skills_master.csv
│           └── facilities_seed.csv
│
├── pipelines/                         # Data Pipelines (Airflow)
│   └── dags/
│       ├── job_scraping_dag.py
│       ├── skills_demand_dag.py
│       └── analytics_refresh_dag.py
│
├── db/                                # Database
│   ├── init.sql                       # Schema from Section 5
│   ├── seeds/
│   │   ├── regions.sql
│   │   ├── skills.sql
│   │   ├── sports.sql
│   │   ├── benchmarks.sql
│   │   └── facilities.sql
│   └── migrations/
│       └── [alembic migrations]
│
├── monitoring/                        # Observability
│   ├── prometheus.yml
│   ├── grafana/
│   │   └── dashboards/
│   └── alerts/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── load/
│       └── locustfile.py
│
└── docs/
    ├── api/
    │   └── openapi.yml
    ├── architecture/
    ├── user-guides/
    │   ├── coach-app-guide-en.md
    │   ├── coach-app-guide-tw.md
    │   └── ussd-guide-en.md
    └── deployment/
```

---

## 20. BUILD & RUN INSTRUCTIONS

### 20.1 Quick Start (Development)

```bash
# 1. Clone repository
git clone https://github.com/youthpulse-ghana/youthpulse.git
cd youthpulse

# 2. Copy environment file
cp .env.example .env
# Edit .env with your values

# 3. Start all services
docker compose up -d

# 4. Initialize database
docker compose exec api python -c "from core.database import init_db; init_db()"

# 5. Seed data (regions, skills, sports, benchmarks)
docker compose exec api python db/seeds/run_seeds.py

# 6. Pull LLM model
docker compose exec ollama ollama pull llama3.1:8b-instruct-q4_K_M

# 7. Train Rasa model
docker compose exec rasa rasa train

# 8. Access services:
#    - API:        http://localhost:8000/docs
#    - Dashboard:  http://localhost:3000
#    - Keycloak:   http://localhost:8080
#    - MinIO:      http://localhost:9001
#    - Grafana:    http://localhost:3001
#    - Airflow:    http://localhost:8081
#    - Superset:   http://localhost:8088

# 9. Run tests
docker compose exec api pytest tests/ -v
```

### 20.2 Makefile

```makefile
# File: Makefile

.PHONY: up down restart logs test seed migrate

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose down && docker compose up -d

logs:
	docker compose logs -f

test:
	docker compose exec api pytest tests/ -v --cov=services

seed:
	docker compose exec api python db/seeds/run_seeds.py

migrate:
	docker compose exec api alembic upgrade head

train-rasa:
	docker compose exec rasa rasa train

train-models:
	docker compose exec api python ml/training/train_all.py

lint:
	docker compose exec api ruff check services/
	cd dashboard && pnpm lint

format:
	docker compose exec api ruff format services/
	cd dashboard && pnpm format
```

---

## APPENDIX A: KEY GHANAIAN EXPRESSIONS FOR UI/UX

```python
# Use these throughout the platform for authentic Ghanaian feel

GHANAIAN_EXPRESSIONS = {
    "ayekoo": "Well done / Congratulations (Akan)",
    "medaase": "Thank you (Twi)",
    "akwaaba": "Welcome (Twi/Akan)",
    "yɛbɛdi_kan": "We will lead / We will succeed (Twi)",
    "yen_ara_asase_ni": "This is our own land (from Ghana national anthem)",
    "charley": "Friend / buddy (Ghanaian slang)",
    "chale": "Friend (Ga slang)",
    "no_wahala": "No problem (Pidgin)",
    "we_move": "Let's go / Moving forward (Pidgin/slang)",
    "god_dey": "God is in control (Pidgin, used for encouragement)",
}

# Use "Ayekoo" instead of "Congratulations" in success messages
# Use "Medaase" instead of "Thank you" in acknowledgments  
# Use "Akwaaba" instead of "Welcome" on entry screens
# Use 🇬🇭 Ghana flag emoji in key success moments
```

---

## APPENDIX B: SAMPLE DATA FOR DEVELOPMENT

```sql
-- Sample youth profiles for testing
INSERT INTO users (phone, full_name, date_of_birth, gender, region, district, preferred_language, user_type)
VALUES
('+233241000001', 'Kwame Asante', '2000-03-15', 'male', 'AS', 'Kumasi Metropolitan', 'tw', 'youth'),
('+233241000002', 'Abena Mensah', '2001-07-22', 'female', 'NR', 'Tamale Metropolitan', 'dag', 'youth'),
('+233241000003', 'Kofi Tetteh', '1999-11-03', 'male', 'GA', 'Accra Metropolitan', 'ga', 'youth'),
('+233241000004', 'Ama Darko', '2002-01-18', 'female', 'VR', 'Ho Municipal', 'ee', 'youth'),
('+233241000005', 'Yaw Boateng', '1998-09-30', 'male', 'CR', 'Cape Coast Metropolitan', 'en', 'youth'),
('+233241000006', 'Fatima Ibrahim', '2003-04-12', 'female', 'UE', 'Bolgatanga Municipal', 'ha', 'youth'),
('+233241000007', 'Nana Akua Owusu', '2000-12-25', 'female', 'BO', 'Sunyani Municipal', 'tw', 'coach'),
('+233241000008', 'Ibrahim Musah', '1995-06-08', 'male', 'SV', 'Damongo District', 'dag', 'coach');

-- Sample facilities
INSERT INTO sports_facilities (name, facility_type, region, district, capacity, current_status, year_built, sports_supported)
VALUES
('Baba Yara Sports Stadium', 'stadium', 'AS', 'Kumasi Metropolitan', 40528, 'critical', 1959, ARRAY['football', 'athletics']::sport_code[]),
('Accra Sports Stadium', 'stadium', 'GA', 'Accra Metropolitan', 40000, 'fair', 1952, ARRAY['football', 'athletics']::sport_code[]),
('Cape Coast Stadium', 'stadium', 'CR', 'Cape Coast Metropolitan', 15000, 'needs_repair', 2016, ARRAY['football']::sport_code[]),
('Borteyman Sports Complex', 'stadium', 'GA', 'Tema Metropolitan', 5000, 'good', 2023, ARRAY['basketball', 'volleyball', 'handball']::sport_code[]),
('Tamale Sports Stadium', 'stadium', 'NR', 'Tamale Metropolitan', 20000, 'needs_repair', 2008, ARRAY['football', 'athletics']::sport_code[]),
('Essipong Stadium', 'stadium', 'WR', 'Sekondi-Takoradi Metropolitan', 20000, 'fair', 2008, ARRAY['football']::sport_code[]),
('University of Ghana Stadium', 'stadium', 'GA', 'Accra Metropolitan', 10000, 'good', 2017, ARRAY['football', 'athletics']::sport_code[]);
```

---

**END OF SPECIFICATION**

*YouthPulse Ghana — Empowering Ghana's Youth, Transforming Ghana's Sports*
*Built with 100% Open Source Technology*
*🇬🇭 Yɛbɛdi Kan — We Will Lead 🇬🇭*
