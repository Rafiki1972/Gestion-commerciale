import { Form } from './Form';
import { motion } from "framer-motion";
import Logo from './Logo';
export const LandingPage = () => {
    return (
        <div className="relative">
            <img
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                className="absolute inset-0 object-cover w-full h-full"
                alt=""
            />
            <div className="relative bg-gray-900 bg-opacity-75">
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
                        <Logo />
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
};