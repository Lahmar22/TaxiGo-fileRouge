import axios from "axios";

export const logout = async () => {
    try {
        await axios.post("http://127.0.0.1:8000/api/logout", {}, {
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });

        localStorage.removeItem("token");
        window.location.href="/login";

    } catch(error) {
        console.error(error);
    }
}