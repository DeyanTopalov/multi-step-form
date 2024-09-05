/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' https:; script-src 'self'; style-src 'self'; font-src 'self'; frame-src 'self'; connect-src 'self' https://api.resend.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
