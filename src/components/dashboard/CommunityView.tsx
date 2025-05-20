import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client"; 
import { useAuth } from "@/context/AuthContext";
import { ForumCategories } from "@/components/forum/ForumCategories";
import { ForumPosts } from "@/components/forum/ForumPosts";
import { CreatePostModal } from "@/components/forum/CreatePostModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ForumCategory, ForumPostWithDetails } from "@/types/forum";
import { useTheme } from "@/context/ThemeContext";

export const CommunityView = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<ForumPostWithDetails[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    fetchCategories();
    fetchPosts(selectedCategory || undefined);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setCategories(data || []);
      if (data && data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPosts = async (categoryId?: string) => {
    setIsLoading(true);
    try {
      console.log("Fetching posts for category:", categoryId || "all");
      
      // First fetch the posts
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          forum_categories:category_id(name),
          comments:forum_comments(count)
        `);
        
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
        
      query = query.order('created_at', { ascending: false });
        
      const { data: postsData, error: postsError } = await query;

      if (postsError) throw postsError;
      
      if (!postsData || postsData.length === 0) {
        setPosts([]);
        setIsLoading(false);
        return;
      }

      // Then fetch profiles for the user_ids in the posts
      const userIds = postsData.map(post => post.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in('id', userIds);

      // Create a map of user_id to profile data for quick lookup
      const profilesMap = new Map();
      if (profilesData && !profilesError) {
        profilesData.forEach(profile => {
          profilesMap.set(profile.id, profile);
        });
      }

      // Add profiles to posts
      const postsWithProfiles = postsData.map(post => {
        const profile = profilesMap.get(post.user_id);
        return {
          ...post,
          profiles: profile || { error: true }
        };
      });

      console.log("Posts fetched with profiles:", postsWithProfiles);
      
      setPosts(postsWithProfiles as ForumPostWithDetails[]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load forum posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handlePostCreated = () => {
    fetchPosts(selectedCategory || undefined);
    setIsCreatePostModalOpen(false);
    toast({
      title: "Success",
      description: "Your post has been created",
    });
  };

  return (
    <div className={`p-6 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Community <span className="text-primary">Forum</span>
        </h1>
        
        <div className="flex items-center gap-4">
          {session.isLoggedIn && (
            <Button 
              onClick={() => setIsCreatePostModalOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Post
            </Button>
          )}
          
          {session.isLoggedIn && session.user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.avatarUrl || ''} />
                <AvatarFallback>
                  {session.user.username?.charAt(0).toUpperCase() || 
                   session.user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {session.user.username || session.user.email}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ForumCategories 
            categories={categories} 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        
        <div className="lg:col-span-3">
          <Card className={isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> 
                {categories.find(cat => cat.id === selectedCategory)?.name || 'All Discussions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ForumPosts 
                posts={posts}
                isLoading={isLoading}
                isLoggedIn={session.isLoggedIn}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <CreatePostModal 
        isOpen={isCreatePostModalOpen} 
        onClose={() => setIsCreatePostModalOpen(false)}
        onPostCreated={handlePostCreated}
        categories={categories}
      />
    </div>
  );
};
