import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "next-themes"
import { App } from "@ui/App"
import "./index.css"

import { registerSW } from "virtual:pwa-register"

// register PWA service worker
registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)