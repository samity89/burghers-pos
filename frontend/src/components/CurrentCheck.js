import { UserContext } from "./UserContext"
import { useContext } from "react"

function CurrentCheck ({currentCheck, setCurrentCheck}) {
    const { user } = useContext(UserContext) 
    const renderOrders = currentCheck => { 
        if (currentCheck) {
            return (
                currentCheck.orders.map((order) => (
                <div key={order.id}>     
                    <p>{order.quantity} {order.product.name} {order.quantity*order.product.price}.00</p>
                </div>
        )))} else {
            return null
        }
    }

    const renderStatus = currentCheck.open ? "OPEN" : "CLOSED"

    const toggleCheckStatus = (currentCheck) => {
        let updatedCurrentCheck = {...currentCheck, open: !currentCheck.open}
        setCurrentCheck(updatedCurrentCheck)
    }

    const calculateTotal = (currentCheck) => {
        if (currentCheck) {
            let totalArray = []
            currentCheck.orders.forEach((order) => totalArray.push(order.quantity*order.product.price))
            const sum = totalArray.reduce((a, b) => a + b, 0);
            return (
                <div className="total">TOTAL: ${sum}.00</div>
            )
        } 
    }

    const renderCheckInfo = currentCheck => {
        if (currentCheck) {
            return (
                <div>
                    <h4><u>Check #{currentCheck.id}</u></h4>
                    <p><u>status:</u> <b>{renderStatus}</b></p>
                    <p><u>server:</u> {currentCheck.user.first_name}</p>
                    <hr></hr>
                    <button
                        className="close_button" 
                        onClick={()=>toggleCheckStatus(currentCheck)}>
                            {currentCheck.open ? ("CLOSE CHECK") : ("REOPEN CHECK")}
                    </button>
                </div>
            ) } else {return null}
    }        
            
    return (
        user ? (
            <div className="check_panel">
                {renderCheckInfo(currentCheck)}
                {renderOrders(currentCheck)}
                {calculateTotal(currentCheck)}
            </div>
        ) : null
    )
}

export default CurrentCheck