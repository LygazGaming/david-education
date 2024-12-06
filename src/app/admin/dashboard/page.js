"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalNews: 0,
        featuredNews: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/news');
                const news = await response.json();
                setStats({
                    totalNews: news.length,
                    featuredNews: news.filter(item => item.featured).length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-2">Tổng số tin tức</h2>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalNews}</p>
                    <Link href="/admin/news" className="text-blue-500 hover:underline mt-4 inline-block">
                        Quản lý tin tức →
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-2">Tin tức nổi bật</h2>
                    <p className="text-3xl font-bold text-green-600">{stats.featuredNews}</p>
                    <Link href="/admin/news?filter=featured" className="text-blue-500 hover:underline mt-4 inline-block">
                        Xem tin nổi bật →
                    </Link>
                </div>
            </div>
        </div>
    );
} 