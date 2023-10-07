// components/AddProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
interface AddVentePorps {
    closeAddVente: () => void;
    fetchVentes(): void;
    openAlert(): void;
}
const AddVenteForm = ({ openAlert, closeAddVente, fetchVentes }: AddVentePorps) => {
    const [VenteData, setVenteData] = useState({
        ClientID: '',
        MontantTotal: '',
        Notes: '',
    });
    const [ClientId, setClientId] = useState('');
    const [showProducts, setshowProducts] = useState(false);
    const [Total, setTotal] = useState(0);

    const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});

    const [Client, setClient] = useState([]);
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/Client')
            .then((res) => res.json())
            .then((data) => setClient(data));
    }, []);
    useEffect(() => {
        fetch('http://localhost:3001/api/Product')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleClientChange = (e: any) => {
        const selectedClient = e.target.value;
        setClientId(selectedClient);
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

        // Update the Total state by subtracting the productTotalChange
        setTotal((prevTotal) => prevTotal + productTotalChange);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Client Id          :   ', ClientId)
        console.log('Montant Total      :   ', Total)
        console.log('Note               :   ', VenteData.Notes)
        console.log('Selected Products  :', selectedProducts);

        // try {
        //     const response = await axios.post('http://localhost:3001/api/addVente', {
        //         ClientID: VenteData.ClientID,
        //         MontantTotal: VenteData.MontantTotal,
        //         Notes: VenteData.Notes,
        //     });
        // } catch (error) {
        //     console.log('Error adding product');
        // }
        // openAlert();
        // closeAddVente()
        // fetchVentes();
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 cursor-pointer"
        >
            <div className='bg-white p-4 rounded-lg min-w-[500px] max-w-md'>
                <button
                    onClick={closeAddVente}
                    className="absolute top-0 right-0 bg-black opacity-50 z-[-1] text-gray-600 hover:text-gray-800 w-[100%] h-[100%]"
                >
                </button>
                <h2 className="text-xl font-bold mb-4">Add New Vente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 w-full">
                        <select
                            onChange={handleClientChange}
                            className="w-full bg-transparent text-gray-900 border border-gray-200 px-4 py-2"
                        >
                            <option
                                className="text-black"
                                value="">
                                Select Client
                            </option>
                            {Client && Client.length > 0 ? (
                                Client.map((ClientInfo) => (
                                    <option
                                        key={ClientInfo['ClientID']}
                                        className="text-black"
                                        value={ClientInfo['ClientID']}>
                                        {ClientInfo['NomDeFamille']} {ClientInfo['Prenom']}
                                    </option>
                                ))
                            ) : (
                                <option className="text-black">No Class found</option>
                            )}
                        </select>

                    </div>
                    <div className="mb-4 w-full">
                        <div
                            onChange={handleClientChange}
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
                                                        {ProductsInfo['NomDeLArticle']} {` ( ${ProductsInfo['PrixDeVente']} Dh )`}
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
                                                                parseFloat(e.target.value),
                                                                parseFloat(ProductsInfo['PrixDeVente'])
                                                            )
                                                        }
                                                        value={selectedProducts[ProductsInfo['ArticleID']] || 0}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-black">No Clients found</div>
                                    )}
                                </div>
                            }
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="NomDeFamille">Notes</label>
                        <textarea
                            id="NomDeFamille"
                            value={VenteData.Notes}
                            onChange={(e) => setVenteData({ ...VenteData, Notes: e.target.value })}
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
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4" type="submit">Add Vente</button>
                </form>
            </div>
        </motion.div>
    );
};

export default AddVenteForm;
