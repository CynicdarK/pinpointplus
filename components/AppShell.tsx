"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Market", href: "/market" },
    { name: "Collections", href: "/collections" },
    { name: "Rankings", href: "/rankings" },
    { name: "Analytics", href: "/analytics" },
    { name: "Tools", href: "/tools" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold">PinPointPlus</h1>
          <p className="text-sm text-slate-400">Pinnacle analytics dashboard</p>
        </div>

        <input
          className="w-96 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none"
          placeholder="Search pins, users, sets..."
        />

        <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold">
          Login
        </button>
      </header>

      <div className="flex">
        <aside className="min-h-[calc(100vh-73px)] w-64 border-r border-slate-800 bg-slate-900 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    isActive
                      ? "block w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold"
                      : "block w-full rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1 p-6">{children}</section>
      </div>
    </main>
  );
}