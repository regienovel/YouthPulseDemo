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
    question: 'What is the current NEET rate and which regions are most affected?',
    icon: <Building2 size={20} />,
    category: 'NEET Analysis',
  },
  {
    id: 'q3',
    question: 'How effective are our youth empowerment programmes?',
    icon: <Star size={20} />,
    category: 'Programmes',
  },
  {
    id: 'q4',
    question: "What's the ROI of the Adwumawura programme?",
    icon: <TrendingUp size={20} />,
    category: 'Programme Analysis',
  },
  {
    id: 'q5',
    question: 'How many youth are at risk of emigrating and from which regions?',
    icon: <BarChart3 size={20} />,
    category: 'Migration Risk',
  },
  {
    id: 'q6',
    question: 'What is the digital skills gap across regions?',
    icon: <Wallet size={20} />,
    category: 'Digital Skills',
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

  'What is the current NEET rate and which regions are most affected?':
    `**NEET Analysis — Not in Education, Employment, or Training:**

**National NEET Rate: 25.8%** (approximately **1.34 million youth** aged 15-35)
This represents a **-2.3 percentage point decline** from Q3 2025, indicating early programme impact.

**MOST AFFECTED REGIONS (NEET Rate > 30%):**
\u2022 **Northern Region** \u2014 38.2% NEET rate (142,300 youth)
\u2022 **Upper East** \u2014 36.5% NEET rate (78,400 youth)
\u2022 **Savannah** \u2014 35.8% NEET rate (52,100 youth)
\u2022 **North East** \u2014 34.1% NEET rate (38,900 youth)
\u2022 **Upper West** \u2014 33.4% NEET rate (44,200 youth)

**BEST PERFORMING REGIONS:**
\u2022 **Greater Accra** \u2014 16.2% (benefiting from urban job market density)
\u2022 **Ashanti** \u2014 19.8% (strong TVET ecosystem around Kumasi)

**Gender Breakdown:** Female NEET rate (31.4%) is significantly higher than male (20.8%), with the gap widest in northern regions.

**KEY INSIGHT:** The 5 northern savannah regions collectively account for **42% of all NEET youth** despite having only **18% of the total youth population**. Targeted interventions in these regions could reduce the national rate by up to 8 percentage points.

**Recommendation:** Scale the NEIP entrepreneurship support and mobile TVET units in Northern, Upper East, and Savannah regions where the gap is most critical.

_Data source: YouthPulse NEET Intelligence, Feb 2026_`,

  'How effective are our youth empowerment programmes?':
    `**Youth Empowerment Programme Effectiveness Dashboard:**

**8 active programmes** currently being tracked across all 16 regions, serving a total of **48,750 youth**.

**TOP PERFORMING PROGRAMMES (by transition-to-employment rate):**
\u2022 **1 Million Coders Initiative** \u2014 67.3% transition rate, avg. income uplift +185%
\u2022 **YEA Artisan Modules** \u2014 58.9% transition rate, 12,400 enrolled
\u2022 **Adwumawura Project** \u2014 52.8% transition rate at 12 months
\u2022 **NEIP Entrepreneurship** \u2014 48.2% launched viable businesses

**UNDERPERFORMING PROGRAMMES (need review):**
\u2022 **NABCO** \u2014 23.4% transition rate (most participants return to unemployment after contract)
\u2022 **Generic Skills Training** \u2014 31.2% transition rate (curriculum-job mismatch)

**Overall Impact Metrics:**
\u2022 Total youth transitioned to employment/self-employment: **18,420**
\u2022 Average monthly income before programmes: GH\u20B5380
\u2022 Average monthly income after: GH\u20B5920 (+142%)
\u2022 Combined economic value generated: GH\u20B5203M annually

**Digital Skills Progress:** 124,500 of 500,000 target (24.9%) enrolled in digital literacy programmes. On track for 2028 target.

_Data source: YouthPulse Programme Analytics, Feb 2026_`,

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

  'How many youth are at risk of emigrating and from which regions?':
    `**Youth Migration Risk Analysis \u2014 February 2026:**

**National finding: 72% of Ghanaian youth (aged 15-35) are considering emigration** according to YouthPulse survey data cross-referenced with passport application trends and NEET status.

**Total youth at HIGH migration risk: ~389,000**
These are youth who are NEET + have actively taken steps toward emigration (passport applications, visa inquiries, or engagement with migration agents).

**HIGHEST RISK REGIONS:**
1. **Greater Accra** \u2014 78,200 high-risk youth (highest absolute, driven by awareness of opportunities abroad)
2. **Ashanti** \u2014 62,400 high-risk youth (strong diaspora networks in UK/US)
3. **Northern** \u2014 48,100 high-risk youth (desperation-driven, highest NEET overlap)
4. **Volta** \u2014 34,800 high-risk youth (proximity to Togo corridor)
5. **Upper East** \u2014 31,200 high-risk youth (highest rate per capita at 41%)

**Top Stated Reasons for Wanting to Leave:**
\u2022 Lack of job opportunities: 64%
\u2022 Low wages / cost of living: 52%
\u2022 Better education abroad: 38%
\u2022 Family/peer pressure: 27%
\u2022 Political disillusionment: 19%

**KEY INSIGHT:** Youth who have been enrolled in YouthPulse empowerment programmes show a **43% lower emigration intent** than non-enrolled peers with similar demographics. This suggests that targeted skills training and job matching can significantly reduce brain drain.

**Recommendation:** Launch "Stay & Build Ghana" campaign integrated with NEIP entrepreneurship grants in the top 5 at-risk regions. Estimated cost: GH\u20B58.5M. Potential retention: 45,000 skilled youth.

_Data source: YouthPulse Migration Risk Analytics, Feb 2026_`,

  'What is the digital skills gap across regions?':
    `**Digital Skills Gap Analysis \u2014 All 16 Regions:**

**National Digital Literacy Rate (youth 15-35): 34.2%**
**Target by 2028: 65%** (per 1 Million Coders Initiative + Ghana Digital Agenda)

**Progress: 124,500 enrolled / 500,000 target (24.9%)**

**MOST DIGITALLY UNDERSERVED REGIONS:**
1. **Savannah** \u2014 8.3% digital literacy rate (2,100 youth trained)
2. **North East** \u2014 9.1% (1,800 youth trained)
3. **Upper West** \u2014 11.4% (3,200 youth trained)
4. **Upper East** \u2014 12.8% (4,100 youth trained)
5. **Oti** \u2014 14.2% (2,900 youth trained)

**MOST DIGITALLY ADVANCED REGIONS:**
1. **Greater Accra** \u2014 58.4% (42,800 trained, strong private sector ecosystem)
2. **Ashanti** \u2014 41.2% (28,300 trained, Kumasi tech hub growth)

**Skills Breakdown (of 124,500 enrolled):**
\u2022 Basic computer literacy: 48,200 (38.7%)
\u2022 Mobile app development: 18,900 (15.2%)
\u2022 Web development: 16,400 (13.2%)
\u2022 Data entry & management: 14,800 (11.9%)
\u2022 Digital marketing: 12,100 (9.7%)
\u2022 Graphic design: 8,400 (6.7%)
\u2022 AI/ML foundations: 5,700 (4.6%)

**Employment Outcome:** 67.3% of 1 Million Coders graduates found digital employment within 6 months, earning an average of **GH\u20B52,400/month** vs. national youth average of **GH\u20B5920/month**.

**Recommendation:** Deploy mobile digital labs (container-based computer labs with satellite internet) to the 5 most underserved regions. Each unit can train 200 youth/month at GH\u20B51.2M setup cost.

_Data source: YouthPulse Digital Skills Intelligence, Feb 2026_`,

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

const FALLBACK_RESPONSE = `Thank you for your question. I've searched across the YouthPulse database covering **847,293 registered youth**, **48,750 programme enrolments**, and **1.34M NEET youth** tracked across Ghana's 16 regions.

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
  'What is the current NEET rate and which regions are most affected?',
  'How effective are our youth empowerment programmes?',
  'What is the digital skills gap across regions?',
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
                Ask questions about Ghana's youth development data in
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
                    48,750 programme enrolments, and NEET trends across
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
                  ? "Ask anything about Ghana's youth development data..."
                  : 'Bisa biribi fa Ghana mmerantewa ho nsɛm...'
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
