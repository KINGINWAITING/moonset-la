import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, Clock, Star, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivitySidebarProps {
  className?: string;
}

export const ActivitySidebar = ({ className }: ActivitySidebarProps) => {
  // Mock data - replace with real data from your API
  const communityStats = [
    { label: 'Members Online', value: 24, icon: Users, color: 'text-green-500' },
    { label: 'Posts Today', value: 12, icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Active Discussions', value: 8, icon: TrendingUp, color: 'text-orange-500' },
  ];

  const recentActivity = [
    {
      id: 1,
      user: { name: 'Alice Johnson', avatar: '', initials: 'AJ' },
      action: 'replied to',
      target: 'Token Economics Discussion',
      time: '2 minutes ago',
    },
    {
      id: 2,
      user: { name: 'Bob Smith', avatar: '', initials: 'BS' },
      action: 'created',
      target: 'New DeFi Strategy',
      time: '15 minutes ago',
    },
    {
      id: 3,
      user: { name: 'Carol Davis', avatar: '', initials: 'CD' },
      action: 'liked',
      target: 'Market Analysis Update',
      time: '1 hour ago',
    },
    {
      id: 4,
      user: { name: 'David Wilson', avatar: '', initials: 'DW' },
      action: 'joined',
      target: 'the community',
      time: '2 hours ago',
    },
  ];

  const topContributors = [
    { name: 'Sarah Chen', posts: 42, avatar: '', initials: 'SC' },
    { name: 'Mike Rodriguez', posts: 38, avatar: '', initials: 'MR' },
    { name: 'Emma Thompson', posts: 35, avatar: '', initials: 'ET' },
    { name: 'James Lee', posts: 29, avatar: '', initials: 'JL' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Community Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Community Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {communityStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-sm font-semibold">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-2">
              <Avatar className="h-6 w-6 flex-shrink-0">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="text-xs">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {activity.user.name}
                  </span>{' '}
                  {activity.action}{' '}
                  <span className="font-medium text-foreground">
                    {activity.target}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
            View All Activity
          </Button>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={contributor.name} className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs font-medium text-muted-foreground w-4">
                  #{index + 1}
                </span>
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarImage src={contributor.avatar} />
                  <AvatarFallback className="text-xs">
                    {contributor.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium truncate">
                  {contributor.name}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {contributor.posts}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            <TrendingUp className="h-3 w-3 mr-2" />
            View Trending
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            <Users className="h-3 w-3 mr-2" />
            Browse Members
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            <MessageSquare className="h-3 w-3 mr-2" />
            My Discussions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}; 