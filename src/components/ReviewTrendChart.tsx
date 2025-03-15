
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/services/mockData";

interface ReviewTrendChartProps {
  reviews: Review[];
}

export function ReviewTrendChart({ reviews }: ReviewTrendChartProps) {
  const chartData = useMemo(() => {
    // Create a map to store reviews by month
    const reviewsByMonth = new Map<string, { 
      month: string, 
      dineIn: number, 
      service: number, 
      food: number,
      atmosphere: number,
      average: number,
      count: number
    }>();
    
    // Get last 3 months instead of 6
    const today = new Date();
    for (let i = 2; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      reviewsByMonth.set(monthYear, { 
        month: monthYear, 
        dineIn: 4.2, 
        service: 4.0, 
        food: 4.5,
        atmosphere: 3.9,
        average: 4.1,
        count: 0
      });
    }
    
    // Convert map to array and add some simulated variation to make the chart more interesting
    return Array.from(reviewsByMonth.values()).map((data, index) => {
      // Add slight variations to make the chart more interesting
      const variation = Math.sin(index) * 0.3;
      
      return {
        month: data.month,
        "Dine-in": parseFloat((data.dineIn + variation * 0.2).toFixed(1)),
        "Service": parseFloat((data.service + variation * 0.3).toFixed(1)),
        "Food": parseFloat((data.food + variation * 0.1).toFixed(1)),
        "Atmosphere": parseFloat((data.atmosphere + variation * 0.4).toFixed(1)),
        "Average": parseFloat((data.average + variation * 0.2).toFixed(1))
      };
    });
  }, [reviews]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Dine-in Experience Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                domain={[3, 5]} 
                tick={{ fontSize: 11 }}
                tickCount={5}
              />
              <Tooltip 
                formatter={(value) => [`${value} stars`, '']}
                contentStyle={{ 
                  borderRadius: '8px',
                  padding: '8px 12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                iconType="circle" 
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Line 
                type="monotone" 
                dataKey="Average" 
                stroke="#9b87f5" 
                strokeWidth={3} 
                dot={{ r: 5, strokeWidth: 1 }} 
                activeDot={{ r: 7 }} 
              />
              <Line type="monotone" dataKey="Food" stroke="#F97316" strokeWidth={2} />
              <Line type="monotone" dataKey="Service" stroke="#FACC15" strokeWidth={2} />
              <Line type="monotone" dataKey="Dine-in" stroke="#84CC16" strokeWidth={2} />
              <Line type="monotone" dataKey="Atmosphere" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
