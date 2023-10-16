import React from 'react';
import { motion } from "framer-motion"

interface ProductProps {
    productData: any; // You can specify a more specific type if needed
    closeProduct: () => void;
}
const Product: React.FC<ProductProps> = ({ productData, closeProduct }) => {
    let parsedProductData;
    try {
        // Attempt to parse the productData string into an object
        parsedProductData = JSON.parse(productData);
    } catch (error) {
        // Handle any parsing errors (e.g., if the string is not valid JSON)
        console.error('Error parsing product data:', error);
    }

    if (Array.isArray(parsedProductData)) {
        // If parsing was successful and the parsed data is an array, display it
        return (
            <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 cursor-pointer">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1 }}
                    className='bg-white p-8 rounded-lg min-w-[500px]'>
                    <button
                        onClick={closeProduct}
                        className="absolute top-0 right-0 bg-black opacity-50 z-[-1] text-gray-600 hover:text-gray-800 w-[100%] h-[100%]"
                    >
                    </button>
                    <h2>Products</h2>
                    <ul className='w-full grid grid-cols-3 gap-3 my-5'>
                        {parsedProductData.map((product) => (
                            <li
                                className='text-left rounded border border-black px-3 py-2'
                                key={product.ArticleID}>
                                <strong>{product.NomDeLArticle}:</strong>
                                <p>Quantite: {product.Quantite}</p>
                                <p>PrixUnitaire: {product.PrixUnitaire}</p>
                                <p>SousTotal: {product.SousTotal}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={closeProduct}
                        className='mx-auto bg-gray-600 text-white w-full mt-3 p-3'>
                        Cancel
                    </button>
                </motion.div>
            </div >
        );
    } else {
        // If parsing failed or the parsed data is not an array, display an error message
        return (
            <div>
                <p>Product data is not available or not in the expected format.</p>
                <button onClick={closeProduct}>Close</button>
            </div>
        );
    }
};
export default Product;
