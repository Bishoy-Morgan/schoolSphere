'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const pathname = usePathname()
    return (
        <nav className="w-full bg-white/5 backdrop-blur-sm border-b border-white/10 px-8 py-4 shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center md:justify-between">
                <div className="w-4/5 md:w-1/5   ">
                    <ul className='flex items-center md:justify-start justify-center gap-x-10'>
                        <Link
                        href={'/'}
                        className={`text-white/80 font-medium hover:text-yellow-200 ${pathname === '/' ? 'text-yellow-200' : ''}`}
                        >
                            <li>Home</li>
                        </Link>
                        <Link 
                        href={'/schools'}
                        className={`text-white/80 font-medium hover:text-yellow-200 ${pathname === '/schools' ? 'text-yellow-200' : ''}`}
                        >
                            <li>Schools</li>
                        </Link>
                    </ul>
                </div>
                <div className="w-4/5 md:w-1/5 flex justify-center items-center mt-1 mb-2 md:mt-0 md:mb-0  ">
                    <h1 className="w-full text-center text-4xl italic bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
                        SchoolSphere
                    </h1>
                </div>
                <div className="w-4/5 md:w-1/5 text-xs md:text-sm text-white/80 font-medium text-center md:text-end">
                    School Management Platform
                </div>
            </div>
        </nav>
    )
}

export default Navbar
