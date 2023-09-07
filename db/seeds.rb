users = User.create!(
    [
        {
            first_name: "John",
            last_name: "Smith",
            password: "1111",
            password_confirmation: "1111",
            email: "jsmith@x.com",
            admin: true
        },
        {
            first_name: "Samuel",
            last_name: "Amity",
            password: "4000",
            password_confirmation: "4000",
            email: "sam.amity@gmail.com",
            admin: false
        }
    ]
)

products = Product.create!(
    [
        {
            name: "Classic",
            description: "lettuce, tomato, pickle, red onion, american, roasted garlic lemon aioli",
            price: 12.00,
            inventory: 50,
        },
        {
            name: "Monterey",
            description: "spinach, tomato, pickle, red onion, cheddar, whole grain mustard",
            price: 12.00,
            inventory: 50,
        },
        {
            name: "BBQ",
            description: "braised beef, onion straws, provolone, golden bbq",
            price: 12.00,
            inventory: 50,
        },
        {
            name: "Swisshroom",
            description: "arugula, carmelized mushroom, swiss, onion butter",
            price: 12.00,
            inventory: 50,
        },
        {
            name: "Kobe",
            description: "Kobe beef, arugula, sun-dried tomato, gouda, shallot aioli",
            price: 40.00,
            inventory: 0,
        },
    ]
)

checks = Check.create!(
    [
        {
            user_id: 1,
            open: 0
        },
        {
            user_id: 2,
            open: 1
        }
    ]
)

orders = Order.create!(
    [
        {
            check_id: 1,
            product_id: 1,
            quantity: 3
        },
        {
            check_id: 2,
            product_id: 2,
            quantity: 1
        },
        {
            check_id: 2,
            product_id: 1,
            quantity: 4
        }
    ]
)

puts "seeding complete"


