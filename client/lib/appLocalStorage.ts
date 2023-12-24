interface Profile {
  credential: string;
  firstName: string;
  lastName: string;
  token: string;
}

export function saveProfile(profileObject: Profile) {
  const profileJSON = JSON.stringify(profileObject);
  localStorage.setItem("profile", profileJSON);
}

export function getProfile() {
  const profileJSON = localStorage.getItem("profile") as any;
  return profileJSON
    ? { profile: JSON.parse(profileJSON), loggedIn: true }
    : { profile: null, loggedIn: false };
}

export function staffLogout() {
  localStorage.removeItem("profile");
}
