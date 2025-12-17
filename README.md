# Mazelink
``` text
src/
├── app.ts
├── server.ts
├── config/
│   ├── env.ts
│   ├── cpm.config.ts
│   └── security.config.ts
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── links/
│   ├── redirect/
│   ├── analytics/
│   ├── earnings/
│   ├── withdrawals/
│   ├── referrals/
│   ├── tools/
│   ├── security/
│   ├── support/
│   ├── announcements/
│   └── admin/
│
├── db/
│   ├── prisma.ts
│   ├── redis.ts
│
├── queues/
│   ├── email.queue.ts
│   ├── cleanup.queue.ts
│   └── fraud.queue.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── admin.middleware.ts
│   ├── rateLimit.middleware.ts
│   └── trafficCheck.middleware.ts
│
├── utils/
│   ├── geo.ts
│   ├── device.ts
│   ├── browser.ts
│   ├── ip.ts
│   └── graph.ts
