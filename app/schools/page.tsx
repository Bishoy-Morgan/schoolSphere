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
    const [displayedSchools, setDisplayedSchools] = useState<School[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    const SCHOOLS_PER_PAGE = 12;

    useEffect(() => {
        setMounted(true);
        fetchSchools();
    }, []);

    useEffect(() => {
        const filtered = schools.filter(school =>
            school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSchools(filtered);
        setCurrentPage(1);
    }, [schools, searchTerm]);

    useEffect(() => {
        const startIndex = 0;
        const endIndex = currentPage * SCHOOLS_PER_PAGE;
        setDisplayedSchools(filteredSchools.slice(startIndex, endIndex));
    }, [filteredSchools, currentPage]);

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

    const getImagePath = (imagePath: string) => {
        if (!imagePath) return "/schoolImages/default.jpg";

        if (imagePath.startsWith('/')) {
            return imagePath;
        }
        return `/schoolImages/${imagePath}`;
    };

    const handleLoadMore = () => {
        setLoadingMore(true);

        setTimeout(() => {
            setCurrentPage(prev => prev + 1);
            setLoadingMore(false);
        }, 500);
    };

    const hasMoreSchools = displayedSchools.length < filteredSchools.length;
    const remainingSchools = filteredSchools.length - displayedSchools.length;

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-yellow-400 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <div className="w-full px-4 md:px-8 py-12">
                <div className="md:max-w-7xl mx-auto">
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
                                {loading ? 'Loading...' : (
                                    <>
                                        Showing {displayedSchools.length} of {filteredSchools.length} Schools
                                        {searchTerm && ` (filtered)`}
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schools Grid */}
            <div className="w-full px-4 md:px-8 pb-16">
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
                    <>
                        {/* Schools Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                            {displayedSchools.map((school) => (
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

                        {/* Load More Button */}
                        {hasMoreSchools && (
                            <div className="text-center">
                                <div className="mb-4">
                                    <span className="text-white/70 text-sm">
                                        {remainingSchools} more school{remainingSchools !== 1 ? 's' : ''} available
                                    </span>
                                </div>
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-purple-900 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
                                >
                                    {loadingMore ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-900 border-t-transparent"></div>
                                            <span>Loading...</span>
                                        </div>
                                    ) : (
                                        `Load More Schools`
                                    )}
                                </button>
                            </div>
                        )}

                        {/* End Message */}
                        {!hasMoreSchools && displayedSchools.length > SCHOOLS_PER_PAGE && (
                            <div className="text-center">
                                <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl inline-block">
                                    <span className="text-white/80 font-medium">
                                        You&apos;ve viewed all {filteredSchools.length} schools!
                                    </span>
                                </div>
                            </div>
                        )}
                    </>
                )}
                </div>
            </div>
        </div>
    );
}