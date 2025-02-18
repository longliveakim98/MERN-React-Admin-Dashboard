import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "../state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
  const [isSort, setIsSort] = useState(false);

  if (!data || isLoading) return "Loading";

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );
  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={isSort}
        innerRadius={0.45}
        // padAngle={0.7}
        // cornerRadius={3}
        enableArcLinkLabels={!isDashboard}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        // arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.text.black}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        theme={{
          axis: {
            domain: { line: { stroke: theme.palette.secondary[200] } },
            legend: { text: { fill: theme.palette.secondary[200] } },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: { fill: theme.palette.secondary[200] },
          },
          tooltip: { container: { color: theme.palette.primary[600] } },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.text.black,
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%,-170%)"
            : "translate(-50%,-100%)",
        }}
      >
        <Button
          onClick={() => setIsSort(!isSort)}
          sx={{ color: theme.palette.text.black }}
        >
          <Typography variant="h6">
            {!isDashboard && "Total:"} ${data.yearlySalesTotal}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
