import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { fNumber } from '../../../utils/formatNumber';
import { BaseOptionChart } from '../../../components/charts';
import React, { useState, useEffect } from 'react';
import { getTopFourVipPatient } from '../../../../../services/userService';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg, .apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

export default function AppTopFourVipPatient() {
    const theme = useTheme();

    const [fourVipPatient, setFourVipPatient] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartOptionsState, setChartOptionsState] = useState({});

    useEffect(() => {
        const fetchTopFourVipPatient = async () => {
            try {
                const res = await getTopFourVipPatient();
                if (res && res.errCode === 0 && res.data && res.data.invoices) {
                    setFourVipPatient(res.data.invoices);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchTopFourVipPatient();
    }, []);

    useEffect(() => {
        const CHART_DATA = [];
        const LABELS_DATA = [];

        if (fourVipPatient.length !== 0) {
            fourVipPatient.forEach((item) => {
                const name = `${item.patientDataInvoice.lastName} ${item.patientDataInvoice.firstName}`;
                CHART_DATA.push(parseInt(item.total_revenue));
                LABELS_DATA.push(name);
            });

            setChartData(CHART_DATA);
            setChartOptionsState((prevOptions) => ({
                ...prevOptions,
                labels: LABELS_DATA,
            }));
        }
    }, [fourVipPatient]);

    const chartOptions = merge(BaseOptionChart(), {
        colors: [theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main],
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `#${seriesName} $`,
                },
            },
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } },
        },
    });

    return (
        <Card>
            <CardHeader />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="pie" series={chartData} options={chartOptions} height={280} />
            </ChartWrapperStyle>
        </Card>
    );
}
