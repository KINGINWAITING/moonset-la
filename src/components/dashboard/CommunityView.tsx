import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client"; 
import { useAuth } from "@/context/AuthContext";
import { CreatePostModal } from "@/components/forum/CreatePostModal";
import { useToast } from "@/hooks/use-toast";
import { ForumCategory, ForumPostWithDetails } from "@/types/forum";

// Import new forum layout components
import { ForumLayout } from "@/components/forum/layout/ForumLayout";
import { ForumHeader } from "@/components/forum/layout/ForumHeader";
import { CategorySidebar } from "@/components/forum/layout/CategorySidebar";
import { ActivitySidebar } from "@/components/forum/layout/ActivitySidebar";
import { PostListTable } from "@/components/forum/posts/PostListTable";
import { DashboardFooter } from "./DashboardFooter";

export const CommunityView = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<ForumPostWithDetails[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { session } = useAuth();
  const { toast } = useToast();

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

  const handleCategorySelect = (categoryId: string | null) => {
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

  const handleNewPost = () => {
    setIsCreatePostModalOpen(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  return (
    <>
      <ForumLayout
        header={
          <ForumHeader
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            onNewPost={handleNewPost}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        }
        sidebar={
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            totalPosts={posts.length}
          />
        }
        rightPanel={
          <ActivitySidebar />
        }
      >
        <div className="bg-background border border-border rounded-lg">
          <PostListTable
            posts={posts}
            isLoading={isLoading}
            isLoggedIn={session.isLoggedIn}
          />
        </div>

        <CreatePostModal 
          isOpen={isCreatePostModalOpen} 
          onClose={() => setIsCreatePostModalOpen(false)}
          onPostCreated={handlePostCreated}
          categories={categories}
        />
      </ForumLayout>
      
      <DashboardFooter />
    </>
  );
};

// For lazy loading
export default CommunityView;
