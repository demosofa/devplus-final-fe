import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import 'dayjs/locale/vi';

import './index.css';
import privateRoutes from '@routes/privateRoutes';
import publicRoutes from '@routes/publicRoutes';
import { AuthProvider } from '@contexts';
import { BASE_URL } from '@constants';
import { ErrorBoundary } from '@components';

const queryClient = new QueryClient();
const router = createBrowserRouter([...privateRoutes, ...publicRoutes]);

axios.defaults.baseURL = BASE_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</AuthProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
