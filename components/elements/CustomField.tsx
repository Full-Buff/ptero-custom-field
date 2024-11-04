import React from 'react';
import { ServerContext } from '@/state/server';

const DisplayVariables = () => {
    const data = ServerContext.useStoreState((state) => state.server.data);
    const variables = ServerContext.useStoreState((state) => state.server.data?.variables);
    const allocations = ServerContext.useStoreState((state) => state.server.data?.allocations);

    if (!variables || !allocations) {
        return <p>Loading Connect...</p>;
    }

    const serverAddress = `${allocations[0]?.ip}:${allocations[0]?.port}`;
    const serverPassword = `${variables[3].serverValue}`;

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