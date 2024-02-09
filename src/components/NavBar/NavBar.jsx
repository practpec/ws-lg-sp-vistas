import { useContext } from "react"
import UserContext from "../../context/UserContext"
import './NavBar.css'
import Notification from "../Notification/Notification"
import calendar from '../../assets/calendar-regular.svg'
import { Link } from "wouter"


export default function NavBar () {

    const {user} = useContext(UserContext)

    return (
        <header className="navBar">
            <h1>
                Bienvenido {user.name}
            </h1>

            <div>
                <Link to="/dates">Citas</Link>

                <Notification/>
            </div>

        </header>
    )
}