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
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Sidebar + Topbar
│   │   ├── page.tsx            # Dashboard (Home)
│   │   ├── links/
│   │   │   └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── earnings/
│   │   │   └── page.tsx
│   │   ├── withdrawals/
│   │   │   └── page.tsx
│   │   ├── referrals/
│   │   │   └── page.tsx
│   │   ├── tools/
│   │   │   └── page.tsx
│   │   ├── security/
│   │   │   └── page.tsx
│   │   ├── support/
│   │   │   └── page.tsx
│   │   ├── announcements/
│   │   │   └── page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── withdrawals/
│   │   │   └── page.tsx
│   │   ├── links/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │
│   ├── layout.tsx              # Root layout (theme, fonts)
│   ├── globals.css
│   └── page.tsx                # Landing page (public)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── ui/                      # shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   └── table.tsx
│   │
│   ├── charts/
│   │   ├── EarningsChart.tsx
│   │   ├── ViewsChart.tsx
│   │   └── CPMChart.tsx
│   │
│   ├── common/
│   │   ├── StatCard.tsx
│   │   ├── PageHeader.tsx
│   │   ├── EmptyState.tsx
│   │   └── LoadingSkeleton.tsx
│   │
│   └── forms/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       ├── LinkCreateForm.tsx
│       └── WithdrawForm.tsx
│
├── lib/
│   ├── api.ts                  # Axios instance
│   ├── auth.ts                 # Auth helpers
│   ├── utils.ts                # Common helpers
│   └── constants.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useUser.ts
│   ├── useTheme.ts
│   └── useDebounce.ts
│
├── store/
│   ├── auth.store.ts           # Zustand / Context
│   └── ui.store.ts
│
├── types/
│   ├── user.ts
│   ├── link.ts
│   ├── withdrawal.ts
│   └── analytics.ts
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
├── package.json
└── .env.local
