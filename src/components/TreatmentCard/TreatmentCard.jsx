
import './TreatmentCard.css'

export default function TreatmentCard({price, duration, name, id, admin}) {


    return(

        <fieldset className='treatmentCard'>
            <label htmlFor={`treatment${id}`}>
    
                <span>{name}</span>
                <span>$ {price}</span>
                <span>{duration} hora </span>
                
            </label>

            {
                !admin ? <input type="radio" value={id} name='treatments' id={`treatment${id}`}/> : null
            }
            
        </fieldset>
    )
}