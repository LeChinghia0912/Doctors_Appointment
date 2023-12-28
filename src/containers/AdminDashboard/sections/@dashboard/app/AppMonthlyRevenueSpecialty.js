import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/charts';

import React, { useState, useEffect } from 'react';
import { getMonthlyRevenueSpecialty } from '../../../../../services/userService';
import { FormattedMessage } from 'react-intl';

export default function AppMonthlyRevenueSpecialty() {
    const [dataMonthRevenueSpecialty, setDataMonthRevenueSpecialty] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartOptionsState, setChartOptionsState] = useState(
        merge(BaseOptionChart(), {
            tooltip: {
                marker: { show: false },
                y: {
                    formatter: (seriesName) => fNumber(seriesName),
                    title: {
                        formatter: (seriesName) => `#${seriesName} $`,
                    },
                },
            },
            plotOptions: {
                bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
            },
            xaxis: {
                categories: [],
            },
        }),
    );

    useEffect(() => {
        const fetchMonthlyRevenueSpecialty = async () => {
            try {
                const res = await getMonthlyRevenueSpecialty();
                if (res && res.errCode === 0 && res.data) {
                    setDataMonthRevenueSpecialty(res.data);
                }
            } catch (error) {
                console.error('Error fetching monthly revenue specialty:', error);
            }
        };
        fetchMonthlyRevenueSpecialty();
    }, []);

    useEffect(() => {
        const CHART_DATA = [];
        const arr = [];
        const arrCategories = [];

        dataMonthRevenueSpecialty.forEach((item) => {
            arr.push(parseInt(item.totalRevenueMonth));
            arrCategories.push(item.name);
        });

        if (arr.length !== 0) {
            CHART_DATA.push({ data: arr });
        }

        setChartData(CHART_DATA);

        if (arrCategories.length !== 0) {
            setChartOptionsState((prevOptions) => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: arrCategories,
                },
            }));
        }
    }, [dataMonthRevenueSpecialty]);

    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const d = new Date();
    const currentMonth = month[d.getMonth()];

    return (
        <Card>
            <CardHeader title={<FormattedMessage id={'admin-dashboard.dashboard.monthly-revenue-specialty'} />} subheader={currentMonth} />
            <Box sx={{ mx: 3 }} dir="ltr">
                <ReactApexChart type="bar" series={chartData} options={chartOptionsState} height={364} />
            </Box>
        </Card>
    );
}
