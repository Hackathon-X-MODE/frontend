import React from 'react';
import {Doughnut} from "react-chartjs-2";

const Statistics = ({data, dataComments}) => {
    return(
            <div className={'w-full h-[425px] px-[49px] py-[32px] bg-[#21243A] flex  rounded-[18px]'}>
                <div className={'w-1/2 translate-x-[10px]'}>
                    <div>
                        <span className={'text-[32px]'}>Статистика обращний <br />по статусу</span>
                    </div>
                    <div className={'w-[400px] -translate-y-14 '}>
                        <Doughnut options={
                            {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'right',
                                        align: 'center',
                                        labels: {
                                            // color: 'red',
                                            padding: 30,
                                            boxWidth: 18,
                                            borderRadius: '30px',
                                            pointStyle: 'dash',
                                            font: {
                                                family: 'Firs',
                                                weight: 900,
                                                size: '18px',
                                            },
                                            color: 'white',
                                        },
                                    },
                                },
                            }
                        } data={data}
                        />
                    </div>
                </div>
                <hr className={'border-opacity-30 border border-[#6C7094] h-full'} />
                <div className={'w-1/2  translate-x-[80px]'}>
                    <div>
                        <span className={'text-[32px]'}>Статистика обращений <br /> по настроению</span>
                    </div>
                    <div className={'w-[400px] -translate-y-14'}>
                        <Doughnut options={
                            {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'right',
                                        align: 'center',
                                        labels: {
                                            padding: 30,
                                            boxWidth: 18,
                                            borderRadius: '30px',
                                            pointStyle: 'dash',
                                            font: {
                                                family: 'Firs',
                                                weight: 900,
                                                size: '18px',
                                            },
                                            color: 'white'
                                        },
                                    },
                                },
                            }
                        } data={dataComments}
                        />
                    </div>
                </div>
            </div>
    )
}

export default Statistics;