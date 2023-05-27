import React from 'react';
import {Line} from "react-chartjs-2";

const LineComponent = ({perdDay}) => {
    return(
        <div className={' w-full h-[400px] translate-x-5 translate-y-5'}>
            <Line options={
                {
                    scales: {
                        y: {
                            grid: {
                                color: 'rgba(55, 59, 85, 1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(55, 59, 85, 1)'
                            }
                        }
                    },
                    elements:{
                        point: {
                            radius: 10
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                            position: 'top'
                        },

                    },
                }
            } data={perdDay}/>
        </div>

    )
}

export default LineComponent;