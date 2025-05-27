import React, { lazy } from 'react';
import { LoadingFallback } from '@/utils/performance';

// Loading fallback components with proper dimensions and styles
const TokenSectionFallback = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <LoadingFallback className="h-8 w-64 mb-6 rounded" />
          <LoadingFallback className="h-24 w-full mb-8 rounded" />
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <LoadingFallback key={i} className="h-20 rounded" />
            ))}
          </div>
          <LoadingFallback className="h-12 w-48 rounded" />
        </div>
        <div className="flex-1">
          <LoadingFallback className="h-96 rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

const FrameworkSectionFallback = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-16">
        <LoadingFallback className="h-6 w-32 mx-auto mb-6 rounded" />
        <LoadingFallback className="h-12 w-96 mx-auto mb-6 rounded" />
        <LoadingFallback className="h-6 w-64 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[...Array(4)].map((_, i) => (
          <LoadingFallback key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      <LoadingFallback className="h-64 rounded-xl" />
    </div>
  </section>
);

const FeaturesHighlightFallback = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-4">
      <LoadingFallback className="h-96 rounded-lg" />
    </div>
  </section>
);

const CTASectionFallback = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <LoadingFallback className="h-32 rounded-2xl" />
      </div>
    </div>
  </section>
);

const ApolloMissionSectionFallback = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <LoadingFallback className="h-8 w-64 mx-auto mb-6 rounded" />
        <LoadingFallback className="h-6 w-96 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <LoadingFallback key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <LoadingFallback className="h-80 rounded-lg" />
      </div>
    </div>
  </section>
);

// Lazy loaded components with React.Suspense built-in
export const LazyTokenSection = lazy(() => 
  import('./TokenSection').then(module => ({ default: module.TokenSection }))
);

export const LazyFrameworkSection = lazy(() => 
  import('./FrameworkSection').then(module => ({ default: module.FrameworkSection }))
);

export const LazyFeaturesHighlight = lazy(() => 
  import('./FeaturesHighlight').then(module => ({ default: module.FeaturesHighlight }))
);

export const LazyCTASection = lazy(() => 
  import('./CTASection').then(module => ({ default: module.CTASection }))
);

export const LazyApolloMissionSection = lazy(() => 
  import('./ApolloMissionSection').then(module => ({ default: module.ApolloMissionSection }))
);

// Wrapper components with Suspense and fallbacks
export const TokenSectionWithSuspense = (props: any) => (
  <React.Suspense fallback={<TokenSectionFallback />}>
    <LazyTokenSection {...props} />
  </React.Suspense>
);

export const FrameworkSectionWithSuspense = (props: any) => (
  <React.Suspense fallback={<FrameworkSectionFallback />}>
    <LazyFrameworkSection {...props} />
  </React.Suspense>
);

export const FeaturesHighlightWithSuspense = (props: any) => (
  <React.Suspense fallback={<FeaturesHighlightFallback />}>
    <LazyFeaturesHighlight {...props} />
  </React.Suspense>
);

export const CTASectionWithSuspense = (props: any) => (
  <React.Suspense fallback={<CTASectionFallback />}>
    <LazyCTASection {...props} />
  </React.Suspense>
);

export const ApolloMissionSectionWithSuspense = (props: any) => (
  <React.Suspense fallback={<ApolloMissionSectionFallback />}>
    <LazyApolloMissionSection {...props} />
  </React.Suspense>
);

// Intersection observer wrapper for lazy loading
export const LazyIntersectionWrapper = ({ 
  children, 
  fallback, 
  threshold = 0.1,
  rootMargin = "100px" 
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}) => {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {shouldLoad ? children : fallback}
    </div>
  );
}; 