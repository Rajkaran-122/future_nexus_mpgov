
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Zap, Users, TrendingUp } from 'lucide-react';

const cityData = [
  {
    name: "Surat",
    state: "Gujarat",
    position: { x: 25, y: 62 },
    tier: "Tier 2",
    population: "6.5M",
    growthRate: "8.2%",
    keyFactors: ["Diamond & textile hub", "High commercial vehicle density", "Government EV incentives"],
    opportunity: "Battery swapping for commercial logistics",
    marketPotential: "High"
  },
  {
    name: "Jaipur", 
    state: "Rajasthan",
    position: { x: 30, y: 42 },
    tier: "Tier 2",
    population: "3.9M",
    growthRate: "7.8%",
    keyFactors: ["Tourism & services", "Growing e-commerce delivery", "State EV policy support"],
    opportunity: "E-rickshaw and delivery bike networks",
    marketPotential: "Very High"
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh", 
    position: { x: 55, y: 45 },
    tier: "Tier 2",
    population: "3.5M",
    growthRate: "6.9%",
    keyFactors: ["Administrative center", "Rising urbanization", "High two-wheeler adoption"],
    opportunity: "Urban mobility and last-mile delivery",
    marketPotential: "High"
  },
  {
    name: "Delhi NCR",
    state: "National Capital Region",
    position: { x: 40, y: 30 },
    tier: "Tier 1",
    population: "32M",
    growthRate: "4.2%",
    keyFactors: ["Massive delivery ecosystem", "Air pollution mandates", "Early EV adopter market"],
    opportunity: "Comprehensive BaaS network",
    marketPotential: "Massive"
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    position: { x: 22, y: 52 },
    tier: "Tier 1", 
    population: "21M",
    growthRate: "3.8%",
    keyFactors: ["Financial hub", "High density logistics", "Progressive EV policies"],
    opportunity: "Commercial fleet transformation",
    marketPotential: "Massive"
  }
];

const emobilityStats = {
  totalMarket: "$22.4B by 2030",
  cagr: "50.9%",
  vehiclesSold2024: "1.2M units",
  projectedVehicles2030: "8.5M units",
  chargingInfrastructure: "12,000 stations needed by 2030"
};

export const GeographicMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<typeof cityData[0] | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'stats'>('map');

  const getMarketColor = (potential: string) => {
    switch (potential) {
      case 'Massive': return 'bg-purple-500';
      case 'Very High': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getTierColor = (tier: string) => {
    return tier === 'Tier 1' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            E-Mobility Geographic Focus: India
          </CardTitle>
          <CardDescription>
            Strategic analysis of Tier-2 and Tier-3 cities for Battery-as-a-Service deployment.
            Click on cities to explore market opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              variant={activeView === 'map' ? "default" : "outline"}
              onClick={() => setActiveView('map')}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              City Analysis
            </Button>
            <Button
              variant={activeView === 'stats' ? "default" : "outline"}
              onClick={() => setActiveView('stats')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Market Overview
            </Button>
          </div>

          {activeView === 'map' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Map Visualization */}
              <div className="lg:col-span-2">
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 h-96 overflow-hidden">
                  {/* Simplified India Map Outline */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <path
                      d="M30,15 L70,15 L75,25 L85,35 L85,65 L80,75 L70,85 L30,85 L20,75 L15,65 L15,35 L25,25 Z"
                      fill="rgba(99, 102, 241, 0.1)"
                      stroke="rgba(99, 102, 241, 0.3)"
                      strokeWidth="0.5"
                    />
                  </svg>
                  
                  {/* City Markers */}
                  {cityData.map((city, index) => (
                    <button
                      key={index}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getMarketColor(city.marketPotential)} rounded-full p-2 hover:scale-110 transition-transform shadow-lg`}
                      style={{ left: `${city.position.x}%`, top: `${city.position.y}%` }}
                      onClick={() => setSelectedCity(city)}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </button>
                  ))}
                  
                  {/* City Labels */}
                  {cityData.map((city, index) => (
                    <div
                      key={`label-${index}`}
                      className="absolute transform -translate-x-1/2 text-xs font-medium text-gray-700 mt-8"
                      style={{ left: `${city.position.x}%`, top: `${city.position.y}%` }}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Massive Potential</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Very High Potential</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>High Potential</span>
                  </div>
                </div>
              </div>

              {/* City Details Panel */}
              <div className="space-y-4">
                {selectedCity ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {selectedCity.name}
                        <Badge className={getTierColor(selectedCity.tier)}>
                          {selectedCity.tier}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{selectedCity.state}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Population</div>
                          <div className="font-semibold flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {selectedCity.population}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Growth Rate</div>
                          <div className="font-semibold flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            {selectedCity.growthRate}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Key Factors</div>
                        <div className="space-y-1">
                          {selectedCity.keyFactors.map((factor, index) => (
                            <div key={index} className="text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {factor}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Primary Opportunity</div>
                        <div className="text-sm font-medium">{selectedCity.opportunity}</div>
                      </div>

                      <Badge className={`w-full justify-center ${getMarketColor(selectedCity.marketPotential)} text-white`}>
                        {selectedCity.marketPotential} Market Potential
                      </Badge>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-40 text-muted-foreground">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Click on a city marker to view detailed analysis</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      E-Mobility Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Market (2030)</span>
                      <span className="font-semibold">{emobilityStats.totalMarket}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Growth Rate</span>
                      <span className="font-semibold text-green-600">{emobilityStats.cagr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">2024 Sales</span>
                      <span className="font-semibold">{emobilityStats.vehiclesSold2024}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeView === 'stats' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">{emobilityStats.totalMarket}</div>
                  <div className="text-sm text-muted-foreground">Total Market Size by 2030</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">{emobilityStats.cagr}</div>
                  <div className="text-sm text-muted-foreground">Compound Annual Growth Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">{emobilityStats.projectedVehicles2030}</div>
                  <div className="text-sm text-muted-foreground">Projected EV Sales (2030)</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">{emobilityStats.chargingInfrastructure}</div>
                  <div className="text-sm text-muted-foreground">Charging Stations Needed</div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
