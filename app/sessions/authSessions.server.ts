import { createCookieSessionStorage } from "@remix-run/node";

const {getSession, commitSession, destroySession} = createCookieSessionStorage(
	{
		cookie: {
			name: "auth",
			path: "/",
			maxAge: 60 * 60 * 24 * 30,
			secrets: [process.env.AUTH_SECRET as string],
			httpOnly: true
		}
	}
)


export async function getCookieHeaderWithUserInfo (userId: number) {
	const session = await getSession()
	session.set("userId", userId)  

	const header = await commitSession(session)

	return header
}

export async function getUserIdFromCookie (request: Request) {
	const session = await getSession(request.headers.get("Cookie"))
	const userId = session.get("userId")
	
	return userId
}


export async function getCookieHeaderAfterDestroyingAuthSession(request: Request) {
	const session = await getSession(request.headers.get("Cookie"))
	const cookie_header = await destroySession(session)
	return cookie_header
}

