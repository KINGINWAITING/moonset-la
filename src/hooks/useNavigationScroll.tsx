import { useState, useEffect, useCallback } from "react";

export const useNavigationScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Update isScrolled state for styling changes
    setIsScrolled(currentScrollY > 30);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          controlNavbar();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call to set state on mount
    controlNavbar();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlNavbar]);

  const scrollToSection = (sectionId: string) => {
    // Adjusted offset for floating navigation
    const getOffset = () => {
      // Smaller offset since floating nav takes less space
      return window.innerWidth < 768 ? -60 : -70;
    };

    if (sectionId === 'testimonials') {
      const testimonialSection = document.querySelector('.animate-marquee');
      if (testimonialSection) {
        const yOffset = getOffset();
        const y = testimonialSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = getOffset();
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (sectionId === 'token') {
      const tokenSection = document.getElementById('token');
      if (tokenSection) {
        const yOffset = getOffset();
        const y = tokenSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = getOffset();
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return {
    isScrolled,
    scrollToSection
  };
};
