import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { BaseOptionChart } from '../../../components/charts';
import { getTopThreeDoctorOfTheYear } from '../../../../../services/userService';
import React, { useState, useEffect } from 'react';

export default function AppTopThreeDoctorsOfTheYear() {
    const currentYear = new Date().getFullYear();
    const [dataThreeDoctor, setDataThreeDoctor] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchTopThreeDoctorOfTheYear = async () => {
            try {
                const res = await getTopThreeDoctorOfTheYear();
                if (res && res.errCode === 0 && res.data && res.data.dataRevenueThreeDoctor) {
                    setDataThreeDoctor(res.data.dataRevenueThreeDoctor);
                }
            } catch (error) {
                console.error('Error fetching top three doctors of the year:', error);
            }
        };
        fetchTopThreeDoctorOfTheYear();
    }, []);

    useEffect(() => {
        const transformDataToChartFormat = (doctorData) => {
            return doctorData.map((item, index) => {
                const name = `${item.lastName} ${item.firstName}`;
                const data = Object.values(item.dataRevenue12Month).map((revenue) => parseInt(revenue));
                const chartItem = {
                    data,
                    name,
                    type: index === 0 ? 'column' : index === 1 ? 'area' : 'line',
                };
                return chartItem;
            });
        };

        if (dataThreeDoctor && dataThreeDoctor.length !== 0) {
            const transformedChartData = transformDataToChartFormat(dataThreeDoctor);
            setChartData(transformedChartData);
        }
    }, [dataThreeDoctor]);

    const chartOptions = merge(BaseOptionChart(), {
        stroke: { width: [0, 2, 3] },
        plotOptions: { bar: { columnWidth: '12%', borderRadius: 4 } },
        fill: { type: ['solid', 'gradient', 'solid'] },
        labels: Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            return `${month.toString().padStart(2, '0')}/01/${currentYear}`;
        }),
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => (typeof y !== 'undefined' ? `${y.toFixed(0)} dollar` : y),
            },
        },
    });

    return (
        <Card>
            <CardHeader title={<FormattedMessage id={'admin-dashboard.dashboard.top-3-doctors-with-the-highest-revenue-of-the-year'} />} subheader={currentYear} />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                {chartData.length !== 0 && <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />}
            </Box>
        </Card>
    );
}
