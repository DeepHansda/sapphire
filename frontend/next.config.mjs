/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      env: {
        NEXT_PUBLIC_MY_NAME: process.env.NEXT_PUBLIC_API_URL, // pulls from .env file
      },
};

export default nextConfig;
