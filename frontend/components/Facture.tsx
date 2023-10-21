import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AddFactureProps {
    DarkMode: boolean;
}

const Facture = ({ DarkMode }: AddFactureProps) => {


    const [SelectedClient, setClientId] = useState('');
    const [showProducts, setshowProducts] = useState(false);

    // Store the selected products with quantity and unit price
    const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: { quantity: number; unitPrice: number; miniTotal: number } }>({});

    // Calculate the total for each selected product
    const [selectedProductsTotal, setSelectedProductsTotal] = useState<{ [key: string]: number }>({});

    // Calculate the overall total for all selected products
    const [Total, setTotal] = useState(0);
    const [Tva, setTva] = useState('');

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
        setshowProducts(!showProducts);
    };

    // Function to handle changes in the number of products
    const handleQuantityChange = (productId: any, quantity: any, unitPrice: any) => {
        // Check if quantity is a valid number (not empty and a number)
        if (!isNaN(quantity) && quantity >= 0) {
            // Calculate the total for the selected product (quantity * unit price)
            const productTotal = quantity * unitPrice;

            // Update the selectedProducts state with quantity and unit price
            setSelectedProducts({
                ...selectedProducts,
                [productId]: {
                    quantity,
                    unitPrice,
                    productTotal
                },
            });

            // Update the selectedProductsTotal state
            setSelectedProductsTotal({
                ...selectedProductsTotal,
                [productId]: productTotal,
            });

        } else {
            setSelectedProducts({
                ...selectedProducts,
                [productId]: {
                    quantity,
                    unitPrice,
                    miniTotal: 0
                },
            });
        }
    };

    useEffect(() => {
        // Calculate the overall total for all selected products
        let total = 0;
        for (const key in selectedProductsTotal) {
            total += selectedProductsTotal[key];
        }
        setTotal(total); // Update the Total state
    }, [selectedProducts, selectedProductsTotal]);





    const handleSubmit = async (e: any) => {
        e.preventDefault();

        /* This code block is checking if the `SelectedClient` variable is empty or if the `selectedProducts`
        object is empty. If either of these conditions is true, it will display an alert message asking the
        user to select a client and at least one product before generating the facture. The `return`
        statement will exit the function if the condition is met, preventing further execution of the code. */
        if (SelectedClient === '') {
            alert('Veuillez sélectionner un client avant de générer la facture.');
            return; // This will exit the function if the condition is met
        }

        if (Object.keys(selectedProducts).length === 0 || Object.values(selectedProducts).every(product => product.quantity === 0)) {
            alert('Veuillez sélectionner au moins un produit avant de générer la facture.');
            return; // This will exit the function if the condition is met
        }


        let date = new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        let TotalHTC = Total;
        let TotalTTC = Total + ((Total * parseFloat(Tva)) / 100)
        try {
            // Send a request to your Node.js server to generate the PDF
            const response = await fetch('http://localhost:3001/api/generateFacture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    SelectedClient: SelectedClient,
                    selectedProducts: selectedProducts,
                    date: date,
                    Tva: Tva,
                    TotalHTC: TotalHTC,
                    TotalTTC: TotalTTC
                }),
            });

            if (response.ok) {
                // const blob = await response.blob();
                // const url = window.URL.createObjectURL(blob);
                // window.open(url, '_blank');
                window.open('http://localhost:3001/facture.pdf', '_blank');
            } else {
                // Handle the case where PDF generation failed
                console.error('PDF generation failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-5 w-10/12 min-h-[100vh] ml-auto relative overflow-x-auto mb-5 shadow-md sm:rounded-lg">

            <h1 className='py-4 font-black text-white whitespace-nowrap uppercase tracking-wider'>
                Telecharger facteur
            </h1>
            <div className='w-[700px] float-right border-l border-gray-500 px-10'>
                <div className="mb-4 w-full">
                    <select
                        onChange={handleClientChange}
                        className="w-full bg-transparent text-white border border-gray-200 px-4 py-2"
                    >
                        <option
                            className="text-black"
                            value="">
                            Client
                        </option>
                        {Client && Client.length > 0 ? (
                            Client.map((ClientInfo) => (
                                <option
                                    key={ClientInfo['ClientID']}
                                    className="text-black"
                                    value={`${ClientInfo['NomDeFamille']} ${ClientInfo['Prenom']}`}>
                                    {`${ClientInfo['NomDeFamille']} ${ClientInfo['Prenom']}`}
                                </option>
                            ))
                        ) : (
                            <option className="text-black">Aucune donnée disponible</option>
                        )}
                    </select>

                </div>
                <div className="mb-4 w-full">
                    <div
                        // onChange={handleClientChange}
                        className="w-full flex relative bg-transparent border border-gray-200 px-4 pt-2"
                    >
                        <div className="text-black mb-2 w-full text-white" onClick={handleShowProducts}>
                            Produit
                        </div>
                        {showProducts &&
                            <div className='absolute top-[100%] left-0 p-3 flex flex-col bg-gray-300 border border-gray-900 w-full '>
                                {Products && Products.length > 0 ? (
                                    Products.map((ProductsInfo) => (
                                        <div className="text-gray-900 w-full mb-2 flex items-center justify-between">
                                            <div>
                                                <label htmlFor={ProductsInfo['NomDeLArticle']}>
                                                    {ProductsInfo['NomDeLArticle']} ( {ProductsInfo['PrixDeVente']} Dh )
                                                </label>
                                            </div>
                                            <div className="float-right">
                                                <input
                                                    required
                                                    min="0"
                                                    className="w-13 h-8 p-2 rounded border border-gray-900"
                                                    type="number"
                                                    name=""
                                                    id=""
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            ProductsInfo['NomDeLArticle'],
                                                            parseInt(e.target.value),
                                                            parseFloat(ProductsInfo['PrixDeVente'])
                                                        )
                                                    }
                                                    value={selectedProducts[ProductsInfo['NomDeLArticle']]?.quantity || 0}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-black">Aucune donnée disponible</div>
                                )}
                            </div>
                        }
                    </div>

                </div>
                <div className='mt-4'>
                    <label className="block mb-1 text-sm font-medium text-white" htmlFor="NomDeFamille">Tva</label>
                    <input
                        type='number'
                        id="NomDeFamille"
                        onChange={(e) => setTva(e.target.value)}
                        className="mt-1 p-2 w-full text-black border-gray-300 rounded border"
                    />
                </div>
                <div className='mt-4 text-white'>
                    <div className="block mb-1 text-sm font-medium">Total</div>
                    <div className="mt-1 p-2 w-full border-gray-300 rounded border">
                        {Total} Dh
                    </div>
                </div>
                <div className='mt-4'>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <button
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-4"
                        type="submit"
                        onClick={e => handleSubmit(e)}>
                        Telecharger
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Facture;
