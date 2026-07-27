export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
