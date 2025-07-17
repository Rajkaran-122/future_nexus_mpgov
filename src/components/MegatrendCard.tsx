
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface MegatrendCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  opportunities: string[];
  marketSize: string;
  cagr: string;
}

export const MegatrendCard: React.FC<MegatrendCardProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  color,
  opportunities,
  marketSize,
  cagr
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="font-medium">{subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Opportunities:</h4>
          <div className="space-y-1">
            {opportunities.map((opportunity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {opportunity}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <div className="text-xs text-muted-foreground">Market Size</div>
            <div className="font-semibold text-sm">{marketSize}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">CAGR</div>
            <div className="font-semibold text-sm text-green-600">{cagr}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
