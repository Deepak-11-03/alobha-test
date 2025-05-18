import { useNavigate } from "react-router-dom"

export const BackBtn =({text="Back"})=>{
    const navigate = useNavigate();

    return   <button className='border-b-1 ms-2' onClick={()=> navigate(-1)}>{text}</button>
}