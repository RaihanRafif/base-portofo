// Final English version of the portfolio data
const portfolioData = {
    projects: [
        {
            "id": "ai-chatbot",
            "title": "AI Customer Support Suite",
            "category": "AI & CUSTOMER EXPERIENCE",
            "summary": "Developed an end-to-end AI customer service platform with an intelligent RAG-based chatbot integrated with knowledge management and real-time stock, enabling non-technical staff to manage content and data.",
            "client": "KopaKopi (Personal Showcase)",
            "overview": "Facing repetitive customer inquiries and inaccurate stock information, this platform was developed for 'KopaKopi'. The solution is an integrated suite with a smart RAG-based chatbot that provides accurate answers from internal documents and real-time stock data. An intuitive admin dashboard was also created to empower non-technical staff to independently update the knowledge base and stock data.",
            "contributions": [
                "Implemented a Retrieval-Augmented Generation (RAG) architecture for highly accurate and context-aware answers.",
                "Designed and developed an intuitive admin dashboard for non-technical users to independently manage the knowledge base (PDF, TXT files).",
                "Enabled conversational memory to allow for natural and effective follow-up dialogues, and implemented a conversation history feature as a basic CRM.",
                "Integrated a real-time database to enable the chatbot to provide always-accurate product stock information.",
                "Implemented response streaming to enhance user interaction and deliver a premium, ChatGPT-like user experience."
            ],
            "assets": {
                "video": null,
                "youtubeId": null,
                "images": [
                    './assets/projects/kopakopi/1.png',
                    './assets/projects/kopakopi/2.png',
                ]
            },
            "tech": [
                "React",
                "Next.js",
                "Node.js",
                "Express.js",
                "PostgreSQL",
                "Prisma",
                "Pinecone/ChromaDB",
                "OpenAI API",
                "RAG"
            ],
            "liveUrl": "#",
            "repoUrl": "#",
            "theme": {
                "bg": "bg-gray-700",
                "text": "text-purple-400",
                "hover": "hover:text-purple-300",
                "buttonBg": "bg-white/5",
                "buttonHover": "hover:bg-white/10",
                "fill": "#A78BFA"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"{FILL_COLOR}\"><path d=\"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM12.5 13.5L11 15.8V12H9v5h2v-2.8l1.5-2.2H15V17h2v-5h-4.5zM9.5 9.5l1.5-2.2L13 9.8V7h2v5h-2v-2.8l-1.5 2.2H9V7h2v2.8L9.5 9.5z\"/></svg>"
        },
        {
            id: 'semantic-search',
            title: 'Semantic Product Search',
            category: 'AI & E-COMMERCE',
            summary: 'Designed a semantic search system that understands user intent to deliver highly relevant results and increase sales conversions.',
            client: 'Fashion Store (Personal Showcase)',
            overview: 'Standard keyword search often fails to capture user intent, leading to poor product discovery. For a fictional fashion store, I built a semantic search engine that uses vector embeddings to understand the *meaning* behind a query like "warm clothes for rainy season," returning relevant items like waterproof jackets and wool sweaters, even if the keywords don\'t match exactly.',
            contributions: [
                'Implemented semantic search using OpenAI\'s embedding models to convert product descriptions into meaningful vectors.',
                'Built a backend service to perform efficient vector similarity searches using FAISS.',
                'Developed a "You might also like" recommendation feature based on semantic product similarity, not just popularity.',
                'Revolutionized product discovery, directly increasing sales conversion opportunities through a superior shopping experience.'
            ],
            tech: ['Next.js', 'Laravel', 'OpenAI Embeddings', 'Vector Search', 'FAISS'],
            liveUrl: '#', // <-- REPLACE WITH YOUR LIVE DEMO URL
            repoUrl: '#', // <-- REPLACE WITH YOUR GITHUB REPO URL
            theme: {
                bg: 'bg-gray-700',
                text: 'text-indigo-400', hover: 'hover:text-indigo-300',
                buttonBg: 'bg-white/5', buttonHover: 'hover:bg-white/10',
                fill: '#818CF8'
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{FILL_COLOR}"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
        },
        {
            id: 'content-generator',
            title: 'AI Content Generator',
            category: 'AI & MARKETING AUTOMATION',
            summary: 'Built an AI dashboard that helps marketing teams drastically reduce content creation time by transforming long-form text into various social media formats.',
            client: 'Digital Creator (Personal Showcase)',
            overview: 'Digital creators and marketing teams spend hours repurposing content for different platforms. This tool solves that problem. By inputting a long article or text, my application uses AI to generate a variety of content formats, saving time and ensuring brand consistency across platforms.',
            contributions: [
                'Generates concise, easy-to-read bullet-point summaries of long articles.',
                'Creates multiple engaging Instagram caption variants, complete with relevant hashtag suggestions.',
                'Automatically formats content into a post-ready Twitter/X thread structure.',
                'Allows for output customization based on a "persona" (e.g., "witty," "professional") to maintain brand voice consistency.'
            ],
            tech: ['React', 'Node.js', 'AI APIs', 'Tailwind CSS'],
            liveUrl: '#', // <-- REPLACE WITH YOUR LIVE DEMO URL
            repoUrl: '#', // <-- REPLACE WITH YOUR GITHUB REPO URL
            theme: {
                bg: 'bg-gray-700',
                text: 'text-teal-400', hover: 'hover:text-teal-300',
                buttonBg: 'bg-white/5', buttonHover: 'hover:bg-white/10',
                fill: '#5EEAD4'
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{FILL_COLOR}"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zM8 15h8v2H8v-2zm0-4h8v2H8v-2z"/></svg>`
        },
        {
            id: 'nakayama',
            title: 'Real-Time Monitoring & Control',
            category: 'DATA VISUALIZATION & ROBOTICS',
            summary: 'Acted as the primary problem-solver, revitalizing critical stalled projects and developing real-time monitoring systems from scratch, proving fast and efficient execution in a professional environment.',
            client: 'NAKAYAMA IRON WORKS, LTD.',
            overview: 'As an Intern Researcher, I was tasked with several high-impact projects, including reviving stalled initiatives and developing new systems from scratch. I successfully transformed Figma designs into functional web apps and created critical interfaces for data monitoring and robotic control.',
            contributions: [
                'Took ownership of and completed a 3-month stalled Energy Monitoring website in just one week.',
                'Revived a 10-month delayed robotics project in just three weeks, from concept to functional implementation.',
                'Designed and developed a LiDAR monitoring interface for map visualization and robotic navigation.',
                'Integrated ROS Web Tools to create real-time interaction between the web UI and robotic systems.'
            ],
            tech: ['React.js', 'Next.js', 'PHP', 'Python', 'C', 'ROS', 'Chart.js', 'jQuery'],
            repoUrl: '#', // <-- REPLACE WITH YOUR GITHUB REPO URL (if applicable)
            theme: {
                bg: 'bg-gray-700',
                text: 'text-blue-400', hover: 'hover:text-blue-300',
                buttonBg: 'bg-white/5', buttonHover: 'hover:bg-white/10',
                fill: '#60A5FA'
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{FILL_COLOR}"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.09-.34.13-.53.13s-.37-.04-.53-.13l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.34-.13.53-.13s.37-.04-.53-.13l7.9 4.44c.32.17.53.5.53.88v9zm-9-11.34l-6.27 3.53L12 12.22l6.27-3.53L12 5.16zm.53 13.62l6.27-3.52v-7.06l-6.27 3.52v7.06zm-1.06 0v-7.06L5.2 8.18v7.06l6.27 3.54z"/></svg>`
        },
        {
            id: 'cakra',
            title: 'Marketplace Sync & Bundling',
            category: 'E-COMMERCE & AUTOMATION',
            summary: 'Designed an item bundling feature and data synchronization system to increase average order value (AOV) and streamline sales across multiple marketplaces.',
            client: 'CAKRA MOTOR COMPANY (FREELANCE)',
            overview: 'As a freelance developer, I was hired to build custom features to enhance sales strategies and expand market reach. The primary goals were to enable product bundling and automate data synchronization with major online marketplaces.',
            contributions: [
                'Developed an "Item Bundling" feature to allow for dynamic product packaging to boost sales strategies.',
                'Built a synchronization system to automatically align company product data across Tokopedia, Shopee, and Bukalapak.',
                'Ensured product listing and pricing consistency across all platforms, expanding market reach and reducing manual errors.'
            ],
            tech: ['React.js', 'Node.js', 'Express.js', 'Handlebars'],
            theme: {
                bg: 'bg-gray-700',
                text: 'text-orange-400', hover: 'hover:text-orange-300',
                buttonBg: 'bg-white/5', buttonHover: 'hover:bg-white/10',
                fill: '#F97316'
            },
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="{FILL_COLOR}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/></svg>`
        }
    ],
    skills: [
        {
            title: 'Frontend',
            items: ['JavaScript (ES6+) & TypeScript', 'ReactJS, Next.js, Vue.js', 'React Native, ElectronJs', 'HTML, SCSS, TailwindCSS']
        },
        {
            title: 'Backend',
            items: ['Node.js (Express, HapiJs)', 'Python (Flask, FastAPI)', 'PHP (Laravel)', 'Go (Gin-Gonic)', 'SQL (PostgreSQL, MySQL)']
        },
        {
            title: 'AI & Specialized Tools',
            items: ['AI/LLM APIs (OpenAI)', 'Vector Databases (Pinecone, ChromaDB)', 'RAG Architecture', 'Semantic Search', 'Git, GitHub, Vercel']
        }
    ]
};