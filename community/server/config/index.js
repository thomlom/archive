require('dotenv').config()

const config = {
    'port': process.env.PORT || 3001,
    'secret': process.env.JWT_SECRET_KEY,
    'database': process.env.DB_URI
}

export default config;