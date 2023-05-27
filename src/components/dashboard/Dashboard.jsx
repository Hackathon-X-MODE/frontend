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
    //ticket status
    const mockTicketStats = {
        "open": 205912,
        "pending": 4,
        "deadline": 0
    }
    data.datasets[0].data = Object.entries(mockTicketStats).map(([, v]) => v)

    //perDay
    const mockTicketPerDay = [
        {
            "count": 189,
            "localDate": "2023-05-21"
        },
        {
            "count": 4582,
            "localDate": "2023-05-22"
        },
        {
            "count": 309,
            "localDate": "2023-05-23"
        },
        {
            "count": 6888,
            "localDate": "2023-05-25"
        },
        {
            "count": 154090,
            "localDate": "2023-05-26"
        },
        {
            "count": 39860,
            "localDate": "2023-05-24"
        }
    ]
    const dataPerDay = {
        labels: mockTicketPerDay.map(v => v.localDate),
        datasets: [
            {
                label: 'Тикет',
                data: mockTicketPerDay.map(v => v.count),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    //comment status
    const mockCommentStats = {
        "negative": 192509,
        "positive": 217255,
        "neutral": 2671
    }
    dataComments.datasets[0].data = Object.entries(mockCommentStats).map(([, v]) => v)
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
