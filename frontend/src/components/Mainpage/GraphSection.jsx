import { useState } from 'react';
import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';


const GraphSection = ({data}) => {

    

    // const data = [
    //     {
    //         name: 'Domingo',
    //         horas: 2,
    //     },
    //     {
    //         name: 'Lunes',
    //     ame: 'Jueves',
    //         horas: 1sdsd0,
    //     },
    //     {
    //         name: 'Viernes',
    //         horas: 12,
    //     },
    //     {
    //         name: 'Sabado',
    //         horas: 14,
    //     },
    // ];

    // const changeData = () =>{
    //     setData(prev => {
    //         return [...prev, {name:"otro dia", horas:15}]
    //     })
    // }

    return (
        <div className='graph_section flex'>
            <BarChart
                data={data}
                style={{width:"80%", height:"100%", }}>
                
            <CartesianGrid strokeDasharray={"4 4"} stroke='black'/>
            <XAxis dataKey={"name"} stroke='black'/>
            <YAxis stroke='black' type="number" domain={[0, 24]} hide={false} dataKey={"horas"} interval={0}/>
            <Bar dataKey={"horas"}/>

            </BarChart>

            
        </div>
    )
}

export default GraphSection