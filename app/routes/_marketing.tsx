import { Outlet } from "@remix-run/react";

export default function Component () {
	return (
		<div>
			<div>
				header for home
			</div>
			<Outlet/>
		</div>
	)

}
