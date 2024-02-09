import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import DatesContext from "../../context/DatesContext";
import TreatmentCard from "../../components/TreatmentCard/TreatmentCard";
import './AdminHome.css';

export default function AdminHome() {
    const { dates, setDates } = useContext(DatesContext);
    const [treatments, setTreatments] = useState([]);
    const [todayDates, setTodayDates] = useState([]);
    const [dayDates, setDayDates] = useState([]);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();
    const date = `${year}/${month}/${day}`;

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const response = await fetch(`http://localhost:3000/citas/${date}`);
                const data = await response.json();
                setDayDates([...data.citas]);
                setDates(data.citas);
                console.log(data.citas);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchTreatments = async () => {
            try {
                const response = await fetch('http://localhost:3000/tratamientos');
                const data = await response.json();
                setTreatments(data.tratamientos);
            } catch (error) {
                console.error('Error fetching treatments:', error);
            }
        };

        fetchDates();
        fetchTreatments();

        const interval = setInterval(fetchDates, 9000);
        return () => clearInterval(interval);
    }, [date, setDates]);

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        const filteredDates = dates.filter(date => new Date(date.fecha).toLocaleDateString() === today);
        setTodayDates(filteredDates);
    }, [dates]);

    return (
        <section className="adminHome">
        <NavBar />
        <br></br>
        <br></br>
        <div className="adminContent">
            <br></br>
            <div className="appointments">
                <h2>Citas de hoy</h2>
                {todayDates.map(dayDate =>
                    <article className="dayDate" key={`${dayDate.nombreUsuario}-${dayDate.id}`}>
                        <span>{dayDate.nombreUsuario}</span>
                        <span>{dayDate.telefono}</span>
                        <span>{dayDate.hora}</span>
                        <span>{dayDate.nombreTratamiento}</span>
                    </article>
                    
                )}
            </div>
            <br />
            <div className="services">
                <h2>Servicios</h2>
                {treatments.map(treatment =>
                    <TreatmentCard
                        key={treatment.id}
                        admin={true}
                        price={treatment.precio}
                        duration={treatment.duracion}
                        name={treatment.nombre}
                    />
                )}
            </div>
           
        </div>
        <br />
    </section>
    
    
    );
}
//

