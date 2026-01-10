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

// export default prisma;../src/generated/prisma/client/index.js

// import 'dotenv/config';
// // Import from the custom output path defined in schema.prisma

// import { PrismaClient } from '../generated/prisma/client/index.js';
// import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { neonConfig } from '@neondatabase/serverless';
// import ws from 'ws';

// neonConfig.webSocketConstructor = ws;

// const connectionString = process.env.DATABASE_URL;

// // Correct way to initialize the adapter in Prisma 7
// const adapter = new PrismaNeon({ connectionString });

// // Prisma 7 REQUIRES the adapter to be passed in the constructor
// const prisma = global.prisma || new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// export default prisma;
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';
import dotenv from 'dotenv';

dotenv.config();

// Neon WebSocket setup
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

// Connection pool setup for Neon
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// Singleton pattern to prevent multiple connections in dev
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis;

// Variable ko sirf ek baar declare kar rahe hain
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;