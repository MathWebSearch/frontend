import * as React from 'react';

const imprint = `
Prof. Dr. Michael Kohlhase
Martensstraße 3
91058 Erlangen
tel/fax: (49) 9131-85-64052/55
michael.kohlhase[at]fau.de
`;

export default function Imprint(): JSX.Element {
    return (
        <>
            <div>Responsible for the content of this website:</div>
            <pre>{imprint}</pre>
        </>
    );
}
