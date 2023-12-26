interface Profile {
  id: number;
  token: string;
  credential: string;
  firstName: string;
  lastName: string;
  role: string;
  sector: number;
  sectorLeader: number;
}

export function saveProfile(profileObject: Profile) {
  console.log("profile object is:");
  console.dir(profileObject);

  const profileJSON = JSON.stringify(profileObject);
  localStorage.setItem("profile", profileJSON);
}

export function getProfile() {
  const profileJSON = localStorage.getItem("profile") as any;
  return profileJSON
    ? { profile: JSON.parse(profileJSON) as Profile, loggedIn: true }
    : { profile: null, loggedIn: false };
}

export function staffLogout() {
  localStorage.removeItem("profile");
}
