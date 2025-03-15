
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/services/mockData";

interface ReviewTrendChartProps {
  reviews: Review[];
}

export function ReviewTrendChart({ reviews }: ReviewTrendChartProps) {
  const chartData = useMemo(() => {
    // Create data for the bar chart showing different aspects of dining experience
    return [
      {
        name: "Food Quality",
        rating: 4.5,
        color: "#F97316" // Bright Orange
      },
      {
        name: "Service",
        rating: 4.2,
        color: "#0EA5E9" // Ocean Blue
      },
      {
        name: "Atmosphere",
        rating: 4.0,
        color: "#8B5CF6" // Vivid Purple
      },
      {
        name: "Cleanliness",
        rating: 4.3,
        color: "#D946EF" // Magenta Pink
      },
      {
        name: "Value",
        rating: 3.9,
        color: "#9b87f5" // Primary Purple
      }
    ];
  }, [reviews]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg font-medium">Dine-in Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              barSize={32}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
                height={45}
                angle={-5}
              />
              <YAxis 
                domain={[0, 5]} 
                tick={{ fontSize: 11 }}
                tickCount={6}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip 
                formatter={(value) => [`${value} stars`, '']}
                contentStyle={{ 
                  borderRadius: '8px',
                  padding: '8px 12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Legend 
                verticalAlign="top"
                height={0}
                wrapperStyle={{ visibility: 'hidden' }}
              />
              {chartData.map((entry, index) => (
                <Bar 
                  key={`bar-${index}`}
                  dataKey="rating" 
                  name={entry.name}
                  fill={entry.color}
                  radius={[4, 4, 0, 0]}
                  stackId="stack"
                  background={{ fill: '#f5f5f5', radius: [4, 4, 0, 0] }}
                  label={{
                    position: 'top',
                    formatter: (value: number) => `${value}`,
                    fontSize: 11,
                    fill: '#666'
                  }}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
