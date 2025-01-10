// app/layouts/AdminLayout.js
"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token && pathname !== '/admin/login') {
            router.push('/admin/login');
        } else if (token) {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    if (pathname === '/admin/login') {
        return children;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/admin/dashboard" className="flex items-center">
                                <span className="text-xl font-semibold">Admin Dashboard</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link href="/admin/news" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
                                Quản lý tin tức
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('adminToken');
                                    router.push('/');
                                }}
                                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out shadow-md transform hover:scale-105"
                            >
                                Quay về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}