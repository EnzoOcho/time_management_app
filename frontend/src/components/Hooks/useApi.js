const API_URL = import.meta.env.VITE_API_URL;

const useApi = () => {
  const baseUrl = API_URL//tuki

  const postData = async (url, body) => {
    try {
      const res = await fetch(baseUrl + url, {
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
    const res = await fetch(baseUrl + url, {
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
    const res = await fetch(`${baseUrl}/auth/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(newData)
  });

  const data = await res.json();
  console.log("pathc",data);
}

  return { postData , getUserData, patchUserData};
};

export default useApi;