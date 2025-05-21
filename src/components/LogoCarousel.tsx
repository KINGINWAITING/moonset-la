
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  ];

  const extendedAvatars = [...avatars, ...avatars, ...avatars];

  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm py-12 mt-20">
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
            duration: 15, // 15 second animation duration
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
