export async function getCategories() {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch("/api/categories", postData);

  return res.json();
}

// export async function login(req: {
//   email: string | undefined;
//   password: string | undefined;
// }) {
//   const email = req.email;
//   const psw = req.password;
//   const postData = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: email, password: psw }),
//   };

//   const res = await fetch("/api/login", postData);

//   return res.json();
// }

// export async function register(req: {
//   email: string | undefined;
//   password: string | undefined;
// }) {
//   const email = req.email;
//   const psw = req.password;
//   const postData = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: email, password: psw }),
//   };

//   const res = await fetch("/api/register", postData);

//   return res.json();
// }
