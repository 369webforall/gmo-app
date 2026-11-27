import { config } from 'dotenv';
import { defineConfig} from 'prisma/config';

config({ path: '.env' });
config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts'
  },
  // ...your existing config
  turbopack: {
    resolveAlias: {
      '@prisma/client/runtime/library': '@prisma/client/runtime/client',
    },
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  }
});
