import React from "react";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import {Doughnut, Line} from 'react-chartjs-2';
import {
    useGetCommentsStatusQuery,
    useGetTicketsStatusPerDayQuery,
    useGetTicketsStatusQuery
} from "../../redux/postamatApi";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);
const data = {
    labels: ['Открыто', 'Ожидает', 'Просрочено'],
    datasets: [
        {
            label: 'Количество тикетов',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
        },
    ],
};


const dataComments = {
    labels: ['Негативные', 'Позитивные', 'Нейтральные'],
    datasets: [
        {
            label: 'Количество комментариев',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
        },
    ],
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Колличество тикетов по дням',
        },
    },
};
const Dashboard = (props) => {
    //RTK
    const {data: ticketStatus, isSuccess: ticketSuccess} = useGetTicketsStatusQuery()
    const {data: perDay,isSuccess: perDaySuccess} = useGetTicketsStatusPerDayQuery()
    const {data: commentsStatus, isSuccess: commentsSuccess} = useGetCommentsStatusQuery()
    //ticket status

    if (ticketSuccess) data.datasets[0].data = Object.entries(ticketStatus).map(([, v]) => v)

    //perDay

    const dataPerDay = {
        labels: [],
        datasets: [
            {
                label: 'Тикет',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    if (perDaySuccess) {
        dataPerDay.labels = perDay.map(v => v.localDate)
        dataPerDay.datasets[0].data = perDay.map(v => v.count)
    }

    //comment status

    if (commentsSuccess) {
        dataComments.datasets[0].data = Object.entries(commentsStatus).map(([, v]) => v)
    }
    return (
        <>
            <div className={'w-full columns-2'}>
                <div>
                    <Doughnut options={
                        {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top'
                                },
                                title: {
                                    display: true,
                                    text: 'Тикеты по статусам',
                                },
                            },
                        }
                    } data={data}/>
                </div>
                <div>
                    <Line options={
                        {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top'
                                },
                                title: {
                                    display: true,
                                    text: 'Тикеты по дням',
                                },
                            },
                        }
                    } data={dataPerDay}/>
                </div>
                <div>
                    <Doughnut options={
                        {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top'
                                },
                                title: {
                                    display: true,
                                    text: 'Комментария по настрою',
                                },
                            },
                        }
                    } data={dataComments}/>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
