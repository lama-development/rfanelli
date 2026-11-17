import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Fill the gaps between Next.js defaults for the small book covers.
    imageSizes: [32, 48, 64, 96, 128, 192, 224, 256, 320, 384, 448, 512, 576],
  },
}

export default nextConfig
