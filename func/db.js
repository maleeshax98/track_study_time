// (action-browser)/./libs/db.js
import { PrismaClient } from "@prisma/client";

global.prisma = global.prisma || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default global.prisma;