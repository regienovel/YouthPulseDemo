import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Briefcase,
  Building2,
  Star,
  TrendingUp,
  BarChart3,
  Wallet,
  MapPin,
  Globe,
  Send,
  Mic,
  Bot,
  User,
  ChevronDown,
  Shield,
  Lightbulb,
} from 'lucide-react';

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface SuggestionCard {
  id: string;
  question: string;
  icon: React.ReactNode;
  category: string;
}

// ────────────────────────────────────────────────────────────
// Suggested questions
// ────────────────────────────────────────────────────────────

const SUGGESTIONS: SuggestionCard[] = [
  {
    id: 'q1',
    question: 'How many youth found jobs in Northern Region this quarter?',
    icon: <Briefcase size={20} />,
    category: 'Employment',
  },
  {
    id: 'q2',
    question: 'Which facilities need urgent maintenance?',
    icon: <Building2 size={20} />,
    category: 'Infrastructure',
  },
  {
    id: 'q3',
    question: 'Show athletes with international potential outside football',
    icon: <Star size={20} />,
    category: 'Talent',
  },
  {
    id: 'q4',
    question: "What's the ROI of the Adwumawura programme?",
    icon: <TrendingUp size={20} />,
    category: 'Programme Analysis',
  },
  {
    id: 'q5',
    question: 'Compare sports participation across all 16 regions',
    icon: <BarChart3 size={20} />,
    category: 'Participation',
  },
  {
    id: 'q6',
    question: 'How much Sports Fund has been disbursed?',
    icon: <Wallet size={20} />,
    category: 'Finance',
  },
  {
    id: 'q7',
    question: 'Which regions have the worst skills gaps?',
    icon: <MapPin size={20} />,
    category: 'Skills Intelligence',
  },
  {
    id: 'q8',
    question: 'S\u025Bn na adwuma hwehw\u025B k\u0254 so w\u0254 Ashanti Region?',
    icon: <Globe size={20} />,
    category: 'Twi Query',
  },
];

// ────────────────────────────────────────────────────────────
// Pre-built AI responses
// ────────────────────────────────────────────────────────────

const AI_RESPONSES: Record<string, string> = {
  'How many youth found jobs in Northern Region this quarter?':
    `Based on the latest data, **2,847 youth** in the Northern Region have been matched with job opportunities this quarter, a **14.2% increase** from last quarter.

\u2022 Tamale Metropolitan: 1,234 matches
\u2022 Sagnarigu Municipal: 498 matches
\u2022 Yendi Municipal: 312 matches
\u2022 Mion District: 203 matches
\u2022 Other districts: 600 matches

Top demanded skills in Northern Region: **Welding** (gap ratio 3.8), **Agricultural Technology** (gap ratio 3.2), and **Solar Installation** (gap ratio 2.9).

The region's match success rate of **31.7%** is slightly below the national average of 34.2%. I recommend expanding TVET programme capacity in Tamale, particularly at Tamale Technical University's welding and solar installation programmes.

_Data source: YouthPulse Employment Intelligence, Q1 2026_`,

  'Which facilities need urgent maintenance?':
    `**18 facilities** are currently flagged as critical or high-priority for maintenance across Ghana:

**CRITICAL (Immediate Action Required):**
\u2022 **Baba Yara Sports Stadium** (Ashanti) \u2014 Structural damage to east stand, waterlogged pitch, broken floodlights. CAF banned for international matches. Est. repair: **GH\u20B512,500,000**
\u2022 **Tamale Sports Stadium** (Northern) \u2014 Athletics track surface deterioration, crumbling perimeter wall. Est. repair: **GH\u20B53,200,000**
\u2022 **Sunyani Coronation Park** (Bono) \u2014 Condemned spectator stands, drainage failure. Est. repair: **GH\u20B52,100,000**

**HIGH PRIORITY (Within 90 Days):**
\u2022 **Cape Coast Stadium** (Central) \u2014 Seating damage, drainage issues. Est. repair: **GH\u20B54,800,000**
\u2022 **Essipong Stadium** (Western) \u2014 Pitch degradation, broken changing rooms. Est. repair: **GH\u20B52,900,000**
\u2022 **Wa Sports Stadium** (Upper West) \u2014 No functional floodlights, fencing collapsed. Est. repair: **GH\u20B51,800,000**

Total estimated repair cost for all 18 critical facilities: **GH\u20B545.2M**

The AI predictive maintenance model forecasts that **7 additional facilities** will reach critical status within the next 6 months if preventive action is not taken. Priority recommendation: Begin Baba Yara Stadium renovation before the **2026 CAF deadline**.

_Data source: YouthPulse Infrastructure Intelligence, Feb 2026_`,

  'Show athletes with international potential outside football':
    `I identified **47 athletes** across non-football disciplines who are performing at or above the 95th percentile nationally, indicating international potential:

**ELITE TIER (Top 1% \u2014 International Medal Potential):**
\u2022 **Abena Kyeremaa**, 19, Athletics \u2014 100m: 11.42s (ranked #3 nationally, African Junior level)
\u2022 **Isaac Dogboe Jr.**, 17, Boxing \u2014 Bantamweight, 14-0 amateur record, West African U-18 Champion
\u2022 **Emmanuel Tettey**, 21, Weightlifting \u2014 73kg class, Clean & Jerk: 152kg (Commonwealth Games qualifying)
\u2022 **Priscilla Amoako**, 20, Long Jump \u2014 6.38m (Olympic B-standard proximity)

**EXCEPTIONAL TIER (Top 5% \u2014 Continental Potential):**
\u2022 Athletics: 12 athletes (sprints: 5, jumps: 4, throws: 3)
\u2022 Boxing: 8 athletes across 5 weight classes
\u2022 Swimming: 4 athletes (freestyle & butterfly)
\u2022 Weightlifting: 6 athletes
\u2022 Judo: 3 athletes
\u2022 Table Tennis: 5 athletes

**KEY INSIGHT:** These 47 athletes are spread across **9 regions**, but **zero** have received national team funding this fiscal year. Combined estimated support needed: **GH\u20B52.1M/year** \u2014 a fraction of a single Black Stars friendly match budget.

Sport-fit analysis suggests **23 football academy players** may actually have higher potential in athletics or boxing based on their physical profiles.

_Data source: YouthPulse Talent Discovery, Feb 2026_`,

  "What's the ROI of the Adwumawura programme?":
    `**Adwumawura Project \u2014 Return on Investment Analysis:**

**Programme Overview:**
\u2022 Total enrolled (2024-2025): **8,420 youth**
\u2022 Government investment: **GH\u20B518.6M**
\u2022 Cost per participant: **GH\u20B52,209**

**Employment Outcomes:**
\u2022 Completion rate: **73.4%** (6,180 completed)
\u2022 Employment rate at 6 months: **41.2%** (2,546 placed)
\u2022 Employment rate at 12 months: **52.8%** (3,264 placed or self-employed)
\u2022 Cost per successful employment outcome: **GH\u20B55,700**

**Income Impact:**
\u2022 Average monthly income before: **GH\u20B5380**
\u2022 Average monthly income after: **GH\u20B5920**
\u2022 Income increase: **+142%**
\u2022 Estimated annual economic value generated: **GH\u20B521.2M**

**ROI Ratio: 1:1.14** \u2014 For every GH\u20B51 invested, GH\u20B51.14 in economic value is generated in the first year.

**Comparison to Other Programmes:**
\u2022 1 Million Coders Initiative: ROI 1:1.89 (higher but smaller scale)
\u2022 NABCO: ROI 1:0.67 (below breakeven)
\u2022 YEA Modules: ROI 1:0.82

**Recommendation:** Scale Adwumawura in Northern and Upper East regions where demand-supply gaps are largest. Consider integrating the 1 Million Coders curriculum for a hybrid digital+trade programme.

_Data source: YouthPulse Programme Analytics, Jan 2026_`,

  'Compare sports participation across all 16 regions':
    `**Sports Participation Summary \u2014 All 16 Regions (2025-2026):**

**Total registered participants: 284,509**

**TOP 5 REGIONS (by participation rate per 1,000 youth):**
1. Greater Accra \u2014 58,230 participants (42.1 per 1,000)
2. Ashanti \u2014 49,812 participants (38.7 per 1,000)
3. Central \u2014 22,340 participants (35.2 per 1,000)
4. Western \u2014 19,870 participants (31.8 per 1,000)
5. Volta \u2014 17,920 participants (29.4 per 1,000)

**BOTTOM 5 REGIONS (urgent attention needed):**
12. Savannah \u2014 5,120 participants (11.3 per 1,000)
13. North East \u2014 4,380 participants (10.8 per 1,000)
14. Oti \u2014 4,210 participants (10.2 per 1,000)
15. Ahafo \u2014 3,890 participants (9.7 per 1,000)
16. Western North \u2014 3,440 participants (8.9 per 1,000)

**Gender Split:** 68% male, 32% female (national target: 45% female by 2028)

**Sport Diversity Index:** Football dominates with 61% of total participation. Athletics (12%), Basketball (7%), Volleyball (5%), and Boxing (4%) follow. 11 other sports share the remaining 11%.

**KEY INSIGHT:** The 5 northern savannah regions have 3-4x lower participation rates than southern coastal regions, correlating directly with facility availability. Only **12 functional sports facilities** serve these 5 regions combined, versus **87** in Greater Accra alone.

_Data source: YouthPulse Participation Analytics, Feb 2026_`,

  'How much Sports Fund has been disbursed?':
    `**Ghana Sports Fund \u2014 Fiscal Year 2025/2026 Status:**

**Total Approved Budget: GH\u20B5120,000,000**
**Disbursed to Date: GH\u20B578,400,000 (65.3%)**
**Committed (Approved, Pending Disbursement): GH\u20B518,200,000**
**Uncommitted Balance: GH\u20B523,400,000**

**Disbursement by Category:**
\u2022 Infrastructure & Facility Renovation: GH\u20B534,200,000 (43.6%)
\u2022 Athlete Welfare & Allowances: GH\u20B518,900,000 (24.1%)
\u2022 Competition & Travel: GH\u20B512,600,000 (16.1%)
\u2022 Grassroots Development: GH\u20B58,400,000 (10.7%)
\u2022 Administration: GH\u20B54,300,000 (5.5%)

**Disbursement by Sport:**
\u2022 Football: GH\u20B529,800,000 (38.0%) \u2014 \u26a0 Exceeds 25% equity cap
\u2022 Athletics: GH\u20B59,200,000 (11.7%)
\u2022 Boxing: GH\u20B56,100,000 (7.8%)
\u2022 Parasports: GH\u20B55,900,000 (7.5%) \u2014 Below 10% inclusion mandate
\u2022 Other sports: GH\u20B527,400,000 (35.0%)

**Pending Athlete Payments: 342 athletes** awaiting allowance disbursement (avg. 23 days overdue).

**AI Optimization Recommendation:** Redirect GH\u20B54.2M from uncommitted balance to parasports (to meet 10% mandate) and reduce football allocation in Q3 to meet the 25% equity cap.

_Data source: YouthPulse Fund Tracker, Feb 2026_`,

  'Which regions have the worst skills gaps?':
    `**Regional Skills Gap Analysis \u2014 Top Supply-Demand Mismatches:**

The skills gap score measures demand-to-supply ratio. A score above 2.0 indicates critical shortage.

**MOST CRITICAL GAPS (Score > 3.0):**
1. **Upper East** \u2014 Gap Score: 4.2
   \u2022 Solar Installation: gap 5.1 (3 jobs per qualified youth)
   \u2022 Agricultural Technology: gap 4.8
   \u2022 Plumbing: gap 3.7

2. **Northern** \u2014 Gap Score: 3.9
   \u2022 Welding: gap 4.4
   \u2022 Electrical Installation: gap 3.9
   \u2022 Auto Mechanics: gap 3.5

3. **Savannah** \u2014 Gap Score: 3.8
   \u2022 Construction Trades: gap 4.6
   \u2022 Solar Installation: gap 4.1
   \u2022 ICT/Data Entry: gap 3.2

4. **Upper West** \u2014 Gap Score: 3.5
   \u2022 Nursing Aide: gap 4.3
   \u2022 Agro-Processing: gap 3.8
   \u2022 Carpentry: gap 3.1

5. **North East** \u2014 Gap Score: 3.4
   \u2022 All construction trades: gap > 3.0
   \u2022 Health services: gap 3.6

**BEST BALANCED (Score < 1.5):**
\u2022 Greater Accra (1.1), Ashanti (1.3), Central (1.4)

**National Priority Skills** (highest demand across all regions): Solar Installation, Welding, Agricultural Technology, Software Development, Plumbing.

**Recommendation:** Deploy mobile NVTI training units to Upper East and Northern regions, targeting solar installation and welding \u2014 these two skills alone could address **2,400 unfilled positions**.

_Data source: YouthPulse Skills Intelligence, Feb 2026_`,

  'S\u025Bn na adwuma hwehw\u025B k\u0254 so w\u0254 Ashanti Region?':
    `**Ashanti Region \u2014 Adwuma Hwehw\u025B ne Nhyiamu\u025B Ho Nsɛm:**

W\u0254 Ashanti Region no, adwuma hwehw\u025B ak\u0254 so y\u025B w\u0254 Q1 2026 mu:

\u2022 **Mmerantewa a w\u0254aky\u025Br\u025B w\u0254n ho:** 127,340
\u2022 **Adwuma a w\u0254ahw\u025Bhw\u025B ama w\u0254n:** 5,890 (Q1 2026 nkoa)
\u2022 **Nhyiamu\u025B a edi mu:** 42.8% \u2014 \u025Bsen Ghana nyinaa mu average (34.2%)
\u2022 **Adwuma a \u025Bk\u0254 so y\u025B:** +18.3% sen Q4 2025

**Adwuma a na w\u0254hw\u025Bhw\u025B no paa w\u0254 Ashanti:**
\u2022 ICT ne Digital: 1,420 adwuma
\u2022 Nkwadanfo adwuma (Construction): 1,180 adwuma
\u2022 Ak\u025Bd\u025B ne Mfiri adwuma: 890 adwuma
\u2022 Ahoh\u0254f\u025B ne Ntade: 760 adwuma

**Nsɛm a \u025Bhia:** Kumasi Metropolitan ne Obuasi w\u0254n mu na adwuma pii w\u0254, nanso Offinso, Ejisu, ne Asante Akim no, adwuma hwehw\u025B w\u0254 h\u0254 nso nanso TVET programmes sua kakra.

---

**English Translation:**

In the Ashanti Region, job matching has been progressing well in Q1 2026:

\u2022 **Registered youth:** 127,340
\u2022 **Jobs matched:** 5,890 (Q1 2026 only)
\u2022 **Match success rate:** 42.8% \u2014 above national average (34.2%)
\u2022 **Growth:** +18.3% over Q4 2025

The region leads nationally in ICT, construction, and automotive sector matches. Kumasi and Obuasi are the strongest hubs, but districts like Offinso, Ejisu, and Asante Akim need expanded TVET presence.

_Nsɛm fi: YouthPulse Employment Intelligence, Q1 2026_`,
};

// ────────────────────────────────────────────────────────────
// Fallback response for unrecognised queries
// ────────────────────────────────────────────────────────────

const FALLBACK_RESPONSE = `Thank you for your question. I've searched across the YouthPulse database covering **847,293 registered youth**, **342 monitored facilities**, and **15,209 tracked athletes** across Ghana's 16 regions.

I'm currently processing your query against our datasets. In the full production system, I would:

1. Convert your question to a structured database query using LangChain
2. Retrieve relevant data from PostgreSQL and TimescaleDB
3. Generate a natural language response with specific figures

For this demo, try one of the suggested questions to see detailed AI-powered responses with real data patterns.

_Powered by Llama 3.1 8B running locally via Ollama \u2014 full data sovereignty, no external API calls._`;

// ────────────────────────────────────────────────────────────
// Utility: format timestamp
// ────────────────────────────────────────────────────────────

function formatTime(): string {
  return new Date().toLocaleTimeString('en-GH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ────────────────────────────────────────────────────────────
// Typing indicator component
// ────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-start gap-3 max-w-3xl"
    >
      {/* Bot avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 ring-1 ring-white/[0.06] flex items-center justify-center">
        <span className="text-[10px] font-bold text-amber-400">YP</span>
      </div>
      {/* Dots */}
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-surface-tertiary/80 border border-border">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-ghana-gold/70"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────
// Rendered message (with markdown-like formatting)
// ────────────────────────────────────────────────────────────

function renderFormattedText(text: string) {
  // Split into lines and process each
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    if (line.trim() === '') {
      elements.push(<div key={`br-${lineIdx}`} className="h-2" />);
      return;
    }

    // Process inline formatting
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partIdx = 0;

    // Process bold (**text**)
    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        // Text before bold
        if (boldMatch.index > 0) {
          parts.push(
            <span key={`t-${lineIdx}-${partIdx++}`}>
              {remaining.slice(0, boldMatch.index)}
            </span>
          );
        }
        // Bold text
        parts.push(
          <span
            key={`b-${lineIdx}-${partIdx++}`}
            className="font-semibold text-text-primary"
          >
            {boldMatch[1]}
          </span>
        );
        remaining = remaining.slice(
          boldMatch.index + boldMatch[0].length
        );
      } else {
        // Process italic (_text_) in remaining
        const italicMatch = remaining.match(/_(.+?)_/);
        if (italicMatch && italicMatch.index !== undefined) {
          if (italicMatch.index > 0) {
            parts.push(
              <span key={`t-${lineIdx}-${partIdx++}`}>
                {remaining.slice(0, italicMatch.index)}
              </span>
            );
          }
          parts.push(
            <span
              key={`i-${lineIdx}-${partIdx++}`}
              className="italic text-text-muted text-xs"
            >
              {italicMatch[1]}
            </span>
          );
          remaining = remaining.slice(
            italicMatch.index + italicMatch[0].length
          );
        } else {
          parts.push(
            <span key={`t-${lineIdx}-${partIdx++}`}>{remaining}</span>
          );
          remaining = '';
        }
      }
    }

    // Detect list items
    const isBullet =
      line.trimStart().startsWith('\u2022') ||
      line.trimStart().match(/^\d+\.\s/);

    if (isBullet) {
      elements.push(
        <div key={`line-${lineIdx}`} className="pl-2 py-0.5">
          {parts}
        </div>
      );
    } else if (
      line.includes('---')
    ) {
      elements.push(
        <div
          key={`hr-${lineIdx}`}
          className="border-t border-border/50 my-2"
        />
      );
    } else {
      elements.push(
        <div key={`line-${lineIdx}`} className="py-0.5">
          {parts}
        </div>
      );
    }
  });

  return <>{elements}</>;
}

// ────────────────────────────────────────────────────────────
// Chat message component
// ────────────────────────────────────────────────────────────

function ChatMessage({ message }: { message: ChatMessage }) {
  const isUser = message.type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-3 ${
        isUser ? 'flex-row-reverse' : ''
      } max-w-3xl ${isUser ? 'ml-auto' : ''}`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-ghana-gold to-ghana-gold-dark flex items-center justify-center">
          <User size={14} className="text-surface-primary" />
        </div>
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 ring-1 ring-white/[0.06] flex items-center justify-center">
          <span className="text-[10px] font-bold text-amber-400">YP</span>
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`
          relative min-w-0 max-w-full px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${
            isUser
              ? 'rounded-tr-sm bg-amber-500/10 border border-amber-500/20 text-text-primary'
              : 'rounded-tl-sm bg-surface-tertiary/80 border border-border border-l-2 border-l-ghana-gold/40 text-text-secondary'
          }
        `}
      >
        {isUser ? (
          <span>{message.text}</span>
        ) : (
          renderFormattedText(message.text)
        )}

        {/* Timestamp */}
        <div
          className={`mt-2 text-[10px] text-text-muted ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {isUser ? 'You' : 'YouthPulse AI'} \u00b7 {message.timestamp}
        </div>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────────────────
// Follow-up suggestions shown after first message
// ────────────────────────────────────────────────────────────

const FOLLOW_UP_SUGGESTIONS = [
  'Which facilities need urgent maintenance?',
  'Show athletes with international potential outside football',
  'How much Sports Fund has been disbursed?',
  'Which regions have the worst skills gaps?',
];

// ────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────

export default function AskAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'TWI'>('EN');
  const [micTooltip, setMicTooltip] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasMessages = messages.length > 0;

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  // Send a message (user or from suggestion)
  const handleSend = useCallback(
    (text?: string) => {
      const question = (text || inputText).trim();
      if (!question || isTyping) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        type: 'user',
        text: question,
        timestamp: formatTime(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate AI typing delay
      const delay = 1500 + Math.random() * 1000;
      setTimeout(() => {
        const response =
          AI_RESPONSES[question] || FALLBACK_RESPONSE;

        const aiMessage: ChatMessage = {
          id: generateId(),
          type: 'ai',
          text: response,
          timestamp: formatTime(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, delay);
    },
    [inputText, isTyping]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-4 md:-m-6 lg:-m-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-shrink-0 px-4 md:px-6 lg:px-8 pt-4 md:pt-6 pb-3 border-b border-border/50"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 ring-1 ring-white/[0.06]">
              <Sparkles size={20} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-text-primary">
                Ask AI
              </h1>
              <p className="text-xs text-text-muted">
                Ask questions about Ghana's youth &amp; sports data in
                English or Twi
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-tertiary/60 border border-border text-[10px] font-medium text-text-muted">
              <Shield size={10} className="text-ghana-gold" />
              Powered by Llama 3.1 &middot; 100% Local &middot; Full
              Data Sovereignty
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Chat area ── */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-6"
      >
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              /* ── Suggestions grid (no messages yet) ── */
              <motion.div
                key="suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Welcome text */}
                <div className="text-center mb-8 mt-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 ring-1 ring-white/[0.06] mb-4"
                  >
                    <Bot size={32} className="text-amber-400" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-heading font-semibold text-text-primary mb-2"
                  >
                    Akwaaba! How can I help you today?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-text-muted max-w-md mx-auto"
                  >
                    I can analyze data across 847,293 registered youth,
                    342 sports facilities, and 15,209 athletes across
                    all 16 regions of Ghana.
                  </motion.p>
                </div>

                {/* Suggestion cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <motion.button
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + idx * 0.06,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        handleSuggestionClick(suggestion.question)
                      }
                      className="
                        group relative text-left p-4 rounded-xl
                        bg-surface-secondary/80 backdrop-blur-xl
                        border border-white/[0.06]
                        hover:border-ghana-gold/30 hover:shadow-lg hover:shadow-ghana-gold/5
                        transition-all duration-300
                        cursor-pointer
                      "
                    >
                      {/* Subtle glow on hover */}
                      <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-0 group-hover:opacity-[0.08] blur-2xl transition-opacity duration-500 bg-ghana-gold" />

                      <div className="relative z-10 flex items-start gap-3">
                        <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/15 to-amber-600/5 ring-1 ring-white/[0.06] text-amber-400/80 group-hover:text-amber-400 transition-colors">
                          {suggestion.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted/60 group-hover:text-ghana-gold/60 transition-colors">
                            {suggestion.category}
                          </span>
                          <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors mt-0.5 leading-snug">
                            {suggestion.question}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ── Chat messages ── */
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>

                {/* Follow-up suggestions (shown when not typing and conversation started) */}
                {!isTyping && messages.length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb
                        size={14}
                        className="text-text-muted"
                      />
                      <span className="text-xs font-medium text-text-muted">
                        Try asking:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {FOLLOW_UP_SUGGESTIONS.filter(
                        (q) =>
                          !messages.some(
                            (m) => m.type === 'user' && m.text === q
                          )
                      )
                        .slice(0, 3)
                        .map((q) => (
                          <button
                            key={q}
                            onClick={() => handleSuggestionClick(q)}
                            className="
                              text-xs px-3 py-1.5 rounded-full
                              bg-surface-tertiary/60 border border-border
                              text-text-muted hover:text-text-secondary
                              hover:border-ghana-gold/20 hover:bg-surface-tertiary
                              transition-all duration-200
                            "
                          >
                            {q}
                          </button>
                        ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Input bar (sticky bottom) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex-shrink-0 border-t border-border/50 bg-surface-primary/80 backdrop-blur-xl px-4 md:px-6 lg:px-8 py-3"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-secondary/80 backdrop-blur-xl border border-white/[0.06] focus-within:border-ghana-gold/30 transition-colors">
            {/* Language toggle */}
            <button
              onClick={() =>
                setLanguage((prev) => (prev === 'EN' ? 'TWI' : 'EN'))
              }
              className="
                flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg
                bg-surface-tertiary/60 border border-border
                text-[11px] font-semibold
                text-text-muted hover:text-ghana-gold hover:border-ghana-gold/20
                transition-all duration-200
              "
              title={
                language === 'EN'
                  ? 'Switch to Twi'
                  : 'Switch to English'
              }
            >
              <Globe size={12} />
              {language}
            </button>

            {/* Text input */}
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                language === 'EN'
                  ? "Ask anything about Ghana's youth & sports data..."
                  : 'Bisa biribi fa Ghana mmerantewa ne agor\u0254...'
              }
              disabled={isTyping}
              className="
                flex-1 min-w-0 px-3 py-2 bg-transparent
                text-sm text-text-primary placeholder-text-muted/50
                outline-none
                disabled:opacity-50
              "
            />

            {/* Microphone (decorative) */}
            <div className="relative flex-shrink-0">
              <button
                onMouseEnter={() => setMicTooltip(true)}
                onMouseLeave={() => setMicTooltip(false)}
                className="
                  flex items-center justify-center w-8 h-8 rounded-lg
                  text-text-muted/40 hover:text-text-muted
                  transition-colors cursor-default
                "
                tabIndex={-1}
              >
                <Mic size={16} />
              </button>
              <AnimatePresence>
                {micTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg bg-surface-tertiary border border-border text-[10px] text-text-muted whitespace-nowrap"
                  >
                    Coming soon
                    <div className="absolute top-full right-3 w-2 h-2 bg-surface-tertiary border-r border-b border-border transform rotate-45 -translate-y-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Send button */}
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isTyping}
              className="
                flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg
                bg-gradient-to-br from-ghana-gold to-ghana-gold-dark
                text-surface-primary
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:shadow-lg hover:shadow-ghana-gold/20
                active:scale-95
                transition-all duration-200
              "
            >
              <Send size={16} />
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[10px] text-text-muted/40 mt-2">
            YouthPulse AI analyzes ministry data locally. All
            processing stays on-premise under Ghana Data Protection Act
            (Act 843).
          </p>
        </div>
      </motion.div>

      {/* ── Scroll-to-bottom FAB (shown when scrolled up) ── */}
      <ScrollToBottom containerRef={chatContainerRef} />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Scroll-to-bottom floating button
// ────────────────────────────────────────────────────────────

function ScrollToBottom({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShow(scrollHeight - scrollTop - clientHeight > 120);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={() =>
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
      className="
        fixed bottom-24 right-8 z-40
        flex items-center justify-center w-10 h-10 rounded-full
        bg-surface-secondary/90 backdrop-blur border border-border
        text-text-muted hover:text-ghana-gold hover:border-ghana-gold/30
        shadow-lg shadow-black/30
        transition-colors duration-200
      "
    >
      <ChevronDown size={18} />
    </motion.button>
  );
}
