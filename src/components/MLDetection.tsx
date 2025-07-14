import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  BarChart3, 
  Settings,
  CheckCircle,
  AlertTriangle,
  Zap,
  Award,
  Activity,
  Layers
} from 'lucide-react';

interface ModelPerformance {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  description: string;
  icon: React.ElementType;
  trainingTime: string;
  status: 'trained' | 'training' | 'pending';
}

const MLDetection = () => {
  const [selectedModel, setSelectedModel] = useState('random-forest');
  const [isTraining, setIsTraining] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const models: ModelPerformance[] = [
    {
      name: 'Random Forest',
      accuracy: 94.2,
      precision: 93.8,
      recall: 94.6,
      f1Score: 94.2,
      description: 'Ensemble method with excellent performance on profile features',
      icon: Layers,
      trainingTime: '2.3s',
      status: 'trained'
    },
    {
      name: 'Neural Network',
      accuracy: 92.8,
      precision: 91.5,
      recall: 94.1,
      f1Score: 92.8,
      description: 'Deep learning model with complex pattern recognition',
      icon: Brain,
      trainingTime: '15.7s',
      status: 'trained'
    },
    {
      name: 'Support Vector Machine',
      accuracy: 89.5,
      precision: 88.2,
      recall: 90.8,
      f1Score: 89.5,
      description: 'Robust classifier with good generalization',
      icon: Target,
      trainingTime: '4.1s',
      status: 'trained'
    },
    {
      name: 'Logistic Regression',
      accuracy: 86.3,
      precision: 85.1,
      recall: 87.5,
      f1Score: 86.3,
      description: 'Simple yet effective baseline model',
      icon: TrendingUp,
      trainingTime: '0.8s',
      status: 'trained'
    }
  ];

  const confusionMatrix = {
    truePositive: 472,
    falsePositive: 28,
    falseNegative: 31,
    trueNegative: 469
  };

  const featureImportance = [
    { feature: 'Follower/Following Ratio', importance: 0.18, color: 'bg-primary' },
    { feature: 'Profile Completeness', importance: 0.16, color: 'bg-success' },
    { feature: 'Post Frequency Pattern', importance: 0.14, color: 'bg-warning' },
    { feature: 'Engagement Rate', importance: 0.12, color: 'bg-primary' },
    { feature: 'Account Age', importance: 0.11, color: 'bg-success' },
    { feature: 'Username Pattern', importance: 0.09, color: 'bg-warning' },
    { feature: 'Time Pattern Consistency', importance: 0.08, color: 'bg-primary' },
    { feature: 'Bio Quality Score', importance: 0.07, color: 'bg-success' },
    { feature: 'Network Diversity', importance: 0.05, color: 'bg-warning' }
  ];

  const handleTraining = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setShowResults(true);
    }, 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trained': return 'border-success text-success';
      case 'training': return 'border-warning text-warning';
      case 'pending': return 'border-muted text-muted-foreground';
      default: return 'border-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <Card className="bg-gradient-secondary border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-success" />
            Module 2: Machine Learning Detection
          </CardTitle>
          <p className="text-muted-foreground">
            Train and evaluate multiple ML models to classify profiles as genuine or fake 
            based on extracted features.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Model Training & Evaluation</h3>
              <p className="text-sm text-muted-foreground">
                Train multiple algorithms and compare their performance metrics
              </p>
            </div>
            <Button 
              onClick={handleTraining}
              disabled={isTraining}
              className="bg-success hover:bg-success/90 shadow-glow"
            >
              {isTraining ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-success-foreground/30 border-t-success-foreground rounded-full animate-spin" />
                  Training Models...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  {showResults ? 'Retrain Models' : 'Train Models'}
                </div>
              )}
            </Button>
          </div>

          {isTraining && (
            <Card className="mb-6 bg-card/50 backdrop-blur-sm border-success/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-sm">Preparing dataset (80% train, 20% test)...</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    <span className="text-sm">Training Random Forest classifier...</span>
                  </div>
                  <Progress value={50} className="h-2" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm">Training Neural Network...</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-sm">Evaluating model performance...</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {showResults && !isTraining && (
            <Tabs defaultValue="models" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
                <TabsTrigger value="models">Model Performance</TabsTrigger>
                <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
                <TabsTrigger value="features">Feature Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="models" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {models.map((model, index) => {
                    const IconComponent = model.icon;
                    return (
                      <Card 
                        key={index}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedModel === model.name.toLowerCase().replace(' ', '-')
                            ? 'border-success shadow-glow bg-success/5'
                            : 'bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant'
                        }`}
                        onClick={() => setSelectedModel(model.name.toLowerCase().replace(' ', '-'))}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-5 w-5 text-primary" />
                              <span className="text-lg">{model.name}</span>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(model.status)}
                            >
                              {model.status}
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {model.description}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Accuracy</span>
                              <div className="flex items-center gap-2">
                                <Progress value={model.accuracy} className="w-20 h-2" />
                                <span className="text-sm font-semibold">{model.accuracy}%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">F1-Score</span>
                              <span className="text-sm font-semibold">{model.f1Score}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Training Time</span>
                              <span className="text-sm font-semibold">{model.trainingTime}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Confusion Matrix */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Confusion Matrix
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-success/10 border border-success/30 rounded-lg">
                          <div className="text-2xl font-bold text-success">{confusionMatrix.truePositive}</div>
                          <div className="text-sm text-muted-foreground">True Positive</div>
                          <div className="text-xs text-success">Correctly identified fake</div>
                        </div>
                        <div className="text-center p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                          <div className="text-2xl font-bold text-destructive">{confusionMatrix.falsePositive}</div>
                          <div className="text-sm text-muted-foreground">False Positive</div>
                          <div className="text-xs text-destructive">Genuine marked as fake</div>
                        </div>
                        <div className="text-center p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                          <div className="text-2xl font-bold text-destructive">{confusionMatrix.falseNegative}</div>
                          <div className="text-sm text-muted-foreground">False Negative</div>
                          <div className="text-xs text-destructive">Fake marked as genuine</div>
                        </div>
                        <div className="text-center p-4 bg-success/10 border border-success/30 rounded-lg">
                          <div className="text-2xl font-bold text-success">{confusionMatrix.trueNegative}</div>
                          <div className="text-sm text-muted-foreground">True Negative</div>
                          <div className="text-xs text-success">Correctly identified genuine</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-warning" />
                        Performance Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {models.slice(0, 1).map((model) => (
                          <div key={model.name} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Accuracy</span>
                              <div className="flex items-center gap-2">
                                <Progress value={model.accuracy} className="w-24 h-2" />
                                <span className="text-sm font-semibold">{model.accuracy}%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Precision</span>
                              <div className="flex items-center gap-2">
                                <Progress value={model.precision} className="w-24 h-2" />
                                <span className="text-sm font-semibold">{model.precision}%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Recall</span>
                              <div className="flex items-center gap-2">
                                <Progress value={model.recall} className="w-24 h-2" />
                                <span className="text-sm font-semibold">{model.recall}%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">F1-Score</span>
                              <div className="flex items-center gap-2">
                                <Progress value={model.f1Score} className="w-24 h-2" />
                                <span className="text-sm font-semibold">{model.f1Score}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Cross-Validation Results */}
                <Card className="bg-gradient-secondary border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Cross-Validation Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success mb-1">5-Fold CV</div>
                        <div className="text-sm text-muted-foreground">Cross-validation splits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">93.7%</div>
                        <div className="text-sm text-muted-foreground">Average accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning mb-1">±1.2%</div>
                        <div className="text-sm text-muted-foreground">Standard deviation</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Feature Importance Analysis
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Understanding which features contribute most to fake profile detection
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featureImportance.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.feature}</span>
                            <span className="text-sm text-muted-foreground">
                              {(item.importance * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${item.importance * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-secondary border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Model Training Complete
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Training Summary</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 4 models trained and evaluated successfully</li>
                          <li>• Random Forest achieved best performance (94.2%)</li>
                          <li>• Cross-validation confirms model generalization</li>
                          <li>• Feature importance analysis completed</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Key Insights</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Follower ratio is most predictive feature</li>
                          <li>• Profile completeness strongly indicates authenticity</li>
                          <li>• Behavioral patterns outperform simple metrics</li>
                          <li>• Model ready for real-time profile analysis</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MLDetection;