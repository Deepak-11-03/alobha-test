import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = ()=>{
      const { logout,user } = useContext(AuthContext);
      const navigate = useNavigate();

    return (
     <div className="flex justify-between p-4">
        <h2 className="text-2xl">Manage Repo</h2>
        {user ? 
         <button onClick={() => { logout(); navigate('/login'); }} className="p-2 bg-red-500 text-white rounded">
            Logout
          </button>
          :
      <>
      </>
        }
     </div>
    )
}

export default Header