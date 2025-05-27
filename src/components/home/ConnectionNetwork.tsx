import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface ConnectionNetworkProps {
  components: Array<{
    id: string;
    position: { layer: number; column: number };
    connections: string[];
    type: string;
  }>;
  isInView: boolean;
  prefersReducedMotion: boolean;
  isDark: boolean;
}

export const ConnectionNetwork = memo(({ 
  components, 
  isInView, 
  prefersReducedMotion, 
  isDark 
}: ConnectionNetworkProps) => {
  
  // Calculate connection paths based on component positions
  const connectionPaths = useMemo(() => {
    const paths: Array<{
      id: string;
      path: string;
      color: string;
      type: string;
      delay: number;
    }> = [];

    components.forEach((component, index) => {
      component.connections.forEach((targetId) => {
        const target = components.find(c => c.id === targetId);
        if (!target) return;

        // Calculate positions based on layer and column
        const getComponentPosition = (comp: typeof component) => {
          const baseX = 50; // Center of viewBox
          const baseY = 20 + (comp.position.layer * 20); // Vertical spacing
          
          // Adjust X based on column
          let x = baseX;
          if (comp.position.column === 1) x = 20;
          else if (comp.position.column === 3) x = 80;
          
          return { x, y: baseY };
        };

        const startPos = getComponentPosition(component);
        const endPos = getComponentPosition(target);

        // Create smooth curved path
        const midX = (startPos.x + endPos.x) / 2;
        const midY = (startPos.y + endPos.y) / 2;
        const controlOffset = 10;

        const path = `M ${startPos.x} ${startPos.y} 
                     Q ${midX} ${midY - controlOffset} ${endPos.x} ${endPos.y}`;

        // Determine connection type and color
        let connectionType = "data";
        let color = isDark ? "#60A5FA" : "#3B82F6"; // Default blue

        // Color coding based on component types
        if (component.type === "monitoring") {
          connectionType = "monitoring";
          color = isDark ? "#10B981" : "#059669"; // Green for monitoring
        } else if (component.type === "interface" && target.type === "processing") {
          connectionType = "input";
          color = isDark ? "#60A5FA" : "#3B82F6"; // Blue for input
        } else if (component.type === "processing" && target.type === "storage") {
          connectionType = "storage";
          color = isDark ? "#EC4899" : "#EC4899"; // Pink for storage
        } else if (component.type === "processing" && target.type === "processing") {
          connectionType = "processing";
          color = isDark ? "#A855F7" : "#9333EA"; // Purple for processing
        }

        paths.push({
          id: `${component.id}-${targetId}`,
          path,
          color,
          type: connectionType,
          delay: index * 0.2
        });
      });
    });

    return paths;
  }, [components, isDark]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradient definitions for different connection types */}
          <linearGradient id="input-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="processing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="storage-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="monitoring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Data flow animation markers */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="currentColor"
              opacity="0.8"
            />
          </marker>
        </defs>

        {/* Render connection paths */}
        {connectionPaths.map((connection) => (
          <g key={connection.id}>
            {/* Background path (thicker, lower opacity) */}
            <motion.path
              d={connection.path}
              stroke={connection.color}
              strokeWidth="0.3"
              fill="none"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.5 : 2,
                delay: prefersReducedMotion ? 0 : connection.delay,
                ease: "easeInOut"
              }}
            />
            
            {/* Main connection path */}
            <motion.path
              d={connection.path}
              stroke={`url(#${connection.type}-gradient)`}
              strokeWidth="0.2"
              fill="none"
              filter={!prefersReducedMotion ? "url(#glow)" : "none"}
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.5 : 2,
                delay: prefersReducedMotion ? 0 : connection.delay + 0.5,
                ease: "easeInOut"
              }}
              style={{ color: connection.color }}
            />

            {/* Animated pulse effect for active connections */}
            {!prefersReducedMotion && isInView && (
              <motion.path
                d={connection.path}
                stroke={connection.color}
                strokeWidth="0.4"
                fill="none"
                opacity="0"
                animate={{
                  opacity: [0, 0.8, 0],
                  strokeWidth: ["0.4", "0.6", "0.4"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: connection.delay + 2,
                  ease: "easeInOut"
                }}
              />
            )}
          </g>
        ))}

        {/* Network topology indicators */}
        {isInView && !prefersReducedMotion && (
          <>
            {/* Central processing indicator */}
            <motion.circle
              cx="50"
              cy="60"
              r="1"
              fill={isDark ? "#A855F7" : "#9333EA"}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 3
              }}
            />

            {/* Data flow indicators */}
            {[1, 2, 3].map((i) => (
              <motion.circle
                key={`flow-${i}`}
                cx={30 + i * 20}
                cy={40 + i * 5}
                r="0.3"
                fill={isDark ? "#60A5FA" : "#3B82F6"}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, 20, 40],
                  y: [0, 5, 10]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5 + 4,
                  ease: "linear"
                }}
              />
            ))}
          </>
        )}

        {/* Connection status overlay */}
        <text
          x="2"
          y="95"
          fontSize="2"
          fill={isDark ? "#6B7280" : "#9CA3AF"}
          fontFamily="monospace"
          opacity="0.7"
        >
          {connectionPaths.length} ACTIVE CONNECTIONS
        </text>
      </svg>
    </div>
  );
});

ConnectionNetwork.displayName = 'ConnectionNetwork'; 