// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";
// // import connectDB from './config/db.js';
// // import userRoutes from './routes/userRoutes.js';
// // import taskRoutes from './routes/taskRoutes.js';
// // import projectRoutes from './routes/projectRoutes.js';
// import workspaceRoutes from './routes/workspaceRoutes.js';




// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(clerkMiddleware())
// dotenv.config()
// // app.use('/api/users', userRoutes);
// // app.use('/api/tasks', taskRoutes);
// // app.use('/api/projects', projectRoutes);
// app.use('/api/workspaces', protect, workspaceRoutes);

// app.get('/', (req, res) => res.send('Server is running'));
// app.use("/api/inngest", serve({ client: inngest, functions }));
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import dotenv from 'dotenv';
dotenv.config(); // Sabse upar hona chahiye

import express from 'express';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express'; // requireAuth use karein
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import workspaceRoutes from './routes/workspaceRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Clerk middleware setup
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send('Server is running'));

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Protected workspace routes
// 'protect' ki jagah Clerk ka 'requireAuth()' use karein ya ise hata dein agar workspaceRoutes ke andar check kar rahe hain
app.use('/api/workspaces', workspaceRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));