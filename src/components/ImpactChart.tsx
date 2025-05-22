
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from "@/contexts/ThemeContext";

const ImpactChart = () => {
  const { theme } = useTheme();

  // Mock data for impact charts
  const impactData = [
    {
      month: 'Jan',
      carbon: 2.4,
      waste: 1.5,
      trees: 3,
    },
    {
      month: 'Feb',
      carbon: 3.2,
      waste: 2.4,
      trees: 5,
    },
    {
      month: 'Mar',
      carbon: 5.6,
      waste: 4.2,
      trees: 8,
    },
    {
      month: 'Apr',
      carbon: 7.2,
      waste: 5.9,
      trees: 12,
    },
    {
      month: 'May',
      carbon: 9.5,
      waste: 7.3,
      trees: 15,
    },
  ];

  const colorConfig = {
    carbon: {
      label: 'Carbon Offset (kg)',
      theme: {
        light: '#16a34a',
        dark: '#4ade80'
      }
    },
    waste: {
      label: 'Waste Recycled (kg)',
      theme: {
        light: '#166534',
        dark: '#86efac'
      }
    },
    trees: {
      label: 'Trees Planted',
      theme: {
        light: '#14532d',
        dark: '#bbf7d0'
      }
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Environmental Impact</CardTitle>
        <CardDescription>Visualize your eco-friendly contributions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer 
            config={colorConfig}
            className="w-full h-full"
          >
            <BarChart
              data={impactData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#374151" : "#e5e7eb"} />
              <XAxis dataKey="month" tick={{ fill: theme === 'dark' ? "#f9fafb" : "#111827" }} />
              <YAxis tick={{ fill: theme === 'dark' ? "#f9fafb" : "#111827" }} />
              <ChartTooltip 
                content={({ active, payload, label }) => (
                  <ChartTooltipContent 
                    active={active} 
                    payload={payload} 
                    label={label} 
                    className="shadow-lg border border-border"
                  />
                )}
              />
              <Legend />
              <Bar dataKey="carbon" name="Carbon Offset (kg)" fill="var(--color-carbon)" />
              <Bar dataKey="waste" name="Waste Recycled (kg)" fill="var(--color-waste)" />
              <Bar dataKey="trees" name="Trees Planted" fill="var(--color-trees)" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactChart;
