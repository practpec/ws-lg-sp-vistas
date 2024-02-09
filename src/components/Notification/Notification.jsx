import './Notification.css'
import bell from '../../assets/notifications-1.svg'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { Link } from 'wouter'


export default function Notification (){

    const [notification, setNotification] = useState([])
    const {user} = useContext(UserContext)
    const [show, setShow] = useState(false)
    

    useEffect( () => {

        if(user.userId){
            if(user.admin){
                updateDatesWithLP()
            } else {
                updateMisingTimeWithSP()
            }
        }

        
    },[user])

    const updateDatesWithLP = async () => {
        //long polling
        try{
            const response = await fetch('http://localhost:3000/citas/update')
            const data = await response.json()
            
            notification.push(data.cita)
            
            setNotification([...notification])
        }catch{
            console.log('tiempo de espera terminado')
        }finally {
            updateDatesWithLP()
        }
    }

    const updateMisingTimeWithSP = () =>{
        //short
       
        const actualDate = new Date()
        const stringActualDate = `${actualDate.getFullYear()}/${actualDate.getMonth() + 1}/${actualDate.getDate()}`
        const stringHour = `${actualDate.getHours()}:${actualDate.getMinutes()}`

        fetch(`http://localhost:3000/citas/${stringActualDate}/${user.userId}/${stringHour}`)
        .then(response => response.json())
        .then(data => {

            const auxArray = []
            if(data.missingTime){
                auxArray.push(data.missingTime)
                setNotification([...auxArray])
            }
        })

        setInterval( () => {
            updateMisingTimeWithSP()
        },60000)
    }

    const getRouteToDate = (date) =>{

        const year = date.substr(0,4)
        const month = date.substr(5,2)
        const day = date.substr(8,2)
        
        const scheduledDate = `/dates/${year}/${month}/${day}`

        return scheduledDate
    }

    useEffect( () =>{

     }, [show])

    useEffect(() => {

        console.log(notification)
    },[notification])

    

    return (
        <figure className='notification' onClick={() => setShow(!show)}>
            <img src={bell} alt="" />
            {
                notification.length > 0 ? <figure className='number'>
                    <span>
                    {notification.length}
                    </span>
                </figure>
                :null
            }

            {
                show && notification.length > 0 ? 
                <div className='showNotification'>
                    {   
                        
                        notification.map( notif => <div>
                            {
                                user.admin ?
                                <Link to={getRouteToDate(notif.fecha)} className='linkToDates'>nueva cita a las {notif.hora} el {notif.fecha}</Link>
                                :
                                <span> faltan {notif} minuitos para tu cita</span>
                            }
                            
                        </div>)
                    }
                </div>
                :
                null
            }
        </figure>
    )
}