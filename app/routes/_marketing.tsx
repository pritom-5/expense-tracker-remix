import { NavLink, Outlet} from "@remix-run/react";

export default function Component () {
	
	return (
		<div>
			<nav>
				<NavLink to={"/"}>LOGO</NavLink>
				<div>
					<NavLink to={"/"}>Home</NavLink>
					<NavLink to={"/prices"}>Prices</NavLink>
				</div>
					<NavLink to={"/login"}>Login</NavLink>
			</nav>
			<Outlet/>
		</div>
	)

}
