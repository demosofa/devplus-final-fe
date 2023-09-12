import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export class ErrorBoundary extends Component<
	PropsWithChildren,
	{ hasError: boolean }
> {
	constructor(props: PropsWithChildren) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_error: Error) {
		return { hasError: true };
	}

	componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {}

	render(): ReactNode {
		if (this.state.hasError) {
			return <Navigate to="500" />;
		}

		return this.props.children;
	}
}
