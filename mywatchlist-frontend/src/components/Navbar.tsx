import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-600">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between">
                <div className="flex space-x-4">
                    <div>
                        <a href="#" className="flex items-center py-3 px-2 text-white">
                            <svg className="h-14 w-14 mr-3 text-emerald-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span>MyWatchlist</span>    
                        </a>
                    </div>

                    <div className="flex items-center space-x-1">Searchbar</div>
                </div>

                <div className="flex items-center space-x-1">
                    <a href="" className="py-1 px-3 text-white">Login</a>
                    <a href="" className="py-1.5 px-2 text-white border border-emerald-300 rounded shadow">Signup</a>
                </div>
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar