
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, LineChart as LineChartIcon } from 'lucide-react';

const regTechData = [
  { year: '2024', global: 14.69, india: 0.45, asiaPacific: 4.1 },
  { year: '2025', global: 17.72, india: 0.61, asiaPacific: 5.01 },
  { year: '2026', global: 21.37, india: 0.83, asiaPacific: 6.12 },
  { year: '2027', global: 25.77, india: 1.13, asiaPacific: 7.48 },
  { year: '2028', global: 31.07, india: 1.54, asiaPacific: 9.14 },
  { year: '2029', global: 37.47, india: 2.09, asiaPacific: 11.16 },
  { year: '2030', global: 45.18, india: 2.84, asiaPacific: 13.63 },
  { year: '2031', global: 54.49, india: 3.87, asiaPacific: 16.65 },
  { year: '2032', global: 65.71, india: 5.26, asiaPacific: 20.33 },
  { year: '2033', global: 79.22, india: 7.15, asiaPacific: 24.84 },
  { year: '2034', global: 95.54, india: 9.73, asiaPacific: 30.35 },
  { year: '2035', global: 115.2, india: 13.23, asiaPacific: 37.11 }
];

const baasData = [
  { year: '2024', overall: 210.3, twoWheeler: 145.1 },
  { year: '2025', overall: 313.4, twoWheeler: 217.7 },
  { year: '2026', overall: 466.8, twoWheeler: 326.5 },
  { year: '2027', overall: 695.4, twoWheeler: 489.7 },
  { year: '2028', overall: 1036.0, twoWheeler: 734.8 },
  { year: '2029', overall: 1543.8, twoWheeler: 1102.3 },
  { year: '2030', overall: 2300.0, twoWheeler: 1654.0 }
];

const healthcareData = [
  { year: '2024', preventive: 160, homeHealthcare: 8.2, geriatric: 42.2, telehealth: 2.1 },
  { year: '2025', preventive: 197, homeHealthcare: 9.7, geriatric: 46.8, telehealth: 3.87 },
  { year: '2026', preventive: 225, homeHealthcare: 11.4, geriatric: 52.0, telehealth: 4.6 },
  { year: '2027', preventive: 251, homeHealthcare: 13.5, geriatric: 57.8, telehealth: 5.4 },
  { year: '2028', preventive: 280, homeHealthcare: 16.0, geriatric: 64.2, telehealth: 6.3 },
  { year: '2029', preventive: 312, homeHealthcare: 19.0, geriatric: 71.3, telehealth: 7.4 },
  { year: '2030', preventive: 347, homeHealthcare: 27.4, geriatric: 79.2, telehealth: 8.7 }
];

export const MarketCharts: React.FC = () => {
  const [activeChart, setActiveChart] = useState('regtech');
  const [chartType, setChartType] = useState<'bar' | 'line'>('line');

  const formatTooltip = (value: number, name: string) => {
    return [`$${value}B`, name];
  };

  const renderChart = (data: unknown[], dataKeys: { key: string; name: string; color: string }[]) => {
    const ChartComponent = chartType === 'bar' ? BarChart : LineChart;
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="year" className="text-muted-foreground" />
          <YAxis className="text-muted-foreground" />
          <Tooltip 
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend />
          {dataKeys.map(({ key, name, color }) => 
            chartType === 'bar' ? (
              <Bar key={key} dataKey={key} name={name} fill={color} />
            ) : (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                name={name} 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
              />
            )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  const charts = {
    regtech: {
      title: "AI-Powered RegTech Market Growth",
      description: "Global regulatory technology market expansion driven by AI compliance needs",
      data: regTechData,
      keys: [
        { key: 'global', name: 'Global Market', color: '#3b82f6' },
        { key: 'india', name: 'India Market', color: '#10b981' },
        { key: 'asiaPacific', name: 'Asia Pacific', color: '#8b5cf6' }
      ],
      insights: [
        "Global market growing at 20.6% CAGR",
        "India market leading with 36% CAGR", 
        "Asia Pacific represents 32% of global market by 2035"
      ]
    },
    baas: {
      title: "Battery-as-a-Service Market (India)",
      description: "Explosive growth in battery swapping and leasing for electric vehicles",
      data: baasData,
      keys: [
        { key: 'overall', name: 'Overall BaaS Market', color: '#f59e0b' },
        { key: 'twoWheeler', name: 'Two-Wheeler Segment', color: '#ef4444' }
      ],
      insights: [
        "Overall BaaS growing at 49.1% CAGR",
        "Two-wheeler segment dominates with 72% market share",
        "Market size increases 11x from 2024 to 2030"
      ]
    },
    healthcare: {
      title: "Integrated Healthcare Markets (India)",
      description: "Convergence of preventive, home, geriatric, and telehealth services",
      data: healthcareData,
      keys: [
        { key: 'preventive', name: 'Preventive Healthcare', color: '#06b6d4' },
        { key: 'homeHealthcare', name: 'Home Healthcare', color: '#84cc16' },
        { key: 'geriatric', name: 'Geriatric Care', color: '#f97316' },
        { key: 'telehealth', name: 'Telehealth', color: '#ec4899' }
      ],
      insights: [
        "Home healthcare fastest growing at 18.1% CAGR",
        "Preventive care represents largest absolute market",
        "Integrated platform opportunity across all segments"
      ]
    }
  };

  const currentChart = charts[activeChart as keyof typeof charts];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Data Visualization
          </CardTitle>
          <CardDescription>
            Interactive charts showing projected market growth across key opportunity areas.
            Hover over data points for exact values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(charts).map(([key, chart]) => (
              <Button
                key={key}
                variant={activeChart === key ? "default" : "outline"}
                onClick={() => setActiveChart(key)}
                className="text-sm"
              >
                {chart.title.split(' ')[0]} {chart.title.split(' ')[1]}
              </Button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{currentChart.title}</h3>
              <p className="text-sm text-muted-foreground">{currentChart.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={chartType === 'line' ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType('line')}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === 'bar' ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType('bar')}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {renderChart(currentChart.data, currentChart.keys)}

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Key Insights</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {currentChart.insights.map((insight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-sm">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
