import { React, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"
import CurrentCheck from "./CurrentCheck";

function NavBar({ currentCheck, setCurrentCheck, checks, setChecks}) {
  const {user, setUser} = useContext(UserContext)
  // function handleLogoutClick(e) {
  //   e.preventDefault();
  //   fetch("/users/tokens/revoke", { 
  //     method: "POST",
  //     headers: {"Authorization": "Bearer <refresh_token>"}, 
  //   }).then((r) => {
  //     if (r.ok) {
  //       console.log("fired")
  //       setUser(null);
  //     } else {console.log(r)}
  //   });
  // }
  const navigate = useNavigate()

  async function createNewCheck (event) {
    event.preventDefault()
    const response = await fetch(`checks/#create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "user_id": user.id,
            "open": true
        })
    })
    const data = await response.json()
    if (response.ok) { 
        handleAddCheck(data)
        console.log(data)
    } else {
        console.log(data.errors)
    }
  }

  const handleAddCheck = (newCheck) => {
    checks.push(newCheck)
    setCurrentCheck(newCheck)
    navigate(`/menu`)
  }

  return (
    user ? (
    <div>
      <header>
        <div className="navbar">
        <NavLink exact="true" to="/admin">
          <button disabled={!user.admin}>Admin</button>
        </NavLink>
        <NavLink exact="true" to="/checks"><button>Checks</button></NavLink>
        <NavLink exact="true" to="/menu"><button>Menu</button></NavLink>
        <button onClick={createNewCheck}>New Check</button>
        <button onClick={()=>{
          setUser(null)
          navigate("/")
        }}>Log Out</button>
        <hr></hr>
        </div>
      </header>
    <CurrentCheck 
      currentCheck={currentCheck}
      setCurrentCheck={setCurrentCheck}
    />
    </div>) : (
      null
    )
  )
}

export default NavBar;
