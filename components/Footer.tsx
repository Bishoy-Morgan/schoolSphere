import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-transparent border-t border-white/10 px-8 py-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6">
                    <a
                    className="flex items-center space-x-2 md:text-xs text-white/80 hover:text-yellow-300 transition-colors"
                    href="https://nextjs.org/learn"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        About Us
                    </a>
                    <a
                    className="flex items-center space-x-2 md:text-xs text-white/80 hover:text-yellow-300 transition-colors"
                    href="https://vercel.com/templates?framework=next.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        Contact
                    </a>
                    <a
                    className="flex items-center space-x-2 md:text-xs text-white/80 hover:text-yellow-300 transition-colors"
                    href="https://vercel.com/templates?framework=next.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </a>
                    <a
                    className="flex items-center space-x-2 md:text-xs text-white/80 hover:text-yellow-300 transition-colors"
                    href="https://vercel.com/templates?framework=next.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        Terms & Conditions
                    </a>
                </div>
                
                <div className="text-sm md:text-xs text-white/60">
                    © 2025 SchoolSphere. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
