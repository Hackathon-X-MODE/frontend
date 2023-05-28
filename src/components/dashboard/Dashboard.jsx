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
import {
    useGetCommentsStatusQuery,
    useGetTicketsStatusPerDayQuery,
    useGetTicketsStatusQuery
} from "../../redux/postamatApi";
import Loader from "../loader/Loader";
import ExportComponent from "./ExportComponent";
import ImportComponent from "./ImportComponent";
import LineComponent from "./LineComponent";
import Statistics from "./Statistics";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const data = {
    labels: ['Открыто', 'Ожидает', 'Просрочено'],
    datasets: [
        {
            label: 'Количество тикетов',
            data: [],
            backgroundColor: [
                '#F62E46',
                '#D9D9D9',
                '#646675'
            ],
            borderColor: 'transparent'
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
                '#F62E46',
                '#D9D9D9',
                '#646675'
            ],
            // borderWidth: 1,
            borderColor: 'transparent'
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

    const {data: ticketStatus, isSuccess: ticketSuccess} = useGetTicketsStatusQuery('0',{
        pollingInterval: 5000
    })
    const {data: perDay,isSuccess: perDaySuccess} = useGetTicketsStatusPerDayQuery('0',{
        pollingInterval: 5000
    })
    const {data: commentsStatus, isSuccess: commentsSuccess} = useGetCommentsStatusQuery('0',{
        pollingInterval: 5000
    })

    const dataPerDay = {
        labels: [],
        datasets: [
            {
                label: 'Тикет',
                data: [],
                borderColor: 'rgba(246, 46, 70, 0.5)',
                backgroundColor: 'rgba(246, 46, 70, 1)',
                border: 'none'
            },
        ],
    };

    if (!ticketSuccess || !perDaySuccess || !commentsSuccess) return <Loader />

    if (ticketSuccess) data.datasets[0].data = Object.entries(ticketStatus).map(([, v]) => v)

    //perDay

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
            <div className={'flex gap-[20px] ml-[77px] text-white text-[18px] mt-[48px] font-primary'}>
                <div className={'flex flex-col items-center  '}>
                    {/*//ИМПОРТ*/}
                    <ImportComponent />
                    {/*//Экспорт*/}
                    <ExportComponent />
                </div>
                {/*//Статистика*/}
                <div className={'flex flex-col w-[1095px]'}>
                    {/*//По статусу*/}
                    <Statistics data={data} dataComments={dataComments} />
                    <div className={'h-[535px]  rounded-[15px] px-[30px] py-[30px] bg-[#21243A] mt-[30px]'}>
                        <button className={'  py-[10px] px-[20px] text-[18px] border-2 rounded-[15px] border-[#F62E46]'}>Открытые обращения</button>
                        <LineComponent perdDay={dataPerDay}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
