
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const SettingsView = () => {
  const { session, signOut } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  // Email change fields
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  
  // Password change fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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
          updated_at: new Date()
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
          updated_at: new Date()
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

  if (!session.isLoggedIn) {
    return (
      <div className="p-6">
        <Card className="bg-[#121212] border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Authentication Required</h3>
              <p className="text-gray-400 mb-6">Please sign in to access your settings</p>
              <Button asChild>
                <a href="/">
                  Sign In
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Account <span className="text-primary">Settings</span>
      </h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-[#121212] border-gray-800">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingProfile ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
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
                            className="cursor-pointer bg-[#1A1A1A] px-3 py-1 rounded-md text-sm hover:bg-[#252525] transition-colors"
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
                            className="bg-[#1A1A1A] border-gray-800"
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
                            className="bg-[#1A1A1A] border-gray-800"
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
          </div>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-[#121212] border-gray-800">
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
                    className="bg-[#1A1A1A] border-gray-800"
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
                    className="bg-[#1A1A1A] border-gray-800"
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
                    className="bg-[#1A1A1A] border-gray-800"
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
            
            <Card className="bg-[#121212] border-gray-800">
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
                    className="bg-[#1A1A1A] border-gray-800"
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
                    className="bg-[#1A1A1A] border-gray-800"
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
                    className="bg-[#1A1A1A] border-gray-800"
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
            
            <Card className="bg-[#121212] border-gray-800">
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border border-red-900/50 rounded-lg p-4 bg-red-950/10">
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
          <Card className="bg-[#121212] border-gray-800">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">
                Configure which notifications you want to receive
              </p>
              
              <div className="space-y-4">
                {/* Notification preferences would go here */}
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    Notification settings coming soon!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
