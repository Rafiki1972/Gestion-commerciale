import { removeCookie } from './cookie';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js


const LogoutButton = () => {
    const router = useRouter(); // Initialize useRouter

    const handleLogout = () => {
        removeCookie('username'); // Remove the cookie
        router.push('./'); // Navigate to the "About" page if username exists
    };

    return (
        <>
        <button onClick={handleLogout} className='w-full text-left'>Se déconnecter</button>
        </>
    );
};

export default LogoutButton;
