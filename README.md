# Urban Food

## Project Description
Urban Food is a food ordering platform that allows users to browse menu items, add them to cart, and place orders. The application includes role-based access control, allowing administrators and managers different levels of access to manage menu items and orders.

## Features

### Customer Features
- **Menu Browsing**: View all available food items
- **Cart Management**: Add items to cart, adjust quantities, and remove items
- **Order Placement**: Place orders with cash on delivery (COD) payment option
- **Order History**: View past orders and their status
- **User Authentication**: Secure login and registration system

### Admin Dashboard
- **Role-Based Access Control**: Different permissions for admin and manager roles
- **Menu Management**: 
  - **Admin**: Add, update, and delete menu items
  - **Manager**: Update menu items only
- **Order Management**: 
  - View all orders
  - Update order status (pending or completed)

## Technology Stack
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API, Local State Management
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt for password hashing
- **Deployment**: Vercel (frontend), Render (backend)

## Setup Instructions

### Frontend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/urban-food.git
   cd urban-food/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env.local` file in the frontend directory with:
   ```
   VITE_BACKEND_URL=`http://localhost:5000`
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory
   ```bash
   cd ../backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server
   ```bash
   npm start
   ```

5. The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/user/register` - Register a new user and receive JWT token
- `POST /api/user/login` - Login and receive JWT token

### Menu Items
- `GET /api/listMenu` - Get all menu items
- `POST /api/addMenu` - Add a new menu item (Admin only)
- `PUT /api/updateMenu/:id` - Update a menu item (Admin and Manager)
- `DELETE /api/removeMenu/:id` - Delete a menu item (Admin only)

### Orders
- `GET /api/order/listOrders` - Get all orders (Admin and Manager)
- `GET /api/order/userOrders` - Get orders for the logged-in user
- `POST /api/order/placeOrder` - Create a new order
- `PUT /api/order/updateStatus/:id` - Update order status (Admin and Manager)

## Database Schema

### User
```
{
  id: String,
  username: String,
  email: String,
  password: String (hashed),
  role: String (enum: "user", "manager", "admin"),
  cartData:Object
}
```

### Menu
```
{
  id: String,
  name: String,
  description: String,
  price: Number,
  image: String ,
  category: String,
  availability: Boolean,
}
```

### Orders
```
{
  id: String,
  userId: String (ref: User),
  items: [
    {
      menuItemId: String (ref: Menu),
      quantity: Number,
    }
  ],
  totalAmount: Number,
  status: String (enum: "pending", "completed"),
  createdAt: Date
}
```

## Authentication and Authorization
- JWT-based authentication system
- Passwords are hashed using bcrypt
- Role-based permissions:
  - **Admin**: Can add, update, delete menu items and update order status
  - **Manager**: Can update menu items and update order status
  - **User,Admin,Manager**: Can browse menu, manage cart, place orders, and view their order history

## Assumptions, Challenges, and Limitations

### Assumptions
- Single restaurant application (not a marketplace with multiple restaurants)
- No delivery tracking functionality
- Cash on delivery is the only payment method
- Simple order status flow (pending → completed)

### Challenges
- Implementing role-based access control securely
- Managing cart state across sessions
- Ensuring proper authentication and authorization

### Limitations
- No payment gateway integration
- Limited order status options
- No delivery tracking or estimated delivery times
- No user reviews or ratings system

## Future Enhancements
- Add more payment options
- Implement order tracking
- Add user reviews and ratings
- Expand order status options (e.g., preparing, out for delivery)
- Add email notifications for order updates

## Project Structure
```
urban-food/
├── frontend/                 # React.js frontend application
│   ├── components/           # Reusable UI components
│   ├── context/              # React Context providers
│   ├── pages/                # React.js pages and API routes
│   ├── routes/               # Protected routes
│   ├── styles/               # Global styles and Tailwind config
│   └── assets/               # Static assets
├── backend/                  # Node.js backend API
│   ├── config/               # Configuration files
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middleware
│   ├── models/               # Database models
│   ├── routes/               # API route definitions
│   └── uploads/              # Storing added menu images
└── ...
```
