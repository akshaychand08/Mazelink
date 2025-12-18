export type FraudReason =
  | "BOT_TRAFFIC"
  | "VPN_PROXY"
  | "SELF_CLICK"
  | "HIGH_FREQUENCY"
  | "INVALID_UA"
  | "BLACKLISTED_IP";

export type FraudResult = {
  isFraud: boolean;
  reasons: FraudReason[];
};
