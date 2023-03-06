import { useState } from "react"
import useUserContext from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

function TruckForm() {
    const {user} = useUserContext()
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const [availCap, setAvailCap] = useState('');
    const [cap, setCap] = useState('');
    const [destLoc, setDest] = useState('')
    const [curLoc, setCur] = useState('')
    const [numberPlate, setNumberPlate] = useState('')


    async function handleClick(e) {
        e.preventDefault()
        if (!numberPlate || !curLoc || !destLoc || !cap || !availCap) {
            setError(true)
            return
        }
        
        const H = window.H;
        
        const platform = new H.service.Platform({
            'apikey': '0PL2REO-9qDw56ZuDeOx4g22ymUIXoaDrXds0GVbO4M'
        });
    
        const service = platform.getSearchService();
        
        async function getGeoCodes() {
            let curLocGeo, destLocGeo
            curLocGeo = await service.geocode({
                q: `${curLoc}`
            })
            curLocGeo = curLocGeo.items[0].position

            destLocGeo = await service.geocode({
                q: `${destLoc}`
            })
            destLocGeo = destLocGeo.items[0].position
            return {curLocGeo, destLocGeo}
        }

        const geoCodes = await getGeoCodes()

        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({})
        })

        setError(false)
  
        // navigate('/')
    }


    return (
        <div className="register-login">
            <form className="form-container">
                <div className="form-sub">
                    <label for="numberPlate">Truck Number Plate:</label>
                    <input type='text' name="numberPlate" id="numberPlate" onChange={(e) => {setNumberPlate(e.target.value)}}/>
                </div>
                <div className="form-sub">
                    <label for="curLoc">Current Location:</label>
                    <input type='text' name="curLoc" id="curLoc" onChange={(e) => {setCur(e.target.value)}} required/>
                </div>
                <div className="form-sub">
                    <label for="destLoc">Destination Location:</label>
                    <input type='text' name="destLoc" id="destLoc" onChange={(e) => {setDest(e.target.value)}}/>
                </div>
                <div className="form-sub">
                    <label for="cap">Total Capacity:</label>
                    <input type='text' name="cap" id="cap" onChange={(e) => {setCap(e.target.value)}}/>
                </div>
                <div className="form-sub">
                    <label for="availCap">Available Capacity:</label>
                    <input type='text' name="availCap" id="availCap" onChange={(e) => {setAvailCap(e.target.value)}}/>
                </div>
                
                <input type="submit" className="form-btn" onClick={handleClick} disabled={isLoading} value="Submit"/>
                {isLoading && <div>Adding truck</div>}
                {error && <div className="error">Please fill all fields correctly</div>}
            </form>
        </div>
    )
}

export default TruckForm