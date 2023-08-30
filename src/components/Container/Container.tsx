import './container.css';

export function Container({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={`container-all ${className ? className : ''}`} {...props}>
			{children}
		</div>
	);
}
