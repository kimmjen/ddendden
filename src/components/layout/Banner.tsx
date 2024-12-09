'use client'

import { useState, useEffect } from "react";
import {ChevronLeft, ChevronRight} from 'lucide-react';

export const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        {
            title: "풍향고",
            description: "바람 따라가는 여행",
            color: "bg-blue-500",
            tag: "#여행"
        },
        {
            title: "MINI 핑계",
            description: "미니어처의 세계",
            color: "bg-pink-500",
            tag: "#미니어처"
        },
        {
            title: "이달의 계원",
            description: "이 달의 최고 활동 계원은?",
            color: "bg-purple-500",
            tag: "#커뮤니티"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="relative h-64 overflow-hidden">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className={`h-full w-full ${banner.color} bg-opacity-90 flex items-center px-12`}>
                                <div className="w-1/2">
                    <span className="text-white text-sm font-medium mb-2 inline-block">
                      {banner.tag}
                    </span>
                                    <h2 className="text-4xl font-bold text-white mb-2">
                                        {banner.title}
                                    </h2>
                                    <p className="text-white text-lg">
                                        {banner.description}
                                    </p>
                                </div>
                                <div className="w-1/2 relative">
                                    <img
                                        src="/api/placeholder/400/320"
                                        alt="Banner"
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-lg shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Banner Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30"
                    >
                        <ChevronLeft className="w-6 h-6"/>
                    </button>

                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30"
                    >
                        <ChevronRight className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    )
}