"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MapPin, Plane, LogOut } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Trips', href: '/trips', icon: Plane },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
            <div className="p-6">
                <h1 className="text-xl font-bold">Umrah Admin</h1>
                <p className="text-xs text-gray-400 mt-1">Al Goni Tours & Travels</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                                }`}
                        >
                            <Icon size={20} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={() => {
                        localStorage.removeItem('admin_token');
                        window.location.href = '/login';
                    }}
                    className="flex items-center gap-3 px-3 py-2 w-full text-gray-400 hover:text-white transition-colors"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
