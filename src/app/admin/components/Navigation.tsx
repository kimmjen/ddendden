'use client'

import {usePathname} from "next/navigation";
import Link from "next/link";
import {MENU_ITEMS} from "@/app/admin/lib/constants";

export function Navigation() {
    const pathname = usePathname()

    return (
        <nav className="space-y-2">
            {MENU_ITEMS.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-3 p-3 rounded transition-colors
                        ${pathname === item.path
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                    {/*<span>{item.icon}</span>*/}
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    )
}