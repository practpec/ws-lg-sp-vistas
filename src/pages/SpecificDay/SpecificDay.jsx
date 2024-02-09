import { useEffect, useState } from "react"
import './SpecificDay.css'


export default function SpecificDay ({params}) {

    const {year, month, day} = params
    const [dayDates, SetDayDates] = useState([])

    const date = `${year}/${month}/${day}` 

    useEffect( () => {

        fetch(`http://localhost:3000/citas/${date}`)
        .then(response => response.json())
        .then(data => SetDayDates([...data.citas]))
    }, [])

    return (
        <section className="specificDay">

            <h2>Citas del {day}/{month}</h2>

            {
                dayDates.length > 0 ?
                dayDates.map(dayDate => <article className="dayDate">
                        <span>{dayDate.nombreUsuario}</span>
                        <span>{dayDate.telefono}</span>
                        <span>{dayDate.hora}</span>
                        <span>{dayDate.nombreTratamiento}</span>
                    </article>
                )
                : 
                <span>Que alivio no hay citas </span>
            }   




        </section>
    )
}