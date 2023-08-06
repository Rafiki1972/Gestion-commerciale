import '../public/style/logo.css'
export default function () {
    return (
        <div className="group relative flex flex-col items-center justify-center w-full h-50 max-sm:my-5">
            <img className="transform transition logo-image translate-x-4 translate-y-4 scale-120" src={'./images/yellow.png'} alt="logo" />
            <img className="transform transition logo-image translate-x-3 translate-y-3 scale-115" src={'./images/blue-white.png'} alt="logo" />
            <img className="transform transition logo-image translate-x-2 translate-y-2 scale-110" src={'./images/blue.png'} alt="logo" />
            <img className="transform transition logo-image translate-x-1 translate-y-1 scale-105" src={'./images/beige.png'} alt="logo" />
            <img className="logo-image" src={'./images/black.png'} alt="logo" />
        </div>
    )

}