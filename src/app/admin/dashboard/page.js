"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaNewspaper, FaImages, FaUserTie, FaVideo, FaGraduationCap, FaHandshake } from 'react-icons/fa';

export default function Dashboard() {
    const [stats, setStats] = useState({
        news: { total: 0, featured: 0 },
        albums: { total: 0 },
        coaches: { total: 0, featured: 0 },
        courses: { total: 0, featured: 0 },
        videos: { total: 0, featured: 0 },
        sponsors: { total: 0, active: 0 }
    });

    useEffect(() => {
        const fetchAllStats = async () => {
            try {
                const [news, albums, coaches, courses, videos, sponsors] = await Promise.all([
                    fetch('/api/news').then(res => res.json()),
                    fetch('/api/album').then(res => res.json()),
                    fetch('/api/coach').then(res => res.json()),
                    fetch('/api/course').then(res => res.json()),
                    fetch('/api/video').then(res => res.json()),
                    fetch('/api/sponsor').then(res => res.json())
                ]);

                setStats({
                    news: {
                        total: news.length,
                        featured: news.filter(item => item.featured).length
                    },
                    albums: {
                        total: albums.albums ? albums.albums.length : 0
                    },
                    coaches: {
                        total: coaches.length,
                        featured: coaches.filter(item => item.featured).length
                    },
                    courses: {
                        total: courses.length,
                        featured: courses.filter(item => item.featured).length
                    },
                    videos: {
                        total: videos.videos ? videos.videos.length : 0,
                        featured: videos.videos ? videos.videos.filter(item => item.featured).length : 0
                    },
                    sponsors: {
                        total: sponsors.length,
                        active: sponsors.filter(item => item.active).length
                    }
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchAllStats();
    }, []);

    const StatCard = ({ title, total, featured, icon: Icon, link, featuredLink, featuredText }) => (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
                <Icon className="text-2xl text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">{total}</p>
            {featured !== undefined && (
                <p className="text-lg text-green-600 mb-4">
                    {featuredText}: {featured}
                </p>
            )}
            <div className="space-y-2">
                <Link href={link} className="text-blue-500 hover:underline block">
                    Quản lý {title} →
                </Link>
                {featuredLink && (
                    <Link href={featuredLink} className="text-green-500 hover:underline block">
                        Xem {featuredText} →
                    </Link>
                )}
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Bảng điều khiển</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Tin tức"
                    total={stats.news.total}
                    featured={stats.news.featured}
                    icon={FaNewspaper}
                    link="/admin/news"
                    featuredLink="/admin/news?filter=featured"
                    featuredText="Tin nổi bật"
                />
                
                <StatCard
                    title="Album ảnh"
                    total={stats.albums.total}
                    icon={FaImages}
                    link="/admin/albums"
                />

                <StatCard
                    title="Huấn luyện viên"
                    total={stats.coaches.total}
                    featured={stats.coaches.featured}
                    icon={FaUserTie}
                    link="/admin/coaches"
                    featuredLink="/admin/coaches?filter=featured"
                    featuredText="HLV nổi bật"
                />

                <StatCard
                    title="Khóa học"
                    total={stats.courses.total}
                    featured={stats.courses.featured}
                    icon={FaGraduationCap}
                    link="/admin/courses"
                    featuredLink="/admin/courses?filter=featured"
                    featuredText="Khóa học nổi bật"
                />

                <StatCard
                    title="Video"
                    total={stats.videos.total}
                    featured={stats.videos.featured}
                    icon={FaVideo}
                    link="/admin/videos"
                    featuredLink="/admin/videos?filter=featured"
                    featuredText="Video nổi bật"
                />

                <StatCard
                    title="Nhà tài trợ"
                    total={stats.sponsors.total}
                    featured={stats.sponsors.active}
                    icon={FaHandshake}
                    link="/admin/sponsors"
                    featuredText="Đang hoạt động"
                />
            </div>
        </div>
    );
}