
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bot, Users, Leaf, Battery, Heart, GraduationCap, ArrowUpDown, Filter } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    name: "AI-Powered CaaS",
    driver: "Regulation",
    model: "B2B SaaS",
    cagr: "20.6%",
    revenue: "High",
    capex: "Low",
    moat: "Very High",
    icon: Bot,
    tier: "1A",
    description: "AI-powered Compliance-as-a-Service addressing urgent regulatory complexity. The global RegTech market is projected to expand from $14.69B in 2024 to $115.5B by 2035.",
    details: {
      marketSize: "$115.5B by 2035",
      region: "Global",
      keyDrivers: ["AI ethics regulations", "Data privacy mandates", "AML/KYC requirements"],
      useCases: ["Automated regulatory monitoring", "AI-driven fraud detection", "Intelligent contract analysis"],
      moatFactors: ["Regulatory expertise", "AI capability", "Network effects"]
    }
  },
  {
    id: 2,
    name: "AI Upskilling",
    driver: "Talent Gap",
    model: "B2B / B2B2C",
    cagr: "13.4%",
    revenue: "High",
    capex: "Low",
    moat: "Medium",
    icon: Users,
    tier: "2A",
    description: "Corporate training platforms addressing severe AI skills shortage. India alone needs 1M AI professionals by 2026 with only 3K experienced senior talent available.",
    details: {
      marketSize: "$10.8B in India (2024)",
      region: "India",
      keyDrivers: ["AI skills shortage", "Corporate transformation", "Upskilling mandates"],
      useCases: ["Hands-on AI training", "Project-based learning", "Certification programs"],
      moatFactors: ["Content quality", "Industry partnerships", "Learning outcomes"]
    }
  },
  {
    id: 3,
    name: "SME ESG Platforms",
    driver: "Regulation",
    model: "B2B SaaS",
    cagr: "7.6%",
    revenue: "Very High",
    capex: "Low",
    moat: "High",
    icon: Leaf,
    tier: "1B",
    description: "ESG compliance platforms for SMEs driven by SEBI mandates. Top 1,000 listed companies must report entire value chain ESG performance, affecting hundreds of thousands of SMEs.",
    details: {
      marketSize: "$1.7B by 2030",
      region: "India",
      keyDrivers: ["SEBI BRSR mandates", "Supply chain requirements", "ESG lending"],
      useCases: ["Carbon footprint tracking", "Sustainability reporting", "ESG data automation"],
      moatFactors: ["Regulatory compliance", "SME focus", "Data network effects"]
    }
  },
  {
    id: 4,
    name: "E-Mobility BaaS",
    driver: "Cost / Convenience",
    model: "B2B / B2C Infra",
    cagr: "49.1%",
    revenue: "Very High",
    capex: "Very High",
    moat: "High",
    icon: Battery,
    tier: "3A",
    description: "Battery-as-a-Service for electric two/three-wheelers. Market projected to grow from $210.3M in 2024 to $2.3B by 2030, driven by urban logistics and range anxiety solutions.",
    details: {
      marketSize: "$2.3B by 2030",
      region: "India",
      keyDrivers: ["High upfront costs", "Range anxiety", "Urban logistics demand"],
      useCases: ["Battery swapping stations", "Commercial fleet services", "Urban delivery networks"],
      moatFactors: ["Network density", "Battery technology", "Logistics excellence"]
    }
  },
  {
    id: 5,
    name: "Integrated Healthcare",
    driver: "Demographics",
    model: "B2B2C Platform",
    cagr: "18.1%",
    revenue: "Massive",
    capex: "Med-High",
    moat: "Medium",
    icon: Heart,
    tier: "3B",
    description: "Integrated healthcare continuum from prevention to home care. India's 60+ population projected to reach 347M by 2050, driving shift to patient-centric, home-based care model.",
    details: {
      marketSize: "$27.4B by 2030",
      region: "India",
      keyDrivers: ["Aging population", "Nuclear families", "Health consciousness"],
      useCases: ["Preventive care", "Home healthcare", "Geriatric services", "Telehealth"],
      moatFactors: ["Integrated platform", "Care network", "Family relationships"]
    }
  },
  {
    id: 6,
    name: "Green Skills Upskilling",
    driver: "Talent Gap",
    model: "B2B / B2C",
    cagr: "20-30%",
    revenue: "High",
    capex: "Low",
    moat: "Medium",
    icon: GraduationCap,
    tier: "2B",
    description: "Specialized training for green-collar workforce. India's Net Zero 2070 target driving 7.29M new green jobs by FY28, creating immediate deficit of 1.2M skilled workers in renewables.",
    details: {
      marketSize: "35M jobs by 2047",
      region: "India",
      keyDrivers: ["Net Zero targets", "Green investment", "Skills shortage"],
      useCases: ["Solar PV training", "Wind energy skills", "ESG analyst certification"],
      moatFactors: ["Specialized content", "Industry certification", "Job placement"]
    }
  }
];

export const OpportunityMatrix: React.FC = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<typeof opportunities[0] | null>(null);
  const [sortField, setSortField] = useState<string>('tier');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    let aValue = a[sortField as keyof typeof a];
    let bValue = b[sortField as keyof typeof b];
    
    if (sortField === 'cagr') {
      aValue = parseFloat(a.cagr.replace('%', ''));
      bValue = parseFloat(b.cagr.replace('%', ''));
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getRevenueColor = (revenue: string) => {
    switch (revenue) {
      case 'Massive': return 'bg-purple-100 text-purple-800';
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapexColor = (capex: string) => {
    switch (capex) {
      case 'Very High': return 'bg-red-100 text-red-800';
      case 'Med-High': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMoatColor = (moat: string) => {
    switch (moat) {
      case 'Very High': return 'bg-purple-100 text-purple-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Opportunity Prioritization Matrix
          </CardTitle>
          <CardDescription>
            Interactive analysis of strategic opportunities ranked by revenue potential, scalability, and strategic moat.
            Click on any opportunity for detailed analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" onClick={() => handleSort('name')} className="h-auto p-0 font-semibold">
                      Opportunity <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('driver')} className="h-auto p-0 font-semibold">
                      Primary Driver <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('cagr')} className="h-auto p-0 font-semibold">
                      CAGR <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Revenue Potential</TableHead>
                  <TableHead>Capex</TableHead>
                  <TableHead>Strategic Moat</TableHead>
                  <TableHead>Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOpportunities.map((opportunity) => (
                  <TableRow 
                    key={opportunity.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedOpportunity(opportunity)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <opportunity.icon className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{opportunity.name}</div>
                          <div className="text-sm text-muted-foreground">{opportunity.model}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{opportunity.driver}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">{opportunity.cagr}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRevenueColor(opportunity.revenue)}>
                        {opportunity.revenue}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCapexColor(opportunity.capex)}>
                        {opportunity.capex}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getMoatColor(opportunity.moat)}>
                        {opportunity.moat}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Tier {opportunity.tier}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Opportunity Detail Dialog */}
      <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedOpportunity && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <selectedOpportunity.icon className="h-5 w-5 text-primary" />
                  {selectedOpportunity.name}
                  <Badge variant="secondary">Tier {selectedOpportunity.tier}</Badge>
                </DialogTitle>
                <DialogDescription>
                  {selectedOpportunity.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Market Size</h4>
                    <p className="text-2xl font-bold text-primary">{selectedOpportunity.details.marketSize}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Growth Rate</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedOpportunity.cagr} CAGR</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Drivers</h4>
                    <ul className="space-y-1">
                      {selectedOpportunity.details.keyDrivers.map((driver, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Use Cases</h4>
                    <ul className="space-y-1">
                      {selectedOpportunity.details.useCases.map((useCase, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Strategic Moat Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOpportunity.details.moatFactors.map((factor, index) => (
                      <Badge key={index} variant="outline">{factor}</Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Investment Metrics</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Revenue Potential:</span>
                      <div className="font-medium">{selectedOpportunity.revenue}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capital Requirements:</span>
                      <div className="font-medium">{selectedOpportunity.capex}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Strategic Moat:</span>
                      <div className="font-medium">{selectedOpportunity.moat}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
