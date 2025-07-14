import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Brain, 
  Eye, 
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import FeatureExtractor from './FeatureExtractor';
import MLDetection from './MLDetection';
import ProfileAnalyzer from './ProfileAnalyzer';

const ProfileGuardian = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-full px-6 py-2 border border-primary/30">
              <Shield className="h-5 w-5 text-primary-glow" />
              <span className="text-primary-glow font-medium">AI-Powered Profile Security</span>
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-foreground to-primary-glow bg-clip-text text-transparent">
              Profile Guardian
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced two-stage system for detecting fake social media profiles using intelligent 
              feature extraction and machine learning algorithms.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 shadow-glow"
                onClick={() => setActiveTab('analyzer')}
              >
                <Eye className="mr-2 h-5 w-5" />
                Analyze Profile
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 hover:bg-primary/10"
                onClick={() => setActiveTab('extractor')}
              >
                <Brain className="mr-2 h-5 w-5" />
                Feature Extraction
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="extractor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="mr-2 h-4 w-4" />
              Module 1: Extraction
            </TabsTrigger>
            <TabsTrigger value="detection" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="mr-2 h-4 w-4" />
              Module 2: Detection
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Eye className="mr-2 h-4 w-4" />
              Live Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* System Overview Cards */}
              <Card className="bg-gradient-secondary border-border/50 hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Feature Extraction
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Extract 15+ meaningful features from user profiles including behavioral patterns and structural data.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Profile Completeness Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Behavioral Pattern Detection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Engagement Metrics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-secondary border-border/50 hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    ML Detection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Advanced machine learning models trained on profile features to detect fake accounts with high accuracy.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Random Forest</span>
                      <Badge variant="outline" className="border-success text-success">94.2% Accuracy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Neural Network</span>
                      <Badge variant="outline" className="border-success text-success">92.8% Accuracy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SVM</span>
                      <Badge variant="outline" className="border-success text-success">89.5% Accuracy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-secondary border-border/50 hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-warning" />
                    Real-time Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Instant profile analysis with visual risk indicators and detailed probability scores.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Score</span>
                      <Progress value={25} className="w-20 h-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Low Risk Profile</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Features Extracted</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success mb-2">94.2%</div>
                  <div className="text-sm text-muted-foreground">Best Accuracy</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-warning mb-2">0.1s</div>
                  <div className="text-sm text-muted-foreground">Analysis Time</div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <div className="text-sm text-muted-foreground">ML Models</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="extractor">
            <FeatureExtractor />
          </TabsContent>

          <TabsContent value="detection">
            <MLDetection />
          </TabsContent>

          <TabsContent value="analyzer">
            <ProfileAnalyzer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileGuardian;