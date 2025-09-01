'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';
import citySVG from '@/public/icons/city.svg';
import searchSVG from '@/public/icons/search.svg';
import addressSVG from '@/public/icons/address.svg';

type School = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    contact: number;
    image: string;
    email_id: string;
};

export default function ShowSchools() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);

    useEffect(() => {
        fetchSchools();
    }, []);

    useEffect(() => {
        const filtered = schools.filter(school =>
            school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSchools(filtered);
    }, [schools, searchTerm]);

    const fetchSchools = async () => {
        try {
        const response = await fetch('/api/schools');
        if (response.ok) {
            const data = await response.json();
            setSchools(data);
        } else {
            console.error('Failed to fetch schools');
        }
        } catch (error) {
            console.error('Error fetching schools:', error);
        } finally {
            setLoading(false);
        }
    };

    // const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    
    const getImagePath = (imagePath: string) => {
        if (!imagePath) return "/schoolImages/default.jpg";

        if (imagePath.startsWith('/')) {
            return imagePath;
        }
        return `/schoolImages/${imagePath}`;
    };

    // Handle image error
    // const handleImageError = (schoolId: number) => {
    //     setImageErrors(prev => new Set([...prev, schoolId]));
    // };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="w-full px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                            Discover Schools
                        </h1>
                        <p className="text-xl text-white/90 drop-shadow-lg max-w-2xl mx-auto">
                            Explore educational institutions in your area. Find the perfect school for your needs.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Image src={searchSVG} alt="Search Icon" width={22} height={22} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search schools by name, city, or address..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full !pl-12 pr-4 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all text-lg"
                            />
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl">
                            <span className="text-white/90 font-medium">
                                {loading ? 'Loading...' : `${filteredSchools.length} Schools Found`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schools Grid */}
            <div className="w-full px-8 pb-16">
                <div className="max-w-7xl mx-auto">
                {loading ? (
                    // Loading State
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 animate-pulse">
                                <div className="bg-white/20 rounded-2xl h-48 mb-4"></div>
                                <div className="bg-white/20 rounded-lg h-6 mb-3"></div>
                                <div className="bg-white/20 rounded-lg h-4 mb-2"></div>
                                <div className="bg-white/20 rounded-lg h-4 w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredSchools.length === 0 ? (
                    // No Schools State
                    <div className="text-center py-20">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🏫</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">No Schools Found</h3>
                            <p className="text-white/80 mb-6">
                                {searchTerm ? 'No schools match your search criteria.' : 'No schools have been added yet.'}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    // Schools Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredSchools.map((school) => (
                            <div
                            key={school.id}
                            className="group bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                            >
                                {/* School Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={getImagePath(school.image)}
                                        alt={school.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            // Fallback to default image
                                            const target = e.currentTarget as HTMLImageElement;
                                            if (target.src !== '/schoolImages/default.jpg') {
                                                target.src = '/schoolImages/default.jpg';
                                            }
                                        }}
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* School Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                                        {school.name}
                                    </h3>
                                    
                                    <div className="space-y-2 ">
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={addressSVG}
                                                alt="Location Icon"
                                                width={26}
                                                height={26}
                                                className="flex-shrink-0 "
                                            />
                                            <p className="text-white/80 text-sm line-clamp-2">
                                                {school.address}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                src={citySVG}
                                                alt="Address Icon"
                                                width={24}
                                                height={24}
                                                className="flex-shrink-0 "
                                            />
                                            <p className="text-white font-semibold text-sm">
                                                {school.city}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-6 pt-4 border-t border-white/20">
                                        <button className="w-full bg-transparent group-hover:bg-white border border-white/10 text-yellow-400 font-bold py-3 px-10 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </div>

        </div>
    );
}