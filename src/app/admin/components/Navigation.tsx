'use client'

import {usePathname} from "next/navigation";
import Link from "next/link";
import {MENU_ITEMS} from "@/app/admin/lib/constants";
import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

export function Navigation() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({}); // 여러 드롭다운 관리

    const toggleMenu = (menuPath: string) => {
        setOpenMenus((prev) => ({ ...prev, [menuPath]: !prev[menuPath] }));
    };

    return (
        <nav className="space-y-2">
            {MENU_ITEMS.map((item) =>
                item.subItems ? (
                    <div key={item.path}>
                        {/* 콘텐츠 관리 링크 */}
                        <div
                            className={`flex items-center justify-between p-3 rounded transition-colors ${
                                pathname === item.path
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <Link href={item.path} className="flex items-center space-x-3">
                                {/*<span>{item.icon}</span>*/}
                                <span>{item.label}</span>
                            </Link>
                            <button
                                onClick={() => toggleMenu(item.path)}
                                className="text-gray-400 hover:text-white transition-transform transform"
                            >
                                {openMenus[item.path] ? (
                                    <ChevronUp className="h-4 w-4"/>
                                ) : (
                                    <ChevronDown className="h-4 w-4"/>
                                )}
                            </button>
                        </div>

                        {/* 하위 항목 */}
                        {openMenus[item.path] && (
                            <div className="ml-4 mt-2 space-y-2">
                                {item.subItems.map((subItem) => (
                                    <Link
                                        key={subItem.path}
                                        href={subItem.path}
                                        className={`block p-2 rounded transition-colors ${
                                            pathname === subItem.path
                                                ? 'bg-gray-700 text-white'
                                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        {subItem.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center space-x-3 p-3 rounded transition-colors ${
                            pathname === item.path
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        {/*<span>{item.icon}</span>*/}
                        <span>{item.label}</span>
                    </Link>
                )
            )}
        </nav>
    );
}