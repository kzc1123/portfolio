/** @type {import('next').NextConfig} */
const nextConfig = {
  // One public address for search engines: send the old alias to the main domain.
  // Keep the destination in sync with SITE_URL in lib/site.ts.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kshitiz-chaurasia.vercel.app" }],
        destination: "https://itskz.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
