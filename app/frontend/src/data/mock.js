// Mock data for Sahil Sharma's Portfolio

export const personalInfo = {
  name: "Sahil Sharma",
  title: "Upcoming Software Engineer @ IBM",
  tagline: "System Thinker. Builder. Engineer.",
  doctrine: "I design and build scalable software systems with a focus on clarity, performance, and long-term maintainability.",
  expertise: [
    "Software Engineering",
    "AI/ML",
    "Data Science",
    "System Design",
    "Cloud Architecture"
  ],
  stats: {
    projectsBuilt: 24,
    systemsDesigned: 12,
    yearsExperience: 5,
    articlesWritten: 18
  },
  social: {
    github: "https://github.com/Developer-Sahil",
    linkedin: "https://www.linkedin.com/in/sahil-sharma-921969239/",
    email: "sahilsharmamrp@gmail.com"
  }
};

export const featuredProjects = [
  {
    id: "1",
    title: "Neural Search Engine",
    slug: "neural-search-engine",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    oneLiner: "A semantic search platform powered by transformer embeddings and vector databases.",
    techStack: ["Python", "FastAPI", "Pinecone", "HuggingFace", "React"],
    featured: true,
    status: "published",
    overview: "Built a production-grade semantic search engine that understands context and intent, not just keywords. Handles 10M+ documents with sub-100ms latency.",
    liveDemo: "https://demo.neuralsearch.dev",
    github: "https://github.com/sahilsharma/neural-search",
    hld: "The system uses a microservices architecture with separate services for ingestion, embedding generation, and query processing. Vector storage is handled by Pinecone for scalability.",
    lld: "Components include: DocumentProcessor, EmbeddingService (using sentence-transformers), VectorStore abstraction, QueryEngine with re-ranking, and a React frontend with real-time results.",
    architectureDecisions: "Chose Pinecone over Milvus for managed scaling. Used FastAPI for async processing. Implemented batch embedding to optimize GPU utilization.",
    failurePoints: "Cold start latency on serverless. Embedding drift over time requires periodic re-indexing. Cost scales linearly with document count."
  },
  {
    id: "2",
    title: "Real-time Analytics Dashboard",
    slug: "realtime-analytics",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    oneLiner: "Stream processing pipeline with live visualization for business metrics.",
    techStack: ["Kafka", "Spark", "PostgreSQL", "D3.js", "Node.js"],
    featured: true,
    status: "published",
    overview: "End-to-end analytics platform processing 1M+ events/minute with real-time dashboards. Powers decision-making for a fintech startup.",
    liveDemo: "https://analytics.demo.dev",
    github: "https://github.com/sahilsharma/realtime-analytics",
    hld: "Event-driven architecture with Kafka as the backbone. Spark Streaming for aggregations. TimescaleDB for time-series storage. WebSocket-powered frontend.",
    lld: "Kafka topics per event type, Spark jobs for windowed aggregations, materialized views in PostgreSQL, Socket.io for live updates, D3.js for visualizations.",
    architectureDecisions: "Kafka over RabbitMQ for throughput. TimescaleDB over InfluxDB for SQL compatibility. Chose D3 for customization over Chart.js.",
    failurePoints: "Kafka partition rebalancing causes brief delays. Large time-range queries need pre-aggregation. WebSocket reconnection handling is critical."
  },
  {
    id: "3",
    title: "ML Model Deployment Platform",
    slug: "ml-deployment-platform",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    oneLiner: "One-click deployment for ML models with auto-scaling and monitoring.",
    techStack: ["Kubernetes", "Docker", "MLflow", "Prometheus", "Go"],
    featured: true,
    status: "published",
    overview: "Internal platform that reduced ML deployment time from days to minutes. Supports TensorFlow, PyTorch, and scikit-learn models with automatic containerization.",
    liveDemo: null,
    github: "https://github.com/sahilsharma/ml-platform",
    hld: "Kubernetes-native platform with custom operators for model serving. MLflow for experiment tracking. Prometheus + Grafana for observability.",
    lld: "Custom K8s CRDs for MLModel resources, Kaniko for in-cluster builds, Istio for traffic splitting (canary deployments), HPA for auto-scaling based on inference latency.",
    architectureDecisions: "K8s over managed ML services for flexibility. Go for the control plane for performance. MLflow over custom tracking for ecosystem compatibility.",
    failurePoints: "GPU scheduling complexity. Model versioning conflicts. Cold start for scaled-to-zero deployments."
  }
];

export const allProjects = [
  ...featuredProjects,
  {
    id: "4",
    title: "Distributed Task Queue",
    slug: "distributed-task-queue",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    oneLiner: "High-throughput job processing system with exactly-once semantics.",
    techStack: ["Redis", "Python", "Celery", "PostgreSQL"],
    featured: false,
    status: "published",
    overview: "Built a robust task queue handling 500K+ jobs daily with retry logic, dead letter queues, and comprehensive monitoring."
  },
  {
    id: "5",
    title: "API Gateway & Rate Limiter",
    slug: "api-gateway",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    oneLiner: "Custom gateway with intelligent rate limiting and request routing.",
    techStack: ["Go", "Redis", "Docker", "Nginx"],
    featured: false,
    status: "published",
    overview: "Lightweight API gateway with token bucket rate limiting, request transformation, and circuit breaker patterns."
  },
  {
    id: "6",
    title: "Data Pipeline Orchestrator",
    slug: "data-pipeline",
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
    oneLiner: "Airflow-inspired workflow engine for complex data transformations.",
    techStack: ["Python", "Airflow", "dbt", "Snowflake", "AWS"],
    featured: false,
    status: "published",
    overview: "Orchestration layer managing 200+ daily data pipelines with dependency resolution, alerting, and data quality checks."
  }
];

export const workInfo = {
  headline: "Let's Build Something Exceptional",
  description: "I partner with teams and companies who value depth over speed, quality over quantity. If you're building something meaningful and need engineering expertise that thinks in systems, let's talk.",
  collaborationTypes: [
    {
      type: "Freelance Work",
      description: "Seeking freelance projects where I can architect systems and deliver high-quality code.",
      icon: "Building2"
    },
    {
      type: "Contract Work",
      description: "Available for 1-3 month engagements on complex technical challenges.",
      icon: "FileCode"
    },
    {
      type: "Internships",
      description: "Open to internship opportunities to apply my skills and contribute to challenging projects.",
      icon: "Briefcase"
    },
    {
      type: "Mentoring Students",
      description: "Guiding students and peers in software development, career growth, and technical skills.",
      icon: "GraduationCap"
    }
  ],
  availability: "Currently open to opportunities",
  responseTime: "Usually responds within 48 hours"
};

export const expertiseDomains = [
  {
    domain: "Software Engineering",
    description: "Architecting robust, scalable systems using modern design patterns and best practices. From microservices to modular monoliths.",
    technologies: ["Python", "Node.js", "FastAPI", "SQL", "Google Cloud Platform", "Firebase", "System Design"]
  },
  {
    domain: "Data Engineering",
    description: "Pipelines, warehouses, and the infrastructure that makes data useful.",
    technologies: ["Spark", "Airflow", "dbt", "Kafka", "Snowflake"]
  },
  {
    domain: "Data Analytics",
    description: "Turning raw data into actionable insights through visualization and statistical analysis.",
    technologies: ["SQL", "Pandas", "Tableau", "PowerBI", "Python"]
  },
  {
    domain: "Machine Learning",
    description: "From experimentation to production—models that actually work in the real world.",
    technologies: ["PyTorch", "TensorFlow", "scikit-learn", "MLflow", "Kubeflow"]
  }
];

export const arenaThreads = [
  {
    id: "1",
    publishedAt: "2024-03-10T10:00:00Z",
    title: "The Death of Frontend Complexity",
    content: "We're over-engineering frontend applications. The pendulum is swinging back to server-side rendering and simpler mental models. React Server Components are a step in the right direction, but we're still carrying too much baggage.",
    responses: [
      {
        id: "r1",
        createdAt: "2024-03-10T12:00:00Z",
        content: "I agree. The amount of state management we do on the client is excessive for 90% of apps.",
      }
    ]
  },
  {
    id: "2",
    publishedAt: "2024-03-05T14:30:00Z",
    title: "Why I'm Betting on Rust",
    content: "Rust isn't just for systems programming anymore. The tooling, the ecosystem, and the performance characteristics make it a viable candidate for backend services that need to scale efficiently.",
    responses: []
  }
];

export const systems = [
  {
    id: "1",
    name: "VS Code",
    category: "Editor",
    logo: "https://cdn.simpleicons.org/visualstudiocode",
    usage: "My daily driver for everything from frontend to backend.",
    whyChosen: "Extensibility and ecosystem. The Vim extension is non-negotiable.",
    whereItBreaks: "Large monorepos can still make it stutter, even with optimizations."
  },
  {
    id: "2",
    name: "Google Cloud",
    category: "Cloud",
    logo: "https://cdn.simpleicons.org/googlecloud",
    usage: "Hosting, serverless functions, and data storage.",
    whyChosen: "Best-in-class AI/ML services and developer experience.",
    whereItBreaks: "IAM policy management can get complex."
  },
  {
    id: "3",
    name: "Firebase",
    category: "Backend as a Service",
    logo: "https://cdn.simpleicons.org/firebase",
    usage: "Auth, realtime database, and hosting for MVPs.",
    whyChosen: "Rapid prototyping and seamless integration.",
    whereItBreaks: "Complex queries in Firestore can be limiting."
  },
  {
    id: "4",
    name: "Antigravity",
    category: "Productivity",
    logo: "https://cdn-icons-png.flaticon.com/512/3233/3233483.png",
    usage: "Advanced agentic workflow automation.",
    whyChosen: "Automates complex coding tasks effortlessly.",
    whereItBreaks: "Requires precise context management."
  },
  {
    id: "5",
    name: "Google AI Studio",
    category: "AI/ML",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    usage: "Prototyping and experimenting with Gemini models.",
    whyChosen: "Fastest way to test prompts and model capabilities.",
    whereItBreaks: "Rate limits on free tier."
  },
  {
    id: "6",
    name: "Kaggle",
    category: "Data Science",
    logo: "https://cdn.simpleicons.org/kaggle",
    usage: "Datasets, notebooks, and competitions.",
    whyChosen: "Community and access to diverse datasets.",
    whereItBreaks: "Notebook kernels have resource limits."
  },
  {
    id: "7",
    name: "GitHub",
    category: "Version Control",
    logo: "https://cdn.simpleicons.org/github",
    usage: "Code hosting, CI/CD actions, and collaboration.",
    whyChosen: "Industry standard for open source and private repos.",
    whereItBreaks: "Actions runner costs can scale up."
  },
  {
    id: "8",
    name: "Figma",
    category: "Design",
    logo: "https://cdn.simpleicons.org/figma",
    usage: "UI/UX design and prototyping.",
    whyChosen: "Real-time collaboration and dev mode.",
    whereItBreaks: "Large files can be slow in browser."
  },
  {
    id: "9",
    name: "Medium",
    category: "Writing",
    logo: "https://cdn.simpleicons.org/medium",
    usage: "Publishing technical articles and blogs.",
    whyChosen: "Clean reading experience and audience reach.",
    whereItBreaks: "Paywall can be annoying for some readers."
  },
  {
    id: "10",
    name: "LeetCode",
    category: "Learning",
    logo: "https://cdn.simpleicons.org/leetcode",
    usage: "Algorithm practice and interview prep.",
    whyChosen: "Extensive problem set and active community.",
    whereItBreaks: "Sometimes test cases are too specific."
  },
  {
    id: "11",
    name: "Python",
    category: "Language",
    logo: "https://cdn.simpleicons.org/python",
    usage: "Backend, AI/ML, and scripting.",
    whyChosen: "Versatility and massive library ecosystem.",
    whereItBreaks: "Global Interpreter Lock (GIL) limits concurrency."
  },
  {
    id: "12",
    name: "Pinterest",
    category: "Inspiration",
    logo: "https://cdn.simpleicons.org/pinterest",
    usage: "Visual inspiration and mood boarding.",
    whyChosen: "Great for discovering UI patterns and aesthetics.",
    whereItBreaks: "Too many ads in the feed."
  },
  {
    id: "13",
    name: "Scikit-learn",
    category: "AI/ML",
    logo: "https://cdn.simpleicons.org/scikitlearn",
    usage: "Traditional machine learning algorithms.",
    whyChosen: "Simple, efficient, and well-documented API.",
    whereItBreaks: "Not suitable for deep learning."
  },
  {
    id: "14",
    name: "TensorFlow",
    category: "AI/ML",
    logo: "https://cdn.simpleicons.org/tensorflow",
    usage: "Deep learning model training and deployment.",
    whyChosen: "Production-ready scaling and TFX ecosystem.",
    whereItBreaks: "Steep learning curve compared to PyTorch."
  },
  {
    id: "15",
    name: "Roadmap.sh",
    category: "Learning",
    logo: "https://www.google.com/s2/favicons?domain=roadmap.sh&sz=64",
    usage: "Tracking learning paths and skills.",
    whyChosen: "Visual and structured guides for tech stacks.",
    whereItBreaks: "Can be overwhelming with too many paths."
  }
];

export const vaultEntries = [
  {
    id: "1",
    title: "CAP Theorem",
    category: "Distributed Systems",
    tags: ["Systems", "Database"],
    content: "In a distributed data store, you can only provide two of the following three guarantees: Consistency, Availability, and Partition Tolerance."
  },
  {
    id: "2",
    title: "Solid Principles",
    category: "Software Design",
    tags: ["Design Patterns", "OOP"],
    content: "Five design principles intended to make software designs more understandable, flexible, and maintainable."
  },
  {
    id: "3",
    title: "ACID Properties",
    category: "Database",
    tags: ["Data", "Consistency"],
    content: "Atomicity, Consistency, Isolation, Durability. The standard properties for reliable database transactions."
  },
  {
    id: "4",
    title: "Circuit Breaker",
    category: "Distributed Systems",
    tags: ["Resilience", "Patterns"],
    content: "A design pattern used to detect failures and encapsulate the logic of preventing a failure from constantly recurring."
  },
  {
    id: "5",
    title: "Sharding vs Partitioning",
    category: "Database",
    tags: ["Scaling", "Architecture"],
    content: "Partitioning splits a database into smaller chunks within a single instance. Sharding distributes those chunks across multiple servers."
  },
  {
    id: "6",
    title: "Idempotency",
    category: "API Design",
    tags: ["REST", "Reliability"],
    content: "A property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application."
  },
  {
    id: "7",
    title: "The Twelve-Factor App",
    category: "Methodology",
    tags: ["Cloud Native", "DevOps"],
    content: "A methodology for building software-as-a-service apps that adhere to declarative formats, clean contracts, and deployment on modern cloud platforms."
  },
  {
    id: "8",
    title: "CORS",
    category: "Web Security",
    tags: ["Browser", "Security"],
    content: "Cross-Origin Resource Sharing. A mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin."
  }
];

export const writings = [
  {
    id: "1",
    slug: "scaling-nodejs",
    thumbnail: "https://images.unsplash.com/photo-1629904853716-f004c377ddcc?w=600&h=400&fit=crop",
    title: "Scaling Node.js Systems",
    excerpt: "Practical strategies for scaling Node.js applications horizontally and vertically.",
    readingTime: 8,
    publishedAt: "2024-02-15T09:00:00Z",
    tags: ["Node.js", "Performance"],
    series: "Backend Engineering",
    content: `Scaling Node.js applications is vastly different from scaling traditional multi-threaded applications like Java or C#. Because Node.js runs on a single thread (the Event Loop), we can't just throw more threads at the problem.

Instead, we have to scale in two dimensions:
1. **Vertical Scaling (Clustering)**: Since a single Node.js process uses only one CPU core, we need to fork the process to utilize multi-core systems. The native 'cluster' module allows us to spin up a worker process for each core, sharing the same server port.
2. **Horizontal Scaling (Load Balancing)**: When a single machine isn't enough, we add more servers behind a load balancer (like Nginx or HAProxy).

However, scaling introduces new challenges:
- **Shared State**: You can no longer store session data in memory. You need a distributed store like Redis.
- **Socket Connections**: If you use WebSockets, you need a pub/sub mechanism (again, Redis) to broadcast messages across nodes.
- **Database Connection Pools**: Each worker process opens its own connections. You need to be careful not to exhaust your database's max connection limit.`
  },
  {
    id: "2",
    slug: "react-architecture",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    title: "Sustainable React Architecture",
    excerpt: "How to structure React applications for long-term maintainability.",
    readingTime: 12,
    publishedAt: "2024-01-20T10:00:00Z",
    tags: ["React", "Frontend"],
    series: null,
    content: `I've seen too many React codebases turn into "spaghetti code" after a year of development. It usually starts with valid intentions: "We'll just put everything in components for now and refactor later."

The problem is, "later" never comes.

To build sustainable React applications, I follow a few core principles:
1. **Feature-First Folder Structure**: Instead of grouping by technology (components, store, hooks), group by feature (auth, dashboard, settings). This makes the codebase easier to navigate and allows you to "delete" a feature by removing a single folder.
2. **The "Container/Presentational" Pattern (Modernized)**: While hooks have replaced Higher-Order Components, the separation of concerns is still valid. Keep your logic (data fetching, state) separate from your UI rendering.
3. **Colocation**: Keep styles, tests, and types close to the component that uses them. If a utility function is only used by one feature, it belongs in that feature's folder, not a global 'utils' folder.

By imposing these constraints early, we allow the team to move faster without stepping on each other's toes.`
  }
];

export const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    designation: "CTO at TechFlow",
    review: "Sahil is one of those rare engineers who understands both the micro-details of code and the macro-implications of architecture. He completely transformed our payment infrastructure.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5
  },
  {
    id: "2",
    name: "Michael Ross",
    designation: "Lead Engineer at DataSphere",
    review: "Working with Sahil was a masterclass in system design. His ability to anticipate failure scenarios and build resilience into the core of the system is unmatched.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5
  },
  {
    id: "3",
    name: "Emily Watson",
    designation: "Product Manager at CloudScale",
    review: "Beyond his technical skills, Sahil is an incredible communicator. He bridges the gap between engineering and product effortlessly, ensuring we always build the right thing.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5
  }
];
