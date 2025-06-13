import express from 'express'
import "dotenv/config"
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhooks } from './controllers/clerkWebhooks.js'
import connectDB from './configs/db.js'

connectDB()

const app = express()

app.use(cors()) // Enable Cross-Origin Resource Sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to Clerk webhooks
app.use('/api/clerk', clerkWebhooks)

app.get('/', (req,res) => res.send("API is working"))

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is running "http://localhost:${port}"`))

