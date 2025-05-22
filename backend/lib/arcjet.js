import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

// Initialize Arcjet

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: "ip.src",
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({
      mode: "LIVE",
    }),

    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
