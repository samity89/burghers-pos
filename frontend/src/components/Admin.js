import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin ({products, setProducts}) {
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        release_date: "",
        inventory: "",
    })
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setProductForm({...productForm, [name]: value})
    }

    async function handleProductFormSubmit (event) {
        event.preventDefault()
        const response = await fetch(`products/#create`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    "name": productForm.name,
                    "description": productForm.description,
                    "price": productForm.price,
                    "inventory": productForm.inventory,
                })
            })
            const data = await response.json()
            if (response.ok) { 
                handleAddProduct(data)
                navigate("/products")
            } else {
                setErrors(data)
            }
    }
    
    function handleAddProduct(newProduct) {
        setProducts([...products, newProduct])
    }

    const renderErrors = Object.entries(errors).map(([key, value]) => <li key={key}>{key}: {value}</li>)
        
    
    
    return (
        <div className="form_container">
            <form onSubmit={handleProductFormSubmit}>
                <h3>submit a new product</h3>
                <label>Burgher Name</label>
                <input 
                    name="name"
                    onChange={handleChange}/><br/>
                <label>Description</label>
                <input 
                    name="description"
                    onChange={handleChange}/><br/>
                <label>Price</label>
                <input 
                    type="number"
                    name="price" 
                    onChange={handleChange}/><br/>
                <label>Quantity</label>
                <input 
                    type="number"
                    name="inventory"
                    min="0"
                    onChange={handleChange}/><br/>
                <button type="submit">Submit</button>
            </form>
            <ul>{renderErrors}</ul>
        </div>
    )

}

export default Admin