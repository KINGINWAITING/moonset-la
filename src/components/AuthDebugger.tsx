import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AuthDebugger = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [testResult, setTestResult] = useState<string>("");

  const checkSupabaseConnection = async () => {
    try {
      // Test 1: Check if Supabase client is initialized
      setTestResult("Testing Supabase connection...");
      
      // Test 2: Check current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      // Test 3: Try to fetch from a public table
      const { data: testData, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      // Test 4: Check auth methods
      const { data: authMethods } = await supabase.auth.getUser();
      
      setDebugInfo({
        supabaseUrl: (supabase as any).supabaseUrl || "Not accessible",
        supabaseKey: (supabase as any).supabaseKey ? "Key exists" : "No key",
        currentSession: session ? "Session exists" : "No session",
        sessionError: sessionError?.message || "None",
        fetchError: fetchError?.message || "None",
        authUser: authMethods?.user || "No user",
        localStorage: Object.keys(localStorage).filter(k => k.includes('supabase')),
        timestamp: new Date().toISOString()
      });
      
      setTestResult("Tests completed. Check debug info below.");
    } catch (error: any) {
      setTestResult(`Error: ${error.message}`);
      setDebugInfo({ error: error.message, stack: error.stack });
    }
  };

  const testSignIn = async () => {
    try {
      setTestResult("Testing sign in...");
      
      // Create a test account
      const testEmail = `test${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";
      
      // Try to sign up first
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });
      
      if (signUpError) {
        setTestResult(`Sign up error: ${signUpError.message}`);
        return;
      }
      
      // Try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
      
      if (signInError) {
        setTestResult(`Sign in error: ${signInError.message}`);
      } else {
        setTestResult(`Sign in successful! User: ${signInData.user?.email}`);
      }
    } catch (error: any) {
      setTestResult(`Test error: ${error.message}`);
    }
  };

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Auth Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-x-2">
          <Button onClick={checkSupabaseConnection}>
            Refresh Debug Info
          </Button>
          <Button onClick={testSignIn} variant="secondary">
            Test Sign In
          </Button>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-semibold mb-2">Test Result:</p>
          <p className="text-sm">{testResult || "No test run yet"}</p>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-semibold mb-2">Debug Info:</p>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}; 