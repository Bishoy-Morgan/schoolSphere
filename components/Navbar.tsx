import React from 'react'

const Navbar = () => {
    return (
        <nav className="w-full bg-white/5 backdrop-blur-sm border-b border-white/10 px-8 py-4 shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="w-1/5 flex justify-start items-center  ">
                    <h1 className="w-full text-4xl italic bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">
                        SchoolSphere
                    </h1>
                </div>
                <div className="w-1/5 text-sm text-white/80 font-medium">
                    School Management Platform
                </div>
            </div>
        </nav>
    )
}

export default Navbar
