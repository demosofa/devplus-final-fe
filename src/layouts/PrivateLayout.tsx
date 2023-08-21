import { useAuth } from '@hooks';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateLayout() {
	const { getAuth } = useAuth();
	if (getAuth()) return <Outlet />;
	return <Navigate to="/login" />;
}
