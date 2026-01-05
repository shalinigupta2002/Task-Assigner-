// import 'dotenv/config';
// import { PrismaClient } from '@prisma/client';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { neonConfig } from '@neondatabase/serverless';

// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;

// // To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// // neonConfig.poolQueryViaFetch = true

// // Type definitions
// // declare global {
// //   var prisma: PrismaClient | undefined
// // }

// const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaNeon({ connectionString });
// const prisma = global.prisma || new PrismaClient({ adapter });

// if (process.env.NODE_ENV === 'development') global.prisma = prisma;

// export default prisma;

import 'dotenv/config';
// Import from the custom output path defined in schema.prisma
import { PrismaClient } from '../src/generated/prisma/client/index.js'; 
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

// Correct way to initialize the adapter in Prisma 7
const adapter = new PrismaNeon({ connectionString });

// Prisma 7 REQUIRES the adapter to be passed in the constructor
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;