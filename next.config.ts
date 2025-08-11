import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Output configuration for Netlify (production only)
  ...(isDev ? {} : { 
    output: "export", 
    trailingSlash: false, // Remove trailing slash for cleaner URLs
  }),

  // Development optimizations
  ...(isDev && {
    eslint: {
      ignoreDuringBuilds: true, // Skip ESLint during dev builds
    },
    typescript: {
      ignoreBuildErrors: true, // Skip TypeScript checking during dev builds
    },
  }),

  // Disable image optimization for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },

  // Performance optimizations
  compiler: {
    removeConsole: isDev ? false : {
      exclude: ['error', 'warn'], // Keep error/warn logs in production
    },
  },

  // Reduce bundle size
  experimental: {
    optimizeCss: true, // Optimize CSS loading
  },
};

export default nextConfig;
