"use client";
/**
 * Discord widget for Quixy's website.
 *
 * @returns A React component with an iframe that embeds Quixy's Discord server.
 */
export default function Discord() {
  return (
    <div className="w-full rounded-xl overflow-hidden">
      <iframe
        src="https://discord.com/widget?id=1263946404351709275&theme=dark"
        width="100%"
        height="500"
        sandbox="min-w-full allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
}
