import React from 'react'
import 'annar/dist/annar.css'
import './app.css';

// setup for react-query
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

const App = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default App;
