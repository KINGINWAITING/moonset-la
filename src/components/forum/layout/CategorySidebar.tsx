import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Hash, TrendingUp, Clock, Users } from 'lucide-react';
import { ForumCategory } from '@/types/forum';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  categories: ForumCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  totalPosts: number;
}

export const CategorySidebar = ({
  categories,
  selectedCategory,
  onCategorySelect,
  totalPosts,
}: CategorySidebarProps) => {
  const categoryStats = [
    { label: 'Total Discussions', value: totalPosts, icon: Hash },
    { label: 'Active Today', value: 12, icon: TrendingUp },
    { label: 'Online Members', value: 24, icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Forum Stats */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Forum Overview
        </h3>
        <div className="space-y-2">
          {categoryStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Categories
        </h3>
        
        <div className="space-y-1">
          {/* All Categories Option */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategorySelect(null)}
            className={cn(
              "w-full justify-between h-auto p-3 font-normal",
              selectedCategory === null
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              <span>All Categories</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {totalPosts}
            </Badge>
          </Button>

          {/* Individual Categories */}
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                "w-full justify-between h-auto p-3 font-normal",
                selectedCategory === category.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <span className="truncate">{category.name}</span>
              </div>
              {category.post_count > 0 && (
                <Badge variant="secondary" className="text-xs ml-2">
                  {category.post_count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Access
        </h3>
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending Discussions
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Clock className="h-4 w-4 mr-2" />
            Recent Activity
          </Button>
        </div>
      </div>
    </div>
  );
}; 