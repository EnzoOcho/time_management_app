const API_URL = import.meta.env.VITE_API_URL;

const useApi = () => {

  const postData = async (url, body) => {
    try {
      const res = await fetch(API_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  const getUserData = async (url) => {
    try {
      const res = await fetch(API_URL + url, {
        credentials: "include"
      });

      if (!res.ok) return null;

      const user = await res.json();
      return user;

    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const patchUserData = async (newData) => {
    try {
      await fetch(`${API_URL}/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newData)
      });
    } catch(error) {
      console.log(error)
    }
}

  return { postData, getUserData, patchUserData };
};

export default useApi;