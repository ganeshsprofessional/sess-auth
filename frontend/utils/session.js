export const signup = (user) =>
  fetch("http://localhost:3000/api/user/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const login = (user) =>
  fetch("http://localhost:3000/api/user/signin", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const logout = () =>
  fetch("http://localhost:3000/api/user/signout", { method: "DELETE" });
