import { AppShell } from "@/components/app/AppShell";

// Every screen in the (app) group is wrapped with the shell, which handles
// auth protection and the sidebar / bottom navigation.
export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
