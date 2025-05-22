
import { useTheme } from "@/context/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Whitepaper = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Helper for list titles, if prose doesn't style them distinctly enough
  // You can apply this with <span className={listTitleStyle}>Title:</span>
  // const listTitleStyle = "font-semibold mr-1";

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#060606]" : "bg-[#f8f8f8]"}`}>
      <Navigation />

      <div className="container mx-auto pt-32 pb-20"> {/* Added mx-auto for centering container */}
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

          <div className="glass p-6 md:p-10 rounded-2xl"> {/* Adjusted padding slightly */}
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto"> {/* max-w-none for prose to take full width of its parent */}
              
              {/* --- TABLE OF CONTENTS --- */}
              <nav id="toc" className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg not-prose"> {/* Added not-prose to prevent prose styling conflicts */}
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
                                  <li>Statistical outlier identification in numerical data</li>
                                  <li>Pattern disruption detection in expected sequences</li>
                                  <li>Temporal and causal inconsistency flagging</li>
                                  <li>Bayesian probability modeling for contradictory evidence</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Collaborative Intelligence Features</strong>
                              <ul>
                                  <li>Hypothesis testing workbench</li>
                                  <li>Evidence relationship mapping</li>
                                  <li>Research thread tracking and management</li>
                                  <li>AI-assisted question formulation</li>
                                  <li>Interactive visualization of complex evidence networks</li>
                              </ul>
                          </li>
                      </ul>
                      <p>MARE is designed as an assistive technology, augmenting human intelligence rather than replacing it. The system flags potential areas of interest, identifies patterns, and performs analyses at scales impossible for individual researchers, but ultimate interpretation and significance assessment remains with human experts and the community.</p>
                      <p>The AI models powering MARE will be as transparent as possible, with published methodology papers and, where feasible, open-source components. This commitment to transparency ensures that MARE's analyses can be trusted and verified by the community.</p>
                  </article>

                  <article id="del">
                      <h3>Decentralized Evidence Ledger (DEL)</h3>
                      <p>The DEL provides the immutable foundation upon which all MoonSet investigations are built. Leveraging blockchain technology, the DEL ensures that evidence, analyses, and research findings are preserved with absolute integrity and transparent provenance.</p>
                      <h4>Core Functions:</h4>
                      <ul>
                          <li><strong className="mr-1">Evidence Registration & Preservation</strong>
                              <ul>
                                  <li>Cryptographic hashing of all submitted evidence</li>
                                  <li>Immutable timestamping for chronological integrity</li>
                                  <li>Distributed storage across the network (leveraging IPFS/Filecoin)</li>
                                  <li>Original format preservation with metadata enrichment</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Contributor Attribution System</strong>
                              <ul>
                                  <li>Cryptographic signatures for all submissions</li>
                                  <li>Reputation tracking for contributors</li>
                                  <li>Transparent contribution history</li>
                                  <li>Privacy-preserving identity options</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Access Control Framework</strong>
                              <ul>
                                  <li>Granular permission management for sensitive materials</li>
                                  <li>Time-locked access for embargoed evidence</li>
                                  <li>Token-gated research capabilities</li>
                                  <li>Transparency-first default settings</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Chain of Analysis Tracking</strong>
                              <ul>
                                  <li>Complete audit trail of analytical processes</li>
                                  <li>Version control for evolving research</li>
                                  <li>Fork and merge capabilities for divergent hypotheses</li>
                                  <li>Cross-reference mapping between evidence items</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Consensus Mechanisms</strong>
                              <ul>
                                  <li>Multi-level peer review recording</li>
                                  <li>Stake-weighted confidence scoring</li>
                                  <li>Evidence classification state transitions</li>
                                  <li>Transparent disputed evidence flagging</li>
                              </ul>
                          </li>
                      </ul>
                      <p>The DEL is implemented as a specialized layer built on Ethereum, potentially leveraging layer-2 scaling solutions for cost-efficiency and throughput. Smart contracts govern the rules of evidence submission, peer review processes, and reputation systems, ensuring that platform incentives remain aligned with quality research and honest contribution.</p>
                      <p>By creating an immutable record of all investigation materials and processes, the DEL ensures that MoonSet research cannot be censored, manipulated, or erased—providing unprecedented confidence in the integrity of collaborative investigations.</p>
                  </article>

                  <article id="token-ecosystem">
                      <h3>MOONSET Token Ecosystem</h3>
                      <p>The MOONSET token serves as the economic backbone of the platform, creating properly aligned incentives for quality contributions while enabling decentralized governance of the ecosystem's evolution.</p>
                      <h4>Token Utility:</h4>
                      <ul>
                          <li><strong className="mr-1">Platform Access & Utilization</strong>
                              <ul>
                                  <li>Tiered access to advanced MARE capabilities</li>
                                  <li>Priority processing for compute-intensive analyses</li>
                                  <li>Evidence submission rights</li>
                                  <li>Premium data visualization and export options</li>
                                  <li>Research thread initiation privileges</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Contribution Incentives</strong>
                              <ul>
                                  <li>Rewards for valuable evidence submission</li>
                                  <li>Compensation for peer review participation</li>
                                  <li>Bounties for specific research challenges</li>
                                  <li>Recognition for identifying significant anomalies</li>
                                  <li>Incentives for AI training data contribution</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Staking Mechanisms</strong>
                              <ul>
                                  <li>Quality staking for research claims</li>
                                  <li>Confidence staking on hypotheses</li>
                                  <li>Curation staking for evidence importance</li>
                                  <li>Reputation staking for peer reviews</li>
                                  <li>Security staking for platform operations</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Governance Rights</strong>
                              <ul>
                                  <li>Voting on protocol upgrades</li>
                                  <li>Research direction prioritization</li>
                                  <li>Parameter adjustment for incentive systems</li>
                                  <li>Treasury fund allocation</li>
                                  <li>New investigation topic selection</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Economic Alignment</strong>
                              <ul>
                                  <li>Fee distribution to ecosystem contributors</li>
                                  <li>Deflationary mechanisms based on platform usage</li>
                                  <li>Liquidity incentives for market stability</li>
                                  <li>Long-term value accrual through utility expansion</li>
                              </ul>
                          </li>
                      </ul>
                      <p>The MOONSET token is designed as an ERC-20 utility token with integrated governance capabilities. Its economic model carefully balances immediate utility value with long-term ecosystem health, creating sustainable incentives for ongoing participation and contribution.</p>
                      <p>By tokenizing aspects of the research process, MoonSet creates a new model for funding and rewarding open investigation—one that aligns economic incentives with the pursuit of verifiable truth rather than predetermined narratives or institutional agendas.</p>
                  </article>
              </section>

              {/* --- The Apollo Missions Case Study --- */}
              <section id="apollo-case-study">
                  <h2>The Apollo Missions Case Study</h2>
                  <article id="why-apollo">
                      <h3>Why the Apollo Missions?</h3>
                      <p>The Apollo program represents an ideal initial focus for the MoonSet Truth Protocol for several compelling reasons:</p>
                      <ul>
                          <li><strong className="mr-1">Global Significance:</strong> The Apollo missions, particularly the moon landings, rank among humanity's most celebrated achievements and continue to shape our understanding of human potential and technological progress.</li>
                          <li><strong className="mr-1">Ongoing Public Interest:</strong> Despite occurring over 50 years ago, the Apollo program continues to generate significant public interest, discussion, and debate, ensuring an engaged audience for our platform demonstration.</li>
                          <li><strong className="mr-1">Rich Data Landscape:</strong> The Apollo missions produced an extensive archive of materials—photos, videos, technical documents, telemetry data, lunar samples, astronaut testimonies, and mission communications—providing abundant raw material for sophisticated analysis.</li>
                          <li><strong className="mr-1">Multi-disciplinary Nature:</strong> Proper investigation requires expertise across numerous domains (aerospace engineering, photography, geology, materials science, etc.), making it an excellent showcase for collaborative research.</li>
                          <li><strong className="mr-1">Technical Complexity:</strong> The missions involve advanced technical claims that can be rigorously examined using modern analytical methods, demonstrating the power of AI-assisted investigation.</li>
                          <li><strong className="mr-1">Diverse Perspectives:</strong> Perspectives on the Apollo missions range widely, from complete acceptance of the official narrative to varying degrees of skepticism, making it an opportunity to demonstrate how MoonSet can productively bring together diverse viewpoints under a shared methodology.</li>
                          <li><strong className="mr-1">Educational Value:</strong> The process of analyzing the Apollo missions can yield significant educational benefits for participants, regardless of ultimate conclusions, advancing public understanding of space exploration, scientific methodology, and critical analysis techniques.</li>
                      </ul>
                      <p>By focusing initially on the Apollo missions, MoonSet can demonstrate the full capabilities of our protocol while addressing a topic of enduring public interest. Most importantly, the Apollo program provides an excellent test case for establishing MoonSet's credibility as a neutral platform focused on methodological rigor rather than predetermined outcomes.</p>
                      <p>Our approach to the Apollo missions will be comprehensive and balanced, welcoming evidence and analysis from all perspectives while maintaining strict standards for methodological quality and evidence classification.</p>
                  </article>

                  <article id="preliminary-research">
                      <h3>Preliminary Research Areas</h3>
                      <p>The MoonSet investigation of the Apollo missions will be organized into several key research areas, each examining different aspects of the program and associated evidence. These include:</p>
                      <ul>
                          <li><strong className="mr-1">Photographic & Video Analysis</strong>
                              <ul>
                                  <li>Shadow geometry and consistency</li>
                                  <li>Lighting characteristics and source identification</li>
                                  <li>Environmental contextual analysis (lunar surface features)</li>
                                  <li>Technical limitation assessment of period equipment</li>
                                  <li>Comparative analysis across mission imagery</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Technical Feasibility Assessment</strong>
                              <ul>
                                  <li>Radiation protection capabilities</li>
                                  <li>Thermal management systems analysis</li>
                                  <li>Propulsion and trajectory verification</li>
                                  <li>Life support systems evaluation</li>
                                  <li>Communication technology capabilities</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Geological & Material Evidence</strong>
                              <ul>
                                  <li>Lunar sample analysis and provenance</li>
                                  <li>Comparison with terrestrial materials</li>
                                  <li>Environmental marker assessment</li>
                                  <li>Aging and exposure characteristics</li>
                                  <li>Isotopic and chemical composition verification</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Testimonial & Documentary Evidence</strong>
                              <ul>
                                  <li>Consistency analysis of witness accounts</li>
                                  <li>Technical document cross-verification</li>
                                  <li>Evolution of narrative details over time</li>
                                  <li>Contextual analysis of the geopolitical environment</li>
                                  <li>Procurement and contracting record examination</li>
                              </ul>
                          </li>
                          <li><strong className="mr-1">Physical Artifact Examination</strong>
                              <ul>
                                  <li>Equipment functionality verification</li>
                                  <li>Material composition analysis</li>
                                  <li>Manufacturing technique assessment</li>
                                  <li>Wear pattern and usage evidence</li>
                                  <li>Contemporary technological context</li>
                              </ul>
                          </li>
                      </ul>
                      <p>For each research area, MARE will assist in analyzing available evidence, identifying areas requiring further investigation, flagging potential anomalies, and helping researchers develop testable hypotheses.</p>
                  </article>

                  <article id="expected-outcomes">
                      <h3>Expected Outcomes</h3>
                      <p>The Apollo missions case study aims to produce several valuable outcomes that demonstrate the effectiveness of the MoonSet Truth Protocol:</p>
                      <ul>
                          <li><strong className="mr-1">Comprehensive Evidence Repository:</strong> A complete, organized, and immutably recorded collection of Apollo mission evidence with provenance tracking and quality classification.</li>
                          <li><strong className="mr-1">Advanced Analytical Models:</strong> Specialized AI models for specific types of analysis (e.g., lunar photography assessment, spacesuit capability analysis) that can be applied to future investigations.</li>
                          <li><strong className="mr-1">Methodological Framework:</strong> A tested protocol for collaborative investigation that balances diverse perspectives with rigorous standards of evidence.</li>
                          <li><strong className="mr-1">Community Development:</strong> An engaged community of researchers with demonstrated expertise and reputation within the MoonSet ecosystem.</li>
                          <li><strong className="mr-1">Educational Resources:</strong> Accessible materials explaining the investigation process, methodologies, and findings for educational purposes.</li>
                          <li><strong className="mr-1">Technical Demonstrations:</strong> Practical examples of MARE's analytical capabilities applied to real-world evidence challenges.</li>
                          <li><strong className="mr-1">Governance Precedents:</strong> Established patterns for effective decentralized decision-making within complex investigations.</li>
                      </ul>
                      <p>Most importantly, the Apollo case study will establish MoonSet as a credible platform for sophisticated collaborative investigation, setting the stage for future applications of our protocol to other significant historical events, scientific controversies, and complex social phenomena.</p>
                  </article>
              </section>

              {/* --- Technical Architecture --- */}
                <section id="technical-architecture">
                    <h2>Technical Architecture</h2>
                    <article id="ai-architecture">
                        <h3>AI Architecture</h3>
                        <p>The MoonSet AI Research Engine (MARE) utilizes a modular architecture designed for maximum flexibility, transparency, and specialization in evidence analysis. Each component is optimized for specific analytical tasks while maintaining interoperability across the system.</p>
                        <h4>Core AI Framework:</h4>
                        <ul>
                            <li><strong className="mr-1">Foundation Models</strong>
                                <ul>
                                    <li>Custom-trained transformer-based models for general understanding</li>
                                    <li>Domain-specific models fine-tuned for aerospace, photography, physics, etc.</li>
                                    <li>Multi-modal foundation capabilities (text, image, video, audio)</li>
                                    <li>Explainable AI modules for transparency in reasoning</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Specialized Analysis Modules</strong>
                                <ul>
                                    <li>Photogrammetric analysis engine</li>
                                    <li>Natural language understanding system</li>
                                    <li>Anomaly detection framework</li>
                                    <li>Pattern recognition system</li>
                                    <li>Document verification module</li>
                                    <li>Cross-reference engine</li>
                                    <li>Temporal consistency checker</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Data Processing Pipeline</strong>
                                <ul>
                                    <li>Automated evidence categorization</li>
                                    <li>Metadata extraction and enrichment</li>
                                    <li>Format standardization with original preservation</li>
                                    <li>Quality assessment framework</li>
                                    <li>Preprocessing optimization for specialized analyses</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">User Interaction Layer</strong>
                                <ul>
                                    <li>Query interface for evidence exploration</li>
                                    <li>Hypothesis testing workbench</li>
                                    <li>Visualization generation system</li>
                                    <li>Explanation generation modules</li>
                                    <li>Collaborative research environment</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Training & Improvement Framework</strong>
                                <ul>
                                    <li>Continuous learning from user feedback</li>
                                    <li>Adversarial testing for robustness</li>
                                    <li>Benchmark testing against known cases</li>
                                    <li>Performance monitoring and optimization</li>
                                    <li>Community contribution integration</li>
                                </ul>
                            </li>
                        </ul>
                        <p>MARE's design emphasizes explainability and transparency. Each analysis includes confidence scores, methodology documentation, and clear delineation between factual pattern recognition and probabilistic interpretation. This approach ensures that MARE serves as a tool to enhance human reasoning rather than replacing it with black-box judgments.</p>
                        <p>The system architecture incorporates privacy-preserving computing where appropriate, allows for modular auditing of specific analytical components, and maintains detailed logs of all analytical processes that become part of the immutable record on the DEL.</p>
                    </article>

                    <article id="blockchain-implementation">
                        <h3>Blockchain Implementation</h3>
                        <p>The Decentralized Evidence Ledger (DEL) leverages blockchain technology to provide an immutable, transparent, and censorship-resistant foundation for the MoonSet ecosystem. Its implementation balances security, scalability, and usability considerations.</p>
                        <h4>Technical Components:</h4>
                        <ul>
                            <li><strong className="mr-1">Blockchain Layer</strong>
                                <ul>
                                    <li>Ethereum-based primary layer for smart contracts and governance</li>
                                    <li>Layer-2 scaling solution for cost-effective evidence registration</li>
                                    <li>Cross-chain bridges for future interoperability</li>
                                    <li>Custom state channels for high-frequency analysis operations</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Smart Contract Architecture</strong>
                                <ul>
                                    <li>Evidence registration contracts</li>
                                    <li>Reputation and identity management</li>
                                    <li>Peer review protocol implementation</li>
                                    <li>Token utility and governance mechanisms</li>
                                    <li>Research process orchestration</li>
                                    <li>Reward distribution system</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Distributed Storage Integration</strong>
                                <ul>
                                    <li>IPFS/Filecoin integration for evidence storage</li>
                                    <li>Redundancy mechanisms for data preservation</li>
                                    <li>Content addressing for efficient retrieval</li>
                                    <li>Storage proof verification</li>
                                    <li>Encryption options for sensitive materials</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Consensus & Security Framework</strong>
                                <ul>
                                    <li>Multi-signature requirements for critical operations</li>
                                    <li>Tiered validation for evidence classification</li>
                                    <li>Stake-weighted voting mechanisms</li>
                                    <li>Incentivized security monitoring</li>
                                    <li>Anti-Sybil attack protections</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Integration & Interoperability Layer</strong>
                                <ul>
                                    <li>API gateways for external system connections</li>
                                    <li>Oracle networks for external data verification</li>
                                    <li>Standards-compliant data formatting</li>
                                    <li>Authentication bridges for institutional partners</li>
                                    <li>Export capabilities for academic and legal contexts</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The DEL implementation prioritizes long-term sustainability, with careful consideration of gas costs, storage efficiency, and future-proofing against blockchain ecosystem evolution. The design incorporates governance mechanisms for protocol upgrades and parameter adjustments, ensuring the system can adapt to emerging requirements and technological advances.</p>
                    </article>

                    <article id="ui-ux">
                        <h3>User Interface & Experience</h3>
                        <p>The MoonSet platform features an intuitive, powerful interface designed to make sophisticated analytical tools accessible to researchers at various levels of technical expertise. The UI/UX design balances analytical depth with usability, creating an environment that supports rigorous investigation without unnecessary complexity.</p>
                        <h4>Interface Components:</h4>
                        <ul>
                            <li><strong className="mr-1">Evidence Explorer</strong>
                                <ul>
                                    <li>Multi-modal browsing interface</li>
                                    <li>Advanced filtering and search capabilities</li>
                                    <li>Relationship visualization tools</li>
                                    <li>Chronological and categorical organization options</li>
                                    <li>Evidence quality and status indicators</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Analysis Workbench</strong>
                                <ul>
                                    <li>Tool selection interface for MARE capabilities</li>
                                    <li>Parameter adjustment controls</li>
                                    <li>Process monitoring and management</li>
                                    <li>Result visualization options</li>
                                    <li>Analysis history tracking</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Collaboration Environment</strong>
                                <ul>
                                    <li>Research thread management</li>
                                    <li>Team workspace functionality</li>
                                    <li>Real-time collaborative document editing</li>
                                    <li>Discussion and annotation tools</li>
                                    <li>Permission and role management</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Personal Dashboard</strong>
                                <ul>
                                    <li>Contribution tracking and history</li>
                                    <li>Reputation and credential display</li>
                                    <li>Token balance and activity monitoring</li>
                                    <li>Notification and alert management</li>
                                    <li>Customizable research monitoring</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Governance Interface</strong>
                                <ul>
                                    <li>Proposal browsing and filtering</li>
                                    <li>Voting mechanism access</li>
                                    <li>Delegation controls</li>
                                    <li>Treasury transparency tools</li>
                                    <li>Parameter exploration and impact simulation</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The MoonSet interface incorporates progressive disclosure principles, allowing new users to engage with core functionality immediately while providing paths to more advanced capabilities as they gain experience. Comprehensive onboarding flows, contextual help systems, and interactive tutorials support users throughout their journey on the platform.</p>
                        <p>Accessibility is a core design priority, with full compliance with WCAG guidelines, support for assistive technologies, and design considerations for users with various abilities and technical backgrounds. The interface is responsive across devices, allowing researchers to contribute effectively from desktop environments, tablets, and mobile devices.</p>
                    </article>
                </section>

                {/* --- Research Methodology --- */}
                <section id="research-methodology">
                    <h2>Research Methodology</h2>
                    <article id="evidence-classification">
                        <h3>Evidence Classification Framework</h3>
                        <p>The MoonSet protocol employs a sophisticated evidence classification system that balances rigorous standards with practical usability. This framework provides a common language for assessing and discussing evidence quality within the ecosystem.</p>
                        <h4>Evidence Classification Levels:</h4>
                        <ul>
                            <li><strong className="mr-1">Level 1: Primary Source</strong>
                                <ul>
                                    <li>Original, unaltered documentation/materials from direct participants</li>
                                    <li>Physical artifacts with verified provenance</li>
                                    <li>Raw instrumental data with intact metadata</li>
                                    <li>Original photographic/video material with verified chain of custody</li>
                                    <li>Direct testimony from firsthand participants</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Level 2: Secondary Source</strong>
                                <ul>
                                    <li>Documented analysis of primary sources</li>
                                    <li>Expert interpretations with transparent methodology</li>
                                    <li>Compiled datasets derived from primary sources</li>
                                    <li>Contemporary accounts from indirect witnesses</li>
                                    <li>Technical reconstructions based on primary evidence</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Level 3: Supporting Evidence</strong>
                                <ul>
                                    <li>Pattern correlations across multiple sources</li>
                                    <li>Consistent circumstantial indicators</li>
                                    <li>Technical feasibility assessments</li>
                                    <li>Comparative analyses with similar cases/scenarios</li>
                                    <li>Statistical evaluations of evidence distributions</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Level 4: Theoretical Framework</strong>
                                <ul>
                                    <li>Explanatory models consistent with available evidence</li>
                                    <li>Hypothesis structures awaiting additional verification</li>
                                    <li>Logical frameworks for evidence interpretation</li>
                                    <li>Alternative scenario constructions</li>
                                    <li>Probability assessments for competing explanations</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Level 5: Speculative Content</strong>
                                <ul>
                                    <li>Preliminary hypotheses awaiting supporting evidence</li>
                                    <li>Potential interpretations requiring further investigation</li>
                                    <li>Thought experiments exploring possible scenarios</li>
                                    <li>Questions for future research direction</li>
                                    <li>Identified knowledge gaps with proposed approaches</li>
                                </ul>
                            </li>
                        </ul>
                        <p>Evidence within the MoonSet ecosystem moves dynamically between classification levels based on ongoing research, peer review, and community consensus. The system is designed to be conservative in promoting evidence to higher quality levels while remaining open to reclassification as new information emerges.</p>
                        <p>All evidence is tagged with its current classification level, complete history of classification changes, confidence scores from multiple reviewers, and relevant contextual metadata. This comprehensive classification approach ensures that researchers can easily understand the relative strength of different evidence elements within an investigation.</p>
                    </article>

                    <article id="peer-review">
                        <h3>Peer Review Protocol</h3>
                        <p>The MoonSet peer review system reimagines traditional academic review for a decentralized, token-incentivized environment while maintaining rigorous quality standards.</p>
                        <h4>Review Process:</h4>
                        <ul>
                            <li><strong className="mr-1">Submission & Pre-Review</strong>
                                <ul>
                                    <li>Initial automated quality checks</li>
                                    <li>Self-classification by contributor</li>
                                    <li>Staking requirement proportional to claimed evidence level</li>
                                    <li>Preliminary AI analysis for obvious issues</li>
                                    <li>Assignment to appropriate review pool</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Multi-Level Review</strong>
                                <ul>
                                    <li>Methodology reviewers (assess process validity)</li>
                                    <li>Domain experts (evaluate technical accuracy)</li>
                                    <li>Cross-domain validators (check for broader consistency)</li>
                                    <li>Community validation (wider perspective assessment)</li>
                                    <li>Adversarial reviewers (explicitly challenge findings)</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Structured Assessment Framework</strong>
                                <ul>
                                    <li>Methodological soundness scoring</li>
                                    <li>Evidence consistency evaluation</li>
                                    <li>Source reliability assessment</li>
                                    <li>Logical validity checking</li>
                                    <li>Alternative explanation consideration</li>
                                    <li>Standardized rubrics with quantitative and qualitative components</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Dispute Resolution Mechanism</strong>
                                <ul>
                                    <li>Escalation path for contested reviews</li>
                                    <li>Multi-party arbitration process</li>
                                    <li>Higher stake requirements for appeals</li>
                                    <li>Specialized review panels for complex disputes</li>
                                    <li>Time-locked resolution periods</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Incentive Structure</strong>
                                <ul>
                                    <li>Token rewards for quality reviews</li>
                                    <li>Reputation score impacts</li>
                                    <li>Stake multipliers for accurate assessments</li>
                                    <li>Penalties for demonstrably biased or negligent reviews</li>
                                    <li>Progressive responsibility access based on review history</li>
                                </ul>
                            </li>
                        </ul>
                        <p>Reviews themselves become part of the permanent record on the DEL, creating accountability for reviewers and allowing the quality of review processes to be assessed over time. The system is designed to reward thoughtful, thorough reviews rather than quick approvals or rejections, with incentives aligned toward constructive improvement of research quality.</p>
                        <p>Reviewers build specialized reputation in particular domains and review types, creating a rich ecosystem of validated expertise that improves the overall quality of the research process.</p>
                    </article>

                    <article id="consensus-mechanisms">
                        <h3>Consensus Mechanisms</h3>
                        <p>MoonSet employs a nuanced approach to consensus that acknowledges the complexity of historical investigation while still providing clear pathways to establish well-supported conclusions.</p>
                        <h4>Consensus Framework:</h4>
                        <ul>
                            <li><strong className="mr-1">Evidence-Level Consensus</strong>
                                <ul>
                                    <li>Classification stabilization thresholds</li>
                                    <li>Required reviewer diversity metrics</li>
                                    <li>Minimum validation period timeframes</li>
                                    <li>Challenge window protocols</li>
                                    <li>Confidence score aggregation methods</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Interpretive-Level Consensus</strong>
                                <ul>
                                    <li>Competing hypothesis tracking</li>
                                    <li>Bayesian probability updating</li>
                                    <li>Evidence strength weighting</li>
                                    <li>Alternative explanation preservation</li>
                                    <li>Uncertainty quantification standards</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Research Thread Convergence</strong>
                                <ul>
                                    <li>Cross-thread evidence relationship mapping</li>
                                    <li>Contradictory finding flagging</li>
                                    <li>Synthesis opportunity identification</li>
                                    <li>Common ground establishment protocols</li>
                                    <li>Divergence point clarity mechanisms</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Dynamic Consensus Visualization</strong>
                                <ul>
                                    <li>Real-time consensus mapping</li>
                                    <li>Strength-of-evidence indicators</li>
                                    <li>Disagreement hotspot highlighting</li>
                                    <li>Temporal consensus evolution tracking</li>
                                    <li>Perspective-based filtering options</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Formal Conclusion Standards</strong>
                                <ul>
                                    <li>Criteria for established findings</li>
                                    <li>Minority perspective preservation requirements</li>
                                    <li>Ongoing challengeability mechanisms</li>
                                    <li>External validation pathways</li>
                                    <li>Confidence level categorization</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The MoonSet consensus approach explicitly recognizes that complete agreement on complex historical events may not be achievable or even desirable. Instead, the system focuses on creating clarity around what is known with high confidence, what remains uncertain, and why different interpretations exist.</p>
                        <p>This nuanced approach to consensus allows the community to make progress on establishing facts while maintaining intellectual honesty about limitations in available evidence and legitimate differences in interpretation.</p>
                    </article>
                </section>

                {/* --- Token Economics --- */}
                <section id="token-economics">
                    <h2>Token Economics</h2>
                    <article id="distribution-model">
                        <h3>Distribution Model</h3>
                        <p>The MOONSET token distribution is designed to create a balanced ecosystem with aligned incentives across all stakeholders, sustainable growth potential, and protection against excessive concentration of ownership.</p>
                        <h4>Initial Distribution:</h4>
                        <ul>
                            <li><strong className="mr-1">Community Allocation (40%)</strong>
                                <ul>
                                    <li>Contribution rewards (20%)</li>
                                    <li>Research grants (10%)</li>
                                    <li>Ecosystem growth (10%)</li>
                                    <li>Released through platform activity over 5 years</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Core Team & Development (20%)</strong>
                                <ul>
                                    <li>Founding team (12%)</li>
                                    <li>Future team expansion (5%)</li>
                                    <li>Advisors (3%)</li>
                                    <li>4-year vesting with 1-year cliff</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Public Sale (15%)</strong>
                                <ul>
                                    <li>Initial offering (10%)</li>
                                    <li>Future funding rounds (5%)</li>
                                    <li>Multi-stage release to ensure fair distribution</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Strategic Partners (10%)</strong>
                                <ul>
                                    <li>Academic institutions (3%)</li>
                                    <li>Technology partners (4%)</li>
                                    <li>Research organizations (3%)</li>
                                    <li>2-year vesting with 6-month cliff</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Treasury & DAO (15%)</strong>
                                <ul>
                                    <li>Protocol development fund (5%)</li>
                                    <li>Contingency reserve (5%)</li>
                                    <li>Strategic initiatives (5%)</li>
                                    <li>Controlled by governance after initial setup phase</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The distribution model includes carefully designed vesting schedules, release triggers based on ecosystem metrics rather than just time, and anti-whale mechanisms to prevent manipulation through excessive token concentration.</p>
                        <p>A portion of tokens is allocated to a stability reserve, managed through algorithmic mechanisms and eventual DAO governance, helping to reduce volatility while the ecosystem matures.</p>
                    </article>

                    <article id="utility-framework">
                        <h3>Utility Framework</h3>
                        <p>The MOONSET token incorporates multiple utility dimensions, creating strong demand drivers while supporting the core mission of the platform.</p>
                        <h4>Token Utility Mechanisms:</h4>
                        <ul>
                            <li><strong className="mr-1">Access & Capability Tiering</strong>
                                <ul>
                                    <li>Basic platform access is free to ensure openness</li>
                                    <li>Advanced MARE analysis capabilities require token staking</li>
                                    <li>Premium features unlocked at progressive staking thresholds</li>
                                    <li>Specialized research tool access through token-gated mechanisms</li>
                                    <li>Priority processing rights for compute-intensive operations</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Contribution Incentives</strong>
                                <ul>
                                    <li>Dynamic reward pools for evidence submission</li>
                                    <li>Quality-based multipliers for exceptional contributions</li>
                                    <li>Peer review compensation scaled to review depth and quality</li>
                                    <li>Special bounties for solving specific research challenges</li>
                                    <li>Long-term incentives for sustained participation</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Staking Functions</strong>
                                <ul>
                                    <li>Evidence quality staking (required for higher-level submissions)</li>
                                    <li>Confidence staking on research positions</li>
                                    <li>Reputation staking for peer reviews</li>
                                    <li>Validation staking for consensus participation</li>
                                    <li>General platform staking for passive rewards</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Fee Structure</strong>
                                <ul>
                                    <li>Zero/minimal fees for basic contributions</li>
                                    <li>Premium feature access fees</li>
                                    <li>Optional priority processing fees</li>
                                    <li>Special analysis request fees</li>
                                    <li>Enterprise/institutional access licensing</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Governance Rights</strong>
                                <ul>
                                    <li>Proposal creation thresholds</li>
                                    <li>Voting weight mechanisms</li>
                                    <li>Delegation capabilities</li>
                                    <li>Special proposal categories</li>
                                    <li>Emergency intervention powers (initially, phasing to full decentralization)</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The utility model is designed to create virtuous cycles where token value is directly connected to ecosystem growth and research quality. As the platform attracts more participants and generates higher-quality investigations, token utility increases, creating sustainable value accrual.</p>
                    </article>

                    <article id="governance-structure-token">
                        <h3>Governance Structure (Token)</h3>
                        <p>The MoonSet DAO governance system balances democratic participation with protection against common attacks and manipulation risks. This structure specifically refers to how token holders interact with the DAO for governance decisions related to the token and platform.</p>
                        <h4>Governance Elements:</h4>
                        <ul>
                            <li><strong className="mr-1">Voting Rights</strong>
                                <ul>
                                    <li>One-token-one-vote base mechanism</li>
                                    <li>Reputation multipliers for established contributors</li>
                                    <li>Domain expertise weighting for specialized decisions</li>
                                    <li>Quadratic voting for certain proposal categories</li>
                                    <li>Delegation capabilities with transparent tracking</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Proposal System</strong>
                                <ul>
                                    <li>Tiered proposal categories with different requirements</li>
                                    <li>Graduated thresholds based on impact scope</li>
                                    <li>Mandatory discussion periods before formal proposals</li>
                                    <li>Structured format requirements for clarity</li>
                                    <li>Impact assessment requirements for major changes</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Execution Mechanisms</strong>
                                <ul>
                                    <li>Timelock periods scaled to proposal impact</li>
                                    <li>Multi-signature requirements for critical functions</li>
                                    <li>Automated execution for standard operations</li>
                                    <li>Emergency pause capabilities (initially, phasing out over time)</li>
                                    <li>Implementation verification requirements</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Guardian Framework</strong>
                                <ul>
                                    <li>Initial multisig safety controls</li>
                                    <li>Gradual decentralization roadmap</li>
                                    <li>Security council with limited emergency powers</li>
                                    <li>Transparent intervention logging</li>
                                    <li>Predetermined authority sunset provisions</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Specialized Governance Bodies</strong>
                                <ul>
                                    <li>Research direction committee</li>
                                    <li>Technical development oversight</li>
                                    <li>Treasury management specialists</li>
                                    <li>Community growth stewards</li>
                                    <li>External partnership coordinators</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The governance system incorporates both on-chain and off-chain components, with critical decisions executed through smart contracts while allowing for rich deliberation in appropriate forums. Governance participation itself is incentivized through rewards for constructive involvement and voting consistency.</p>
                        <p>A comprehensive constitution establishes core principles that guide governance decisions, including commitments to methodological neutrality, evidence-based reasoning, and protection of minority perspectives.</p>
                    </article>

                    <article id="value-accrual">
                        <h3>Value Accrual Mechanisms</h3>
                        <p>The MOONSET token incorporates multiple value capture mechanisms designed to align economic incentives with the quality and growth of the research ecosystem.</p>
                        <h4>Value Drivers:</h4>
                        <ul>
                            <li><strong className="mr-1">Utility Demand</strong>
                                <ul>
                                    <li>Required staking for platform capabilities</li>
                                    <li>Fee payments for premium services</li>
                                    <li>Access rights to specialized tools</li>
                                    <li>Prioritization mechanisms for limited resources</li>
                                    <li>Enterprise/institutional licensing requirements</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Supply Dynamics</strong>
                                <ul>
                                    <li>Partial token burning from fee collection</li>
                                    <li>Long-term staking incentives reducing circulating supply</li>
                                    <li>Lockup requirements for governance participation</li>
                                    <li>Reward halving schedules for contribution incentives</li>
                                    <li>Buyback mechanisms from treasury revenue</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Network Effects</strong>
                                <ul>
                                    <li>Increasing value with growing contributor base</li>
                                    <li>Compounding utility of evidence repository</li>
                                    <li>Enhanced AI capabilities from expanded training data</li>
                                    <li>Rising reputation value within growing ecosystem</li>
                                    <li>Cross-investigation synergies and reusable components</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Institutional Integration</strong>
                                <ul>
                                    <li>API access licensing for external platforms</li>
                                    <li>Enterprise-grade investigation capabilities</li>
                                    <li>Academic partnership programs</li>
                                    <li>Media organization verification services</li>
                                    <li>Research institution collaboration frameworks</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Ecosystem Expansion</strong>
                                <ul>
                                    <li>New investigation topic additions</li>
                                    <li>Tool and capability expansions</li>
                                    <li>Cross-platform integrations</li>
                                    <li>Geographic market development</li>
                                    <li>Specialized vertical applications</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The token model incorporates both medium-term growth incentives and long-term sustainability mechanisms. As the ecosystem matures, an increasing portion of value accrual will shift toward intrinsic utility rather than speculative dynamics, creating a self-sustaining economic engine for ongoing truth discovery initiatives.</p>
                    </article>
                </section>

                {/* --- The MoonSet DAO --- */}
                <section id="moonset-dao">
                    <h2>The MoonSet DAO</h2>
                    <article id="governance-framework-dao">
                        <h3>Governance Framework (DAO)</h3>
                        <p>The MoonSet DAO represents a sophisticated decentralized autonomous organization designed specifically for collaborative research governance. Its structure reflects the unique challenges of managing a truth-focused ecosystem while maintaining alignment with core values.</p>
                        <h4>Governance Architecture:</h4>
                        <ul>
                            <li><strong className="mr-1">Constitutional Foundation</strong>
                                <ul>
                                    <li>Core principles document</li>
                                    <li>Immutable commitments to methodological neutrality</li>
                                    <li>Fundamental rights of participants</li>
                                    <li>Dispute resolution framework</li>
                                    <li>Amendment processes with high thresholds</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Nested Council Structure</strong>
                                <ul>
                                    <li>General Assembly (all token holders)</li>
                                    <li>Research Direction Council (elected domain experts)</li>
                                    <li>Technical Development Council (protocol specialists)</li>
                                    <li>Treasury Management Council (financial stewards)</li>
                                    <li>Community Standards Council (ethics and conduct)</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Decision Domain Separation</strong>
                                <ul>
                                    <li>Research priority decisions</li>
                                    <li>Technical implementation choices</li>
                                    <li>Economic parameter adjustments</li>
                                    <li>Community management policies</li>
                                    <li>External relationship governance</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Representation Mechanisms</strong>
                                <ul>
                                    <li>Direct voting on fundamental issues</li>
                                    <li>Delegate selection for specialized councils</li>
                                    <li>Reputation-weighted input for domain decisions</li>
                                    <li>Proportional representation protections</li>
                                    <li>Minority perspective preservation</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Operational Efficiency Systems</strong>
                                <ul>
                                    <li>Off-chain deliberation frameworks</li>
                                    <li>On-chain execution mechanisms</li>
                                    <li>Automated implementation of standard decisions</li>
                                    <li>Emergency response protocols</li>
                                    <li>Continuous operation capabilities</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The governance framework incorporates both predictable schedules for regular decisions and responsive mechanisms for addressing emergent needs. Delegation systems allow participants to maintain influence without requiring constant attention to all governance matters.</p>
                        <p>Transparency is a core principle, with all governance activities recorded on the DEL, comprehensive explanation requirements for proposals, and accessible visualization of governance activities and outcomes.</p>
                    </article>

                    <article id="proposal-system">
                        <h3>Proposal System</h3>
                        <p>The MoonSet proposal system provides structured pathways for community-driven evolution of the ecosystem while protecting against common vulnerabilities in decentralized governance.</p>
                        <h4>Proposal Categories:</h4>
                        <ul>
                            <li><strong className="mr-1">Research Initiatives</strong>
                                <ul>
                                    <li>New investigation topic proposals</li>
                                    <li>Research grant allocations</li>
                                    <li>Methodology standard updates</li>
                                    <li>Evidence classification adjustments</li>
                                    <li>Special investigation taskforces</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Technical Development</strong>
                                <ul>
                                    <li>Protocol upgrade proposals</li>
                                    <li>MARE capability expansions</li>
                                    <li>DEL architecture modifications</li>
                                    <li>User interface improvements</li>
                                    <li>Integration and interoperability initiatives</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Economic Parameters</strong>
                                <ul>
                                    <li>Reward rate adjustments</li>
                                    <li>Fee structure modifications</li>
                                    <li>Staking requirement changes</li>
                                    <li>Treasury allocation decisions</li>
                                    <li>Token utility expansions</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Community Governance</strong>
                                <ul>
                                    <li>Moderation policy updates</li>
                                    <li>Reputation system refinements</li>
                                    <li>Contribution guideline revisions</li>
                                    <li>Conflict resolution process changes</li>
                                    <li>Community program initiatives</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Strategic Direction</strong>
                                <ul>
                                    <li>Partnership establishment framework</li>
                                    <li>Long-term roadmap adjustments</li>
                                    <li>Mission and vision refinements</li>
                                    <li>Brand and communication strategies</li>
                                    <li>Legal and regulatory positioning</li>
                                </ul>
                            </li>
                        </ul>
                        <p>Each proposal category follows tailored processes with appropriate participation thresholds, specialized review requirements, discussion periods, and implementation pathways. The system is designed to allow rapid iteration on lower-impact decisions while ensuring thorough consideration of fundamental changes.</p>
                        <p>Proposal authors receive support through templates, impact assessment tools, and optional mentorship from experienced governance participants. Incentives are aligned to reward high-quality proposals that successfully navigate the approval process and deliver value to the ecosystem.</p>
                    </article>

                    <article id="treasury-management">
                        <h3>Treasury Management</h3>
                        <p>The MoonSet DAO treasury serves as the financial backbone of the ecosystem, ensuring sustainable operations, strategic growth, and aligned incentives across all participants.</p>
                        <h4>Treasury Components:</h4>
                        <ul>
                            <li><strong className="mr-1">Operational Treasury</strong>
                                <ul>
                                    <li>Core development funding</li>
                                    <li>Infrastructure maintenance resources</li>
                                    <li>Ongoing research incentives</li>
                                    <li>Community management support</li>
                                    <li>Day-to-day operational expenses</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Strategic Reserve</strong>
                                <ul>
                                    <li>Long-term development initiatives</li>
                                    <li>Market volatility protection</li>
                                    <li>Partnership opportunity funding</li>
                                    <li>Expansion capital for new verticals</li>
                                    <li>Crisis response capabilities</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Research Endowment</strong>
                                <ul>
                                    <li>Sustainable funding for ongoing investigations</li>
                                    <li>Grant programs for specialized research</li>
                                    <li>Academic collaboration financing</li>
                                    <li>Data acquisition resources</li>
                                    <li>Long-horizon research initiatives</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Growth Fund</strong>
                                <ul>
                                    <li>User acquisition initiatives</li>
                                    <li>Ecosystem expansion programs</li>
                                    <li>Market development resources</li>
                                    <li>Education and awareness campaigns</li>
                                    <li>Adoption incentive mechanisms</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Insurance Pool</strong>
                                <ul>
                                    <li>Security incident response funding</li>
                                    <li>Technical vulnerability bounties</li>
                                    <li>Legal defense resources</li>
                                    <li>Participant protection mechanisms</li>
                                    <li>System recovery capabilities</li>
                                </ul>
                            </li>
                        </ul>
                        <p>Treasury assets are managed through a diversified approach, including stablecoin reserves for operational stability, strategic token holdings for ecosystem alignment, yield-generating positions for sustainability, and carefully managed liquid assets for responsive action when needed.</p>
                        <p>A multi-tiered approval system governs treasury expenditures, with graduated thresholds based on amount, purpose, and strategic impact. Regular transparency reports provide comprehensive visibility into treasury operations, with on-chain verification of all significant movements.</p>
                        <p>The treasury model incorporates both short-term operational resilience and long-term sustainability planning, ensuring that the MoonSet ecosystem can thrive through market cycles and continue delivering on its core mission of truth discovery.</p>
                    </article>
                </section>

                {/* --- Growth Strategy --- */}
                <section id="growth-strategy">
                    <h2>Growth Strategy</h2>
                    <article id="community-building">
                        <h3>Community Building</h3>
                        <p>MoonSet's growth strategy centers on building a diverse, engaged community of contributors who collectively advance the platform's truth discovery capabilities while expanding its reach and impact.</p>
                        <h4>Community Development Approach:</h4>
                        <ul>
                            <li><strong className="mr-1">Contributor Onboarding Pathways</strong>
                                <ul>
                                    <li>Specialized tracks for different expertise types</li>
                                    <li>Progressive responsibility access</li>
                                    <li>Mentorship pairing programs</li>
                                    <li>Skill development resources</li>
                                    <li>Contribution opportunity matching</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Engagement Incentive Structure</strong>
                                <ul>
                                    <li>Immediate contribution rewards</li>
                                    <li>Long-term participation incentives</li>
                                    <li>Recognition and reputation systems</li>
                                    <li>Influence expansion through quality work</li>
                                    <li>Community leadership opportunities</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Community Segments</strong>
                                <ul>
                                    <li>Core researchers (domain experts)</li>
                                    <li>Technology contributors (AI/blockchain specialists)</li>
                                    <li>Evidence providers (primary source access)</li>
                                    <li>Review participants (quality assurance)</li>
                                    <li>Educational ambassadors (knowledge sharing)</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Communication Infrastructure</strong>
                                <ul>
                                    <li>Multi-platform community presence</li>
                                    <li>Structured knowledge repositories</li>
                                    <li>Regular research update cadences</li>
                                    <li>Transparent decision visibility</li>
                                    <li>Cross-team collaboration tools</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Cultural Development</strong>
                                <ul>
                                    <li>Shared values reinforcement</li>
                                    <li>Constructive discourse norms</li>
                                    <li>Intellectual honesty principles</li>
                                    <li>Collaborative rather than combative atmosphere</li>
                                    <li>Recognition of diverse perspectives</li>
                                </ul>
                            </li>
                        </ul>
                        <p>The community strategy emphasizes quality over quantity, focusing on attracting participants with genuine interest in rigorous investigation rather than purely speculative involvement. Special attention is given to building a balanced ecosystem with representation across relevant domains of expertise.</p>
                        <p>Community health metrics extend beyond size to include diversity measures, contribution quality, retention rates, and progression through engagement levels. These indicators guide ongoing refinement of community development strategies.</p>
                    </article>

                    <article id="academic-partnerships">
                        <h3>Academic Partnerships</h3>
                        <p>MoonSet will establish strategic relationships with academic institutions to enhance research quality, build credibility, and create mutually beneficial knowledge exchange.</p>
                        <h4>Academic Engagement Strategy:</h4>
                        <ul>
                            <li><strong className="mr-1">Research Institution Relationships</strong>
                                <ul>
                                    <li>Joint investigation initiatives</li>
                                    <li>Shared resource agreements</li>
                                    <li>Expert advisor arrangements</li>
                                    <li>Specialized training programs</li>
                                    <li>Collaborative publication opportunities</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Educational Integration</strong>
                                <ul>
                                    <li>Curriculum development for evidence analysis</li>
                                    <li>Student research opportunities</li>
                                    <li>Graduate program partnerships</li>
                                    <li>Professional development courses</li>
                                    <li>Research methodology workshops</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Validation & Peer Review Collaboration</strong>
                                <ul>
                                    <li>External validation frameworks</li>
                                    <li>Cross-institutional review processes</li>
                                    <li>Methodology assessment partnerships</li>
                                    <li>Quality standard alignment</li>
                                    <li>Specialized expertise access</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Resource Sharing Agreements</strong>
                                <ul>
                                    <li>Historical archive access</li>
                                    <li>Specialized equipment utilization</li>
                                    <li>Laboratory testing capabilities</li>
                                    <li>Legacy data digitization</li>
                                    <li>Technical facility collaborations</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Knowledge Transfer Mechanisms</strong>
                                <ul>
                                    <li>Visiting researcher programs</li>
                                    <li>Joint conference presentations</li>
                                    <li>Collaborative paper publications</li>
                                    <li>Workshop and seminar series</li>
                                    <li>Knowledge base contributions</li>
                                </ul>
                            </li>
                        </ul>
                        <p>Academic partnerships will follow a phased approach, beginning with individual researcher relationships, expanding to department-level collaborations, and eventually establishing formal institutional partnerships with leading universities and research organizations.</p>
                        <p>Special attention will be given to maintaining independence and methodological neutrality while benefiting from academic expertise and resources. All partnership arrangements will include clear guidelines for intellectual property, data sharing, and publication rights that respect both academic norms and MoonSet's commitment to open, verifiable research.</p>
                    </article>

                    <article id="future-investigations">
                        <h3>Future Investigation Topics</h3>
                        <p>While the Apollo missions serve as MoonSet's initial focus, the platform is designed to support diverse investigations across historical events, scientific controversies, and complex contemporary issues.</p>
                        <h4>Expansion Criteria:</h4>
                        <ul>
                            <li><strong className="mr-1">Topic Selection Framework</strong>
                                <ul>
                                    <li>Historical/scientific significance</li>
                                    <li>Evidence availability and accessibility</li>
                                    <li>Public interest and engagement potential</li>
                                    <li>Methodological demonstration value</li>
                                    <li>Diverse perspective representation</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Planned Progression Path</strong>
                                <ul>
                                    <li>Phase 1: Apollo missions (initial demonstration)</li>
                                    <li>Phase 2: Related space exploration events</li>
                                    <li>Phase 3: Other significant historical events</li>
                                    <li>Phase 4: Scientific controversies and disputed findings</li>
                                    <li>Phase 5: Contemporary complex issues</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Potential Future Investigations</strong>
                                <ul>
                                    <li>Other space programs and significant missions</li>
                                    <li>Major historical events with disputed narratives</li>
                                    <li>Scientific controversies with substantive evidence bases</li>
                                    <li>Complex technological achievements</li>
                                    <li>Significant societal transitions and their documentation</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Cross-Topic Synergies</strong>
                                <ul>
                                    <li>Methodology reuse across investigations</li>
                                    <li>Evidence relationship mapping between topics</li>
                                    <li>Technical capability transfer</li>
                                    <li>Community expertise application to new domains</li>
                                    <li>Comparative analysis frameworks</li>
                                </ul>
                            </li>
                            <li><strong className="mr-1">Specialization & Generalization Balance</strong>
                                <ul>
                                    <li>Core tools applicable across domains</li>
                                    <li>Specialized modules for specific investigation types</li>
                                    <li>Knowledge base expansion across topics</li>
                                    <li>Methodology refinement through diverse applications</li>
                                    <li>Universal and domain-specific reputation tracking</li>
                                </ul>
                            </li>
                        </ul>
                        <p>Topic expansion will be governed through the DAO, with community input and structured assessment of potential investigations against established criteria. Each new topic will begin with a focused pilot phase before full-scale investigation launch.</p>
                        <p>The platform architecture anticipates this expansion through modular design, ensuring that capabilities developed for one investigation can be effectively applied to others while allowing for domain-specific customization where needed.</p>
                    </article>
                </section>

                {/* --- Executive Team & Advisors --- */}
                <section id="team-advisors">
                    <h2>Executive Team & Advisors</h2>
                    <h3>Leadership Team</h3>
                    <p>MoonSet is led by a diverse team of experts combining deep domain knowledge in relevant technical fields with proven track records in building successful organizations and communities.</p>
                    <h4>Core Team:</h4>
                    <div className="my-4"> {/* Using prose's implied margins or adding custom if needed */}
                        <p><strong>Dr. Sarah Chen</strong> - <em>Chief Executive Officer</em><br />
                        Ph.D. in Computer Science, MIT. A recognized leader in AI research with specialization in explainable AI and computer vision. Previously led research teams at DeepMind and founded Clarity AI, a successful AI ethics consulting firm. Brings 15+ years of experience in building and scaling AI systems with a focus on transparency and accountability.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>Marcus Reynolds</strong> - <em>Chief Technology Officer</em><br />
                        M.S. in Distributed Systems, Stanford University. Blockchain architect with significant contributions to multiple Layer 2 scaling solutions and privacy-preserving computation frameworks. Former technical lead at Chainlink and early Ethereum contributor. Has designed and implemented multiple production-grade decentralized systems with a focus on security and scalability.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>Dr. Eliza Washington</strong> - <em>Chief Research Officer</em><br />
                        Ph.D. in History of Science, Harvard University. Historian specializing in 20th century technological developments with extensive experience in archival research and primary source analysis. Former curator at the Smithsonian Air and Space Museum and published author on space program history. Brings methodological rigor and domain expertise in historical investigation.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>Jun Park</strong> - <em>Chief Product Officer</em><br />
                        M.B.A., INSEAD; B.S. in Human-Computer Interaction, Carnegie Mellon. Product leader with expertise in designing complex collaborative systems. Previously led product teams at Notion and built research collaboration tools at Elsevier. Specializes in creating intuitive interfaces for complex technical tasks and fostering collaborative communities.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>Aisha Nkosi</strong> - <em>Chief Community Officer</em><br />
                        M.A. in Organizational Psychology, Columbia University. Community building specialist with experience in developing and scaling decentralized organizations. Former head of community at Gitcoin and community strategy consultant for multiple successful DAOs. Expert in incentive design, governance facilitation, and distributed collaboration.</p>
                    </div>

                    <h3>Advisory Board</h3>
                    <p>MoonSet's advisory board brings world-class expertise across relevant domains, providing strategic guidance and specialized knowledge to the project.</p>
                    <h4>Key Advisors:</h4>
                    <div className="my-4">
                        <p><strong>Professor Rajiv Mehta</strong> - <em>Scientific Methodology Advisor</em><br />
                        Ph.D. in Physics, Caltech. Distinguished professor of physics with expertise in experimental design and evidence evaluation. Member of multiple scientific advisory boards and experienced in scientific controversy resolution. Advises on rigorous methodological frameworks and scientific standards.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>Dr. Lynn Torres</strong> - <em>AI Ethics Advisor</em><br />
                        Ph.D. in Philosophy, Oxford University. Leading researcher in AI ethics and epistemology with focus on how automated systems influence knowledge formation. Author of foundational papers on AI-assisted research methodology. Guides ethical implementation of MARE capabilities.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>David Weissman</strong> - <em>Blockchain Governance Advisor</em><br />
                        J.D., Yale Law School. Governance specialist who has designed systems for several major DAOs and protocol foundations. Expert in cryptoeconomics and mechanism design. Advises on governance structures and token economics.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>Grace Liu</strong> - <em>Decentralized Systems Architect</em><br />
                        M.S. in Computer Science, Berkeley. Technical architect specializing in decentralized data systems and privacy-preserving computation. Contributor to multiple Web3 protocols focused on data sovereignty. Provides guidance on technical architecture and security considerations.</p>
                    </div>
                    <div className="my-4">
                        <p><strong>Robert Jackson</strong> - <em>Space Program Historian</em><br />
                        Ph.D. in Aerospace History, University of Michigan. Specialist in space program documentation with extensive experience in NASA archives. Author of definitive works on space mission documentation and analysis. Advises on Apollo-specific research methodology and evidence assessment.</p>
                    </div>
                    <p>Each advisor brings not only domain expertise but also a commitment to MoonSet's mission of rigorous, transparent investigation using advanced technology. Advisory relationships include structured consultation processes, specialized working groups, and regular review of project direction and implementation.</p>
                </section>

                {/* --- Detailed Roadmap --- */}
                <section id="roadmap">
                    <h2>Detailed Roadmap</h2>
                    <h3>Development Phases</h3>
                    <p>MoonSet's implementation follows a carefully sequenced roadmap designed to build capabilities progressively while delivering value at each stage.</p>

                    <h4>Phase 1: Foundation (Q3 2025 - Q1 2026)</h4>
                    <ul>
                        <li><strong className="mr-1">Technical Milestones:</strong>
                            <ul>
                                <li>MARE core architecture development</li>
                                <li>DEL prototype implementation</li>
                                <li>Basic evidence registration functionality</li>
                                <li>Initial UI/UX design and testing</li>
                                <li>Testnet deployment and security audits</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Research Milestones:</strong>
                            <ul>
                                <li>Apollo investigation methodology framework</li>
                                <li>Preliminary evidence cataloging system</li>
                                <li>Research team formation and onboarding</li>
                                <li>Initial data acquisition and preprocessing</li>
                                <li>Baseline analysis capability demonstration</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Community Milestones:</strong>
                            <ul>
                                <li>Core community establishment</li>
                                <li>Contribution guidelines development</li>
                                <li>Research participation framework</li>
                                <li>Early contributor incentive program</li>
                                <li>Community communication infrastructure</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Governance & Token Milestones:</strong>
                            <ul>
                                <li>Governance framework design</li>
                                <li>Initial token distribution mechanics</li>
                                <li>Treasury management structure</li>
                                <li>Legal and regulatory positioning</li>
                                <li>Testnet governance simulation</li>
                            </ul>
                        </li>
                    </ul>

                    <h4>Phase 2: Expansion (Q2 2026 - Q4 2026)</h4>
                    <ul>
                        <li><strong className="mr-1">Technical Milestones:</strong>
                            <ul>
                                <li>MARE specialized module development</li>
                                <li>DEL mainnet deployment</li>
                                <li>Advanced analysis capabilities release</li>
                                <li>Collaboration features implementation</li>
                                <li>Cross-platform integrations</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Research Milestones:</strong>
                            <ul>
                                <li>Comprehensive Apollo evidence collection</li>
                                <li>Specialized analytical methodology applications</li>
                                <li>First major research thread completions</li>
                                <li>Peer review system implementation and testing</li>
                                <li>Research finding publication framework</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Community Milestones:</strong>
                            <ul>
                                <li>Community growth acceleration</li>
                                <li>Domain expert recruitment campaigns</li>
                                <li>Educational content development</li>
                                <li>Ambassador program launch</li>
                                <li>First community-led research initiatives</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Governance & Token Milestones:</strong>
                            <ul>
                                <li>MOONSET token launch</li>
                                <li>Initial DAO activation</li>
                                <li>First governance proposal cycles</li>
                                <li>Treasury diversification implementation</li>
                                <li>Partnership program establishment</li>
                            </ul>
                        </li>
                    </ul>

                    <h4>Phase 3: Maturation (Q1 2027 - Q3 2027)</h4>
                    <ul>
                        <li><strong className="mr-1">Technical Milestones:</strong>
                            <ul>
                                <li>MARE advanced capabilities release</li>
                                <li>DEL scaling solutions implementation</li>
                                <li>Enterprise-grade features development</li>
                                <li>Mobile platform release</li>
                                <li>API ecosystem expansion</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Research Milestones:</strong>
                            <ul>
                                <li>Comprehensive Apollo investigation results</li>
                                <li>Secondary topic selection and preparation</li>
                                <li>Cross-investigation methodology refinement</li>
                                <li>External validation partnerships</li>
                                <li>Educational adaptation of research findings</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Community Milestones:</strong>
                            <ul>
                                <li>Specialized sub-community development</li>
                                <li>Advanced contributor progression system</li>
                                <li>Cross-domain collaboration initiatives</li>
                                <li>Community-led governance transition</li>
                                <li>Regional community hubs establishment</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Governance & Token Milestones:</strong>
                            <ul>
                                <li>Full governance feature activation</li>
                                <li>Specialized council elections</li>
                                <li>Advanced treasury strategies implementation</li>
                                <li>Long-term sustainability mechanisms</li>
                                <li>Strategic partnership expansion</li>
                            </ul>
                        </li>
                    </ul>

                    <h4>Phase 4: Scaling (Q4 2027 - Q4 2028)</h4>
                    <ul>
                        <li><strong className="mr-1">Technical Milestones:</strong>
                            <ul>
                                <li>MARE self-improvement framework</li>
                                <li>Multi-chain DEL implementation</li>
                                <li>Enterprise solution offerings</li>
                                <li>Advanced visualization capabilities</li>
                                <li>Next-generation collaborative tools</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Research Milestones:</strong>
                            <ul>
                                <li>Multiple parallel investigation tracks</li>
                                <li>Methodology standardization across domains</li>
                                <li>Research impact assessment framework</li>
                                <li>Academic integration expansion</li>
                                <li>Interactive educational applications</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Community Milestones:</strong>
                            <ul>
                                <li>Global community expansion</li>
                                <li>Industry-specific adoption initiatives</li>
                                <li>Professional development pathways</li>
                                <li>Conference and event program</li>
                                <li>Community-driven product direction</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Governance & Token Milestones:</strong>
                            <ul>
                                <li>Full DAO autonomy achievement</li>
                                <li>Governance optimization from data analysis</li>
                                <li>Multi-token ecosystem considerations</li>
                                <li>Enterprise licensing programs</li>
                                <li>Institutional integration frameworks</li>
                            </ul>
                        </li>
                    </ul>
                    <p>Each phase builds upon previous achievements, with continuous feedback loops between technical development, research application, community input, and governance refinement. The roadmap will be regularly reviewed and adjusted through governance processes to respond to emergent opportunities and challenges.</p>
                </section>

                {/* --- Competitive Analysis --- */}
                <section id="competitive-analysis">
                    <h2>Competitive Analysis</h2>
                    <h3>Market Positioning</h3>
                    <p>MoonSet operates at the intersection of several emerging technological and social domains, creating a unique position with distinct advantages over adjacent alternatives.</p>
                    <h4>Competitive Landscape:</h4>
                    <ul>
                        <li><strong className="mr-1">Decentralized Research Platforms</strong>
                            <ul>
                                <li><em>Current Players:</em> Decentralized Science (DeSci) initiatives, open research platforms</li>
                                <li><em>MoonSet Differentiation:</em> Specialized AI-assisted investigation tools, immutable evidence registry, token-incentivized collaboration specific to historical/factual investigation</li>
                                <li><em>Key Advantages:</em> Purpose-built for truth discovery, integrated technical stack, domain-specific optimization</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Blockchain Evidence Systems</strong>
                            <ul>
                                <li><em>Current Players:</em> Timestamping services, proof-of-existence platforms, legal evidence systems</li>
                                <li><em>MoonSet Differentiation:</em> Complete investigation ecosystem beyond simple verification, advanced analysis capabilities, collaborative framework</li>
                                <li><em>Key Advantages:</em> End-to-end solution, specialized for complex investigations, community intelligence</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">AI Analysis Platforms</strong>
                            <ul>
                                <li><em>Current Players:</em> General AI research assistants, specialized analytical tools</li>
                                <li><em>MoonSet Differentiation:</em> Purpose-built for evidence analysis, blockchain integration for immutability, token-incentivized human-AI collaboration</li>
                                <li><em>Key Advantages:</em> Domain-optimized capabilities, provenance tracking, collaborative intelligence</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Traditional Research Institutions</strong>
                            <ul>
                                <li><em>Current Players:</em> Academic organizations, think tanks, research firms</li>
                                <li><em>MoonSet Differentiation:</em> Decentralized access and contribution, incentivized participation, cutting-edge technological capabilities</li>
                                <li><em>Key Advantages:</em> Openness, technological innovation, aligned incentives</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Fact-Checking Organizations</strong>
                            <ul>
                                <li><em>Current Players:</em> Media fact-checkers, verification services</li>
                                <li><em>MoonSet Differentiation:</em> In-depth investigation capabilities, community-driven approach, sophisticated technological tools</li>
                                <li><em>Key Advantages:</em> Depth of analysis, transparency, methodological rigor</li>
                            </ul>
                        </li>
                    </ul>
                    <p>MoonSet's unique value proposition lies in creating a complete ecosystem that combines advanced technological capabilities with carefully designed human collaboration frameworks. The platform addresses key limitations in existing approaches through its integrated design specifically optimized for complex truth discovery.</p>

                    <h3>Comparative Advantages</h3>
                    <p>MoonSet's design incorporates several key advantages that position it favorably against both current alternatives and potential future competitors.</p>
                    <h4>Strategic Advantages:</h4>
                    <ul>
                        <li><strong className="mr-1">Technological Integration</strong>
                            <ul>
                                <li>Seamless combination of AI and blockchain technologies</li>
                                <li>End-to-end solution from evidence collection through analysis to publication</li>
                                <li>Technical synergies between components enhancing overall capabilities</li>
                                <li>Progressive technological roadmap for sustained advancement</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Economic Alignment</strong>
                            <ul>
                                <li>Token-based incentives for quality contributions</li>
                                <li>Sustainable funding model for ongoing research</li>
                                <li>Value capture mechanisms supporting ecosystem growth</li>
                                <li>Balanced stakeholder incentives across participant types</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Domain Specialization</strong>
                            <ul>
                                <li>Purpose-built for historical and factual investigation</li>
                                <li>Specialized tools optimized for evidence analysis</li>
                                <li>Domain-specific AI training and capabilities</li>
                                <li>Methodological frameworks tailored to truth discovery</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Decentralized Governance</strong>
                            <ul>
                                <li>Community direction of research priorities</li>
                                <li>Resistance to centralized control or censorship</li>
                                <li>Diverse perspective incorporation by design</li>
                                <li>Transparent decision-making processes</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Network Effects</strong>
                            <ul>
                                <li>Increasing value with growing evidence repository</li>
                                <li>Expanding AI capabilities from additional training data</li>
                                <li>Compounding expertise in contributor community</li>
                                <li>Cross-investigation knowledge transfer</li>
                            </ul>
                        </li>
                    </ul>
                    <p>These advantages create significant barriers to competition while delivering unique value to participants. The integrated nature of MoonSet's ecosystem makes it difficult for single-feature competitors to replicate its full capabilities, while the open, decentralized approach allows it to incorporate innovations from across relevant domains.</p>
                </section>

                {/* --- Risk Assessment & Mitigation --- */}
                <section id="risk-assessment">
                    <h2>Risk Assessment & Mitigation</h2>
                    <h3>Technical Risks</h3>
                    <p>MoonSet faces several technical challenges that must be carefully addressed to ensure platform success and sustainability.</p>
                    <h4>Key Technical Risks & Mitigation Strategies:</h4>
                    <ul>
                        <li><strong className="mr-1">AI Reliability Concerns</strong>
                            <ul>
                                <li><em>Risk:</em> MARE producing unreliable analyses or introducing biases</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Transparent AI methodology documentation</li>
                                        <li>Human-in-the-loop verification systems</li>
                                        <li>Multiple independent analytical approaches</li>
                                        <li>Continuous validation against known test cases</li>
                                        <li>Explicit confidence scoring for all analyses</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Blockchain Scaling Limitations</strong>
                            <ul>
                                <li><em>Risk:</em> DEL becoming too expensive or slow for practical use</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Layer-2 scaling solution integration</li>
                                        <li>Hybrid on-chain/off-chain architecture</li>
                                        <li>Optimized data storage patterns</li>
                                        <li>Progressive decentralization approach</li>
                                        <li>Parametric fee management system</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Data Security Vulnerabilities</strong>
                            <ul>
                                <li><em>Risk:</em> Unauthorized access or manipulation of sensitive evidence</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Comprehensive security audit program</li>
                                        <li>Multi-layer access control systems</li>
                                        <li>Encryption for sensitive materials</li>
                                        <li>Bug bounty program for vulnerability discovery</li>
                                        <li>Regular security practice reviews</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">System Integration Complexities</strong>
                            <ul>
                                <li><em>Risk:</em> Components failing to work effectively together</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Modular architecture with clear interfaces</li>
                                        <li>Extensive integration testing protocols</li>
                                        <li>Phased deployment of interconnected features</li>
                                        <li>Fallback mechanisms for critical functions</li>
                                        <li>Component isolation capabilities</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Technical Debt Accumulation</strong>
                            <ul>
                                <li><em>Risk:</em> Accelerated development leading to future constraints</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Scheduled refactoring periods</li>
                                        <li>Comprehensive documentation requirements</li>
                                        <li>Technical debt monitoring metrics</li>
                                        <li>Clean architecture principles enforcement</li>
                                        <li>Balanced feature/stability prioritization</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>Each technical risk is assigned specific monitoring metrics and trigger thresholds for intervention. Regular technical assessments will evaluate the effectiveness of mitigation strategies and identify emerging risks requiring attention.</p>

                    <h3>Operational Risks</h3>
                    <p>Beyond technical considerations, MoonSet must navigate various operational challenges that could impact its development and adoption.</p>
                    <h4>Key Operational Risks & Mitigation Strategies:</h4>
                    <ul>
                        <li><strong className="mr-1">Resource Constraints</strong>
                            <ul>
                                <li><em>Risk:</em> Insufficient funding or talent for implementation</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Phased development approach matching resources</li>
                                        <li>Diverse funding strategies beyond token sales</li>
                                        <li>Community contribution incentivization</li>
                                        <li>Strategic partnership resource sharing</li>
                                        <li>Prioritization framework for maximum impact</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Regulatory Uncertainty</strong>
                            <ul>
                                <li><em>Risk:</em> Changing legal landscape affecting operations</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Jurisdictional diversification strategy</li>
                                        <li>Regulatory advisory relationships</li>
                                        <li>Proactive compliance frameworks</li>
                                        <li>Adaptable entity structures</li>
                                        <li>Regular legal environment monitoring</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Community Management Challenges</strong>
                            <ul>
                                <li><em>Risk:</em> Community conflicts or misaligned participation</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Clear code of conduct and guidelines</li>
                                        <li>Professional moderation team</li>
                                        <li>Structured conflict resolution processes</li>
                                        <li>Community health monitoring metrics</li>
                                        <li>Incentive alignment for constructive participation</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Market Adoption Barriers</strong>
                            <ul>
                                <li><em>Risk:</em> Slow uptake due to complexity or competition</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Progressive complexity introduction</li>
                                        <li>Targeted user experience optimization</li>
                                        <li>Strong initial use case demonstration</li>
                                        <li>Strategic partnership for distribution</li>
                                        <li>Education and onboarding resources</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Reputation Management</strong>
                            <ul>
                                <li><em>Risk:</em> Misperception of platform purpose or findings</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Clear communication of methodological neutrality</li>
                                        <li>Transparent process documentation</li>
                                        <li>Educational content around platform goals</li>
                                        <li>Active engagement with diverse perspectives</li>
                                        <li>Distinction between platform and specific findings</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>Operational risks are managed through a combination of preventative measures, monitoring systems, and responsive capabilities. The governance system includes specific mechanisms for addressing operational challenges as they emerge.</p>

                    <h3>Research & Methodological Risks</h3>
                    <p>As a platform focused on complex investigations, MoonSet faces particular risks related to research quality and methodological integrity.</p>
                    <h4>Key Research Risks & Mitigation Strategies:</h4>
                    <ul>
                        <li><strong className="mr-1">Evidence Quality Issues</strong>
                            <ul>
                                <li><em>Risk:</em> Low-quality or manipulated evidence contaminating investigations</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Rigorous evidence classification system</li>
                                        <li>Multi-level verification requirements</li>
                                        <li>Source credibility assessment frameworks</li>
                                        <li>Digital forensic capabilities</li>
                                        <li>Comprehensive metadata tracking</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Methodological Disputes</strong>
                            <ul>
                                <li><em>Risk:</em> Conflicts over appropriate investigative approaches</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Explicit methodology documentation requirements</li>
                                        <li>Multiple parallel investigative threads</li>
                                        <li>Structured methodology comparison framework</li>
                                        <li>Domain expert consultation processes</li>
                                        <li>Focus on empirical outcomes over process debates</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Researcher Bias Influences</strong>
                            <ul>
                                <li><em>Risk:</em> Personal biases affecting investigation objectivity</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Diverse perspective representation requirements</li>
                                        <li>Blind review processes where appropriate</li>
                                        <li>Bias identification training resources</li>
                                        <li>Transparent declaration of positions</li>
                                        <li>Multiple independent analysis comparison</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Findings Misinterpretation</strong>
                            <ul>
                                <li><em>Risk:</em> Research results being misunderstood or misrepresented</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Clear confidence level indicators</li>
                                        <li>Standardized findings presentation format</li>
                                        <li>Explicit limitation acknowledgment</li>
                                        <li>Accessible explanation requirements</li>
                                        <li>Context provision frameworks</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Scope Management Challenges</strong>
                            <ul>
                                <li><em>Risk:</em> Investigations becoming unmanageably broad</li>
                                <li><em>Mitigation:</em>
                                    <ul>
                                        <li>Structured investigation framing processes</li>
                                        <li>Sub-question decomposition methodology</li>
                                        <li>Progress tracking metrics</li>
                                        <li>Resource-to-scope alignment requirements</li>
                                        <li>Periodic scope reassessment checkpoints</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>Research risks are addressed through both procedural safeguards and technological capabilities. The platform emphasizes methodological transparency and multifaceted validation to maintain research integrity across diverse investigations.</p>
                </section>

                {/* --- Financial Projections --- */}
                <section id="financial-projections">
                    <h2>Financial Projections</h2>
                    <h3>Revenue Model</h3>
                    <p>MoonSet's financial sustainability is built on a diversified revenue model that supports ongoing development while maintaining alignment with the platform's core mission.</p>
                    <h4>Revenue Streams:</h4>
                    <ul>
                        <li><strong className="mr-1">Premium Service Fees</strong>
                            <ul>
                                <li>Advanced MARE analysis capabilities</li>
                                <li>Priority processing services</li>
                                <li>Specialized visualization tools</li>
                                <li>Custom investigation support</li>
                                <li>Enhanced collaboration features</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Enterprise Solutions</strong>
                            <ul>
                                <li>Institutional research partnerships</li>
                                <li>Private investigation environments</li>
                                <li>Custom implementation services</li>
                                <li>Specialized training programs</li>
                                <li>Integration and API licensing</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Educational Products</strong>
                            <ul>
                                <li>Course and curriculum licensing</li>
                                <li>Training certification programs</li>
                                <li>Educational content licensing</li>
                                <li>Workshop and seminar series</li>
                                <li>Institutional education partnerships</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Data & API Access</strong>
                            <ul>
                                <li>Structured data licensing (with contributor revenue sharing)</li>
                                <li>API access for external applications</li>
                                <li>Research finding integration capabilities</li>
                                <li>Advanced query and analysis endpoints</li>
                                <li>Custom data extraction services</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Token Ecosystem Revenue</strong>
                            <ul>
                                <li>Protocol fee capture</li>
                                <li>Treasury yield generation</li>
                                <li>Value-added service margins</li>
                                <li>Network growth incentive mechanisms</li>
                                <li>Partnership and integration arrangements</li>
                            </ul>
                        </li>
                    </ul>
                    <p>The revenue model is designed to generate sustainable funding without compromising the open and accessible nature of core platform capabilities. Basic research participation remains free, with revenue generated from premium capabilities, enterprise use cases, and specialized services.</p>

                    <h3>Five-Year Projections</h3>
                    <p>MoonSet's financial trajectory reflects a balanced approach to growth, investment, and sustainability, with projections based on conservative adoption models and diversified revenue development.</p>
                    <h4>Financial Highlights:</h4>
                    <div className="my-3">
                        <p><strong>Year 1: Foundation Building</strong></p>
                        <ul>
                            <li>Primary funding from initial token distribution</li>
                            <li>Strategic reserve establishment</li>
                            <li>Core development team funding</li>
                            <li>Initial infrastructure investment</li>
                            <li>Community growth incentives</li>
                            <li><em>Revenue: Minimal (early adopter programs)</em></li>
                        </ul>
                    </div>
                    <div className="my-3">
                        <p><strong>Year 2: Revenue Initiation</strong></p>
                        <ul>
                            <li>Premium service introduction</li>
                            <li>First enterprise partnerships</li>
                            <li>Educational product development</li>
                            <li>Community expansion investments</li>
                            <li>Continued R&D funding</li>
                            <li><em>Revenue: Early traction in premium and enterprise segments</em></li>
                        </ul>
                    </div>
                    <div className="my-3">
                        <p><strong>Year 3: Growth Acceleration</strong></p>
                        <ul>
                            <li>Full service suite availability</li>
                            <li>Enterprise solution scaling</li>
                            <li>Educational program expansion</li>
                            <li>International market development</li>
                            <li>Advanced capability investment</li>
                            <li><em>Revenue: Significant growth across multiple streams</em></li>
                        </ul>
                    </div>
                    <div className="my-3">
                        <p><strong>Year 4: Ecosystem Expansion</strong></p>
                        <ul>
                            <li>Multi-vertical application development</li>
                            <li>Partner integration scaling</li>
                            <li>Data licensing program maturity</li>
                            <li>New investigation domain expansion</li>
                            <li>Strategic acquisition capabilities</li>
                            <li><em>Revenue: Diversified revenue base with positive cash flow</em></li>
                        </ul>
                    </div>
                    <div className="my-3">
                        <p><strong>Year 5: Sustainable Leadership</strong></p>
                        <ul>
                            <li>Industry standard position establishment</li>
                            <li>Full ecosystem service offering</li>
                            <li>Global presence consolidation</li>
                            <li>Next-generation R&D investment</li>
                            <li>Long-term sustainability structures</li>
                            <li><em>Revenue: Self-sustaining operations with growth reinvestment</em></li>
                        </ul>
                    </div>
                    <p>Throughout this trajectory, a significant portion of revenue is continuously reinvested in platform development, community growth, and research capabilities. The DAO treasury management ensures balanced allocation between immediate operational needs and long-term sustainability.</p>
                    <p>These projections incorporate multiple scenario analyses accounting for varying adoption rates, regulatory developments, and competitive landscape evolution. Conservative baseline projections are used for planning purposes, with upside potential identified through accelerated adoption scenarios.</p>
                </section>

                {/* --- Join the Movement --- */}
                <section id="join-movement">
                    <h2>Join the Movement</h2>
                    <h3>Contribution Opportunities</h3>
                    <p>MoonSet offers diverse pathways for participation, allowing individuals to contribute according to their unique skills, interests, and availability.</p>
                    <h4>Ways to Contribute:</h4>
                    <ul>
                        <li><strong className="mr-1">Research Participation</strong>
                            <ul>
                                <li>Evidence submission and analysis</li>
                                <li>Peer review and validation</li>
                                <li>Methodology development</li>
                                <li>Specialized domain expertise contribution</li>
                                <li>Investigation thread leadership</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Technical Development</strong>
                            <ul>
                                <li>Core protocol improvements</li>
                                <li>MARE capability expansions</li>
                                <li>User interface enhancements</li>
                                <li>Testing and quality assurance</li>
                                <li>Documentation and educational content</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Community Building</strong>
                            <ul>
                                <li>Ambassador program participation</li>
                                <li>Educational outreach</li>
                                <li>Event organization and moderation</li>
                                <li>Onboarding and mentorship</li>
                                <li>Translation and localization</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Governance Engagement</strong>
                            <ul>
                                <li>Proposal development and refinement</li>
                                <li>Voting participation</li>
                                <li>Discussion leadership</li>
                                <li>Policy framework contribution</li>
                                <li>Specialized council service</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Ecosystem Support</strong>
                            <ul>
                                <li>Token ecosystem participation</li>
                                <li>Partnership development</li>
                                <li>Media and awareness generation</li>
                                <li>Integration opportunities identification</li>
                                <li>Strategic network expansion</li>
                            </ul>
                        </li>
                    </ul>
                    <p>Each contribution path includes clearly defined progression opportunities, from initial participation to leadership roles. The reputation system recognizes diverse forms of contribution and their impact on the ecosystem's development.</p>

                    <h3>Next Steps</h3>
                    <p>Ready to join the MoonSet mission? Here's how to get started on your journey with our community:</p>
                    <ul>
                        <li><strong className="mr-1">Connect With Us</strong>
                            <ul>
                                <li>Join our Discord community: <a href="https://discord.gg/moonset" target="_blank" rel="noopener noreferrer">discord.gg/moonset</a></li>
                                <li>Follow us on X (formerly Twitter): <a href="https://x.com/MoonSetProtocol" target="_blank" rel="noopener noreferrer">@MoonSetProtocol</a></li>
                                <li>Subscribe to our newsletter: <a href="https://moonset.io/newsletter" target="_blank" rel="noopener noreferrer">moonset.io/newsletter</a></li>
                                <li>Explore our GitHub repositories: <a href="https://github.com/moonset" target="_blank" rel="noopener noreferrer">github.com/moonset</a></li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Explore the Platform</strong>
                            <ul>
                                <li>Review the whitepaper for technical details</li>
                                <li>Test the platform demo environment</li>
                                <li>Join community calls for live demonstrations</li>
                                <li>Participate in upcoming research sessions</li>
                                <li>Access educational resources about our methodology</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Start Contributing</strong>
                            <ul>
                                <li>Complete the contributor onboarding process</li>
                                <li>Identify your areas of interest and expertise</li>
                                <li>Connect with team members in your domain</li>
                                <li>Join ongoing research threads</li>
                                <li>Submit your first evidence or analysis</li>
                            </ul>
                        </li>
                        <li><strong className="mr-1">Join Our Token Community</strong>
                            <ul>
                                <li>Learn about the MOONSET token utility and economics.</li>
                                <li>Participate in public sale events (when announced).</li>
                                <li>Engage in governance discussions.</li>
                                <li>Explore staking and reward opportunities.</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                {/* --- References & Resources --- */}
                <section id="references">
                    <h2>References & Resources</h2>
                    <ol>
                        <li>Floridi, L., & Strait, A. (2023). <em>The Cambridge Handbook of the Ethics of Artificial Intelligence</em>. Cambridge University Press. (Placeholder for a relevant AI ethics book)</li>
                        <li>Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System. <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" rel="noopener noreferrer">https://bitcoin.org/bitcoin.pdf</a>. (Cited for blockchain principles)</li>
                        <li>Wright, A. (2021). <em>Decentralized Autonomous Organizations: Governance, Legal Issues, and Policy</em>. Stanford University Press. (Placeholder for a DAO governance book)</li>
                        <li>NASA. <em>Apollo Program Archives</em>. Retrieved from <a href="https://www.nasa.gov/mission_pages/apollo/index.html" target="_blank" rel="noopener noreferrer">https://www.nasa.gov/mission_pages/apollo/index.html</a>. (General reference to Apollo data)</li>
                        {/* Add more relevant (fictional or real, properly formatted) references here */}
                    </ol>
                </section>

                {/* --- Appendices --- */}
                <section id="appendices">
                    <h2>Appendices</h2>
                    <h3>Appendix A: Glossary of Terms</h3>
                    <dl> {/* Using definition list for glossary, prose should style this well */}
                        <dt>MARE</dt>
                        <dd>MoonSet AI Research Engine: An advanced AI system for evidence processing and analysis.</dd>
                        <dt>DEL</dt>
                        <dd>Decentralized Evidence Ledger: A blockchain-based system for immutable recording of evidence and findings.</dd>
                        <dt>DAO</dt>
                        <dd>Decentralized Autonomous Organization: A community-led entity with no central authority.</dd>
                        <dt>ERC-20</dt>
                        <dd>A technical standard for fungible tokens created using the Ethereum blockchain.</dd>
                        <dt>IPFS</dt>
                        <dd>InterPlanetary File System: A distributed system for storing and accessing files, websites, applications, and data.</dd>
                        <dt>Photogrammetry</dt>
                        <dd>The science and technology of obtaining reliable information about physical objects and the environment through the process of recording, measuring and interpreting photographic images and patterns of electromagnetic radiant imagery and other phenomena.</dd>
                        {/* Add more terms as needed */}
                    </dl>

                    <h3>Appendix B: Technical Specifications (High-Level Overview)</h3>
                    <h4>MARE Technical Stack (Anticipated)</h4>
                    <ul>
                        <li><strong>Programming Languages:</strong> Python, C++ (for performance-critical modules).</li>
                        <li><strong>Core AI/ML Frameworks:</strong> TensorFlow, PyTorch.</li>
                        <li><strong>Specialized Libraries:</strong> OpenCV (computer vision), spaCy/NLTK (NLP), scikit-learn (general ML).</li>
                        <li><strong>Key Model Architectures:</strong> Transformers (for NLP and multimodal tasks), Convolutional Neural Networks (CNNs for image/video analysis), Graph Neural Networks (GNNs for relationship mapping).</li>
                    </ul>

                    <h4>DEL Technical Stack (Anticipated)</h4>
                    <ul>
                        <li><strong>Primary Blockchain Platform:</strong> Ethereum (for security and network effects).</li>
                        <li><strong>Layer-2 Scaling Solution:</strong> Options like Polygon, Arbitrum, or Optimism (for transaction efficiency).</li>
                        <li><strong>Smart Contract Language:</strong> Solidity.</li>
                        <li><strong>Distributed Storage Solution:</strong> IPFS for content addressing and distribution, potentially Filecoin for incentivized persistence.</li>
                        <li><strong>Consensus (for DEL operations):</strong> Governed by smart contracts on the L1/L2, potentially with specific consensus for off-chain components.</li>
                    </ul>

                    <h4>User Interface (UI) / User Experience (UX) Stack (Anticipated)</h4>
                    <ul>
                        <li><strong>Frontend Framework:</strong> React, Vue.js, or Angular.</li>
                        <li><strong>Visualization Libraries:</strong> D3.js, Three.js (for 3D rendering).</li>
                        <li><strong>State Management:</strong> Redux, Zustand, or similar.</li>
                        <li><strong>Backend (for UI support):</strong> Node.js with Express, or Python with Django/Flask, interacting with MARE and DEL APIs.</li>
                    </ul>
                </section>

            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Whitepaper;

This should give you a fully populated whitepaper page within your React application's structure. You may need to make minor styling tweaks based on your specific `Navigation`, `Footer`, and overall site theme.