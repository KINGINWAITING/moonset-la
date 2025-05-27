/**
 * PageHeader Component for Moonset Dashboard
 * 
 * Features:
 * - Consistent page header patterns
 * - Breadcrumb navigation
 * - Action buttons support
 * - Glass morphism styling
 * - Responsive design
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/design-system/components/base';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, breadcrumbs, actions, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass border-b border-glass-border backdrop-blur-lg',
          'px-6 py-8 mb-8',
          className
        )}
        {...props}
      >
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-text-tertiary mx-2" />
                  )}
                  
                  {item.current ? (
                    <span className="text-text-primary font-medium">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <Link
                      to={item.href}
                      className="text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-text-secondary">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Header content */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex-shrink-0 ml-6">
              <div className="flex items-center gap-3">
                {actions}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';

// Convenience component for dashboard pages
export interface DashboardPageHeaderProps extends Omit<PageHeaderProps, 'breadcrumbs'> {
  section?: string;
}

const DashboardPageHeader = React.forwardRef<HTMLDivElement, DashboardPageHeaderProps>(
  ({ section, title, ...props }, ref) => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', href: '/dashboard' },
      ...(section ? [{ label: section, current: true }] : [{ label: title, current: true }])
    ];

    return (
      <PageHeader
        ref={ref}
        title={title}
        breadcrumbs={breadcrumbs}
        {...props}
      />
    );
  }
);

DashboardPageHeader.displayName = 'DashboardPageHeader';

export { PageHeader, DashboardPageHeader }; 