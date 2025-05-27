
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Container, 
  DashboardPageHeader, 
  Grid, 
  VStack, 
  HStack,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button,
  Input,
  Badge
} from "@/design-system";
import { 
  Loader2, 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Mail, 
  Lock, 
  Camera, 
  AlertTriangle,
  LogOut,
  Save,
  Edit
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { DashboardFooter } from "./DashboardFooter";

export const SettingsView = () => {
  const { session, signOut } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Email change fields
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  
  // Password change fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Portfolio data state
  const [portfolioData, setPortfolioData] = useState<{
    cryptocurrency: string;
    amount: number;
    purchasePrice: number;
    purchaseDate: string;
  }>({
    cryptocurrency: '',
    amount: 0,
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
  });

  // Add the missing isSubmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session.isLoggedIn && session.user) {
      fetchProfile();
    } else {
      setIsLoadingProfile(false);
    }
  }, [session.isLoggedIn, session.user]);

  const fetchProfile = async () => {
    if (!session.user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      
      setUsername(data?.username || '');
      setAvatarUrl(data?.avatar_url || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!session.user) return;
    
    setIsSavingProfile(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          updated_at: new Date().toISOString() // Convert Date to string
        })
        .eq('id', session.user.id);

      if (error) throw error;
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update your profile",
        variant: "destructive",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile || !session.user) return;
    
    setIsUploadingAvatar(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = avatarFile.name.split('.').pop();
      const filePath = `avatars/${session.user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile);

      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const avatarUrl = urlData.publicUrl;
      
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString() // Convert Date to string
        })
        .eq('id', session.user.id);

      if (updateError) throw updateError;
      
      setAvatarUrl(avatarUrl);
      setAvatarFile(null);
      
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated"
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload your profile picture",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail || !currentPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsChangingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      }, {
        emailRedirectTo: window.location.origin
      });

      if (error) throw error;
      
      toast({
        title: "Verification Email Sent",
        description: "Please check your new email to confirm the change"
      });
      
      setNewEmail('');
      setCurrentPassword('');
    } catch (error: any) {
      console.error('Error changing email:', error);
      toast({
        title: "Email Change Failed",
        description: error.message || "Failed to update your email address",
        variant: "destructive",
      });
    } finally {
      setIsChangingEmail(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully"
      });
      
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast({
        title: "Password Change Failed",
        description: error.message || "Failed to update your password",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You've been successfully signed out"
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!portfolioData.cryptocurrency || !portfolioData.amount || !portfolioData.purchasePrice) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('crypto_portfolio')
        .insert({
          cryptocurrency: portfolioData.cryptocurrency,
          amount: portfolioData.amount,
          purchase_price: portfolioData.purchasePrice,
          purchase_date: portfolioData.purchaseDate,
          user_id: session.user?.id // Add user_id for the crypto_portfolio table
        });

      if (error) throw error;
      
      toast({
        title: "Asset Added",
        description: "Your asset has been added successfully"
      });
    } catch (error) {
      console.error('Error adding asset:', error);
      toast({
        title: "Asset Add Failed",
        description: "Failed to add your asset",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setPortfolioData({
        cryptocurrency: '',
        amount: 0,
        purchasePrice: 0,
        purchaseDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  if (!session.isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <Container size="md" spacing="lg">
          <Card variant="glass" size="default">
            <CardContent className="text-center py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Shield className="w-16 h-16 mx-auto text-primary mb-6" />
                <CardTitle as="h2" className="mb-4">
                  Authentication Required
                </CardTitle>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  Please sign in to access your account settings and manage your profile
                </p>
                <Button variant="primary" size="lg" asChild>
                  <a href="/">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign In
                  </a>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col"
    >
      <DashboardPageHeader
        title={
          <HStack spacing="default" align="center">
            <Settings className="w-8 h-8 text-primary" />
            <span>Account Settings</span>
            <Badge variant="secondary" size="lg">
              {session.user?.email?.split('@')[0] || 'User'}
            </Badge>
          </HStack>
        }
        description="Manage your account preferences, security settings, and profile information."
        section="Settings"
      />

      <Container size="xl" spacing="lg" className="flex-1">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="profile">
            <Card variant="glass" className="mb-6">
              <CardContent className="p-2">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
            
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card variant="elevated" size="default">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <User className="w-6 h-6 text-primary" />
                      Profile Settings
                    </CardTitle>
                    <p className="text-text-secondary">
                      Manage your personal information and avatar
                    </p>
                  </CardHeader>
                  <CardContent>
                    {isLoadingProfile ? (
                      <VStack spacing="lg" align="center" className="py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="h-12 w-12 text-primary" />
                        </motion.div>
                        <p className="text-text-secondary">Loading profile...</p>
                      </VStack>
                    ) : (
                  <>
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={avatarUrl} />
                          <AvatarFallback className="text-xl">
                            {username?.charAt(0).toUpperCase() || 
                            session.user?.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex flex-col items-center gap-2">
                          <Label 
                            htmlFor="avatar" 
                            className={`cursor-pointer ${isDark ? "bg-[#1A1A1A]" : "bg-gray-100"} px-3 py-1 rounded-md text-sm ${isDark ? "hover:bg-[#252525]" : "hover:bg-gray-200"} transition-colors`}
                          >
                            Choose Image
                          </Label>
                          <Input 
                            id="avatar" 
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                          {avatarFile && (
                            <div className="flex flex-col items-center">
                              <span className="text-xs text-gray-400 truncate max-w-[150px]">
                                {avatarFile.name}
                              </span>
                              <Button 
                                size="sm" 
                                className="mt-2" 
                                onClick={handleAvatarUpload}
                                disabled={isUploadingAvatar}
                              >
                                {isUploadingAvatar ? 'Uploading...' : 'Upload'}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={session.user?.email || ''}
                            readOnly
                            disabled
                            className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                          />
                          <p className="text-xs text-gray-400">
                            To change your email, use the Account tab
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Your username"
                            className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={isSavingProfile}
                      >
                        {isSavingProfile ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
                  </motion.div>
                </TabsContent>
        
        <TabsContent value="account">
          <div className="grid grid-cols-1 gap-6">
            <Card className={isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}>
              <CardHeader>
                <CardTitle>Email Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-email">Current Email</Label>
                  <Input
                    id="current-email"
                    value={session.user?.email || ''}
                    disabled
                    className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-email">New Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter new email address"
                    className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-password-email">Current Password</Label>
                  <Input
                    id="current-password-email"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleEmailChange}
                    disabled={isChangingEmail}
                  >
                    {isChangingEmail ? 'Updating...' : 'Update Email'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className={isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="old-password">Current Password</Label>
                  <Input
                    id="old-password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className={isDark ? "bg-[#1A1A1A] border-gray-800" : "bg-gray-100 border-gray-200"}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handlePasswordChange}
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className={isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}>
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`border rounded-lg p-4 ${isDark ? "border-red-900/50 bg-red-950/10" : "border-red-300/50 bg-red-50/30"}`}>
                  <h4 className="font-semibold mb-2">Sign Out</h4>
                  <p className="text-sm mb-4">
                    Sign out from your account on this device
                  </p>
                  <Button 
                    variant="destructive"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className={isDark ? "bg-[#121212] border-gray-800" : "bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
                Configure which notifications you want to receive
              </p>
              
              <div className="space-y-4">
                {/* Notification preferences would go here */}
                <div className="text-center py-8">
                  <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                    Notification settings coming soon!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
          </Tabs>
        </motion.div>
      </Container>
      
      <DashboardFooter />
    </motion.div>
  );
};
