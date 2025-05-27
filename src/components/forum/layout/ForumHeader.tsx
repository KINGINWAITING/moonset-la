import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Plus, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { ForumCategory } from '@/types/forum';

interface ForumHeaderProps {
  categories: ForumCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onNewPost: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ForumHeader = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onNewPost,
  searchQuery,
  onSearchChange,
}: ForumHeaderProps) => {
  const location = useLocation();
  const { session } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Community', href: '/dashboard/community' },
    ];

    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        breadcrumbs.push({ label: category.name, href: '#' });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="px-6 py-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Left: Breadcrumbs & Category Filter */}
          <div className="flex items-center gap-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  {index > 0 && <span className="text-muted-foreground">/</span>}
                  <Link
                    to={crumb.href}
                    className={`hover:text-foreground transition-colors ${
                      index === breadcrumbs.length - 1
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedCategory
                    ? categories.find(cat => cat.id === selectedCategory)?.name || 'Category'
                    : 'All Categories'
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuItem onClick={() => onCategorySelect(null)}>
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-md mx-6">
            <div className={`relative transition-all duration-200 ${
              isSearchFocused ? 'scale-[1.02]' : ''
            }`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-primary/50"
              />
            </div>
          </div>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-3">
            {/* New Post Button */}
            {session.isLoggedIn && (
              <Button onClick={onNewPost} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            )}

            {/* Notifications */}
            {session.isLoggedIn && (
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            )}

            {/* User Avatar */}
            {session.isLoggedIn && session.user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.avatarUrl || ''} />
                  <AvatarFallback className="text-xs">
                    {session.user.username?.charAt(0).toUpperCase() || 
                     session.user.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium leading-none">
                    {session.user.username || session.user.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Community Member
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 