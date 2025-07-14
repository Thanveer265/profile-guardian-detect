import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  User, 
  MessageSquare, 
  Heart, 
  Share2, 
  Clock, 
  AtSign,
  MapPin,
  Camera,
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  Hash
} from 'lucide-react';

interface FeatureData {
  name: string;
  value: string | number;
  score: number;
  description: string;
  icon: React.ElementType;
  category: 'structural' | 'behavioral' | 'engagement';
}

const FeatureExtractor = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);

  const sampleFeatures: FeatureData[] = [
    // Structural Features
    { name: 'Profile Picture', value: 'Present', score: 100, description: 'Has a valid profile picture', icon: Camera, category: 'structural' },
    { name: 'Bio Completeness', value: '95%', score: 95, description: 'Bio is comprehensive and detailed', icon: User, category: 'structural' },
    { name: 'Location Info', value: 'Present', score: 100, description: 'Location is specified', icon: MapPin, category: 'structural' },
    { name: 'Username Pattern', value: 'Normal', score: 85, description: 'Username follows natural patterns', icon: AtSign, category: 'structural' },
    { name: 'Account Age', value: '2.3 years', score: 90, description: 'Account has been active for reasonable time', icon: Calendar, category: 'structural' },
    
    // Behavioral Features
    { name: 'Post Frequency', value: '3.2/day', score: 75, description: 'Normal posting frequency', icon: Clock, category: 'behavioral' },
    { name: 'Follower Ratio', value: '0.85', score: 80, description: 'Healthy follower to following ratio', icon: Users, category: 'behavioral' },
    { name: 'Time Patterns', value: 'Human-like', score: 90, description: 'Posts follow human activity patterns', icon: TrendingUp, category: 'behavioral' },
    
    // Engagement Features
    { name: 'Avg Likes/Post', value: '47.3', score: 70, description: 'Normal engagement level', icon: Heart, category: 'engagement' },
    { name: 'Comments Ratio', value: '0.12', score: 65, description: 'Reasonable comment engagement', icon: MessageSquare, category: 'engagement' },
    { name: 'Share Activity', value: '2.1/week', score: 80, description: 'Normal sharing behavior', icon: Share2, category: 'engagement' },
    { name: 'Hashtag Usage', value: '3.4/post', score: 85, description: 'Appropriate hashtag usage', icon: Hash, category: 'engagement' }
  ];

  const handleExtraction = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtracted(true);
    }, 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'structural': return 'border-primary text-primary';
      case 'behavioral': return 'border-success text-success';
      case 'engagement': return 'border-warning text-warning';
      default: return 'border-muted text-muted-foreground';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'structural': return 'bg-gradient-primary';
      case 'behavioral': return 'bg-gradient-success';
      case 'engagement': return 'bg-gradient-warning';
      default: return 'bg-gradient-secondary';
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <Card className="bg-gradient-secondary border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Module 1: Profile Feature Extraction
          </CardTitle>
          <p className="text-muted-foreground">
            Extract meaningful features from user profiles to identify patterns that indicate 
            genuine vs. suspicious behavior.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Sample Profile Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Demonstrating feature extraction on a typical social media profile
              </p>
            </div>
            <Button 
              onClick={handleExtraction}
              disabled={isExtracting}
              className="bg-primary hover:bg-primary/90 shadow-glow"
            >
              {isExtracting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Extracting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  {extracted ? 'Re-extract Features' : 'Extract Features'}
                </div>
              )}
            </Button>
          </div>

          {isExtracting && (
            <Card className="mb-6 bg-card/50 backdrop-blur-sm border-primary/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm">Analyzing profile structure...</span>
                  </div>
                  <Progress value={33} className="h-2" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-sm">Processing behavioral patterns...</span>
                  </div>
                  <Progress value={66} className="h-2" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    <span className="text-sm">Computing engagement metrics...</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {extracted && !isExtracting && (
            <div className="space-y-6">
              {/* Category Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">5</div>
                    <div className="text-sm text-muted-foreground">Structural Features</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-success/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-success mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Behavioral Features</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-warning mb-1">4</div>
                    <div className="text-sm text-muted-foreground">Engagement Features</div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card 
                      key={index} 
                      className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">{feature.name}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={getCategoryColor(feature.category)}
                          >
                            {feature.category}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">{feature.value}</span>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span className="text-sm text-success">{feature.score}%</span>
                            </div>
                          </div>
                          
                          <Progress value={feature.score} className="h-2" />
                          
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Data Preparation Summary */}
              <Card className="bg-gradient-secondary border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Data Preparation Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Extracted Features Summary</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 12 total features extracted successfully</li>
                        <li>• Data normalized and cleaned for ML processing</li>
                        <li>• Missing values handled with domain-specific logic</li>
                        <li>• Feature scaling applied for optimal model performance</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Next Steps</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Ready for machine learning pipeline</li>
                        <li>• Feature importance analysis available</li>
                        <li>• Cross-validation prepared</li>
                        <li>• Multiple model training ready</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureExtractor;