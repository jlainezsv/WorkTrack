import type { ReactNode } from "react"
import { ThemeToggle } from "@/ui/components/ThemeToggle"
import { MainMenu } from "../components/MainMenu"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <MainMenu />
        </div>
        {children}
      </div>
    </div>
  )
}




