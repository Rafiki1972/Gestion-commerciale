import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    phone: string;
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
    };
}

export const Table = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/users')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <div className="relative overflow-x-auto my-5 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Fornissor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Adress
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.name.firstname} {user.name.lastname}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.phone}
                            </td>
                            <td className="px-6 py-4">
                                {user.address.city} . {user.address.street} . {user.address.number} . {user.address.zipcode} 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
