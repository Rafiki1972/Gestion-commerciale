'use client'
interface FooterDarkmMode {
    DarkMode : boolean
}
export const Footer = (props : FooterDarkmMode) => {
    let DarkMode = props.DarkMode;
    return (
        <div className={`relative ${ DarkMode ? 'bg-gray-900' : 'bg-purple-900'}`}>
            <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                <a
                    // onClick={handleGoUpClick}
                    className="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
                    href="#top"
                >
                    <span className="sr-only">Back to top</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </div>
            <svg
                className={`absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 ${ DarkMode ? 'text-gray-900' : 'text-purple-900'}`}
                preserveAspectRatio="none"
                viewBox="0 0 1440 54"
            >
                <path
                    fill="currentColor"
                    d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
                />
            </svg>
            <div className="flex items-center justify-center px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <a
                    href="/"
                    aria-label="Go home"
                    title="Company"
                    className="transition-colors duration-300 inline-flex items-center group hover:text-teal-400"
                >
                    <svg
                        className="w-8 text-teal-400 group-hover:text-gray-500 w-2/6 mx-auto"
                        version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500.000000 500.000000"
                        preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                            fill="currentColor" stroke="none">
                            <path d="M1493 4978 c-12 -16 -1385 -3425 -1390 -3454 -3 -11 3 -28 12 -37 15
                                        -15 65 -17 526 -17 l510 0 21 23 c12 12 90 193 173 402 84 208 159 384 168
                                        389 12 8 21 7 32 -5 9 -9 220 -522 469 -1140 l453 -1124 31 -3 c22 -2 34 2 40
                                        15 6 10 121 293 256 628 180 443 246 618 243 640 -4 32 -1449 3635 -1473 3673
                                        -16 24 -56 30 -71 10z"/>
                            <path d="M3443 4978 c-17 -23 -505 -1242 -505 -1263 0 -32 881 -2219 899
                                        -2233 13 -9 134 -12 523 -12 554 0 547 -1 538 56 -6 33 -1363 3407 -1384 3442
                                        -16 24 -56 30 -71 10z"/>
                        </g>
                    </svg>
                </a>
            </div>
            <div className="mx-auto max-w-[75%] flex flex-col justify-between pt-5 pb-10 border-t border-purple-200 sm:flex-row">
                <p className="text-sm text-gray-100 font-mono">
                    © Copyright 2023. Tous droits réservés à <a href="https://github.com/Rafiki1972" className="text-teal-400">Ahmed rfk</a>
                </p>
            </div>
        </div>
    );
};