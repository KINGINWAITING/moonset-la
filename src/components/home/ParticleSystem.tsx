import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface ParticleSystemProps {
  components: Array<{
    id: string;
    position: { layer: number; column: number };
    connections: string[];
    type: string;
  }>;
  isInView: boolean;
  isDark: boolean;
}

export const ParticleSystem = memo(({ 
  components, 
  isInView, 
  isDark 
}: ParticleSystemProps) => {
  
  // Generate particle flows based on component connections
  const particleFlows = useMemo(() => {
    const flows: Array<{
      id: string;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      color: string;
      type: string;
      delay: number;
      duration: number;
    }> = [];

    // Convert layer/column positions to percentages
    const getPositionPercent = (comp: typeof components[0]) => {
      let x = 50; // Center
      if (comp.position.column === 1) x = 16.67; // Left column (1/6 of 100%)
      else if (comp.position.column === 3) x = 83.33; // Right column (5/6 of 100%)
      
      const y = 12.5 + (comp.position.layer * 25); // Vertical spacing
      return { x, y };
    };

    let flowIndex = 0;
    components.forEach((component) => {
      component.connections.forEach((targetId) => {
        const target = components.find(c => c.id === targetId);
        if (!target) return;

        const startPos = getPositionPercent(component);
        const endPos = getPositionPercent(target);

        // Determine particle type and color based on data flow
        let particleType = "data";
        let color = isDark ? "#60A5FA" : "#3B82F6"; // Default blue

        if (component.id === "community" && target.id === "mare") {
          particleType = "evidence";
          color = isDark ? "#60A5FA" : "#3B82F6"; // Blue for evidence
        } else if (component.id === "mare" && target.id === "pattern-recognition") {
          particleType = "analysis";
          color = isDark ? "#A855F7" : "#9333EA"; // Purple for analysis
        } else if (component.id === "mare" && target.id === "del") {
          particleType = "evidence";
          color = isDark ? "#60A5FA" : "#3B82F6"; // Blue for evidence
        } else if ((component.id === "del" && target.id === "data-archive") || 
                   (component.id === "data-archive" && target.id === "del")) {
          particleType = "storage";
          color = isDark ? "#EC4899" : "#EC4899"; // Pink for storage sync
        } else if (component.id === "pattern-recognition" && target.id === "data-archive") {
          particleType = "storage";
          color = isDark ? "#EC4899" : "#EC4899"; // Pink for storage
        } else if (component.id === "analytics") {
          particleType = "monitoring";
          color = isDark ? "#10B981" : "#059669"; // Green for monitoring
        }

        flows.push({
          id: `${component.id}-${targetId}-flow`,
          startX: startPos.x,
          startY: startPos.y,
          endX: endPos.x,
          endY: endPos.y,
          color,
          type: particleType,
          delay: flowIndex * 0.3,
          duration: 3 + Math.random() * 2 // 3-5 seconds
        });

        flowIndex++;
      });
    });

    return flows;
  }, [components, isDark]);

  // Generate multiple particles for each flow
  const particles = useMemo(() => {
    const allParticles: Array<{
      id: string;
      flow: typeof particleFlows[0];
      offset: number;
      size: number;
    }> = [];

    particleFlows.forEach((flow, flowIndex) => {
      // Create 2-4 particles per flow
      const particleCount = 2 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < particleCount; i++) {
        allParticles.push({
          id: `${flow.id}-particle-${i}`,
          flow,
          offset: (i / particleCount) * flow.duration, // Stagger particles
          size: 0.2 + Math.random() * 0.3 // Random size between 0.2-0.5
        });
      }
    });

    return allParticles;
  }, [particleFlows]);

  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Render particle flows */}
        {isInView && particles.map((particle) => (
          <motion.circle
            key={particle.id}
            r={particle.size}
            fill={particle.flow.color}
            opacity="0.8"
            filter="blur(0.1px)"
            style={{
              boxShadow: `0 0 4px ${particle.flow.color}`
            }}
            initial={{
              cx: particle.flow.startX,
              cy: particle.flow.startY,
              opacity: 0
            }}
            animate={{
              cx: [
                particle.flow.startX,
                (particle.flow.startX + particle.flow.endX) / 2,
                particle.flow.endX
              ],
              cy: [
                particle.flow.startY,
                (particle.flow.startY + particle.flow.endY) / 2 - 2, // Slight curve
                particle.flow.endY
              ],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: particle.flow.duration,
              delay: particle.flow.delay + particle.offset,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        ))}

        {/* Special effect particles for system heartbeat */}
        {isInView && [1, 2, 3, 4, 5].map((i) => (
          <motion.circle
            key={`heartbeat-${i}`}
            cx="50"
            cy="50"
            r="0.3"
            fill={isDark ? "#A855F7" : "#9333EA"}
            opacity="0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 3, 6],
              r: [0.3, 1, 2]
            }}
            transition={{
              duration: 2,
              delay: 8 + i * 0.5, // Start after initial animations
              repeat: Infinity,
              repeatDelay: 8, // Heartbeat every 10 seconds total
              ease: "easeOut"
            }}
          />
        ))}

        {/* System status particles */}
        {isInView && components.map((component, index) => {
          const pos = {
            x: component.position.column === 1 ? 16.67 : 
               component.position.column === 3 ? 83.33 : 50,
            y: 12.5 + (component.position.layer * 25)
          };

          return (
            <motion.g key={`status-${component.id}`}>
              {/* Status indicator particles around each component */}
              {[0, 1, 2].map((particleIndex) => (
                <motion.circle
                  key={`${component.id}-status-${particleIndex}`}
                  r="0.15"
                  fill={
                    component.type === "interface" ? (isDark ? "#60A5FA" : "#3B82F6") :
                    component.type === "processing" ? (isDark ? "#A855F7" : "#9333EA") :
                    component.type === "storage" ? (isDark ? "#EC4899" : "#EC4899") :
                    (isDark ? "#10B981" : "#059669")
                  }
                  opacity="0.6"
                  initial={{
                    cx: pos.x,
                    cy: pos.y,
                    opacity: 0
                  }}
                  animate={{
                    cx: pos.x + Math.cos((particleIndex * 120) * Math.PI / 180) * 3,
                    cy: pos.y + Math.sin((particleIndex * 120) * Math.PI / 180) * 3,
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    delay: 5 + index * 0.5 + particleIndex * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.g>
          );
        })}

        {/* Data throughput visualization */}
        {isInView && (
          <motion.g>
            {/* Simulate network traffic with varying particle densities */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={`traffic-${i}`}
                r="0.1"
                fill={isDark ? "#6B7280" : "#9CA3AF"}
                opacity="0.4"
                initial={{
                  cx: 5 + Math.random() * 90,
                  cy: 5 + Math.random() * 90,
                  opacity: 0
                }}
                animate={{
                  cx: [
                    5 + Math.random() * 90,
                    10 + Math.random() * 80,
                    15 + Math.random() * 70
                  ],
                  cy: [
                    5 + Math.random() * 90,
                    10 + Math.random() * 80,
                    15 + Math.random() * 70
                  ],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  delay: Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Performance metrics overlay */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.7 : 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <text
            x="2"
            y="8"
            fontSize="1.5"
            fill={isDark ? "#6B7280" : "#9CA3AF"}
            fontFamily="monospace"
          >
            THROUGHPUT: {particles.length * 0.8}MB/s
          </text>
          
          <text
            x="2"
            y="12"
            fontSize="1.5"
            fill={isDark ? "#6B7280" : "#9CA3AF"}
            fontFamily="monospace"
          >
            LATENCY: {Math.round(10 + Math.random() * 5)}ms
          </text>
          
          <text
            x="2"
            y="16"
            fontSize="1.5"
            fill={isDark ? "#6B7280" : "#9CA3AF"}
            fontFamily="monospace"
          >
            ACTIVE FLOWS: {particleFlows.length}
          </text>
        </motion.g>
      </svg>
    </div>
  );
});

ParticleSystem.displayName = 'ParticleSystem'; 