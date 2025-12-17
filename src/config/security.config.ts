export const SECURITY_CONFIG = {
  RATE_LIMIT: {
    MAX: 100,
    TIME_WINDOW: "1 minute"
  },

  TRAFFIC: {
    BLOCK_VPN: true,
    BLOCK_PROXY: true,
    BLOCK_TOR: true,
    ALLOW_BOTS: false
  },

  SESSION: {
    MAX_ACTIVE_SESSIONS: 5
  },

  WITHDRAWAL: {
    MIN_AMOUNT: 5,
    ENABLED: true
  }
};
