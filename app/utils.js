export function retrieveLocalUser() {
  let jsonUser = localStorage.getItem('current_user')
  if (jsonUser) {
    return JSON.parse(jsonUser);
  }
}
