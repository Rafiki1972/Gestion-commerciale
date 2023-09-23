import React from 'react';

interface AccessLevelsDropdownProps {
    levels: { name: string; value: any }[];
    closeOpenEditWorker: () => void;
}

function AccessLevelsDropdown(props: AccessLevelsDropdownProps) {
    // Access the levels prop
    const { levels, closeOpenEditWorker } = props;

    // Now you can use the levels array in your component
    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 cursor-pointer">
            <div className='bg-white p-8 rounded-lg min-w-[500px]'>
                <button
                    onClick={closeOpenEditWorker}
                    className="absolute top-0 right-0 bg-black opacity-50 z-[-1] text-gray-600 hover:text-gray-800 w-[100%] h-[100%]"
                >
                </button>
                <ul className='w-full grid grid-cols-3 gap-3'>
                    {levels.map((level, index) => (
                        <li key={index}
                            className={`text-center rounded border border-black px-3 py-2  ${level.value ? ' bg-gray-600 text-white' : ' bg-white'}`}
                        >
                            {level.name}
                        </li>
                    ))}
                </ul>
                <button onClick={closeOpenEditWorker}
                className='mx-auto bg-gray-600 text-white w-full mt-3 p-3'>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default AccessLevelsDropdown;
