/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    // TODO: Replace with your actual image domains when deploying
    // Add your cloud storage domain here (e.g., 'milton-college.s3.amazonaws.com')
  },
};

module.exports = nextConfig;
