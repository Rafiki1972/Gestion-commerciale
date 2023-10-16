// components/AddProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
interface AddAchatPorps {
    closeAddAchat: () => void;
    fetchAchat(): void;
    openAlert(): void;
}
const AddAchatForm = ({ openAlert, closeAddAchat, fetchAchat }: AddAchatPorps) => {
    const [AchatData, setAchatData] = useState({
        SupplierID: '',
        MontantTotal: '',
        Notes: '',
    });
    const [SupplierId, setSupplierId] = useState('');
    const [showProducts, setshowProducts] = useState(false);
    const [Total, setTotal] = useState(0);

    const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});
    const [selectedProductsPrice, setSelectedProductsPrice] = useState<Record<string, number>>({});

    const [Supplier, setSupplier] = useState([]);
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/Supplier')
            .then((res) => res.json())
            .then((data) => setSupplier(data));
    }, []);
    useEffect(() => {
        fetch('http://localhost:3001/api/Product')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleSupplierChange = (e: any) => {
        const selectedSupplier = e.target.value;
        setSupplierId(selectedSupplier);
    };


    const handleShowProducts = () => {
        setshowProducts(!showProducts)
    }


    // Function to handle changes in the number of products
    const handleQuantityChange = (productId: any, quantity: any, price: any) => {   
        // Calculate the previous quantity for the selected product
        const prevQuantity = selectedProducts[productId] || 0;

        // Calculate the change in quantity
        const quantityChange = quantity - prevQuantity;

        // Calculate the total change in price for the selected product
        const productTotalChange = quantityChange * price;

        // Update the selectedProducts state
        setSelectedProducts({
            ...selectedProducts,
            [productId]: quantity,
        });
        setSelectedProductsPrice({
            ...selectedProductsPrice,
            [productId]: price,
        });

        // Update the Total state by subtracting the productTotalChange
        setTotal((prevTotal) => prevTotal + productTotalChange);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/addAchat', {
                SupplierID: SupplierId,
                MontantTotal: Total, // Use the calculated Total
                Notes: AchatData.Notes,
                SelectedProducts: selectedProducts, // Send the selected products data
                SelectedProductsPrice: selectedProductsPrice, // Send the selected products prices
            });
            // Handle the response from the backend here
        } catch (error) {
            console.log('Error adding product');
        }
        openAlert();
        closeAddAchat()
        fetchAchat();
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-black/80 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50"
        >
            <div className='bg-white p-4 rounded-lg min-w-[500px] max-w-md'>
                <h2 className="text-xl font-bold mb-4">Add New Achat</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 w-full">
                        <select
                            onChange={handleSupplierChange}
                            className="w-full bg-transparent text-gray-900 border border-gray-200 px-4 py-2"
                        >
                            <option
                                className="text-black"
                                value="">
                                Select Supplier
                            </option>
                            {Supplier && Supplier.length > 0 ? (
                                Supplier.map((SupplierInfo) => (
                                    <option
                                        key={SupplierInfo['SupplierID']}
                                        className="text-black"
                                        value={SupplierInfo['SupplierID']}>
                                        {SupplierInfo['NomDuFournisseur']}
                                    </option>
                                ))
                            ) : (
                                <option className="text-black">No Class found</option>
                            )}
                        </select>

                    </div>
                    <div className="mb-4 w-full">
                        <div
                            className="w-full flex relative bg-transparent text-gray-900 border border-gray-200 px-4 pt-2"
                        >
                            <div className="text-black mb-2 w-full" onClick={handleShowProducts}>
                                Select Products
                            </div>
                            {showProducts &&
                                <div className='absolute top-[100%] left-0 p-3 flex flex-col bg-gray-300 border border-gray-900 w-full '>
                                    {Products && Products.length > 0 ? (
                                        Products.map((ProductsInfo) => (
                                            <div className='w-full mb-2 flex itmes-center justify-between'>
                                                <div>
                                                    {/* <input className="m-2" type='checkbox' id={ProductsInfo['NomDeLArticle']} value={ProductsInfo['ArticleID']} /> */}
                                                    <label htmlFor={ProductsInfo['NomDeLArticle']}>
                                                        {ProductsInfo['NomDeLArticle']} {` ( ${ProductsInfo['Cout']} Dh )`}
                                                    </label>
                                                </div>
                                                <div className='float-right'>
                                                    <input
                                                        className='w-13 h-8 p-2 rounded border border-gray-900'
                                                        type="number"
                                                        name=""
                                                        id=""
                                                        onChange={(e) =>
                                                            handleQuantityChange(
                                                                ProductsInfo['ArticleID'],
                                                                parseInt(e.target.value),
                                                                parseInt(ProductsInfo['Cout'])
                                                            )
                                                        }
                                                        value={selectedProducts[ProductsInfo['ArticleID']] || 0}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-black">No Suppliers found</div>
                                    )}
                                </div>
                            }
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="NomDeFamille">Notes</label>
                        <textarea
                            id="NomDeFamille"
                            value={AchatData.Notes}
                            onChange={(e) => setAchatData({ ...AchatData, Notes: e.target.value })}
                            className="mt-1 p-2 w-full border-gray-300 rounded border"
                        />
                    </div>
                    <div>
                        <div className="block text-sm font-medium text-gray-700">Total</div>
                        <div className="mt-1 p-2 w-full border-gray-300 rounded border">
                            {Total} Dh
                        </div>
                    </div>
                    <div className='mt-4'>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button
                            onClick={closeAddAchat}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
                        >
                            Cancel
                        </button>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4" type="submit">Add Achat</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AddAchatForm;
