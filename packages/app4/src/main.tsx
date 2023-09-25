import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from "./project4.tsx";

const container = document.getElementById('reactApp')

function bootstrap () {
    if (container) {
        const root = createRoot(container);
        root.render(<App />);
    }
}

bootstrap()