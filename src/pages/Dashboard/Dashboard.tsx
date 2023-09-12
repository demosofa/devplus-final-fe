import { DashboardAdmin, DashboardSuperAdmin } from '@components';
import { ROLE } from '@enums';
import { useAuth } from '@hooks';

export function Dashboard() {
	const { getAuth } = useAuth();
	const auth = getAuth()!;

	if (auth.role == ROLE.SUPER_ADMIN) {
		return <DashboardSuperAdmin />;
	} else return <DashboardAdmin />;
}
