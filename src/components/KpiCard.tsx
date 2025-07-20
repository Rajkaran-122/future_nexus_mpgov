import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon?: React.ElementType;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, unit, trend = 'neutral', description, icon: Icon }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    if (start === value) return;
    const duration = 800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(start + (value - start) * progress);
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(animate);
      else ref.current = value;
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div className="bg-card rounded-xl shadow p-4 flex flex-col items-start min-w-[180px] transition-colors duration-300" role="status" aria-label={title} tabIndex={0}>
      <div className="text-xs text-muted-foreground mb-1 font-medium">{title}</div>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-6 w-6 text-primary" aria-hidden="true" />}
        <span className="text-2xl font-bold text-foreground transition-all duration-300" aria-live="polite">
          {displayValue.toLocaleString()}{unit && <span className="text-base font-normal ml-1">{unit}</span>}
        </span>
        {trend === 'up' && <ArrowUpRight className="h-5 w-5 text-green-500" aria-label="Upward trend" />}
        {trend === 'down' && <ArrowDownRight className="h-5 w-5 text-red-500" aria-label="Downward trend" />}
        {trend === 'neutral' && <Minus className="h-5 w-5 text-gray-400" aria-label="No change" />}
      </div>
      {description && <div className="text-xs text-muted-foreground mt-1">{description}</div>}
    </div>
  );
}; 