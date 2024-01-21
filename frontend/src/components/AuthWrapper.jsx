import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ render: Component, ...props }) {
	const { authed } = useAuth()
	const location = useLocation()

	return authed === true ? (
		<Component {...props} />
	) : (
		<Navigate
			to='/login'
			replace
			state={{ path: location.pathname }}
		/>
	)
}

export default RequireAuth
