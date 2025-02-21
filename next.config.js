/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình CORS và Headers
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  // Tắt strict mode nếu cần
  reactStrictMode: true,

  // Cấu hình đường dẫn API
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },

  // Cấu hình build output
  output: "standalone",

  // Tắt ESLint trong quá trình build nếu cần
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Bỏ qua lỗi TypeScript trong quá trình build nếu cần
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
