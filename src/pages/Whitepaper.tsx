
import { useTheme } from "@/context/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Whitepaper = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"}`}>
      <Navigation />

      <div className="container mx-auto pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="text-center mb-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">MoonSet Whitepaper</h1>
            <p className="text-lg text-muted-foreground">
              Understanding the technical foundations and future vision of MoonSet
            </p>
          </div>

          <div className="glass p-6 md:p-10 rounded-2xl">
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
              
              {/* --- TABLE OF CONTENTS --- */}
              <nav id="toc" className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg not-prose">
                <h2 className="text-2xl font-semibold mt-0 mb-3">Table of Contents</h2>
                <ul className="list-none p-0 m-0">
                    <li><a href="#executive-summary" className="hover:underline">Executive Summary</a></li>
                    <li><a href="#introduction" className="hover:underline">Introduction: The Truth Crisis</a></li>
                    <li><a href="#vision-mission" className="hover:underline">MoonSet Vision & Mission</a></li>
                    <li><a href="#core-technology" className="hover:underline">Core Technology Suite</a>
                        <ul className="list-none pl-5 mt-1">
                            <li><a href="#mare" className="hover:underline">MoonSet AI Research Engine (MARE)</a></li>
                            <li><a href="#del" className="hover:underline">Decentralized Evidence Ledger (DEL)</a></li>
                            <li><a href="#token-ecosystem" className="hover:underline">MOONSET Token Ecosystem</a></li>
                        </ul>
                    </li>
                    <li><a href="#apollo-case-study" className="hover:underline">The Apollo Missions Case Study</a>
                        <ul className="list-none pl-5 mt-1">
                            <li><a href="#why-apollo" className="hover:underline">Why the Apollo Missions?</a></li>
                            <li><a href="#preliminary-research" className="hover:underline">Preliminary Research Areas</a></li>
                            <li><a href="#expected-outcomes" className="hover:underline">Expected Outcomes</a></li>
                        </ul>
                    </li>
                    <li><a href="#technical-architecture" className="hover:underline">Technical Architecture</a>
                        <ul className="list-none pl-5 mt-1">
                            <li><a href="#ai-architecture" className="hover:underline">AI Architecture</a></li>
                            <li><a href="#blockchain-implementation" className="hover:underline">Blockchain Implementation</a></li>
                            <li><a href="#ui-ux" className="hover:underline">User Interface & Experience</a></li>
                        </ul>
                    </li>
                    <li><a href="#research-methodology" className="hover:underline">Research Methodology</a>
                        <ul className="list-none pl-5 mt-1">
                            <li><a href="#evidence-classification" className="hover:underline">Evidence Classification Framework</a></li>
                            <li><a href="#peer-review" className="hover:underline">Peer Review Protocol</a></li>
                            <li><a href="#consensus-mechanisms" className="hover:underline">Consensus Mechanisms</a></li>
                        </ul>
                    </li>
                    <li><a href="#token-economics" className="hover:underline">Token Economics</a>
                        <ul className="list-none pl-5 mt-1">
                            <li><a href="#distribution-model" className="hover:underline">Distribution Model</a></li>
                            <li><a href="#utility-framework" className="hover:underline">Utility Framework</a></li>
                            <li><a href="#governance-structure-token" className="hover:underline">Governance Structure (Token)</a></li>
                            <li><a href="#value-accrual" className="hover:underline">Value Accrual Mechanisms</a></li>
                        </ul>
                    </li>
                    <li><a href="#moonset-dao" className="hover:underline">The MoonSet DAO</a>
                        <ul className="list-none pl-5 mt-1">
                            <li><a href="#governance-framework-dao" className="hover:underline">Governance Framework (DAO)</a></li>
                            <li><a href="#proposal-system" className="hover:underline">Proposal System</a></li>
                            <li><a href="#treasury-management" className="hover:underline">Treasury Management</a></li>
                        </ul>
                    </li>
                    <li><a href="#growth-strategy" className="hover:underline">Growth Strategy</a>
                        <ul className="list-none pl-5 mt-1">
                            <li><a href="#community-building" className="hover:underline">Community Building</a></li>
                            <li><a href="#academic-partnerships" className="hover:underline">Academic Partnerships</a></li>
                            <li><a href="#future-investigations" className="hover:underline">Future Investigation Topics</a></li>
                        </ul>
                    </li>
                    <li><a href="#team-advisors" className="hover:underline">Executive Team & Advisors</a></li>
                    <li><a href="#roadmap" className="hover:underline">Detailed Roadmap</a></li>
                    <li><a href="#competitive-analysis" className="hover:underline">Competitive Analysis</a></li>
                    <li><a href="#risk-assessment" className="hover:underline">Risk Assessment & Mitigation</a></li>
                    <li><a href="#financial-projections" className="hover:underline">Financial Projections</a></li>
                    <li><a href="#join-movement" className="hover:underline">Join the Movement</a></li>
                    <li><a href="#references" className="hover:underline">References & Resources</a></li>
                    <li><a href="#appendices" className="hover:underline">Appendices</a></li>
                </ul>
              </nav>

              {/* --- Executive Summary --- */}
              <section id="executive-summary">
                <h2>Executive Summary</h2>
                <p>MoonSet represents a paradigm shift in the verification of historical narratives and complex events. By merging cutting-edge artificial intelligence, blockchain technology, and decentralized governance, we're creating an ecosystem that incentivizes rigorous investigation and transparent evidence analysis.</p>
                <p>Our mission is not to dictate conclusions but to build a sophisticated technological framework that empowers researchers, historians, scientists, and curious individuals to collaboratively examine evidence, test hypotheses, and contribute to a more nuanced understanding of significant historical events.</p>
                <p>The MoonSet platform consists of three revolutionary core components:</p>
                <ul>
                    <li><strong>MARE (MoonSet AI Research Engine):</strong> An advanced AI system designed to process vast datasets, identify anomalies, analyze visual and textual evidence, and assist human researchers in discovering patterns and inconsistencies that might otherwise remain hidden.</li>
                    <li><strong>DEL (Decentralized Evidence Ledger):</strong> A blockchain-based system ensuring all evidence, analyses, and research findings are immutably recorded with provenance tracking, creating a censorship-resistant and transparent repository of investigation materials.</li>
                    <li><strong>MOONSET Token:</strong> A utility token that fuels the ecosystem, rewards valuable contributions, enables platform governance, and aligns incentives toward high-quality research and collaboration.</li>
                </ul>
                <p>Beginning with the Apollo missions as our initial case study, MoonSet will demonstrate the power of combining machine intelligence with human expertise in a decentralized framework. This document outlines our comprehensive approach to building this revolutionary platform and the strategic roadmap for its development and growth.</p>
              </section>

              {/* --- Introduction: The Truth Crisis --- */}
              <section id="introduction">
                <h2>Introduction: The Truth Crisis</h2>
                <p>In today's digital landscape, information proliferates at unprecedented rates, yet distinguishing fact from fiction has never been more challenging. We face a paradox: despite having access to more data than any previous generation, the path to verifiable truth often remains elusive.</p>
                <p>Several factors contribute to this modern dilemma:</p>
                <ul>
                    <li><strong className="mr-1">Information Overload:</strong> The sheer volume of available data makes comprehensive analysis by traditional means nearly impossible.</li>
                    <li><strong className="mr-1">Institutional Gatekeeping:</strong> Access to primary sources and raw data is frequently restricted or controlled by centralized entities.</li>
                    <li><strong className="mr-1">Echo Chambers:</strong> Digital algorithms and social dynamics often reinforce existing beliefs rather than facilitating critical examination.</li>
                    <li><strong className="mr-1">Complexity of Modern Events:</strong> Many significant historical and scientific events involve technical details requiring specialized expertise across multiple domains.</li>
                    <li><strong className="mr-1">Incentive Misalignment:</strong> Traditional research funding and publication models may discourage investigations that challenge established narratives.</li>
                </ul>
                <p>The consequences of this truth crisis are profound. Public trust in institutions continues to decline, resources are allocated based on potentially flawed understandings, and scientific progress may be impeded when built upon incomplete foundations. Moreover, the polarization that results from competing unverified narratives threatens social cohesion and effective governance.</p>
                <p>MoonSet emerges as a response to these challenges—a technology-driven initiative designed to create new pathways to verifiable truth through collective intelligence, advanced analytics, and aligned incentives.</p>
                <p>By providing powerful tools for collaborative investigation without predetermining outcomes, MoonSet aims to shift the paradigm from competing narratives to evidence-based consensus building. Our approach recognizes that truth discovery is an ongoing process requiring transparency, rigorous methodology, and diverse perspectives—all supported by cutting-edge technology.</p>
                <p>The pages that follow detail our comprehensive plan to build this revolutionary platform for truth discovery, beginning with one of history's most significant and discussed events: the Apollo missions.</p>
              </section>

              {/* --- MoonSet Vision & Mission --- */}
              <section id="vision-mission">
                <h2>MoonSet Vision & Mission</h2>
                <h3>Vision</h3>
                <p>MoonSet envisions a world where verifiable truth is accessible through collaborative intelligence, where complex historical and scientific narratives can be rigorously examined using advanced technology, and where individuals are empowered to contribute to our collective understanding rather than simply consuming pre-packaged narratives.</p>
                <p>We see a future where:</p>
                <ul>
                    <li>Advanced AI tools serve human inquiry rather than replacing critical thinking.</li>
                    <li>Blockchain technology ensures transparency and immutability in evidence preservation.</li>
                    <li>Economic incentives align with honest investigation and quality research.</li>
                    <li>Diverse perspectives strengthen rather than fragment our shared understanding.</li>
                    <li>Truth emerges through rigorous methodology rather than centralized authority.</li>
                </ul>
                <h3>Mission</h3>
                <p>Our mission is to build the world's most sophisticated technological framework for collaborative truth discovery—a platform that combines artificial intelligence, blockchain technology, and economic incentives to enable unprecedented analysis of complex events.</p>
                <p>Specifically, MoonSet aims to:</p>
                <ul>
                    <li><strong className="mr-1">Develop Revolutionary Tools:</strong> Create and refine MARE, DEL, and the MOONSET token ecosystem to provide researchers with capabilities far beyond traditional investigation methods.</li>
                    <li><strong className="mr-1">Foster Methodological Rigor:</strong> Establish new standards for evidence classification, peer review, and consensus-building in collaborative research.</li>
                    <li><strong className="mr-1">Build a Global Community:</strong> Unite diverse researchers, technologists, and critical thinkers in a shared pursuit of evidence-based understanding.</li>
                    <li><strong className="mr-1">Demonstrate Effectiveness:</strong> Successfully apply our protocol to the Apollo missions as a case study, showcasing the power of our approach for future investigations.</li>
                    <li><strong className="mr-1">Evolve through Governance:</strong> Create a truly decentralized autonomous organization that can sustainably grow and adapt to new challenges and opportunities.</li>
                    <li><strong className="mr-1">Establish a New Paradigm:</strong> Pioneer a model for truth verification that can be applied to numerous domains, from historical events to contemporary scientific controversies.</li>
                </ul>
                <p>In pursuing this mission, MoonSet is committed to intellectual honesty, technological transparency, and methodological neutrality. We do not begin with predetermined conclusions but rather with a dedication to building tools that can illuminate what might otherwise remain obscured.</p>
              </section>

              {/* --- Core Technology Suite --- */}
              <section id="core-technology">
                <h2>Core Technology Suite</h2>
                <p>The MoonSet platform is built upon three integrated technological pillars, each designed to address critical aspects of collaborative truth discovery. Together, they form a comprehensive ecosystem for evidence gathering, analysis, verification, and consensus building.</p>
                
                <article id="mare">
                  <h3>MoonSet AI Research Engine (MARE)</h3>
                  <p>MARE represents the analytical heart of the MoonSet platform—a sophisticated artificial intelligence system specifically designed for evidence analysis and anomaly detection. Unlike general-purpose AI tools, MARE is optimized for the unique challenges of historical investigation and forensic analysis.</p>
                  <h4>Key Capabilities:</h4>
                  <ul>
                    <li><strong className="mr-1">Multi-modal Data Processing</strong>
                      <ul>
                        <li>Ingest and analyze text, images, video, audio, and structured data</li>
                        <li>Support for legacy formats often found in historical archives</li>
                        <li>Cross-format analysis for inconsistency detection</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Advanced Visual Analysis</strong>
                      <ul>
                        <li>Photogrammetric reconstruction from multiple images</li>
                        <li>Shadow and lighting consistency verification</li>
                        <li>Object proportion and perspective analysis</li>
                        <li>Detection of image manipulation and anachronistic elements</li>
                        <li>3D scene reconstruction for physical plausibility testing</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Natural Language Processing Suite</strong>
                      <ul>
                        <li>Semantic analysis of testimonies and documents</li>
                        <li>Cross-reference engine for statement consistency</li>
                        <li>Specialized models for technical and scientific content</li>
                        <li>Temporal contextualization of historical language</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Anomaly Detection Systems</strong>
                      <ul>
                        <li>Statistical pattern deviation identification</li>
                        <li>Physical impossibility flagging</li>
                        <li>Temporal and causal inconsistency detection</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Research Assistance Features</strong>
                      <ul>
                        <li>Automated source connection suggestions</li>
                        <li>Hypothesis testing frameworks</li>
                        <li>Evidence correlation mapping</li>
                        <li>Dynamic knowledge graphs with confidence scoring</li>
                      </ul>
                    </li>
                  </ul>
                  <h4>Technical Implementation:</h4>
                  <p>MARE is built as a modular system comprising specialized neural networks, transformers, computer vision algorithms, and traditional rule-based analytical systems. The architecture emphasizes:</p>
                  <ul>
                    <li>Explainability of results to prevent "black box" analysis</li>
                    <li>Confidence scoring with explicit uncertainty quantification</li>
                    <li>Human-in-the-loop design for collaborative intelligence</li>
                    <li>Continuous learning from researcher feedback and new evidence</li>
                    <li>Computational efficiency to enable complex analysis on consumer hardware</li>
                  </ul>
                  <p>Importantly, MARE is not designed to reach conclusions independently but to augment human analytical capabilities, highlight potential areas of interest, and provide computational support for complex analyses that would be impractical to perform manually.</p>
                </article>

                <article id="del">
                  <h3>Decentralized Evidence Ledger (DEL)</h3>
                  <p>The DEL forms the immutable foundation of the MoonSet platform, ensuring that all evidence, analyses, and methodologies are permanently recorded, verifiable, and resistant to tampering or censorship. This blockchain-based system creates a chain of custody for digital evidence that is unprecedented in traditional research.</p>
                  <h4>Key Features:</h4>
                  <ul>
                    <li><strong className="mr-1">Immutable Evidence Repository</strong>
                      <ul>
                        <li>Permanent storage of primary source materials</li>
                        <li>Cryptographic verification of digital assets</li>
                        <li>Tamper-evident storage with version history</li>
                        <li>Distributed redundancy across network participants</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Provenance Tracking</strong>
                      <ul>
                        <li>Chain of custody documentation for all evidence</li>
                        <li>Source attribution with verification mechanisms</li>
                        <li>Metadata enrichment with acquisition context</li>
                        <li>Authentication protocols for submitted materials</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Transparent Analysis Registry</strong>
                      <ul>
                        <li>Permanent record of analytical methods applied</li>
                        <li>Documentation of parameter selections and configurations</li>
                        <li>Reproducible analysis workflows</li>
                        <li>Attribution of analytical contributions</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Consensus Mechanisms</strong>
                      <ul>
                        <li>Multi-stage peer review protocols</li>
                        <li>Stake-weighted evaluation systems</li>
                        <li>Expertise-based verification hierarchies</li>
                        <li>Transparent aggregation of evaluator judgments</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Access Control Layer</strong>
                      <ul>
                        <li>Granular permissions for sensitive materials</li>
                        <li>Cryptographic access management</li>
                        <li>Reveal mechanisms for time-locked content</li>
                        <li>Governance-defined access policies</li>
                      </ul>
                    </li>
                  </ul>
                  <h4>Technical Implementation:</h4>
                  <p>The DEL is built on a dedicated Layer 2 blockchain solution optimized for data integrity and verification rather than transaction throughput. This approach emphasizes:</p>
                  <ul>
                    <li>Content-addressable storage with distributed file system integration</li>
                    <li>Efficient on-chain verification with off-chain storage where appropriate</li>
                    <li>Cryptographic commitment schemes for large dataset verification</li>
                    <li>Zero-knowledge proof systems for sensitive content verification</li>
                    <li>Cross-chain anchoring for additional security</li>
                  </ul>
                  <p>The DEL's architecture ensures that researchers can trust the authenticity and completeness of the evidence they're examining, while maintaining an immutable record of the entire investigative process. This infrastructure is critical not only for the integrity of individual investigations but for the long-term credibility of the MoonSet platform itself.</p>
                </article>

                <article id="token-ecosystem">
                  <h3>MOONSET Token Ecosystem</h3>
                  <p>The MOONSET token is the economic engine of the platform, designed to align incentives among all participants and sustain the ongoing development and maintenance of the ecosystem. Unlike many token systems, MOONSET is crafted specifically to reward quality contributions rather than mere participation.</p>
                  <h4>Token Functionality:</h4>
                  <ul>
                    <li><strong className="mr-1">Contribution Rewards</strong>
                      <ul>
                        <li>Evidence submission incentives</li>
                        <li>Analysis quality bonuses</li>
                        <li>Peer review compensation</li>
                        <li>Computational resource provision rewards</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Platform Governance</strong>
                      <ul>
                        <li>Protocol upgrade voting</li>
                        <li>Research direction prioritization</li>
                        <li>Resource allocation decisions</li>
                        <li>Validator selection for consensus mechanisms</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Service Access</strong>
                      <ul>
                        <li>Computational resource allocation</li>
                        <li>Premium analysis tool usage</li>
                        <li>Priority evidence processing</li>
                        <li>Advanced visualization capabilities</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Staking Mechanisms</strong>
                      <ul>
                        <li>Confidence-weighted assertions</li>
                        <li>Claim validation backing</li>
                        <li>Long-term protocol support incentives</li>
                        <li>Reputation-based staking multipliers</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Value Accrual</strong>
                      <ul>
                        <li>Fee distribution to stakeholders</li>
                        <li>Treasury-funded buyback mechanisms</li>
                        <li>Service demand-driven token utilization</li>
                        <li>Protocol revenue sharing</li>
                      </ul>
                    </li>
                  </ul>
                  <h4>Technical Implementation:</h4>
                  <p>The MOONSET token is implemented as an ERC-20 compatible token with additional functionalities to support sophisticated governance and staking mechanics. Key features include:</p>
                  <ul>
                    <li>Quadratic voting for governance proposals</li>
                    <li>Time-locked staking with conviction scaling</li>
                    <li>Reputation-weighted influence mechanisms</li>
                    <li>Automated distribution systems for contribution rewards</li>
                    <li>Cross-chain interoperability for ecosystem expansion</li>
                  </ul>
                  <p>The tokenomics design intentionally prevents value extraction without contribution, ensures long-term alignment between token holders and platform quality, and creates sustainable funding for ongoing development. The specifics of token distribution, supply mechanisms, and economic parameters are detailed in the Token Economics section of this whitepaper.</p>
                </article>
              </section>

              {/* --- The Apollo Missions Case Study --- */}
              <section id="apollo-case-study">
                <h2>The Apollo Missions Case Study</h2>
                <p>The MoonSet platform's inaugural investigation focuses on the Apollo lunar missions—one of humanity's greatest claimed technological achievements and a subject of ongoing public fascination and debate.</p>
                
                <article id="why-apollo">
                  <h3>Why the Apollo Missions?</h3>
                  <p>The Apollo program represents an ideal case study for the MoonSet platform for several compelling reasons:</p>
                  <ul>
                    <li><strong className="mr-1">Historical Significance:</strong> The lunar landings represent a pivotal moment in human history and technological development, with implications that continue to shape space exploration today.</li>
                    <li><strong className="mr-1">Rich Evidence Base:</strong> The missions generated vast amounts of varied data—photographs, video footage, telemetry, geological samples, technical documentation, and personal testimonies—providing abundant material for multi-modal analysis.</li>
                    <li><strong className="mr-1">Technical Complexity:</strong> The Apollo missions involved cutting-edge engineering across multiple disciplines, creating an ideal test case for MARE's ability to analyze complex technical systems and physical scenarios.</li>
                    <li><strong className="mr-1">Ongoing Public Interest:</strong> Despite occurring over five decades ago, the Apollo missions continue to generate significant public interest and discussion, ensuring a motivated community of contributors.</li>
                    <li><strong className="mr-1">Methodological Blueprint:</strong> Establishing rigorous investigative protocols for the Apollo case study will create a replicable framework for future MoonSet investigations across other domains.</li>
                  </ul>
                  <p>Importantly, MoonSet approaches this investigation without predetermined conclusions. The platform is designed to facilitate evidence-based analysis regardless of where that evidence leads, employing consistent methodological standards across all hypotheses.</p>
                </article>
                
                <article id="preliminary-research">
                  <h3>Preliminary Research Areas</h3>
                  <p>The Apollo investigation will initially focus on several key areas where the MoonSet platform's capabilities can be most effectively demonstrated:</p>
                  <ul>
                    <li><strong className="mr-1">Photographic Analysis</strong>
                      <ul>
                        <li>Comprehensive photogrammetric reconstruction of landing sites</li>
                        <li>Advanced shadow analysis using 3D environmental modeling</li>
                        <li>Cross-comparison of imagery with modern lunar reconnaissance data</li>
                        <li>Authentication assessment of original film materials</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Technical Feasibility Assessment</strong>
                      <ul>
                        <li>Computational fluid dynamics analysis of lunar module descent</li>
                        <li>Radiation exposure modeling for transit and surface operations</li>
                        <li>Engineering capability assessment relative to documented technology</li>
                        <li>Communications systems analysis under lunar conditions</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Material Evidence Evaluation</strong>
                      <ul>
                        <li>Comprehensive cataloging of lunar samples and their chain of custody</li>
                        <li>Comparison of sample properties with theoretical predictions</li>
                        <li>Analysis of artifact preservation and degradation patterns</li>
                        <li>Documentation of physical evidence accessibility</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Testimony and Documentation Review</strong>
                      <ul>
                        <li>Systematic comparison of accounts across mission personnel</li>
                        <li>Temporal analysis of documentation revisions and updates</li>
                        <li>Identification of consistency patterns across independent sources</li>
                        <li>Assessment of information availability and transparency</li>
                      </ul>
                    </li>
                    <li><strong className="mr-1">Alternative Hypothesis Testing</strong>
                      <ul>
                        <li>Formalization of testable predictions from major hypotheses</li>
                        <li>Bayesian probability assessment framework for competing explanations</li>
                        <li>Simulation of expected evidence patterns under various scenarios</li>
                        <li>Identification of critical differentiating evidence</li>
                      </ul>
                    </li>
                  </ul>
                </article>
                
                <article id="expected-outcomes">
                  <h3>Expected Outcomes</h3>
                  <p>Through this comprehensive investigation, MoonSet aims to produce several valuable outcomes:</p>
                  <ul>
                    <li>A complete, immutable, and transparent evidence repository for the Apollo missions, accessible to researchers worldwide</li>
                    <li>Advanced analytical tools specifically calibrated for space mission investigation, applicable to both historical and future missions</li>
                    <li>A methodological framework for evaluating complex technical achievements that can be applied across domains</li>
                    <li>A demonstration of collaborative, decentralized investigation that prioritizes evidence quality over institutional authority</li>
                    <li>A proof of concept for the MoonSet platform's ability to foster rigorous, transparent investigation of significant historical events</li>
                  </ul>
                  <p>While the investigation's specific conclusions will emerge from the evidence analysis rather than predetermined assumptions, the procedural integrity of the investigation itself represents a significant advancement in collaborative truth discovery.</p>
                </article>
              </section>

              {/* Add Footer at the bottom of the content */}
              <div className="mt-12 p-5 border-t border-gray-200 dark:border-gray-800">
                <p className="text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} MoonSet Protocol. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Whitepaper;
