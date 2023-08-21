import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import privateRoutes from '@routes/privateRoutes';
import publicRoutes from '@routes/publicRoutes';
import axios from 'axios';
import { AuthProvider } from '@contexts';

const queryClient = new QueryClient();
const router = createBrowserRouter([...privateRoutes, ...publicRoutes]);

const BASE_URL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = BASE_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>
);
