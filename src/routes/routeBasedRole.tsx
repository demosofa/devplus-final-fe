import { RouteObject } from 'react-router-dom';
import { ROLE } from 'types';
import { PrivatePage } from '@components';

export type Route = Omit<RouteObject, 'children'> & {
	roles?: ROLE[];
	children?: Route[];
};

export function routeBasedRole(routes: Route[]) {
	return routes.reduce<RouteObject[]>(
		(prev, { element, roles, children, ...curr }) => {
			const newRoute: RouteObject = curr;
			if (element) {
				if (roles != null) {
					newRoute.element = <PrivatePage roles={roles}>{element}</PrivatePage>;
				} else newRoute.element = element;
			}

			if (children) newRoute.children = routeBasedRole(children);
			return [...prev, newRoute];
		},
		[]
	);
}
