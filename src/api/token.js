const setToken = (token) => {
  localStorage.setItem("bearer", token);
};

export const getToken = () => {
  let token = "";
  if (window.location.pathname.includes("/auth")) {
    token = new URLSearchParams(window.location.hash.substring(1)).get(
      "access_token"
    );
    setToken(token);
  }
  if (localStorage.getItem("bearer")) {
    token = localStorage.getItem("bearer");
  }

  return token;
};
