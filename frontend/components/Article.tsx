import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { motion } from 'framer-motion';
import ProductDetails from './ProductDetails'
import Alert from './Alert'
import AddProductForm from './AddProductForm';

interface ArticleProps {
    DarkMode: boolean;
}

const ArticleComponent = (props: ArticleProps) => {
    let DarkMode = props.DarkMode;
    const [view, setView] = useState('lg:grid-cols-3');
    const [img, setImg] = useState(' w-full ');
    const [disp, setDisp] = useState('block');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [AlertState, setAlertState] = useState(null);
    const [AddArticle, setAddArticle] = useState(false);
    const [productsCheck, setProductsCheck] = useState([]);



    const ListView1 = () => {
        setView('lg:grid-cols-1');
        setImg('h-[50px] w-[50px] ');
        setDisp('flex align-center gap-[20px]');
    };

    const ListView2 = () => {
        setView('lg:grid-cols-3');
        setImg('w-[100%]');
        setDisp('block');
    };

    useEffect(() => {
        axios.get('http://localhost:3001/api/Product')
            .then(response => {
                setProducts(response.data);
                // setInterval(() => {
                //     setProductsCheck(response.data);
                //     if(products !== productsCheck ){
                //         console.log('data is not the same')
                //     }
                // },1000)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);



    const openProductDetails = (product: any) => {
        setSelectedProduct(product);
    };

    const closeProductDetails = () => {
        setSelectedProduct(null);
    };


    const openAlert = (text: any) => {
        setAlertState(text);
    };
    const closeAlert = () => {
        setAlertState(null);
    };

    const handleAddAricle = () => {
        setAddArticle(!AddArticle);
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-4 w-10/12 ml-auto">
                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <header>
                            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                Product Collection
                            </h2>

                            <p className="mt-4 max-w-md text-gray-500">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                                praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
                                natus?
                            </p>
                        </header>
                        <div className="mt-8 flex items-center justify-between">
                            <div className="flex rounde flex gap-2">
                                <button
                                    className={`inline-flex h-10 w-10 items-center justify-center rounded border border-gray-600  transition hover:bg-gray-500 hover:text-white ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-600'}`}
                                    onClick={ListView2}

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                        />
                                    </svg>
                                </button>

                                <button
                                    className={`inline-flex h-10 w-10 items-center justify-center rounded border border-gray-600   transition hover:bg-gray-500 hover:text-white ${DarkMode ? 'bg-gray-500 text-white' : 'bg-white text-gray-600'}`}
                                    onClick={ListView1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div>
                                <label htmlFor="SortBy" className="sr-only">SortBy</label>

                                <select id="SortBy"
                                    className={`px-2 cursor-pointer h-10 rounded border border-gray-600 text-sm ${DarkMode ? 'bg-gray-500 border text-white' : ''}`}>
                                    <option>Sort By</option>
                                    <option value="Title, DESC">Title, DESC</option>
                                    <option value="Title, ASC">Title, ASC</option>
                                    <option value="Price, DESC">Price, DESC</option>
                                    <option value="Price, ASC">Price, ASC</option>
                                </select>
                            </div>
                        </div>
                        <ul className={`mt-4 grid gap-4 sm:grid-cols-2 ${view}`}>
                            {products.map(product => (
                                <li key={product['ArticleID']} className='shadow hover:shadow-xl overflow-hidden'>
                                    <div className={` bg-white border rounded group block cursor-pointer ${disp}`}
                                        onClick={() => {
                                            openProductDetails(product);
                                        }}
                                    >

                                        <img
                                            src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, product['product_image']['data']))}`}

                                            alt={product['NomDeLArticle']}
                                            className={`h-[350px] object-cover transition duration-500 group-hover:scale-105 ${img}`}
                                        />


                                        <div className="relative p-3">
                                            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                {product['NomDeLArticle']}
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>
                                                <span className="tracking-wider text-gray-900">
                                                    {product['PrixDeVente']} DH
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {selectedProduct && (
                            <ProductDetails product={selectedProduct} onClose={closeProductDetails} openAlert={openAlert} />
                        )}
                        {AlertState && (
                            <Alert AlertText={AlertState} closeAlert={closeAlert} />
                        )}
                        {AddArticle && (
                            <AddProductForm closeAddProduct={handleAddAricle} />
                        )}
                        <div className='fixed z-90 top-10 right-8 group'>
                            <div className='flex items-end justify-center flex-col'>
                                <p className={`rounded-full -translate-x-10 p-4 drop-shadow-lg flex justify-center items-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition delay-700 duration-300 ease-in-out mb-2 rounded-ee-none ${DarkMode ? 'bg-gray-600' : 'bg-purple-600'}`}>Add Product</p>
                                <button onClick={handleAddAricle} title="Add Product"
                                    className={`rounded-full drop-shadow-lg flex justify-center items-center text-white text-2xl h-14 w-14 shadow-xl ${DarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-400'}`}>
                                    <AiOutlineAppstoreAdd />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default ArticleComponent;