import { useState } from 'react'
import './Calendar.css'
import { useEffect } from 'react'
import CallendarCell from '../CallendarCell/CallendarCell'


export default function Calendar () {

    //funcionamiento del calendario
    const year = new Date().getFullYear()
    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
    const [index, setIndex] = useState(new Date().getMonth())
    const date = new Date(year, index, 1)
    const firstDay = date.getDay()
    const [month, setMonth] = useState(months[index]) 
    const daysMonth = new Date(year, index + 1, 0).getDate()
    const days = []
    const auxDays = []

    if (firstDay != 0){
        for(let i=0; i< firstDay -1; i++){
            days.push(0)
        }
    } else {
        days.push(0,0,0,0,0,0)
    }

    for ( let i=1; i<= daysMonth; i++){
        days.push(i)
    }

    const nRows = Math.ceil(days.length / 7)
    const rest = nRows * 7 - days.length
    for(let i=0; i < rest; i++ ){
        days.push(0)
    } 
    

    for(let i=0; i< nRows; i++){
        let arrayAux = days.splice(0,7) 
        auxDays.push(arrayAux)
    }

    useEffect(()=>{
        setMonth(months[index])
    },[index])

    const increaseMonth = () =>{
        if(index == 11){
            setIndex(0)
        } else{
            setIndex(index + 1)
        }
    }

    const decreaseMonth = () => {
        if(index == 0){
            setIndex(11)
        } else{
            setIndex(index - 1)
        }
    }

    //funcionamiento consumo del WebSocket

    const [datesOfMonth, setDatesOfMonth] = useState([])
    const [websocket, setWebsocket] = useState(null)


    useEffect(() => {
        fetch(`http://localhost:3000/citas/${year}/${index + 1}`)
        .then(response => response.json())
        .then(data => setDatesOfMonth(data.citas))  
        
        setWebsocket(new WebSocket('ws://localhost:4000/'))
    },[])

    useEffect(() => {
        
    if(websocket){
        websocket.onmessage = e => {

        const message = JSON.parse(e.data)
        const auxArray = datesOfMonth
        auxArray.push(message.cita)
        console.log(auxArray)
        setDatesOfMonth([...auxArray])
    }

    websocket.onclose = (e) => {
        console.log(e.code, e.reason, e.wasClean)

        tryToReconnect()        

        }
    }
    

    },[websocket, datesOfMonth])


    const filterDatesByDay = (year, month, day) =>{

        month = month.toString()

        const stringMonth = month.length < 2 ? '0'+ month: month
        const dateToCompare = `${year}-${stringMonth}-${day}`
        
        const dayDates = datesOfMonth.filter(date => date.fecha.substr(0,10) == dateToCompare)

        return dayDates
    }

    const tryToReconnect = () => {


        let newWs = new WebSocket('ws://localhost:4000/')
        console.log(newWs)

        while(newWs.readyState != 1){
            setTimeout(() => console.log('a'), 2000)
        }
    }

    

    return(
        <section>

            <div className='containerMonth'>
                <button onClick={decreaseMonth}> - </button>
                <h2>{month}</h2>
                <button onClick={increaseMonth}>  + </button>
            </div>
            

            <table>
                <thead>
                    <tr>
                        <td>Lunes</td>
                        <td>Martes</td>
                        <td>Miercoles</td>
                        <td>Jueves</td>
                        <td>Viernes</td>
                        <td>Sabado</td>
                        <td>Domingo</td>
                    </tr>
                </thead>
                <tbody>
                        {   
                            datesOfMonth != null ?
                            auxDays.map(row =>{
                                 return <tr >
                                    {
                                        row.map( day =>{
                                            return <CallendarCell day={day} month={index} year={year} dates={filterDatesByDay(year, index + 1, day)}/>
                                        })
                                    }
                                </tr>
                                
                                
                            }): null
                            
                        }

                    
                </tbody>
            </table>


        </section>
    )
}