

import requireUser from "../utils/hooks/requireUserHook";

export default async function Dashboard() {
    
    await requireUser();
    return (
        <div>
            <h1>Hello from Dashboard</h1>
            {/* <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">Sign Out</button>
            </form> */}

        </div>
    )
}