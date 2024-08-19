import { useAuth } from "../../context/AuthContext"

export const Navbar = () => {

    const { logout, user } = useAuth();

    const LogoutUser = () => {
        try {
            logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        <p className="mb-0">Recipe Website</p>
                    </div>
                    
                    <div className="user-actions">
                        <p>{user?.name}</p>
                        { user ? <button className="btn btn btn-outline-light my-2 my-sm-0" onClick={LogoutUser}>Logout</button> : "" }
                    </div>
                </header>
            </div>
        </div>
    )
}