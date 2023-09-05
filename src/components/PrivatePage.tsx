import { Navigate } from 'react-router-dom';

import { useAuth } from '@hooks';
import { PropsWithChildren } from 'react';
import { ROLE } from '@enums';

export function PrivatePage({
	children,
	roles,
}: PropsWithChildren<{ roles: ROLE[] }>) {
	const { getAuth } = useAuth();
	const { role } = getAuth()!;
	const checkRole = roles.some((item) => item === role);

	if (checkRole) return children;
	return <Navigate to="/403" />;
}
