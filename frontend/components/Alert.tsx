import { motion } from 'framer-motion';

interface AlertPorps {
    AlertText: string | null;
    closeAlert: () => void;
}

const Alert = ({ AlertText , closeAlert }: AlertPorps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-[20px] left-0 w-full flex flex-col items-center justify-center z-50 cursor-pointer"
            onClick={closeAlert}
        >
            <div
                role="alert"
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-xl hover:shadow-2xl hover:bg-gray-100">
                <div className="flex items-start gap-4">
                    <span className="text-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>

                    <div className="flex-1">
                        <strong className="block font-medium text-gray-900"> Changes saved </strong>

                        <p className="mt-1 text-sm text-gray-700 cursor-pointer">
                            {AlertText}
                        </p>
                    </div>

                    <button className="text-gray-500 transition hover:text-gray-600">
                        <span className="sr-only">Dismiss popup</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>

    )
}

export default Alert;