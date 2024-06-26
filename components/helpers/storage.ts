// import * as SecureStore from "expo-secure-store";

// export async function save({
//   idToken,
//   refreshToken,
// }: {
//   idToken: string;
//   refreshToken: string;
// }) {
//   +(await SecureStore.setItemAsync("idToken", idToken));
//   await SecureStore.setItemAsync("refreshToken", refreshToken);
// }

// export async function getValueFor() {
//   let idToken = await SecureStore.getItemAsync("idToken");

//   if (idToken) {
//     console.log("Success getting idTOKEN");
//     return idToken;
//   } else {
//     console.log("No values stored under that key.");
//   }
// }

// export function clear() {
//   return SecureStore.deleteItemAsync("idToken");
// }

// local storage
export async function save({
  idToken,
  refreshToken,
}: {
  idToken: string;
  refreshToken: string;
}) {
  localStorage.setItem("idToken", idToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function getValueFor() {
  let idToken = localStorage.getItem("idToken");

  if (idToken) {
    console.log("Success getting idTOKEN");
    return idToken;
  } else {
    console.log("No values stored under that key.");
  }
}

export function clear() {
  localStorage.removeItem("idToken");
}
