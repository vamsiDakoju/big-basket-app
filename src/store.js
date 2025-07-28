import { configureStore, createSlice } from "@reduxjs/toolkit";

//create the Product Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        veg: [
            { name: 'Tomato', price: 20.0, image: '/images/veg/tomato4.avif', description: 'Fresh and juicy tomatoes, perfect for salads or cooking.' },
            { name: 'Potato', price: 25.0, image: '/images/veg/potato.avif', description: 'High-quality potatoes ideal for mashed potatoes or fries.' },
            { name: 'Carrot', price: 30.0, image: '/images/veg/carrot.avif', description: 'Crunchy and sweet carrots, great for snacking or cooking.' },
            { name: 'Onion', price: 22.0, image: '/images/veg/onion.avif', description: 'Flavourful onions that are a must-have for every kitchen.' },
            { name: 'Cabbage', price: 18.0, image: '/images/veg/cabbage.avif', description: 'Fresh green cabbage, perfect for salads or stir-fries.' },
            { name: 'Cauliflower', price: 28.0, image: '/images/veg/cauliflower.avif', description: 'Nutritious cauliflower, great for making low-carb dishes.' },
            { name: 'Brinjal', price: 26.0, image: '/images/veg/brinjal.avif', description: 'Fresh brinjal, ideal for curries or grilling.' },
            { name: 'Spinach', price: 15.0, image: '/images/veg/spinach.avif', description: 'Healthy and vibrant spinach, great for smoothies or salads.' },
            { name: 'Capsicum', price: 32.0, image: '/images/veg/capsicum.avif', description: 'Crunchy and sweet capsicum, perfect for stir-fries or salads.' },
            { name: 'Beans', price: 24.0, image: '/images/veg/beans.avif', description: 'Tender beans, great for soups, salads, or stir-fries.' }
        ],
        nonveg: [
            { name: 'Chicken', price: 270.8, image: '/images/non-veg/chicken.avif', description: 'Fresh, tender chicken perfect for grilling, curries, or frying.' },
            { name: 'Fish', price: 280.8, image: '/images/non-veg/fish.avif', description: 'Fresh fish rich in omega-3, great for grilling, frying, or curries.' },
            { name: 'Mutton', price: 520.0, image: '/images/non-veg/mutton.jpg', description: 'Premium quality mutton for rich, flavorful curries or roasts.' },
            { name: 'Prawns', price: 430.5, image: '/images/non-veg/prawn.jpg', description: 'Delicious prawns, perfect for seafood dishes like fried rice or curries.' },
            { name: 'Crab', price: 390.0, image: '/images/non-veg/crab.jpg', description: 'Fresh crab for making seafood stews, curries, or simple grilled dishes.' },
            { name: 'Eggs (Dozen)', price: 75.0, image: '/images/non-veg/egg.avif', description: 'Fresh eggs, versatile for baking, omelettes, or as a protein-rich snack.' },
            { name: 'Duck Meat', price: 360.0, image: '/images/non-veg/duck.jpeg', description: 'Tender and flavorful duck meat, ideal for slow-cooked dishes or roasting.' },
            { name: 'Quail Meat', price: 400.0, image: '/images/non-veg/quail.webp', description: 'Delicate quail meat, perfect for grilling or making gourmet dishes.' },
            { name: 'Liver (Chicken)', price: 150.0, image: '/images/non-veg/liver.webp', description: 'High-quality chicken liver, rich in iron and ideal for liver fry or curries.' },
            { name: 'Turkey', price: 480.0, image: '/images/non-veg/turkey.webp', description: 'Juicy turkey meat, perfect for roasting or making turkey-based dishes.' }
        ],
        milk: [
            { name: 'Milk (1L)', price: 55.0, image: '/images/milk/milk.jpg', description: 'Fresh, full-fat milk, perfect for your daily dairy needs.' },
            { name: 'Curd (500g)', price: 35.0, image: '/images/milk/curd.jpg', description: 'Homemade curd, creamy and rich, perfect for snacks or meals.' },
            { name: 'Paneer (200g)', price: 80.0, image: '/images/milk/paneer.webp', description: 'Fresh, soft paneer, ideal for making curries, sandwiches, and more.' },
            { name: 'Cheese (200g)', price: 120.0, image: '/images/milk/image.png', description: 'Smooth, creamy cheese for pizzas, pastas, and other dishes.' },
            { name: 'Butter (100g)', price: 60.0, image: '/images/milk/butter.jpg', description: 'Fresh, creamy butter to add richness to your daily meals.' },
            { name: 'Ghee (500ml)', price: 320.0, image: '/images/milk/ghee.jpg', description: 'Pure, clarified butter for cooking or adding flavor to dishes.' },
            { name: 'Buttermilk (500ml)', price: 20.0, image: '/images/milk/butter-milk.webp', description: 'Refreshing buttermilk, ideal for digestion and cooling down in summer.' },
            { name: 'Cream (100ml)', price: 45.0, image: '/images/milk/cream.jpg', description: 'Rich and creamy for adding to desserts or savory dishes.' },
            { name: 'Flavored Milk (Bottle)', price: 30.0, image: '/images/milk/flavouredmilk.jpg', description: 'Sweet and delicious flavored milk, available in chocolate, strawberry, and more.' },
            { name: 'Lassi (Bottle)', price: 25.0, image: '/images/milk/lassy.avif', description: 'Traditional, chilled lassi, perfect for a refreshing drink or dessert.' }
        ],
        chocolate: [
            { name: 'Munch (Small)', price: 20.0,image:'/images/chocolate/munch.png', descripiton:'Munch is a wafer chocolate from Nestle, it has a crunchy feel and a rich chocolaty taste.'},
            { name: 'Dairy milk (medium)', price: 40.0,image:'/images/chocolate/images.jpg' },
            { name: 'Perk', price: 10.0,image:'/images/chocolate/41m8XvPTI8L-1715055822550.webp'},
            { name: '5 Star', price: 25.0,image:'/images/chocolate/download.png' },
            { name: 'Nestle KitKat 4 Fingers Choco Coated Wafer Bar', price: 35.0,image:'/images/chocolate/images (1).jpg'},
            { name: 'Snickers', price: 40.0,image:'/images/chocolate/download.jpg'},
            { name: 'kindar', price: 90.0,image:'/images/chocolate/pngimg-25.webp'},
            { name: 'Ferrero Rocher (3 pcs)', price: 150.0,image:'/images/chocolate/6668c2e1-0d3b-4a9f-895b-fcd4e230cbe4.avif'},
            { name: 'Toblerone (Mini)', price: 100.0,image:'/images/chocolate/7ae74b1f-3e33-46ef-b6e1-3f2ef30b0af7.avif'},
            { name: 'Amul Dark Chocolate (150g)', price: 85.0,image:'/images/chocolate/409781a.avif'}
        ],

    },
    reducers: {}
});

//create the Cart Slice
let cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        AddToCart: (state, inputItem) => {
            const item = state.find(item => item.name === inputItem.payload.name)
            if (item) {
                item.quantity += 1;
            }
            else {
                state.push({ ...inputItem.payload, quantity: 1 });
            }
        },
        IncCart: (state, inputItem) => {
            const item = state.find(item => item.name === inputItem.payload.name)
            if (item) {
                item.quantity += 1;
            }
        },
        DecCart: (state, inputItem) => {
            const index = state.findIndex(item => item.name === inputItem.payload.name);
            if (index !== -1) {
                state[index].quantity -= 1;
                if (state[index].quantity === 0) {
                    state.splice(index, 1); // remove the item from the array
                }
            }
        },
        RemoveFromCart: (state, action) => {
            return state.filter(item => item.name !== action.payload.name);
        },
        ClearCart:()=>[],


    }
})

//export cartSlice  reducers
export let { AddToCart, IncCart, DecCart, RemoveFromCart, ClearCart } = cartSlice.actions;

//create the Order Slice
let orderSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        OrderDetails: (state, actions) => {
            const OrderDetails = actions.payload
            state.push(OrderDetails);
        }
    }

})

//export order slice reducrs
export let { OrderDetails } = orderSlice.actions;

//configure the store
const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        orders: orderSlice.reducer
    }
});

//export the store
export default store;
