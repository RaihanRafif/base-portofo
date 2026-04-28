// Final English version of the portfolio data
export const portfolioData = {
    projects: [
        {
            "id": "kedai-kopi-ujung-langit",
            "date": "2026",
            "title": "Kedai Kopi Di Ujung Langit - Landing Page",
            "category": "WEB DEVELOPMENT",
            "summary": "A clean, modern, and SEO-optimized landing page for a specialty coffee shop in Yogyakarta featuring menu showcase, gallery, location mapping, and direct WhatsApp integration for reservations.",
            "client": "Kedai Kopi Di Ujung Langit (Personal Showcase)",
            "overview": "Developed a fully responsive landing page for 'Kedai Kopi Di Ujung Langit', a specialty coffee shop in Sorosutan, Umbulharjo, Yogyakarta. The website features a dark, elegant design with smooth scroll animations, optimized performance, and direct WhatsApp integration for customer reservations. Built entirely with vanilla HTML, CSS, and JavaScript without any frameworks, focusing on lightweight, fast-loading, and accessible user experience.",
            "role": "Frontend Developer",
            "mission": "The goal of this project was to create a professional, high-converting landing page that effectively showcases the coffee shop's offerings while providing seamless customer interaction through WhatsApp integration. The website was designed to be lightweight, SEO-friendly, and easy to maintain without requiring complex frameworks or backend infrastructure.",
            "impact": "The landing page successfully established a professional online presence for the coffee shop, making it easier for customers to discover the menu, view the venue, and make reservations. The direct WhatsApp integration streamlined the booking process, eliminating friction and increasing customer engagement. The lightweight design ensures fast loading times and excellent user experience across all devices.",
            "contributions": [
                "Designed and developed a fully responsive landing page with modern UI/UX principles and dark theme aesthetic.",
                "Implemented smooth scroll-reveal animations using Intersection Observer API for enhanced user engagement.",
                "Created an interactive contact form with client-side validation that integrates directly with WhatsApp.",
                "Optimized images using WebP format with JPG fallback for improved performance and compatibility.",
                "Implemented comprehensive SEO optimization including meta tags, Open Graph, and structured data (JSON-LD).",
                "Built a mobile-first responsive design with hamburger navigation and smooth transitions.",
                "Developed an accessible interface following WCAG guidelines with proper ARIA labels and keyboard navigation."
            ],
            "keyfeatures": [
                "Responsive Design: Fully responsive layout that adapts seamlessly across desktop, tablet, and mobile devices.",
                "Dark Theme UI: Modern dark theme with elegant gradient backgrounds and amber/green accent colors.",
                "Scroll Reveal Animations: Smooth fade-in and slide-up animations triggered by Intersection Observer API.",
                "WhatsApp Integration: Contact form that directly opens WhatsApp with pre-filled reservation message.",
                "Interactive Menu Display: Well-organized menu cards showing drinks, filter coffee, and snacks with pricing.",
                "Gallery Section: Asymmetric grid layout showcasing venue atmosphere with optimized images.",
                "Google Maps Integration: Embedded map with exact location coordinates and direct navigation link.",
                "FAQ Accordion: Expandable FAQ section using native HTML details/summary elements.",
                "SEO Optimized: Complete meta tags, Open Graph, Twitter Cards, and structured data for search engines.",
                "Performance Optimized: Image preloading, lazy loading, WebP support, and minimal JavaScript.",
                "Accessibility Features: Skip link, ARIA labels, semantic HTML, and keyboard navigation support.",
                "Sticky Navigation: Header that remains visible on scroll with backdrop blur effect."
            ],
            "assets": {
                "video": null,
                "youtubeId": null,
                "images": [
                    '/assets/projects/kopikapsul/1.png',
                    '/assets/projects/kopikapsul/2.png',
                    '/assets/projects/kopikapsul/3.png',
                    '/assets/projects/kopikapsul/4.png',
                ]
            },
            "tech": [
                "HTML5",
                "CSS3",
                "JavaScript (Vanilla)",
                "Intersection Observer API",
                "Google Maps API",
                "WhatsApp API"
            ],
            "liveUrl": "https://raihanrafif.github.io/base-portofo/projects/landing-page(dummy)/kopi-kapsul/",
            "repoUrl": "https://github.com/RaihanRafif/base-portofo/tree/main/projects/landing-page(dummy)/kopi-kapsul",
            "theme": {
                "bg": "bg-gray-900",
                "text": "text-amber-400",
                "hover": "hover:text-amber-300",
                "buttonBg": "bg-white/5",
                "buttonHover": "hover:bg-white/10",
                "fill": "#F59E0B"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"{FILL_COLOR}\"><path d=\"M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z\"/></svg>"
        },
        {
            "id": "inventory-berkah-jaya",
            "date": "2026",
            "title": "Inventory Management System",
            "category": "FULLSTACK WEB DEVELOPMENT",
            "summary": "A full-featured inventory & POS web app with dual light/dark theme for a grocery store (toko sembako), featuring role-based access, product & user management, supplier handling, purchase/sales transactions with automatic stock control, and analytics dashboards with charts.",
            "client": "Toko Sembako Berkah Jaya (Personal Showcase)",
            "overview": "Built an Inventory Management System for a small-to-mid retail grocery store workflow: master data (products, categories, suppliers, users), POS checkout, purchases & sales transactions, and analytical reporting. The app uses Next.js 14 (App Router) with TypeScript, MySQL + Sequelize for data persistence, NextAuth for authentication, and interactive charts (Recharts/Chart.js) for dashboard insights. Database setup is supported by fixed SQL schema + seed data for fast local onboarding.",
            "role": "Fullstack Developer",
            "mission": "Create a reliable internal system that reduces stock mistakes and speeds up daily operations: cashier transactions (POS), incoming stock (purchases), outgoing stock (sales), and real-time inventory visibility. The project emphasizes clean API design, RBAC security, and dashboards that help store owners make quick decisions.",
            "impact": "Improves operational accuracy by enforcing stock validation on POS, centralizing product data, and providing clear performance analytics (revenue, profit, transaction trends). With seed + schema scripts, the app is easy to bootstrap for testing, demos, and iterative development.",
            "contributions": [
                "Designed the app architecture using Next.js 14 App Router with TypeScript and a modular dashboard layout with sidebar navigation.",
                "Implemented authentication flow using NextAuth (Credentials Provider) with protected routes and session management.",
                "Built role-based navigation (RBAC) to restrict access for admin, manager, and staff users.",
                "Developed POS flow: product search & filter by category, cart operations, real-time stock validation, discount options (percentage/fixed), and payment modal.",
                "Created CRUD modules for products, categories, suppliers, users, purchases, and sales through REST-style API routes.",
                "Built user management with role assignment and activity tracking.",
                "Implemented category management with custom ordering, description fields, and status toggle (active/inactive).",
                "Integrated analytics endpoints and dashboards with interactive charts (Recharts + Chart.js) for revenue, profit, and transaction trends.",
                "Prepared database schema + seed data (fixed SQL) and Sequelize models for consistent local setup.",
                "Added API documentation support using Swagger (swagger-jsdoc + swagger-ui)."
            ],
            "keyfeatures": [
                "Authentication & RBAC: Secure login with role-based navigation for admin, manager, and staff.",
                "Dashboard: KPI cards, revenue trends, transaction analytics, and best-selling product charts.",
                "POS Module: Category-filtered product grid, cart management, real-time stock validation, discount options (percentage/fixed), and payment modal.",
                "Inventory Control: Product catalog with search, category & stock status filtering, low-stock alerts, and pagination.",
                "Category Management: Organize products with custom order, descriptions, and active/inactive status toggle.",
                "User Management: CRUD users with role assignment and activity tracking.",
                "Transactions: Purchases & sales records with detail items, totals, and status tracking.",
                "Analytics Charts: Revenue, profit, and transaction trends with Recharts + Chart.js.",
                "Database Ready: MySQL + Sequelize with fixed schema + seed scripts for fast onboarding and demos.",
                "API Documentation: Swagger endpoint for easier API exploration and collaboration.",
                "Modern UI: Customizable light/dark mode, Tailwind-based responsive dashboard layout optimized for desktop management."
            ],
            "assets": {
                "video": null,
                "youtubeId": null,
                "images": [
                    "/assets/projects/inventory-berkah-jaya/1.png?v=2",
                    "/assets/projects/inventory-berkah-jaya/2.png?v=2",
                    "/assets/projects/inventory-berkah-jaya/3.png?v=2",
                    "/assets/projects/inventory-berkah-jaya/4.png?v=2",
                    "/assets/projects/inventory-berkah-jaya/5.png?v=2"
                ]
            },
            "tech": [
                "Next.js 14 (App Router)",
                "React 18",
                "TypeScript",
                "Tailwind CSS",
                "NextAuth.js",
                "MySQL",
                "Sequelize ORM",
                "React Hook Form",
                "Zod",
                "Recharts",
                "Chart.js",
                "Swagger (OpenAPI)"
            ],
            "liveUrl": "https://inventoryberkahjaya.raihanrafif.com/products",
            // "repoUrl": "",
            "theme": {
                "bg": "bg-blue-50",
                "text": "text-blue-700",
                "hover": "hover:text-blue-600",
                "buttonBg": "bg-blue-600",
                "buttonHover": "hover:bg-blue-700",
                "fill": "#2563EB"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"{FILL_COLOR}\"><path d=\"M20 8h-3V4H7v4H4v12h16V8zm-5 0H9V6h6v2z\"/></svg>"
        },
        {
            "id": "medically-ai",
            "date": "2026",
            "title": "Medically AI — Healthcare Assistant Web App",
            "category": "FULLSTACK WEB DEVELOPMENT",
            "summary": "An AI-powered healthcare web application featuring an intelligent health chatbot, AI symptom checker, doctor appointment booking system, health statistics dashboard, and health article browsing — designed for accessible health consultation and wellness tracking.",
            "client": "Medically AI (Personal Showcase)",
            "overview": "Developed a comprehensive healthcare platform combining AI-powered chat assistance, symptom analysis, and medical appointment management. The app enables users to consult health concerns through an AI assistant, check symptoms with intelligent analysis, browse nearby hospitals, book doctor appointments, and manage health profiles — all through a modern, mobile-responsive interface.",
            "role": "Fullstack Developer",
            "mission": "To build an accessible healthcare platform that leverages AI to provide health information and streamline patient-doctor interactions. The goal was to create a user-friendly tool for preliminary health consultation, symptom tracking, and appointment booking without barriers.",
            "impact": "Successfully delivered an AI-powered healthcare platform where users can interact with a health chatbot, assess symptoms, and book doctor appointments. The integration of AI assistance with hospital browsing and appointment management creates a practical, single-page healthcare hub for preliminary consultation and wellness awareness.",
            "contributions": [
                "Architected and built a fullstack healthcare platform with React + Vite frontend and Node.js + Express + SQLite backend.",
                "Integrated Ollama AI for local inference powering the health chat assistant and AI symptom checker.",
                "Designed and implemented an AI chat widget with persistent chat sessions, user-friendly health assistant persona, and symptom analysis flow.",
                "Built doctor directory with appointment booking system including patient-doctor matchmaking and status tracking.",
                "Created hospital browsing section with interactive hospital cards and navigation features.",
                "Implemented health statistics dashboard with animated counters and real-time data display.",
                "Developed health articles section with categorized content, search, and featured articles.",
                "Designed and built responsive mobile navigation and footer with WhatsApp integration.",
                "Configured Cloudflare Tunnel deployment for custom domain access (medically.raihanrafif.com).",
                "Implemented CORS, JWT authentication, rate limiting, and security middleware for production API."
            ],
            "keyfeatures": [
                "AI Health Chatbot: Conversational AI assistant powered by Ollama local inference for health Q\u0026A and general wellness advice.",
                "AI Symptom Checker: Intelligent symptom analysis tool that takes symptoms, age, gender, and duration to generate health insights.",
                "Appointment Booking System: Full booking flow allowing patients to schedule appointments with available doctors including appointment tracking.",
                "Doctor Directory: Interactive doctor cards with specialties, ratings, and direct booking integration.",
                "Hospital Browser: Nearby hospital discovery with detailed information cards and navigation.",
                "Health Statistics Dashboard: Animated KPI cards showing platform statistics with smooth counting animations.",
                "Health Articles Section: Categorized health content with search functionality and featured article cards.",
                "Responsive Design: Mobile-first approach with hamburger navigation and touch-friendly UI.",
                "Persistent Chat Sessions: SQLite-backed chat history allowing users to resume previous conversations.",
                "Modern UI/UX: Clean healthcare-inspired design with teal/blue color palette, smooth scroll animations, and accessible components.",
                "Production Deployment: Deployed on Jetson Nano with Cloudflare Tunnel for public access.",
                "Security Hardened: Helmet.js, CORS configuration, rate limiting, and JWT authentication."
            ],
            "assets": {
                "video": null,
                "youtubeId": null,
                "images": [
                    "/assets/projects/medically/1.png",
                    "/assets/projects/medically/2.png",
                    "/assets/projects/medically/3.png",
                    "/assets/projects/medically/4.png",
                    "/assets/projects/medically/5.png"
                ]
            },
            "tech": [
                "React 19",
                "Vite",
                "Node.js",
                "Express.js",
                "SQLite",
                "Ollama",
                "Tailwind CSS",
                "React Router DOM",
                "Framer Motion",
                "Lucide React",
                "node-fetch",
                "Cloudflare Tunnel"
            ],
            "liveUrl": "https://medically.raihanrafif.com",
            "repoUrl": "https://github.com/RaihanRafif/medically-ai",
            "theme": {
                "bg": "bg-teal-50",
                "text": "text-teal-700",
                "hover": "hover:text-teal-600",
                "buttonBg": "bg-teal-600",
                "buttonHover": "hover:bg-teal-700",
                "fill": "#0D9488"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"{FILL_COLOR}\"><path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z\"/></svg>"
        }

        // {
        //     "id": "ai-chatbot",
        //     "date": "2025",
        //     "title": "AI Customer Support Suite",
        //     "category": "AI & CUSTOMER EXPERIENCE",
        //     "summary": "Developed an end-to-end AI customer service platform with an intelligent RAG-based chatbot integrated with knowledge management and real-time stock, enabling non-technical staff to manage content and data.",
        //     "client": "KopaKopi (Personal Showcase)",
        //     "overview": "Facing repetitive customer inquiries and inaccurate stock information, this platform was developed for 'KopaKopi'. The solution is an integrated suite with a smart RAG-based chatbot that provides accurate answers from internal documents and real-time stock data. An intuitive admin dashboard was also created to empower non-technical staff to independently update the knowledge base and stock data.",
        //     "role": "Fullstack Developer",
        //     "mission": "The goal of this project was to develop an intelligent, easy-to-manage AI customer support system that could deliver accurate, real-time responses while reducing the dependency on technical staff. The platform was designed to streamline customer interactions, ensure data accuracy, and empower businesses to manage their own knowledge base efficiently.",
        //     "impact": "The AI Customer Support Suite significantly improved customer response time and accuracy by integrating real-time stock data and a knowledge-based RAG chatbot. It reduced manual workload for support teams, minimized misinformation, and enhanced user satisfaction. The intuitive dashboard enabled non-technical staff to maintain and update data independently, fostering operational efficiency and smoother customer experiences.",
        //     "contributions": [
        //         "Implemented a Retrieval-Augmented Generation (RAG) architecture for highly accurate and context-aware answers.",
        //         "Designed and developed an intuitive admin dashboard for non-technical users to independently manage the knowledge base (PDF, TXT files).",
        //         "Enabled conversational memory to allow for natural and effective follow-up dialogues, and implemented a conversation history feature as a basic CRM.",
        //         "Integrated a real-time database to enable the chatbot to provide always-accurate product stock information.",
        //         "Implemented response streaming to enhance user interaction and deliver a premium, ChatGPT-like user experience."
        //     ],
        //     "keyfeatures": [
        //         "RAG-Powered Chatbot: Utilizes Retrieval-Augmented Generation to deliver accurate, context-aware answers based on internal documents and real-time data.",
        //         "Real-Time Stock Checking: The chatbot connects directly to the product database to provide always up-to-date stock information.",
        //         "Admin Dashboard: A user-friendly interface that allows non-technical staff to manage the knowledge base and stock data easily.",
        //         "Conversational Memory: Enables the chatbot to remember conversation context and store chat history as a simple CRM feature.",
        //         "Response Streaming: Displays chatbot responses in real-time typing mode for a natural, ChatGPT-like user experience.",
        //         "Secure Data Management: Employs PostgreSQL and Prisma to ensure data security, reliability, and consistency.",
        //         "Scalable Architecture: Built with Next.js, Node.js, and the OpenAI API to support scalability and seamless system integration."
        //     ],
        //     "assets": {
        //         "video": '/assets/projects/kopakopi/v-1.webm',
        //         "youtubeId": null,
        //         "images": [
        //             '/assets/projects/kopakopi/1.png',
        //             '/assets/projects/kopakopi/2.png',
        //         ]
        //     },
        //     "tech": [
        //         "React",
        //         "Next.js",
        //         "Node.js",
        //         "Express.js",
        //         "PostgreSQL",
        //         "Prisma",
        //         "Pinecone/ChromaDB",
        //         "OpenAI API",
        //         "RAG"
        //     ],
        //     "liveUrl": "http://103.250.11.76:3000/",
        //     "repoUrl": "https://github.com/RaihanRafif/coffeeshop-chatbot-porto",
        //     "theme": {
        //         "bg": "bg-gray-700",
        //         "text": "text-purple-400",
        //         "hover": "hover:text-purple-300",
        //         "buttonBg": "bg-white/5",
        //         "buttonHover": "hover:bg-white/10",
        //         "fill": "#A78BFA"
        //     },
        //     "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"{FILL_COLOR}\"><path d=\"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM12.5 13.5L11 15.8V12H9v5h2v-2.8l1.5-2.2H15V17h2v-5h-4.5zM9.5 9.5l1.5-2.2L13 9.8V7h2v5h-2v-2.8l-1.5 2.2H9V7h2v2.8L9.5 9.5z\"/></svg>"
        // },
        // {
        //     "id": "semantic-search",
        //     "date": "2025",
        //     "title": "Semantic Product Search",
        //     "category": "AI & E-COMMERCE",
        //     "summary": "Designed a semantic search system that understands user intent to deliver highly relevant results and increase sales conversions.",
        //     "client": "Fashion Store (Personal Showcase)",
        //     "overview": "Standard keyword search often fails to capture user intent, leading to poor product discovery. For a fictional fashion store, I built a semantic search engine that uses vector embeddings to understand the meaning behind a query like 'warm clothes for rainy season,' returning relevant items like waterproof jackets and wool sweaters, even if the keywords don't match exactly.",
        //     "role": "Fullstack Developer",
        //     "mission": "The mission was to transform the traditional keyword-based product search into an intelligent semantic experience that understands context and intent. By interpreting the actual meaning behind user queries, the system aimed to enhance product discovery, reduce customer frustration, and drive higher engagement and conversion rates in online shopping.",
        //     "impact": "The Semantic Product Search system revolutionized how users explore and find products. It improved search relevance, reduced bounce rates, and significantly increased conversion opportunities by showing customers products they truly wanted — even without exact keyword matches. The recommendation engine based on semantic similarity further boosted cross-selling and personalization, offering a smarter, more satisfying shopping experience.",
        //     "keyfeatures": [
        //         "Semantic Query Understanding: Interprets user intent beyond literal keywords using OpenAI’s embedding models.",
        //         "Vector-Based Search Engine: Employs FAISS for efficient similarity matching among thousands of product vectors.",
        //         "Smart Product Recommendations: Suggests semantically related products through a 'You Might Also Like' feature.",
        //         "Contextual Relevance: Delivers accurate, intent-driven results for complex queries such as 'outfits for cold rainy days'.",
        //         "Seamless Integration: Built with Next.js and Laravel for a responsive and performant fullstack architecture.",
        //         "Scalable Vector Infrastructure: Designed to handle large product catalogs while maintaining search speed and precision."
        //     ],
        //     "contributions": [
        //         "Implemented semantic search using OpenAI's embedding models to convert product descriptions into meaningful vectors.",
        //         "Built a backend service to perform efficient vector similarity searches using FAISS.",
        //         "Developed a 'You might also like' recommendation feature based on semantic product similarity, not just popularity.",
        //         "Revolutionized product discovery, directly increasing sales conversion opportunities through a superior shopping experience."
        //     ],
        //     "assets": {
        //         "video": "/assets/projects/fashong/v-1.webm",
        //         "youtubeId": null,
        //         "images": [
        //             "/assets/projects/fashong/1.png",
        //             "/assets/projects/fashong/2.png",
        //             "/assets/projects/fashong/3.png"
        //         ]
        //     },
        //     "tech": [
        //         "Next.js",
        //         "Laravel",
        //         "OpenAI Embeddings",
        //         "Vector Search",
        //         "FAISS"
        //     ],
        //     "liveUrl": "http://103.250.11.76:3005/",
        //     "repoUrl": "https://github.com/RaihanRafif/fashong-porto",
        //     "theme": {
        //         "bg": "bg-gray-700",
        //         "text": "text-indigo-400",
        //         "hover": "hover:text-indigo-300",
        //         "buttonBg": "bg-white/5",
        //         "buttonHover": "hover:bg-white/10",
        //         "fill": "#818CF8"
        //     },
        //     "icon": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='{FILL_COLOR}'><path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/></svg>"
        // },
        // {
        //     "id": "content-generator",
        //     "date": "2025",
        //     "title": "AI Content Generator",
        //     "category": "AI & MARKETING AUTOMATION",
        //     "summary": "Built an AI dashboard that helps marketing teams drastically reduce content creation time by transforming long-form text into various social media formats.",
        //     "client": "Digital Creator (Personal Showcase)",
        //     "overview": "Digital creators and marketing teams spend hours repurposing content for different platforms. This tool solves that problem. By inputting a long article or text, my application uses AI to generate a variety of content formats, saving time and ensuring brand consistency across platforms.",
        //     "role": "Fullstack Developer",
        //     "mission": "The goal of this project was to empower marketing teams and content creators to work smarter by automating the repetitive process of content repurposing. Instead of rewriting and reformatting for every platform, the AI Content Generator delivers tailored outputs instantly, ensuring a consistent brand voice across Instagram, Twitter, and other channels.",
        //     "impact": "This platform reduced content creation time by up to 80%, allowing marketers to focus on strategy rather than manual rewriting. By maintaining tone consistency and generating ready-to-post formats, it enhanced overall brand cohesion and productivity. The AI-driven workflow brought structure, speed, and creativity to social media content production.",
        //     "keyfeatures": [
        //         "Automated Content Repurposing: Converts long-form text or articles into short-form formats for multiple platforms.",
        //         "AI-Powered Summarization: Generates concise bullet-point summaries ideal for blog intros or newsletters.",
        //         "Social Media Optimization: Produces Instagram captions with hashtag suggestions and Twitter/X threads with structured flow.",
        //         "Persona Customization: Allows users to generate content in different tones such as 'witty', 'professional', or 'educational' to match brand personality.",
        //         "Instant Multi-Platform Output: One-click export for Instagram, Twitter, and LinkedIn-ready posts.",
        //         "Responsive Dashboard: Built with React and Tailwind CSS for smooth, user-friendly interaction across devices."
        //     ],
        //     "contributions": [
        //         "Generates concise, easy-to-read bullet-point summaries of long articles.",
        //         "Creates multiple engaging Instagram caption variants, complete with relevant hashtag suggestions.",
        //         "Automatically formats content into a post-ready Twitter/X thread structure.",
        //         "Allows for output customization based on a 'persona' (e.g., 'witty,' 'professional') to maintain brand voice consistency."
        //     ],
        //     "assets": {
        //         "video": "/assets/projects/atherium/v-1.webm",
        //         "youtubeId": null,
        //         "images": [
        //             "/assets/projects/atherium/1.png",
        //             "/assets/projects/atherium/2.png",
        //             "/assets/projects/atherium/3.png",
        //             "/assets/projects/atherium/4.png",
        //             "/assets/projects/atherium/5.png"
        //         ]
        //     },
        //     "tech": [
        //         "React",
        //         "Node.js",
        //         "AI APIs",
        //         "Tailwind CSS"
        //     ],
        //     "liveUrl": "http://103.250.11.76:3007/",
        //     "repoUrl": "https://github.com/RaihanRafif/AI-digital-marketer-assistan",
        //     "theme": {
        //         "bg": "bg-gray-700",
        //         "text": "text-teal-400",
        //         "hover": "hover:text-teal-300",
        //         "buttonBg": "bg-white/5",
        //         "buttonHover": "hover:bg-white/10",
        //         "fill": "#5EEAD4"
        //     },
        //     "icon": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='{FILL_COLOR}'><path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zM8 15h8v2H8v-2zm0-4h8v2H8v-2z'/></svg>"
        // }
        // {
        //     "id": 'nakayama',
        // "date": "2025",
        //     "title": 'Real-Time Monitoring & Control',
        //     "category": 'DATA VISUALIZATION & ROBOTICS',
        //     "summary": 'Acted as the primary problem-solver, revitalizing critical stalled projects and developing real-time monitoring systems from scratch, proving fast and efficient execution in a professional environment.',
        //     "client": 'NAKAYAMA IRON WORKS, LTD.',
        //     "overview": 'As an Intern Researcher, I was tasked with several high-impact projects, including reviving stalled initiatives and developing new systems from scratch. I successfully transformed Figma designs into functional web apps and created critical interfaces for data monitoring and robotic control.',
        //     "role": "Fullstack Developer",
        //     "contributions": [
        //         'Took ownership of and completed a 3-month stalled Energy Monitoring website in just one week.',
        //         'Revived a 10-month delayed robotics project in just three weeks, from concept to functional implementation.',
        //         'Designed and developed a LiDAR monitoring interface for map visualization and robotic navigation.',
        //         'Integrated ROS Web Tools to create real-time interaction between the web UI and robotic systems.'
        //     ],
        //     "tech": ['React.js', 'Next.js', 'PHP', 'Python', 'C', 'ROS', 'Chart.js', 'jQuery'],
        //     "repoUrl": '#', // <-- REPLACE WITH YOUR GITHUB REPO URL (if applicable)
        //     "theme": {
        //         "bg": 'bg-gray-700',
        //         "text": 'text-blue-400', "hover": 'hover:text-blue-300',
        //         "buttonBg": 'bg-white/5', "buttonHover": 'hover:bg-white/10',
        //         "fill": '#60A5FA'
        //     },
        //     "icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{FILL_COLOR}"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.13-.53.13s-.37-.04-.53-.13l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.13.53-.13s.37-.04-.53-.13l7.9 4.44c.32.17.53.5.53.88v9zm-9-11.34l-6.27 3.53L12 12.22l6.27-3.53L12 5.16zm.53 13.62l6.27-3.52v-7.06l-6.27 3.52v7.06zm-1.06 0v-7.06L5.2 8.18v7.06l6.27 3.54z"/></svg>`
        // },
        // {
        //     "id": 'cakra',
        // "date": "2025",
        //     "title": 'Marketplace Sync & Bundling',
        //     "category": 'E-COMMERCE & AUTOMATION',
        //     "summary": 'Designed an item bundling feature and data synchronization system to increase average order value (AOV) and streamline sales across multiple marketplaces.',
        //     "client": 'CAKRA MOTOR COMPANY (FREELANCE)',
        //     "overview": 'As a freelance developer, I was hired to build custom features to enhance sales strategies and expand market reach. The primary goals were to enable product bundling and automate data synchronization with major online marketplaces.',
        //     "role": "Fullstack Developer",
        //     "contributions": [
        //         'Developed an "Item Bundling" feature to allow for dynamic product packaging to boost sales strategies.',
        //         'Built a synchronization system to automatically align company product data across Tokopedia, Shopee, and Bukalapak.',
        //         'Ensured product listing and pricing consistency across all platforms, expanding market reach and reducing manual errors.'
        //     ],
        //     "tech": ['React.js', 'Node.js', 'Express.js', 'Handlebars'],
        //     "theme": {
        //         "bg": 'bg-gray-700',
        //         "text": 'text-orange-400', "hover": 'hover:text-orange-300',
        //         "buttonBg": 'bg-white/5', "buttonHover": 'hover:bg-white/10',
        //         "fill": '#F97316'
        //     },
        //     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{FILL_COLOR}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/></svg>`
        // }
    ],
    skills: [
        {
            "title": 'Frontend',
            "items": ['JavaScript (ES6+) & TypeScript', 'ReactJS, Next.js, Vue.js', 'React Native, ElectronJs', 'HTML, SCSS, TailwindCSS']
        },
        {
            "title": 'Backend',
            "items": ['Node.js (Express, HapiJs)', 'Python (Flask, FastAPI)', 'PHP (Laravel)', 'Go (Gin-Gonic)', 'SQL (PostgreSQL, MySQL)']
        },
        {
            "title": 'AI & Specialized Tools',
            "items": ['AI/LLM APIs (OpenAI)', 'Vector Databases (Pinecone, ChromaDB)', 'RAG Architecture', 'Semantic Search', 'Git, GitHub, Vercel']
        }
    ]
};