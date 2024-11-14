import React, { useState } from 'react';
import healthcare from '../utils/healthcare';

const AccessControl = () => {
    const [address, setAddress] = useState('');

    const authorizeAccess = async () => {
        await healthcare.methods.authorizeAccess(address).send({
            from: 'your_wallet_address_here', // Replace with the wallet address
        });
    };

    return (
        <div>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter patient address"
            />
            <button onClick={authorizeAccess}>Authorize Access</button>
        </div>
    );
};

export default AccessControl;
