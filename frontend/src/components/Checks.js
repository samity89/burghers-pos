import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"
import { useContext } from "react"

function Checks ({checks, setCurrentCheck}) {

    const [checkFilter, setCheckFilter] = useState("open")
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user) { 
          navigate("/")
         }
      },[user, navigate])
    
    const handleSortClick = (e) => {
        setCheckFilter(e.target.value)
    }
    
    const sortButtonsRender = 
            <div>
                <button value="all" onClick={handleSortClick}>All</button>
                <button value="open" onClick={handleSortClick}>Open</button>
                <button value="closed" onClick={handleSortClick}>Closed</button>
            </div> 

    const handleStatusRender = (check) => check.open ? ("OPEN") : ("CLOSED")
    
    const filteredChecks = checks.filter((check) => {
        if (checkFilter === "open") return check.open
        else if (checkFilter === "closed") return !check.open
        else return checks
    })

    const handleUpdateCurrentCheck = (check) => {
        setCurrentCheck(check)
        navigate(`/menu`)
    }
    
    const renderChecks = filteredChecks.map((check) => (
        <div className="card" key={check.id} onClick={()=>handleUpdateCurrentCheck(check)}>
            <h4>Check #{check.id}</h4>
            <p>{check.created_at}</p>
            <h4>{handleStatusRender(check)}</h4>
        </div>
    ))
    
    return (
        <div>
            {sortButtonsRender}
            <div className="card_container">
            {renderChecks}
            </div>
        </div>
    )

}

export default Checks