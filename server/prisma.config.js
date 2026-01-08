// import { defineConfig, env } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   datasource: {
//     url: env("DATABASE_URL"),
//   },
// });
// import 'dotenv/config'
// import { defineConfig, env } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   datasource: {
//     url: "psql 'postgresql://neondb_owner:npg_gJ5wlKPpXUc6@ep-flat-field-a4r5pr88-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
//   },
// });
// import { defineConfig, env } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   datasource: {
//     url: env("DATABASE_URL"),
//   },
// });
// import { defineConfig, env } from "prisma/config";

// console.log("PRISMA DATABASE URL 👉", env("DATABASE_URL"));

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   datasource: {
//     url: env("DATABASE_URL"),
//   },
// });
import dotenv from "dotenv";
dotenv.config(); // force-load .env

import { defineConfig } from "prisma/config";

console.log("FINAL DATABASE URL 👉", process.env.DATABASE_URL);

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});

