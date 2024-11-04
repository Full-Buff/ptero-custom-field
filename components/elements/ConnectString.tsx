import React from 'react';
import { ServerContext } from '@/state/server';

const DisplayVariables = () => {
    const data = ServerContext.useStoreState((state) => state.server.data);
    const variables = ServerContext.useStoreState((state) => state.server.data?.variables);
    const allocations = ServerContext.useStoreState((state) => state.server.data?.allocations);

    if (!variables || !allocations) {
        return <p>Loading Connect...</p>;
    }

    // This whole next section of checking if the 4th object in the array exists may not
    //even be necessary, i was testing with an old version of the extension running at
    // the same time, and it errored the whole page out every time i rebuilt it.
    // currently 3AM and im too tired. will revisit...

    let serverPassword;
    // Check if 'variables' is an array and has at least 4 elements
    if (variables.length > 3) {
        // Handle the case where there are fewer than 4 variables
        serverPassword = variables[3]?.serverValue;; // Or display an error message, or handle as needed
    }

    const serverAddress = `${allocations[0]?.ip}:${allocations[0]?.port}`;

    const connectInfo = `connect ${serverAddress}; password ${serverPassword}`;

    console.log('Server Data:' , data);
    console.log('Server Data:', variables);

    return (
        // Parent container with centered content
        <div style={{ textAlign: 'center' }}>
            {/* Connection String */}
            <div
                style={{
                display: 'inline-block',
                boxSizing: 'border-box',
                margin: '10px',
                padding: '10px',
                backgroundColor: '#515f6c',
                borderRadius: '8px',
                cursor: 'pointer',
                }}
                onClick={() => {
                const text = connectInfo;
                navigator.clipboard.writeText(text);
                alert('Copied to clipboard!');
                }}
            >
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#f5f7fa', margin: 0 }}>
                {connectInfo}
                </p>
            </div>
        </div>

    );
};
export default DisplayVariables;