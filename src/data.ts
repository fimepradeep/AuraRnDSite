import { ArchitectureTemplate, ResearchArticle, ShowcaseProject } from './types';

export const SYSTEM_TEMPLATES: ArchitectureTemplate[] = [
  {
    id: 'android-secure-sync',
    title: 'Secure Android & Google Play Sync Pipeline',
    category: 'Android Mobile',
    description: 'A production-level architecture designed for Android devices, leveraging Google Play Integrity API for hardware attestation, TLS 1.3 pinning, and background SQLite sync.',
    nodes: [
      { id: '1', label: 'Android Mobile App', type: 'client', status: 'active', latency: '4ms (Local)', details: 'Jetpack Compose with Room SQLite DB Local cache.', x: 10, y: 50 },
      { id: '2', label: 'Google Play Integrity API', type: 'auth', status: 'synced', latency: '120ms', details: 'Performs hardware attestation and app licensing check.', x: 40, y: 20 },
      { id: '3', label: 'Aura API Gateway', type: 'gateway', status: 'active', latency: '12ms', details: 'Nginx API router & OAuth token validator.', x: 40, y: 50 },
      { id: '4', label: 'System Auth Cache', type: 'cache', status: 'active', latency: '<1ms', details: 'Redis replica storing verified device signatures.', x: 70, y: 20 },
      { id: '5', label: 'Distributed Database Cluster', type: 'database', status: 'active', latency: '8ms', details: 'Highly available server cluster handling encrypted user data syncing.', x: 70, y: 80 },
      { id: '6', label: 'Cloud Sync Worker', type: 'worker', status: 'active', latency: '25ms', details: 'Node worker processing asynchronous background data-syncs.', x: 75, y: 50 }
    ],
    edges: [
      { from: '1', to: '2', label: 'Attest Device Integrity', flowDirection: 'both', active: true },
      { from: '1', to: '3', label: 'Secure TLS App Request', flowDirection: 'forward', active: true },
      { from: '3', to: '4', label: 'Lookup Authentication token', flowDirection: 'forward', active: true },
      { from: '3', to: '6', label: 'Publish Dynamic Sync Job', flowDirection: 'forward', active: true },
      { from: '6', to: '5', label: 'Commit Encrypted Write', flowDirection: 'forward', active: true }
    ]
  },
  {
    id: 'edge-intelligence',
    title: 'Distributed Edge AI & Vector Cache Pipeline',
    category: 'Security & AI',
    description: 'An optimized distributed systems layout for executing device-local vector embeddings, coupled with edge CDNs and regional inference servers for real-time model alignment.',
    nodes: [
      { id: 'm1', label: 'Mobile Client (ONNX Run)', type: 'client', status: 'active', latency: '8ms', details: 'Local on-device text embeddings generated via WebNN.', x: 15, y: 50 },
      { id: 'g1', label: 'Edge CDN Gateway', type: 'gateway', status: 'active', latency: '15ms', details: 'Cloudflare Workers routing AI request vectors.', x: 45, y: 50 },
      { id: 'v1', label: 'Aura Central Vector DB', type: 'database', status: 'synced', latency: '22ms', details: 'Fully indexed database of pre-calculated systems queries.', x: 80, y: 80 },
      { id: 'ai1', label: 'Regional Inference Node', type: 'worker', status: 'active', latency: '65ms', details: 'Low-latency backend model running system configurations.', x: 80, y: 20 }
    ],
    edges: [
      { from: 'm1', to: 'g1', label: 'Send Embedding Vector', flowDirection: 'forward', active: true },
      { from: 'g1', to: 'ai1', label: 'Route On-cache Miss', flowDirection: 'forward', active: true },
      { from: 'g1', to: 'v1', label: 'Direct Vector Match Query', flowDirection: 'both', active: true }
    ]
  },
  {
    id: 'cloud-native-microservices',
    title: 'Fault-Tolerant Distributed Ledger & System Registry',
    category: 'Cloud Native',
    description: 'An enterprise-grade systems mesh demonstrating consensus registries, health checkpoints, microservices communication routing, and encrypted state persistence.',
    nodes: [
      { id: 'c1', label: 'Aura Web App / Android CLI', type: 'client', status: 'active', latency: '35ms', details: 'Unified terminal client driving system state audits.', x: 10, y: 50 },
      { id: 'r1', label: 'Consensus Registry (Raft)', type: 'auth', status: 'active', latency: '5ms', details: 'Coordinates system topologies and healthy edge nodes.', x: 45, y: 20 },
      { id: 's1', label: 'Microservice Gateways', type: 'server', status: 'active', latency: '18ms', details: 'Service mesh proxy and gRPC routing tables.', x: 45, y: 50 },
      { id: 'db1', label: 'Distributed Ledger DB', type: 'database', status: 'synced', latency: '30ms', details: 'Immutable system audit trail verifying developer requests.', x: 80, y: 50 }
    ],
    edges: [
      { from: 'c1', to: 's1', label: 'gRPC State Mutator', flowDirection: 'forward', active: true },
      { from: 's1', to: 'r1', label: 'Node Registration Verification', flowDirection: 'both', active: true },
      { from: 's1', to: 'db1', label: 'Commit Block to Ledger', flowDirection: 'forward', active: true }
    ]
  }
];

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: 'art-play-store-compliance',
    title: 'Comprehensive Compliance: Fulfilling Integrity Verification & User Privacy on Android',
    category: 'Play Store Compliance',
    summary: 'A reference guide for developers deploying to Google Play Store, focused on attesting hardware authenticity via the Google Play Integrity API, user data safety checklists, and secure connection policies.',
    content: `Deploying an application on the Google Play Store demands absolute rigor when handling user information, device safety, and secure systems architecture. This article details Aura R&D's standardized framework to help developers pass Play Store safety reviews and establish trusted connections.

### 1. Hardware Attestation via Google Play Integrity API
Rather than assuming a client is untampered, developers should implement Google Play Integrity check cycles:
- **Challenge-Response Security**: Issue a cryptographic challenge on your server, send it to the Android app, pass it to the Integrity API, and then decode the encrypted response payload on your secure backend server.
- **Integrity Verdicts**: Verify "appLicensingVerdict" (to ensure the user legitimate downloaded the app) and "deviceRecognitionVerdict" (to check for secure system integrity or rooting status).

### 2. Modern TLS 1.3 Pinning & HTTPS Client Sanity
- Ensure all Android network operations strictly enforce TLS 1.3 or higher.
- Utilize Certificate Pinning using Android's network security configuration \`res/xml/network_security_config.xml\` to neutralize potential on-path active interceptions.
- Explicitly block cleartext protocols:
\`\`\`xml
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">api.aurand.dev</domain>
    </domain-config>
</network-security-config>
\`\`\`

### 3. Transparent User Data Safety Policies
Every Android developer must declare a clear Data Safety form:
- **Scope Specificity**: Differentiate strictly between user-authenticated identifiers (e.g., emails) and ephemeral diagnostics (e.g., performance logs).
- **Encryption in Transit & Rest**: Mandate encrypting all personal user data before disk serialization and utilize Android Keystore system handles for crypto-key persistence.`,
    readTime: '6 min read',
    publishedDate: 'May 12, 2026',
    author: 'Aura Systems Research Group',
    tags: ['Android', 'Security', 'Google Play', 'Compliance']
  },
  {
    id: 'art-jetpack-fps',
    title: 'Achieving Smooth 120Hz Rendering Cycles in Jetpack Compose',
    category: 'Android OS',
    summary: 'An empirical study of recomposition scopes within Android jetpack frameworks, providing systematic engineering strategies to optimize frame-draw budgets below 8.3ms for high-refresh developer displays.',
    content: `Ensuring robust, jitter-free interactive rendering on Android (especially on modern high-refresh 120Hz displays) requires understanding runtime phase boundaries. Aura R&D’s research group analyzed rendering performance profiles using Compose Compiler Reports.

### 1. The Compose Phase Circle
Jetpack Compose processes frames sequentially through three stages:
1. **Composition**: Runs your composable code and constructs the layout hierarchy.
2. **Layout**: Measures active coordinates and positions child elements.
3. **Drawing**: Renders drawing operations directly on a canvas grid.

### 2. Practical Minimization of Recomposition Loops
- **Defer Writes using Lambdas**: Avoid reading reactive standard states directly in calculations. Instead, pass lambdas to layouts:
  \`\`\`kotlin
  // Bad: Forces recomposition of the whole box header whenever scrollOffset changes
  Box(Modifier.offset(y = scrollOffset.value.dp))
  
  // Good: Computes offsets dynamically during Layout/Draw phase, skipping composition entirely
  Box(Modifier.offset { IntOffset(0, scrollOffset.value.roundToInt()) })
  \`\`\`
- **Pre-Stabilize Complex Objects**: Mark arrays and custom structures with \`@Stable\` or \`@Immutable\` annotations to prompt compiler optimization strategies.
- **Utilize DerivedStateOf**: Merge multiple dynamic updates into cohesive single-state triggers to reduce draw calls when computing thresholds.`,
    readTime: '8 min read',
    publishedDate: 'April 28, 2026',
    author: 'Aura Mobile Labs',
    tags: ['Jetpack Compose', 'Performance', 'Mobile R&D', 'UI Systems']
  },
  {
    id: 'art-distributed-ledgers',
    title: 'Parallel Event Processing and Client Sync Topologies',
    category: 'Systems Cryptography',
    summary: 'A deep architectural dive analyzing modern event-dispatch strategies, consensus validation queues, and client-local sync models using secure cryptographic logs.',
    content: `When building high-growth systems serving millions of concurrent global instances, synchronization conflicts become standard challenges. Our research models hybrid protocols bridging localized SQLite storage directly to Raft consensus state-pools.

### Key Learnings
- **Vector Clock Tracking**: Prevent concurrent data write overlaps through chronological vector stamping.
- **Offline-First Resilience**: Allow local mobile engines to commit local records immediately, resolving remote merges utilizing cryptographic payload signatures automatically behind the scenes.
- **Microservices Partition Recovery**: Implement dynamic database partitions capable of operating offline with automatic batch uploads upon connectivity re-establishment.`,
    readTime: '10 min read',
    publishedDate: 'March 15, 2026',
    author: 'Aura Core Systems Division',
    tags: ['Distributed Systems', 'Cryptography', 'Offline Sync']
  }
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'aura-secure-id',
    title: 'Aura Cryptographic Attestation Client',
    subtitle: 'Advanced Security Credentials App',
    description: 'A reference Android implementation showcasing the integration of Play Integrity API, biometric security models, and client certification handles in dynamic environments.',
    platform: 'Android',
    status: 'Published',
    iconName: 'ShieldAlert',
    playStoreUrl: 'https://play.google.com/store',
    highlights: [
      'Automated Attestation checks using Play Integrity API wrapper',
      'Encrypted local storage utilising Android Keystore hardware keys',
      'Real-time network security health monitors'
    ]
  },
  {
    id: 'aura-flow-engine',
    title: 'Aura System Topology Simulator',
    subtitle: 'System Design Diagramming Engine',
    description: 'An advanced interactive engine used by software architects to draft flow topologies, compute estimated network hops, and simulate packet drops under high server stress.',
    platform: 'Web Framework',
    status: 'R&D Labs',
    iconName: 'Network',
    highlights: [
      'Interactive vector topology editor inside browser controls',
      'Realistic server-node capacity modeling',
      'Direct system performance dashboard reports'
    ]
  },
  {
    id: 'aura-jetpack-boilerplate',
    title: 'Solid Architecture Kit for Android',
    subtitle: 'Developer Bootstrap Library',
    description: 'An open-source starter configuration pre-validated for Google Play developer compliance, Jetpack Compose structure, and clean clean-architecture DI binders.',
    platform: 'AI SDK',
    status: 'Published',
    iconName: 'Cpu',
    playStoreUrl: 'https://github.com',
    highlights: [
      'Strict MVVM architecture setup with zero-boilerplate scaffolding',
      'Configured Play Safety attestation helper service classes',
      'Embedded unit tests checking offline repository rules'
    ]
  }
];
