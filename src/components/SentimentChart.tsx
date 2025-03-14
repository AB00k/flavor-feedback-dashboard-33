
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentData } from "@/services/mockData";
import { useMemo } from "react";
import { ThumbsUp, MinusCircle, ThumbsDown } from "lucide-react";

interface SentimentChartProps {
  data: SentimentData;
}

export function SentimentChart({ data }: SentimentChartProps) {
  const chartData = useMemo(() => {
    return [
      { name: "Positive", value: data.positive, color: "#84CC16" },
      { name: "Neutral", value: data.neutral, color: "#FACC15" },
      { name: "Negative", value: data.negative, color: "#EA384C" }, // Changed from #F97316 to #EA384C (red)
    ];
  }, [data]);

  const total = data.positive + data.neutral + data.negative;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "Positive":
        return <ThumbsUp className="mr-1 h-4 w-4 text-green-500" />;
      case "Neutral":
        return <MinusCircle className="mr-1 h-4 w-4 text-yellow-500" />;
      case "Negative":
        return <ThumbsDown className="mr-1 h-4 w-4 text-red-500" />; // Changed from text-orange-500 to text-red-500
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[220px]">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value} reviews`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            {chartData.map((item) => {
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      {renderIcon(item.name)}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="text-sm font-mono">
                      {item.value} <span className="text-muted-foreground">({percentage}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="pt-2 border-t text-sm text-muted-foreground">
              Total: {total} reviews analyzed
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
