import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface IChartProps {
  chartData: any;
  analysis: string;
  dates: string[];
  imageURI?: string;
}

const GenericChart = ({
  chartData,
  analysis,
  dates,
  imageURI,
}: IChartProps) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  const options: any = {
    chart: {
      height: 350,
      type: 'line',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        type: 'x',
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      shadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
    },
    xaxis: {
      categories: dates,
      title: {
        text: 'Dias',
      },
    },
    grid: {
      show: false,
    },
    colors: [secondary],

    stroke: {
      curve: 'smooth',
      width: '6',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: undefined,
      formatter: function (val: any, opts: any) {
        return val;
      },
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: -5,
      style: {
        fontSize: '14px',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontWeight: 'bold',
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45,
      },
    },
    noData: {
      text: 'Não há dados ainda!',
      align: 'center',
      verticalAlign: 'top',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#333',
        fontSize: '16px',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      },
    },
  };

  const series: any = [
    {
      name: analysis,
      data: chartData,
    },
  ];

  return (
    <Box mx={10}>
      <Chart
        options={options}
        id="chart"
        series={chartData ? series : []}
        type="line"
        height={290}
        width="100%"
      />
    </Box>
  );
};

export default GenericChart;
