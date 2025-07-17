
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Bot, Leaf, Zap, Globe, ChevronRight, ArrowUpRight, Building, Users, Battery, Heart, LogOut, User, Sun, Moon } from 'lucide-react';
import { OpportunityMatrix } from '@/components/OpportunityMatrix';
import { MarketCharts } from '@/components/MarketCharts';
import { GeographicMap } from '@/components/GeographicMap';
import { MegatrendCard } from '@/components/MegatrendCard';

const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored) {
      if (stored === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
};
getInitialTheme();

const Index = () => {
  const [selectedView, setSelectedView] = useState('overview');
  // Removed: const { user, userRole, signOut } = useAuth();

  const megatrends = [
    {
      title: "Artificial Intelligence",
      subtitle: "From Application to Ubiquity",
      description: "AI is transitioning from niche applications to a foundational utility, creating unprecedented non-discretionary demand.",
      icon: Bot,
      color: "bg-blue-500",
      opportunities: ["AI-Powered CaaS", "AI Upskilling Platforms"],
      marketSize: "$115.5B by 2035",
      cagr: "20.6%"
    },
    {
      title: "Decarbonization",
      subtitle: "The Green Mandate",
      description: "Global sustainability mandates are creating massive B2B markets, particularly in ESG compliance and e-mobility.",
      icon: Leaf,
      color: "bg-green-500",
      opportunities: ["SME ESG Platforms", "E-Mobility BaaS"],
      marketSize: "$2.3B by 2030",
      cagr: "49.1%"
    },
    {
      title: "Digitization",
      subtitle: "India's Digital Transformation",
      description: "India's trajectory to $10T GDP is powered by digital infrastructure and workforce transformation.",
      icon: Zap,
      color: "bg-purple-500",
      opportunities: ["Healthcare Continuum", "Green Skills Training"],
      marketSize: "$27.4B by 2030",
      cagr: "18.1%"
    }
  ];

  const tier1Opportunities = [
    {
      title: "AI-Powered Compliance-as-a-Service (CaaS)",
      description: "The premier opportunity addressing urgent, global, high-stakes regulatory compliance with AI-powered automation.",
      market: "$115.5B by 2035",
      cagr: "20.6%",
      tier: "Tier 1A",
      priority: "Highest",
      icon: Bot,
      highlights: ["Non-discretionary demand", "High-margin SaaS model", "Global regulatory tailwinds"]
    },
    {
      title: "SME ESG & Carbon Accounting Platforms",
      description: "Green-field opportunity in massive, untapped market with exceptional regulatory tailwinds from SEBI mandates.",
      market: "$1.7B by 2030",
      cagr: "7.6%",
      tier: "Tier 1B",
      priority: "Highest",
      icon: Leaf,
      highlights: ["SEBI mandate compliance", "Value chain requirements", "Access to cheaper capital"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Strategic Intelligence Dashboard</h1>
              <p className="text-sm text-muted-foreground">Navigating AI, Decarbonization & Digitization • 2025-2030</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Globe className="h-3 w-3 mr-1" />
                  India Growth Engine
                </Badge>
                {/* Removed user role badge */}
              </div>
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full bg-muted hover:bg-accent transition-colors border border-border"
                aria-label="Toggle theme"
              >
                {typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-500" />
                )}
              </button>
              {/* Removed user welcome and sign out button */}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-card/50">
        <div className="container mx-auto px-6">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'matrix', label: 'Opportunity Matrix', icon: Building },
              { id: 'markets', label: 'Market Data', icon: ArrowUpRight },
              { id: 'geographic', label: 'Geographic Focus', icon: Globe }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedView === id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Executive Summary */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Executive Summary
                </CardTitle>
                <CardDescription>
                  Three interlocking megatrends are reshaping the global economy, creating unprecedented revenue opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">$10T</div>
                    <div className="text-sm text-muted-foreground">India's projected GDP by 2035</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2.3%</div>
                    <div className="text-sm text-muted-foreground">Global growth rate (2025)</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">49.1%</div>
                    <div className="text-sm text-muted-foreground">Highest opportunity CAGR</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  While global growth slows to 2.3% in 2025, specific sectors are poised for exponential expansion. 
                  India emerges as a critical nexus, representing a primary engine for global growth with the highest-value 
                  opportunities at the intersection of AI, decarbonization, and digitization trends.
                </p>
              </CardContent>
            </Card>

            {/* Megatrends */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Core Megatrends</h2>
              <div className="grid lg:grid-cols-3 gap-6">
                {megatrends.map((trend, index) => (
                  <MegatrendCard key={index} {...trend} />
                ))}
              </div>
            </div>

            {/* Tier 1 Opportunities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tier 1: Foundational Plays (Highest Priority)</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {tier1Opportunities.map((opportunity, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <opportunity.icon className="h-5 w-5 text-green-600" />
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {opportunity.tier}
                          </Badge>
                        </div>
                        <Badge variant="destructive">{opportunity.priority}</Badge>
                      </div>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <CardDescription>{opportunity.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Market Size:</span>
                          <span className="font-semibold">{opportunity.market}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">CAGR:</span>
                          <span className="font-semibold text-green-600">{opportunity.cagr}</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground block mb-2">Key Highlights:</span>
                          <div className="space-y-1">
                            {opportunity.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <ChevronRight className="h-3 w-3 text-primary" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'matrix' && <OpportunityMatrix />}
        {selectedView === 'markets' && <MarketCharts />}
        {selectedView === 'geographic' && <GeographicMap />}
      </div>
    </div>
  );
};

export default Index;
