import { Component } from "react";


const pageLimit: React.CSSProperties = {
    height: '100vh',
    overflow: 'hidden'
};

// Deactivate buttons for scrolling
window.addEventListener("keydown", function(e) {
    // space, page up, page down and arrow keys:
    if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Deactivate scroll with mousewheel click
window.addEventListener("mousedown", function(e) {
    if (e.which === 2) {
      e.preventDefault();
    }
  });

export default class WelcomePage extends Component {
    render() {
        return (
            <div className="relative min-h-screen flex items-center justify-center bg-white_welcome dark:bg-dark_welcome" style={pageLimit}>
                <div className="grid-background absolute inset-0 p-2 grid grid-cols-12 gap-2 transform skew-y-12 skew-x-0 scale-120">
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover11.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover12.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover13.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover14.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-2400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover15.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-3200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>

                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover21.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover22.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover23.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover24.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover25.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>

                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover31.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover32.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover33.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover34.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-2400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover35.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-3200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>

                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover41.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover42.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover43.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover44.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover45.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>

                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover51.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover52.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover53.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover54.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-2400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover55.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-3200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>

                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover61.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover62.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover63.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover64.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover65.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>

                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover71.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover72.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover73.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover74.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-2400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover75.jpg" className="object-fill rounded-lg animate-pulse animation-duration-4s animation-delay-3200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>

                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover81.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover82.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-400ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover83.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-800ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover84.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1200ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"><img alt="Cover" src="./coverWelcomepage/cover85.jpg" className="object-fill rounded-lg animate-pulse animation-duration-2s animation-delay-1600ms" /></div>
                    <div className="col-span-2 bg-white_welcome dark:bg-dark_welcome rounded-lg"></div>
                </div>

                <div className="grid-background absolute inset-0 p-2 grid grid-cols-9 gap-0">
                    <div className="col-span-6 "></div>
                    <div className="col-span-3 dark:bg-gradient-to-r dark:from-transparent dark:via-dark_welcome dark:to-dark_welcome bg-gradient-to-r from-transparent via-white_welcome to-white_welcome"></div>
                </div>

                <div className="felx content-center justify-center">
                    <h2 className="absolute py-2.5 text-8xl dark:text-white text-black font-extrabold text-center pt-12">Welcome to <span className="text-primary text-7x1">MyWatchlist</span></h2>
                </div>
            </div >
        )
    }
}