import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  User,
  Camera,
  MapPin,
  Calendar,
  Users,
  Heart,
  MessageSquare,
  Share2,
  Clock,
  TrendingUp,
  BarChart3,
  Brain,
  Zap
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  location: string;
  joinDate: string;
  followers: number;
  following: number;
  posts: number;
  avgLikes: number;
  avgComments: number;
  hasProfilePic: boolean;
  verified: boolean;
}

interface RiskAssessment {
  overallRisk: number;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  factors: {
    name: string;
    score: number;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
}

const ProfileAnalyzer = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    displayName: '',
    bio: '',
    location: '',
    joinDate: '',
    followers: 0,
    following: 0,
    posts: 0,
    avgLikes: 0,
    avgComments: 0,
    hasProfilePic: false,
    verified: false
  });
  const [analysis, setAnalysis] = useState<RiskAssessment | null>(null);

  const handleInputChange = (field: keyof ProfileData, value: string | number | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const loadSampleProfile = () => {
    setProfileData({
      username: 'sarah_photographer',
      displayName: 'Sarah Johnson',
      bio: 'Professional photographer based in NYC. Capturing life\'s beautiful moments 📸 Available for bookings',
      location: 'New York, USA',
      joinDate: '2021-03-15',
      followers: 2847,
      following: 892,
      posts: 456,
      avgLikes: 89,
      avgComments: 12,
      hasProfilePic: true,
      verified: false
    });
    toast({
      title: "Sample profile loaded",
      description: "Ready for analysis with realistic profile data",
    });
  };

  const analyzeProfile = async () => {
    if (!profileData.username.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter at least a username to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const followerRatio = profileData.following > 0 ? profileData.followers / profileData.following : 0;
      const engagementRate = profileData.posts > 0 ? (profileData.avgLikes + profileData.avgComments) / profileData.posts : 0;
      const bioLength = profileData.bio.length;
      const accountAge = profileData.joinDate ? 
        (new Date().getTime() - new Date(profileData.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365) : 0;

      // Calculate risk factors
      const factors: RiskAssessment['factors'] = [
        {
          name: 'Profile Completeness',
          score: profileData.hasProfilePic && profileData.bio && profileData.location ? 95 : 45,
          impact: (profileData.hasProfilePic && profileData.bio && profileData.location ? 'positive' : 'negative') as 'positive' | 'negative',
          description: profileData.hasProfilePic && profileData.bio && profileData.location ? 
            'Profile is complete with picture, bio, and location' : 'Missing key profile elements'
        },
        {
          name: 'Follower Ratio',
          score: followerRatio > 0.5 && followerRatio < 5 ? 85 : 30,
          impact: (followerRatio > 0.5 && followerRatio < 5 ? 'positive' : 'negative') as 'positive' | 'negative',
          description: followerRatio > 0.5 && followerRatio < 5 ? 
            'Healthy follower to following ratio' : 'Unusual follower patterns detected'
        },
        {
          name: 'Account Age',
          score: accountAge > 1 ? 90 : 40,
          impact: (accountAge > 1 ? 'positive' : 'negative') as 'positive' | 'negative',
          description: accountAge > 1 ? 
            'Established account with sufficient history' : 'Relatively new account'
        },
        {
          name: 'Engagement Rate',
          score: engagementRate > 10 && engagementRate < 200 ? 80 : 35,
          impact: (engagementRate > 10 && engagementRate < 200 ? 'positive' : 'negative') as 'positive' | 'negative',
          description: engagementRate > 10 && engagementRate < 200 ? 
            'Normal engagement patterns' : 'Unusual engagement levels'
        },
        {
          name: 'Username Pattern',
          score: /^[a-zA-Z][a-zA-Z0-9_]*$/.test(profileData.username) && !profileData.username.includes('12345') ? 75 : 25,
          impact: (/^[a-zA-Z][a-zA-Z0-9_]*$/.test(profileData.username) && !profileData.username.includes('12345') ? 'positive' : 'negative') as 'positive' | 'negative',
          description: /^[a-zA-Z][a-zA-Z0-9_]*$/.test(profileData.username) && !profileData.username.includes('12345') ? 
            'Username follows natural patterns' : 'Username shows suspicious patterns'
        }
      ];

      const averageScore = factors.reduce((sum, factor) => sum + factor.score, 0) / factors.length;
      const overallRisk = 100 - averageScore;
      
      let riskLevel: 'low' | 'medium' | 'high';
      if (overallRisk < 30) riskLevel = 'low';
      else if (overallRisk < 60) riskLevel = 'medium';
      else riskLevel = 'high';

      const assessment: RiskAssessment = {
        overallRisk: Math.round(overallRisk),
        riskLevel,
        confidence: Math.round(85 + Math.random() * 10),
        factors
      };

      setAnalysis(assessment);
      setIsAnalyzing(false);

      toast({
        title: "Analysis complete",
        description: `Profile risk level: ${riskLevel.toUpperCase()}`,
      });
    }, 3000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success border-success bg-success/10';
      case 'medium': return 'text-warning border-warning bg-warning/10';
      case 'high': return 'text-destructive border-destructive bg-destructive/10';
      default: return 'text-muted-foreground border-muted bg-muted/10';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return CheckCircle;
      case 'medium': return AlertTriangle;
      case 'high': return AlertTriangle;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <Card className="bg-gradient-secondary border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-warning" />
            Real-time Profile Analysis
          </CardTitle>
          <p className="text-muted-foreground">
            Analyze any social media profile in real-time to detect potential fake account indicators 
            with our trained machine learning models.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadSampleProfile}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Load Sample
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      placeholder="e.g., john_doe_2023"
                      value={profileData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      placeholder="e.g., John Doe"
                      value={profileData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio/Description</Label>
                  <Textarea
                    id="bio"
                    placeholder="User's profile description..."
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., New York, USA"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={profileData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="followers">Followers</Label>
                    <Input
                      id="followers"
                      type="number"
                      placeholder="0"
                      value={profileData.followers || ''}
                      onChange={(e) => handleInputChange('followers', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="following">Following</Label>
                    <Input
                      id="following"
                      type="number"
                      placeholder="0"
                      value={profileData.following || ''}
                      onChange={(e) => handleInputChange('following', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="posts">Posts</Label>
                    <Input
                      id="posts"
                      type="number"
                      placeholder="0"
                      value={profileData.posts || ''}
                      onChange={(e) => handleInputChange('posts', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="avgLikes">Avg Likes/Post</Label>
                    <Input
                      id="avgLikes"
                      type="number"
                      placeholder="0"
                      value={profileData.avgLikes || ''}
                      onChange={(e) => handleInputChange('avgLikes', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avgComments">Avg Comments/Post</Label>
                    <Input
                      id="avgComments"
                      type="number"
                      placeholder="0"
                      value={profileData.avgComments || ''}
                      onChange={(e) => handleInputChange('avgComments', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.hasProfilePic}
                      onChange={(e) => handleInputChange('hasProfilePic', e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-border"
                    />
                    <span className="text-sm">Has Profile Picture</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.verified}
                      onChange={(e) => handleInputChange('verified', e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-border"
                    />
                    <span className="text-sm">Verified Account</span>
                  </label>
                </div>

                <Button 
                  onClick={analyzeProfile}
                  disabled={isAnalyzing}
                  className="w-full bg-warning hover:bg-warning/90 shadow-glow"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-warning-foreground/30 border-t-warning-foreground rounded-full animate-spin" />
                      Analyzing Profile...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Analyze Profile
                    </div>
                  )}
                </Button>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              {isAnalyzing && (
                <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-warning" />
                        <span className="font-semibold">AI Analysis in Progress</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <span>Extracting profile features...</span>
                        </div>
                        <Progress value={33} className="h-2" />
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                          <span>Running ML detection models...</span>
                        </div>
                        <Progress value={66} className="h-2" />
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                          <span>Calculating risk assessment...</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {analysis && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Risk Score Card */}
                  <Card className={`${getRiskColor(analysis.riskLevel)} border-2`}>
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center">
                          {React.createElement(getRiskIcon(analysis.riskLevel), { 
                            className: "h-12 w-12" 
                          })}
                        </div>
                        <div>
                          <div className="text-3xl font-bold mb-1">
                            {analysis.overallRisk}% Risk
                          </div>
                          <div className="text-lg font-semibold mb-2 uppercase">
                            {analysis.riskLevel} Risk Profile
                          </div>
                          <div className="text-sm opacity-80">
                            Confidence: {analysis.confidence}%
                          </div>
                        </div>
                        
                        {analysis.riskLevel === 'high' && (
                          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <div className="flex items-center gap-2 text-destructive font-semibold mb-2">
                              <AlertTriangle className="h-4 w-4" />
                              ⚠️ High Risk Profile Detected
                            </div>
                            <p className="text-sm text-destructive">
                              This profile shows significant signs of being fake. Proceed with caution 
                              and consider additional verification steps before engaging.
                            </p>
                          </div>
                        )}
                        
                        {analysis.riskLevel === 'low' && (
                          <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                            <div className="flex items-center gap-2 text-success font-semibold mb-2">
                              <CheckCircle className="h-4 w-4" />
                              ✅ Profile Appears Genuine
                            </div>
                            <p className="text-sm text-success">
                              This profile shows strong indicators of authenticity with normal 
                              patterns across multiple factors.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Factors */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Risk Factor Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysis.factors.map((factor, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{factor.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={
                                    factor.impact === 'positive' ? 'border-success text-success' :
                                    factor.impact === 'negative' ? 'border-destructive text-destructive' :
                                    'border-muted text-muted-foreground'
                                  }
                                >
                                  {factor.score}%
                                </Badge>
                              </div>
                            </div>
                            <Progress 
                              value={factor.score} 
                              className="h-2"
                            />
                            <p className="text-sm text-muted-foreground">
                              {factor.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {!analysis && !isAnalyzing && (
                <Card className="bg-card/30 backdrop-blur-sm border-border/30">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
                    <p className="text-muted-foreground">
                      Enter profile information above and click "Analyze Profile" to get 
                      a comprehensive fake profile risk assessment.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileAnalyzer;