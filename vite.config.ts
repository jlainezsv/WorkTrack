import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "WorkTrack",
        short_name: "WorkTrack",
        description: "Time tracking system for small teams",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache"
            }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache"
            }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache"
            }
          },
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 5
            }
          }
        ]
      }
    })
  ],

  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "src/domain"),
      "@application": path.resolve(__dirname, "src/application"),
      "@infrastructure": path.resolve(__dirname, "src/infrastructure"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})