import { PieChart } from 'react-minimal-pie-chart';

interface pieProps{
    data:any
}

export function Piechart(props:pieProps){
    return (
        <PieChart className="mt-4"
                style={{"transform":"scale(1)","height":"50%"}}
                        animate
                        reveal={100}
                        animationDuration={500}
                        animationEasing="ease-out"
                        center={[50, 50]}
                        data={props.data}
                        labelPosition={50}
                        lengthAngle={360}
                        lineWidth={35}
                        paddingAngle={0}
                        radius={50}
                        rounded
                        startAngle={0}
                        viewBoxSize={[100, 100]}/>
    )
}