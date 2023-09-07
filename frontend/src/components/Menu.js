import { UserContext } from "./UserContext"
import { useContext } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Menu ({products, setProducts, currentCheck}) {
    const [count, setCount] = useState(1)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    // const [isEditting, setIsEditting] = useState(false)

    useEffect(() => {
        if (!user) { 
          navigate("/")
         }
    },[user, navigate])


    async function createOrder (event) {
        event.preventDefault()
        const targetProduct = products.filter((product) => product.id === parseInt(event.target.value))
        const response = await fetch(`orders/#create`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "check_id": currentCheck.id,
                "product_id": event.target.value,
                "quantity": count,
            })
        })
        const data = await response.json()
        if (response.ok) { 
            currentCheck.orders.push(data)
            updateProductInventory(targetProduct[0])
            navigate(`/menu`)
        } else {
            console.log(data.errors)
        }
    }

    async function updateProductInventory(product) {
        const response = await fetch(`products/${product.id}#update`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json,"},
            body: JSON.stringify({
                inventory: product.inventory-count
            })
        })
        const data = await response.json()
        if (response.ok) {
            handleInventoryDecrease(data)
            setCount(1)
        } else {
            console.log(data.errors)
        }
    }

    const handleInventoryDecrease = (updatedProduct) => {
        const updatedProducts = products.map((product => {
            if (product.id === updatedProduct.id) {
                return updatedProduct;
            } else {
                return product
            }
        }))
        setProducts(updatedProducts)
    }
    
    const renderCountButtons = () =>
        <div>
            <p>
                quantity to add
            <button onClick={() => setCount(count - 1)} disabled={count <= 1 ? true : false}>-</button>
                {count}
            <button onClick={() => setCount(count + 1)}>+</button>
            </p>
        </div>
    
    
    const handleButtonRender = (product) => {
        if (product.inventory <= 0) return <button disabled={true}>sold out</button>
        else if (product.inventory < count) return <button disabled={true}>order exceeds stock</button>
        else return <button 
        onClick={createOrder} 
        value={product.id}
        disabled={!currentCheck.open}
        >
            add to order
        </button>
    }
    
    const handleAdminFunctionsRender = (product) => {
        if (user.admin) {
            return (
                    <div>
                        <button onClick={()=>handleDeleteClick(product.id)}>Delete Menu Item</button>
                    </div>
            )
        } else return null
    }
        
    const handleDeleteClick = (id) => {
        fetch(`products/${id}#destroy`, {
            method: "DELETE"
        })
        .then((r) => r.json()).then(handleDeleteProduct(id))
    };
        
    const handleDeleteProduct = (id) => {
        setProducts(oldProducts => oldProducts.filter(product => product.id !== id))
    }

    const renderProducts = products.map((product) => (
        <div className="card" key={product.name}>
            <h4>{product.name} ${product.price}</h4>
            <p>{product.description}</p>
            <p>stock: {product.inventory}</p>
            {handleButtonRender(product)}
            {handleAdminFunctionsRender(product)}
        </div>)
    )    
    
    return (
        user ? <div>
            {renderCountButtons()}
            <div className="card_container">
            {renderProducts}
            </div>
        </div> : <div>{navigate("/")}</div>
    )
}

export default Menu














// const {user} = useContext(UserContext)

// const handleAddProductToCheck = (e) => (
//     e.preventDefault()
// )

