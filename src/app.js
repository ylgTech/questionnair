import React from 'react'
import './app.css';
import 'annar/dist/annar.css'

// setup for react-query
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const App = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default App;
