// Mock data for Sahil Sharma's Portfolio

export const personalInfo = {
  name: "Sahil Sharma",
  title: "Software Developer",
  tagline: "System Thinker. Builder. Engineer.",
  doctrine: "I don't just write code—I architect systems that scale, adapt, and endure. Every line serves a purpose. Every decision is deliberate.",
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
    github: "https://github.com/sahilsharma",
    linkedin: "https://linkedin.com/in/sahilsharma",
    email: "sahil@example.com"
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
      type: "Full-time Roles",
      description: "Seeking senior/staff engineering positions where I can architect systems and mentor teams.",
      icon: "Building2"
    },
    {
      type: "Contract Work",
      description: "Available for 3-6 month engagements on complex technical challenges.",
      icon: "FileCode"
    },
    {
      type: "Technical Advisory",
      description: "Advising startups on architecture decisions, tech stack selection, and scaling strategies.",
      icon: "Lightbulb"
    },
    {
      type: "Speaking & Workshops",
      description: "Speaking on system design, ML engineering, and software architecture.",
      icon: "Mic"
    }
  ],
  availability: "Currently open to opportunities",
  responseTime: "Usually responds within 48 hours"
};

export const expertiseDomains = [
  {
    domain: "Backend Engineering",
    description: "Distributed systems, APIs, microservices, and everything that runs on servers.",
    technologies: ["Python", "Go", "Node.js", "FastAPI", "PostgreSQL", "Redis"]
  },
  {
    domain: "Machine Learning",
    description: "From experimentation to production—models that actually work in the real world.",
    technologies: ["PyTorch", "TensorFlow", "scikit-learn", "MLflow", "Kubeflow"]
  },
  {
    domain: "Data Engineering",
    description: "Pipelines, warehouses, and the infrastructure that makes data useful.",
    technologies: ["Spark", "Airflow", "dbt", "Kafka", "Snowflake"]
  },
  {
    domain: "Cloud & DevOps",
    description: "Infrastructure as code, CI/CD, and making deployments boring (in a good way).",
    technologies: ["AWS", "GCP", "Kubernetes", "Terraform", "Docker"]
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
    usage: "My daily driver for everything from frontend to backend.",
    whyChosen: "Extensibility and ecosystem. The Vim extension is non-negotiable.",
    whereItBreaks: "Large monorepos can still make it stutter, even with optimizations."
  },
  {
    id: "2",
    name: "Linear",
    category: "Productivity",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linear_logo.svg/1200px-Linear_logo.svg.png",
    usage: "Issue tracking and project management.",
    whyChosen: "It's fast, keyboard-centric, and gets out of the way.",
    whereItBreaks: "Complex cross-team dependencies can be hard to visualize."
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
