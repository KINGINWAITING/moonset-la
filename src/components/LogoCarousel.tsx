
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CosmicBackground } from "@/components/ui/cosmic-background";

const LogoCarousel = () => {
  // Replace logos with avatar images using unsplash placeholder images
  const avatars = [
    {
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop",
      name: "Alex",
    },
    {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      name: "Sofia",
    },
    {
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
      name: "Michael",
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
      name: "Emma",
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
      name: "James",
    },
    // Adding 10 more unique faces
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      name: "Nathan",
    },
    {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
      name: "Olivia",
    },
    {
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
      name: "Daniel",
    },
    {
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop",
      name: "Mia",
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
      name: "Thomas",
    },
    {
      src: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1000&auto=format&fit=crop",
      name: "Sophia",
    },
    {
      src: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1000&auto=format&fit=crop",
      name: "William",
    },
    {
      src: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1000&auto=format&fit=crop",
      name: "Ava",
    },
    {
      src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1000&auto=format&fit=crop",
      name: "Lucas",
    },
    {
      src: "https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?q=80&w=1000&auto=format&fit=crop",
      name: "Isabella",
    },
  ];

  const extendedAvatars = [...avatars, ...avatars, ...avatars];

  return (
    <div className="w-full overflow-hidden bg-transparent backdrop-blur-sm py-12 mt-20 relative">
      {/* Subtle Cosmic Background */}
      <CosmicBackground 
        intensity="subtle" 
        showOrbs={false}
        showParticles={true}
        showGrid={false}
        showScanning={false}
      />
      <motion.div 
        className="flex space-x-16"
        initial={{ opacity: 0, x: "0%" }}
        animate={{
          opacity: 1,
          x: "-50%"
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: {
            duration: 30, // Changed from 15 to 30 seconds to make it slower
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }
        }}
        style={{
          width: "fit-content",
          display: "flex",
          gap: "4rem"
        }}
      >
        {extendedAvatars.map((avatar, index) => (
          <motion.div
            key={`avatar-${index}`}
            className="flex flex-col items-center"
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatar.src} alt={`${avatar.name}'s avatar`} />
              <AvatarFallback>{avatar.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="mt-2 text-sm font-medium">{avatar.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
