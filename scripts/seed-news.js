const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// NewsArticle Schema (matching your model)
const NewsArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
  source: { type: String, default: 'World News Network' },
  sourceUrl: String,
  author: { type: String, default: 'Editorial Team' },
  category: {
    type: String,
    required: true,
    enum: ['World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics']
  },
  country: { type: String, default: 'us' },
  language: { type: String, default: 'en' },
  tags: [String],
  published: { type: Boolean, default: false },
  publishedAt: Date,
  readTime: { type: Number, default: 5 },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
}, { timestamps: true });

const NewsArticle = mongoose.models.NewsArticle || mongoose.model('NewsArticle', NewsArticleSchema);

// Sample news articles
const sampleArticles = [
  {
    title: "Global Leaders Meet to Discuss Climate Change Initiative",
    description: "World leaders convene at international summit to address urgent climate action and sustainable development goals for the next decade.",
    content: "In a historic gathering, representatives from over 150 nations assembled today to tackle one of the most pressing challenges of our time: climate change.\n\nThe summit, held in Geneva, Switzerland, marks a significant milestone in international cooperation on environmental issues. Leaders discussed ambitious targets for carbon reduction, renewable energy adoption, and sustainable development practices.\n\nKey topics included:\n- Carbon neutrality goals by 2050\n- Funding for developing nations to adopt green technologies\n- Protection of biodiversity and natural habitats\n- Ocean conservation and plastic pollution reduction\n\nUnited Nations Secretary-General emphasized the urgency of the situation, stating that \"we have a narrow window of opportunity to prevent irreversible damage to our planet.\"\n\nThe summit is expected to conclude with a comprehensive action plan that will guide global climate policy for years to come.",
    category: "World",
    tags: ["climate change", "summit", "environment", "global leaders"],
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=630&fit=crop",
    readTime: 6,
    featured: true,
    published: true,
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    title: "Stock Markets Reach Record Highs Amid Economic Recovery",
    description: "Major stock indices hit all-time peaks as investors show confidence in post-pandemic economic growth and corporate earnings.",
    content: "Financial markets celebrated today as major indices reached unprecedented levels, signaling robust investor confidence in the ongoing economic recovery.\n\nThe surge was driven by several factors:\n- Strong corporate earnings reports\n- Positive employment data\n- Central bank policy support\n- Technological sector growth\n\nMarket analysts attribute the rally to improved economic fundamentals and successful vaccination campaigns that have allowed businesses to reopen and resume normal operations.\n\nTech stocks led the gains, with several companies posting quarterly profits that exceeded expectations. The energy sector also showed strength as oil prices stabilized.\n\nHowever, experts caution investors to remain vigilant about potential risks, including inflation concerns and geopolitical tensions that could impact market stability.",
    category: "Business",
    tags: ["stock market", "economy", "finance", "trading"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop",
    readTime: 5,
    featured: true,
    published: true,
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    title: "Revolutionary AI Technology Transforms Healthcare Diagnosis",
    description: "New artificial intelligence system achieves 95% accuracy in early disease detection, promising to revolutionize medical diagnostics worldwide.",
    content: "Medical researchers have unveiled a groundbreaking AI system that demonstrates remarkable accuracy in detecting early-stage diseases, potentially saving millions of lives.\n\nThe technology, developed over five years by an international team of scientists, uses advanced machine learning algorithms to analyze medical images and patient data with unprecedented precision.\n\nKey achievements include:\n- 95% accuracy in cancer detection\n- Early identification of cardiovascular conditions\n- Faster diagnosis times\n- Reduced healthcare costs\n\nDr. Sarah Chen, lead researcher on the project, explained: \"This technology can detect subtle patterns that human eyes might miss, enabling earlier intervention and significantly better patient outcomes.\"\n\nThe system is currently undergoing clinical trials at major hospitals and is expected to receive regulatory approval next year. Healthcare providers are optimistic about its potential to democratize access to high-quality diagnostic services, especially in underserved regions.",
    category: "Technology",
    tags: ["AI", "healthcare", "medical technology", "innovation"],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop",
    readTime: 7,
    featured: true,
    published: true,
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  },
  {
    title: "Championship Finals: Underdogs Upset Favorites in Thrilling Match",
    description: "In an unexpected turn of events, the underdog team secures championship victory with a last-minute goal, stunning fans worldwide.",
    content: "Sports fans witnessed an unforgettable championship finale as the underdog team pulled off one of the greatest upsets in tournament history.\n\nThe match was a rollercoaster of emotions:\n- Early lead by favorites\n- Comeback by underdogs\n- Dramatic last-minute winner\n- Record-breaking attendance\n\nThe winning goal came in the 89th minute, sending the stadium into absolute pandemonium. Team captain Marcus Johnson called it \"the moment we've been dreaming of our entire lives.\"\n\nThe victory marks a historic achievement for the franchise, which had never won a championship in its 50-year history. Celebrations erupted across the city as fans took to the streets to celebrate the unlikely triumph.\n\nExperts are calling it one of the greatest sporting upsets of the decade, comparable to other historic victories that defied all odds.",
    category: "Sports",
    tags: ["championship", "sports", "upset victory", "finals"],
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
  },
  {
    title: "Blockbuster Film Breaks Opening Weekend Records",
    description: "The highly anticipated movie premiere shatters box office records, earning $250 million globally in its first three days.",
    content: "Hollywood is celebrating as the latest blockbuster exceeded all expectations, setting new records for opening weekend revenue.\n\nThe film's success can be attributed to several factors:\n- Star-studded cast\n- Innovative visual effects\n- Compelling storyline\n- Extensive marketing campaign\n\nDirector James Williams expressed gratitude: \"This success belongs to the incredible team who poured their hearts into this project. The audience response has been overwhelming.\"\n\nCritics have praised the film for its groundbreaking special effects and emotional depth. Audiences particularly appreciated the diverse representation and authentic storytelling.\n\nIndustry analysts predict the film will continue its strong performance and could become one of the highest-grossing movies of all time.",
    category: "Entertainment",
    tags: ["movies", "box office", "entertainment", "cinema"],
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=630&fit=crop",
    readTime: 4,
    published: true,
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
  },
  {
    title: "Breakthrough Drug Shows Promise in Cancer Treatment Trials",
    description: "Clinical trials reveal encouraging results for new cancer medication, offering hope to millions of patients worldwide.",
    content: "Medical researchers announced promising results from Phase III clinical trials of a revolutionary cancer treatment that could change the landscape of oncology.\n\nThe experimental drug demonstrated:\n- 70% tumor reduction in trial participants\n- Minimal side effects compared to traditional chemotherapy\n- Effectiveness across multiple cancer types\n- Improved quality of life for patients\n\nDr. Robert Martinez, oncology department head, stated: \"These results represent a significant advancement in cancer treatment. We're cautiously optimistic about the potential to save countless lives.\"\n\nThe medication works by targeting specific proteins that cancer cells use to grow and spread, while leaving healthy cells largely unaffected.\n\nPending FDA approval, the drug could be available to patients within two years, offering new hope to those battling various forms of cancer.",
    category: "Health",
    tags: ["healthcare", "cancer research", "medical breakthrough", "clinical trials"],
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=630&fit=crop",
    readTime: 6,
    published: true,
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    title: "Scientists Discover Potentially Habitable Exoplanet",
    description: "Astronomers identify Earth-like planet in nearby star system, marking major milestone in search for extraterrestrial life.",
    content: "The astronomy community is buzzing with excitement following the discovery of an exoplanet that exhibits many characteristics similar to Earth.\n\nKey findings include:\n- Location in the habitable zone\n- Similar size to Earth\n- Evidence of water vapor in atmosphere\n- Stable star system\n\nThe planet, designated Kepler-452c, orbits a sun-like star approximately 300 light-years from Earth. Advanced telescopes detected signs of atmospheric water vapor and appropriate temperature conditions for liquid water to exist on the surface.\n\nDr. Emily Zhang, lead astronomer, explained: \"While we can't yet confirm the presence of life, this planet possesses many of the ingredients necessary for life as we know it.\"\n\nThe discovery opens new avenues for research and raises profound questions about our place in the universe. Future missions will focus on detailed atmospheric analysis to search for biosignatures.",
    category: "Science",
    tags: ["space", "astronomy", "exoplanet", "discovery"],
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000)
  },
  {
    title: "New Infrastructure Bill Passes with Bipartisan Support",
    description: "Congress approves comprehensive infrastructure package aimed at modernizing transportation, broadband, and clean energy systems.",
    content: "In a rare display of bipartisan cooperation, lawmakers passed sweeping infrastructure legislation that promises to reshape the nation's physical framework.\n\nThe $1.2 trillion package includes:\n- Highway and bridge repairs\n- High-speed internet expansion\n- Clean energy infrastructure\n- Public transit improvements\n- Water system upgrades\n\nPresident addressed the nation: \"This investment in America's future will create millions of jobs, strengthen our economy, and improve the lives of all citizens.\"\n\nThe bill received support from both major parties, with legislators acknowledging the critical need for infrastructure improvements that have been delayed for decades.\n\nImplementation will begin immediately, with projects prioritized based on urgency and economic impact. Economists predict the initiative will boost GDP growth and create sustainable employment opportunities across multiple sectors.",
    category: "Politics",
    tags: ["politics", "infrastructure", "legislation", "government"],
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=630&fit=crop",
    readTime: 6,
    published: true,
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000)
  },
  // Additional articles for variety
  {
    title: "Cybersecurity Experts Warn of Rising Threats to Smart Devices",
    description: "New report highlights vulnerabilities in IoT devices, urging consumers and manufacturers to prioritize security measures.",
    content: "A comprehensive cybersecurity report released today reveals alarming vulnerabilities in smart home devices and Internet of Things (IoT) technology.\n\nMajor concerns include:\n- Weak default passwords\n- Unencrypted data transmission\n- Lack of regular security updates\n- Growing number of attack vectors\n\nCybersecurity analyst David Wong emphasized: \"As we connect more devices to the internet, we exponentially increase our attack surface. Security must be a priority, not an afterthought.\"\n\nThe report recommends that consumers change default credentials, keep devices updated, and use separate networks for IoT devices. Manufacturers are urged to implement security-by-design principles.\n\nIndustry leaders have pledged to collaborate on establishing comprehensive security standards to protect consumers from emerging threats.",
    category: "Technology",
    tags: ["cybersecurity", "IoT", "smart devices", "data protection"],
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
  },
  {
    title: "Major Tech Company Announces Sustainable Manufacturing Initiative",
    description: "Industry leader commits to 100% renewable energy and zero-waste manufacturing by 2030, setting new environmental standards.",
    content: "A leading technology corporation unveiled an ambitious plan to achieve carbon neutrality and eliminate waste from its manufacturing processes.\n\nThe initiative includes:\n- Transition to 100% renewable energy\n- Recycled materials in products\n- Zero-waste manufacturing facilities\n- Supply chain sustainability requirements\n\nCEO Amanda Stevens announced: \"We have a responsibility to lead the industry in environmental stewardship. This isn't just good for the planet—it's essential for our future.\"\n\nThe company plans to invest $10 billion over the next five years to retrofit facilities, develop sustainable materials, and implement circular economy principles.\n\nEnvironmental groups applauded the announcement while emphasizing the need for industry-wide adoption of similar practices. Other major corporations are expected to follow suit with their own sustainability commitments.",
    category: "Business",
    tags: ["sustainability", "business", "environment", "corporate responsibility"],
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000)
  },
  {
    title: "International Food Festival Celebrates Global Culinary Diversity",
    description: "Annual event showcases cuisines from 50 countries, attracting food enthusiasts and promoting cultural exchange through gastronomy.",
    content: "The vibrant streets came alive with aromas and flavors from around the world as the International Food Festival kicked off its 10th anniversary celebration.\n\nHighlights include:\n- 50 countries represented\n- Celebrity chef demonstrations\n- Traditional cooking workshops\n- Cultural performances\n\nFestival organizer Maria Garcia shared: \"Food brings people together across all boundaries. This festival celebrates our diversity and shows how cuisine can be a universal language.\"\n\nAttendees enjoyed authentic dishes ranging from Asian street food to European delicacies, African specialties to Latin American favorites. The event also featured cooking demonstrations by renowned chefs and interactive workshops teaching traditional cooking techniques.\n\nThe festival not only delights food lovers but also supports local restaurants and promotes understanding between different cultures through shared culinary experiences.",
    category: "Entertainment",
    tags: ["food festival", "culture", "international cuisine", "events"],
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop",
    readTime: 4,
    published: true,
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000)
  },
  {
    title: "Historic Peace Agreement Signed After Decades of Conflict",
    description: "Long-standing regional dispute resolved as nations commit to diplomatic solutions and economic cooperation.",
    content: "World leaders celebrated a momentous achievement as former adversaries signed a comprehensive peace accord, ending decades of tension and conflict.\n\nThe agreement establishes:\n- Permanent ceasefire\n- Joint economic development projects\n- Cultural exchange programs\n- Border demilitarization\n\nPeace negotiator Ambassador John Peterson reflected: \"This agreement represents the triumph of dialogue over conflict. It's a testament to what's possible when nations choose cooperation over confrontation.\"\n\nThe historic signing ceremony was attended by international dignitaries and observed by millions worldwide. Both nations have committed to working together on shared challenges including economic development, environmental protection, and cultural preservation.\n\nAnalysts view the agreement as a model for resolving other long-standing international disputes through patient diplomacy and mutual respect.",
    category: "World",
    tags: ["peace treaty", "diplomacy", "international relations", "conflict resolution"],
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop",
    readTime: 6,
    published: true,
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Renewable Energy Sector Creates Million New Jobs Globally",
    description: "Clean energy industry surpasses fossil fuels in employment, signaling major shift in global workforce and economy.",
    content: "The renewable energy sector achieved a significant milestone, employing over 12 million people worldwide—more than traditional fossil fuel industries combined.\n\nEmployment growth areas:\n- Solar panel installation\n- Wind turbine manufacturing\n- Battery technology\n- Smart grid development\n\nInternational Renewable Energy Agency Director highlighted: \"This transformation demonstrates that environmental sustainability and economic prosperity can go hand in hand.\"\n\nThe jobs span various skill levels and locations, from manufacturing facilities to installation teams, research laboratories to project management. Training programs are expanding to meet the growing demand for skilled workers.\n\nEconomists predict continued growth as nations accelerate their transition to clean energy sources, creating additional employment opportunities and driving innovation in green technologies.",
    category: "Business",
    tags: ["renewable energy", "employment", "green jobs", "economy"],
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Olympic Athletes Prepare for Summer Games with Innovative Training",
    description: "Next generation of competitors uses cutting-edge technology and data analytics to optimize performance ahead of major competition.",
    content: "As the summer games approach, athletes worldwide are employing revolutionary training methods combining traditional techniques with modern technology.\n\nTraining innovations include:\n- AI-powered performance analysis\n- Virtual reality simulation\n- Biomechanical optimization\n- Personalized nutrition plans\n\nOlympic coach Lisa Thompson explained: \"We're using technology to understand athlete performance at unprecedented levels, allowing us to fine-tune every aspect of their preparation.\"\n\nAthletes wear sensors that track everything from heart rate variability to muscle activation patterns, providing data that coaches use to optimize training programs. Virtual reality allows competitors to experience race conditions and practice mental preparation.\n\nThe integration of sports science and technology represents a new era in athletic performance, potentially leading to record-breaking performances at the upcoming games.",
    category: "Sports",
    tags: ["Olympics", "sports technology", "training", "athletics"],
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Mental Health Awareness Campaign Reaches Millions",
    description: "Global initiative reduces stigma and increases access to mental health resources through education and community support programs.",
    content: "A groundbreaking mental health awareness campaign has reached its goal of engaging 10 million people worldwide, significantly impacting public perception and access to care.\n\nCampaign achievements:\n- 10 million participants reached\n- 30% increase in help-seeking behavior\n- Reduced stigma measurements\n- Expanded community resources\n\nMental health advocate Dr. Jennifer Kim stated: \"By openly discussing mental health, we're breaking down barriers and making it easier for people to seek the help they need.\"\n\nThe initiative provided free resources, trained thousands of peer supporters, and partnered with schools and workplaces to create supportive environments. Social media campaigns featuring personal stories helped normalize conversations about mental wellness.\n\nOrganizers plan to expand the program globally, emphasizing that mental health is as important as physical health and should be treated with equal priority.",
    category: "Health",
    tags: ["mental health", "awareness campaign", "public health", "wellness"],
    imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1200&h=630&fit=crop",
    readTime: 6,
    published: true,
    publishedAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Quantum Computer Solves Complex Problem in Record Time",
    description: "Breakthrough demonstration shows quantum computing solving in minutes what would take classical supercomputers thousands of years.",
    content: "Researchers achieved a quantum computing milestone by solving a complex mathematical problem exponentially faster than the world's most powerful classical supercomputers.\n\nBreakthrough details:\n- 100-qubit quantum processor\n- Problem solved in 3 minutes\n- Classical equivalent: 10,000+ years\n- Practical applications emerging\n\nLead scientist Dr. Michael Zhang celebrated: \"This demonstrates quantum supremacy in a practical application, moving us beyond theoretical demonstrations to real-world problem-solving.\"\n\nThe achievement has implications for drug discovery, materials science, cryptography, and artificial intelligence. While practical quantum computers for everyday use remain years away, this milestone accelerates development timelines.\n\nTech companies and research institutions are increasing investments in quantum research, recognizing its potential to revolutionize computing and solve previously intractable problems.",
    category: "Science",
    tags: ["quantum computing", "technology", "scientific breakthrough", "innovation"],
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop",
    readTime: 6,
    published: true,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Education Reform Bill Aims to Modernize School Systems",
    description: "Comprehensive legislation proposes updates to curriculum, teacher training, and technology integration in public schools nationwide.",
    content: "Lawmakers introduced sweeping education reform legislation designed to prepare students for 21st-century challenges and opportunities.\n\nKey provisions:\n- Updated STEM curriculum\n- Digital literacy requirements\n- Teacher professional development\n- Equitable funding mechanisms\n- Mental health support services\n\nEducation Secretary Patricia Anderson explained: \"Our education system must evolve to meet the needs of today's students and tomorrow's workforce. This bill provides the framework for that transformation.\"\n\nThe legislation emphasizes critical thinking, creativity, and technological proficiency alongside traditional academic subjects. It also addresses disparities in educational resources and outcomes across different communities.\n\nEducators and parents have expressed cautious optimism, hoping the reforms will improve educational quality while preserving local control and acknowledging diverse student needs.",
    category: "Politics",
    tags: ["education", "policy", "school reform", "legislation"],
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Streaming Service Announces Award-Winning Original Series",
    description: "Platform's exclusive content dominates entertainment awards season, reshaping traditional television industry landscape.",
    content: "The streaming entertainment landscape continues to evolve as one platform's original programming swept major award categories, signaling a fundamental shift in content production and consumption.\n\nAward highlights:\n- Best Drama Series\n- Outstanding Acting performances\n- Technical excellence awards\n- International recognition\n\nStreaming executive Sarah Martinez commented: \"This success validates our commitment to diverse, high-quality storytelling. We're honored that audiences and critics have embraced our vision.\"\n\nThe platform invested heavily in original content, attracting top creative talent with creative freedom and substantial resources. Their shows have consistently pushed boundaries in storytelling, representation, and production values.\n\nTraditional broadcasters are adapting their strategies in response, with many launching their own streaming services and investing more in original programming to compete in the rapidly changing entertainment ecosystem.",
    category: "Entertainment",
    tags: ["streaming", "television", "awards", "entertainment industry"],
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Humanitarian Aid Reaches Remote Communities After Natural Disaster",
    description: "International relief efforts successfully deliver essential supplies to isolated regions affected by recent catastrophic flooding.",
    content: "Relief organizations coordinated a massive humanitarian operation to assist communities devastated by unprecedented flooding, showcasing international cooperation in crisis response.\n\nRelief efforts include:\n- Emergency food and water supplies\n- Medical assistance and medications\n- Temporary shelter materials\n- Communication equipment\n- Psychological support services\n\nUnited Nations coordinator emphasized: \"The swift response demonstrates humanity's capacity for compassion and effective collaboration when facing adversity together.\"\n\nHelicopters and boats transported supplies to areas cut off by floodwaters, while volunteers distributed aid and provided medical care. International donors contributed millions in emergency funding to support ongoing relief efforts.\n\nRecovery will require sustained commitment as communities rebuild infrastructure, homes, and livelihoods. Long-term development plans aim to increase resilience against future natural disasters through improved infrastructure and early warning systems.",
    category: "World",
    tags: ["humanitarian aid", "natural disaster", "relief efforts", "international cooperation"],
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=630&fit=crop",
    readTime: 6,
    published: true,
    publishedAt: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Archaeological Discovery Reveals Ancient Civilization Secrets",
    description: "Excavation team uncovers remarkably preserved artifacts providing new insights into mysterious historical culture.",
    content: "Archaeologists made a stunning discovery that promises to rewrite understanding of an ancient civilization that thrived thousands of years ago.\n\nMajor findings:\n- Intact temple complex\n- Sophisticated water systems\n- Advanced astronomical tools\n- Unprecedented artistic artifacts\n- Written records in unknown script\n\nLead archaeologist Dr. Rebecca Thompson stated: \"These finds challenge our assumptions about ancient technological capabilities. The sophistication we're seeing is remarkable.\"\n\nThe site reveals evidence of advanced engineering, complex social organization, and scientific knowledge that rivals contemporary civilizations. Artifacts include intricate jewelry, ceremonial objects, and everyday items that provide glimpses into daily life.\n\nResearchers will spend years analyzing the discoveries, using modern techniques like DNA analysis and advanced dating methods to piece together the civilization's history and eventual decline.",
    category: "Science",
    tags: ["archaeology", "history", "discovery", "ancient civilization"],
    imageUrl: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=1200&h=630&fit=crop",
    readTime: 5,
    published: true,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

async function seedNews() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing news articles...');
    await NewsArticle.deleteMany({});
    console.log('✅ Cleared existing articles');

    console.log('📝 Creating sample news articles...');

    const articles = await NewsArticle.insertMany(
      sampleArticles.map(article => ({
        ...article,
        slug: article.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      }))
    );

    console.log(`✅ Created ${articles.length} news articles`);

    console.log('\n📊 Summary:');
    const categories = [...new Set(articles.map(a => a.category))];
    categories.forEach(cat => {
      const count = articles.filter(a => a.category === cat).length;
      console.log(`   ${cat}: ${count} articles`);
    });

    const featured = articles.filter(a => a.featured).length;
    console.log(`   Featured: ${featured} articles`);

    console.log('\n🎉 Sample news data seeded successfully!');
    console.log('👉 Visit http://localhost:3000 to see your news website');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding news:', error);
    process.exit(1);
  }
}

seedNews();
