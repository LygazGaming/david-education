"use client";
import React from 'react';
import { FaArrowRight, FaCalendarAlt, FaEye } from 'react-icons/fa';
import NEWS_DATA from '../data/newsData';
import Link from 'next/link';

const NewsCard = ({ news, featured = false }) => {
  if (featured) {
    return (
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="md:w-1/2 relative overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-orange-500" />
                {news.date}
              </span>
              <span className="flex items-center gap-1">
                <FaEye className="text-orange-500" />
                {news.views} lượt xem
              </span>
            </div>
            <Link href={`/news/${news.id}`}> {/* Bọc tiêu đề trong Link */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-orange-500 transition-colors">
                {news.title}
              </h3>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              {news.excerpt}
            </p>
          </div>
          <button className="flex items-center gap-2 text-orange-500 font-semibold mt-4 group">
            <Link href={`/news/${news.id}`}> {/* Thêm Link để điều hướng */}
              Xem chi tiết
            </Link>
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" />
            {news.date}
          </span>
          <span className="flex items-center gap-1">
            <FaEye className="text-orange-500" />
            {news.views}
          </span>
        </div>
        <Link href={`/news/${news.id}`}> {/* Bọc tiêu đề trong Link */}
          <h4 className="font-bold text-gray-800 hover:text-orange-500 transition-colors">
            {news.title}
          </h4>
        </Link>
        <p className="text-gray-600 mt-2 text-sm">
          {news.excerpt}
        </p>
        <button className="flex items-center gap-2 text-orange-500 font-semibold mt-4 text-sm group">
          <Link href={`/news/${news.id}`}> {/* Thêm Link để điều hướng */}
            Xem thêm
          </Link>
          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default function TinTuc() {
  const featuredNews = NEWS_DATA.find(news => news.featured);
  const regularNews = NEWS_DATA.filter(news => !news.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Tin tức</h2>
          <div className="h-1 w-20 bg-orange-500 mt-2"></div>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors group">
          <Link href="/news">
            <span>Xem tất cả</span>
          </Link>
          <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <div className="space-y-8">
        {featuredNews && <NewsCard news={featuredNews} featured={true} />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}