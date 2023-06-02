import { social, revolution, governance } from "../../..";

//update all profile pictures
export const updateProfilePicture = async (addresses: string[], profilePicture: string) => {
  //if profile picture isnt a url, throw error
  if (!profilePicture?.startsWith("https://") && !profilePicture?.startsWith("http://"))
    throw new Error("Profile picture must be a url");

  // new date 4 years from now to prevent workers from overwriting
  const data = {
    profilePicture,
    pfpUpdatedAt: new Date(Date.now() + 126144000000),
  };

  const where = { address: { in: addresses } };

  try {
    //update social, revolution, and governance dbs
    await Promise.all([
      social.profile.updateMany({ where, data }),
      revolution.profile.updateMany({ where, data }),
      governance.profile.updateMany({ where, data }),
    ]);
  } catch (e) {
    console.log(e);
  }
};

//update all usernames
export const updateUsername = async (addresses: string[], usernameRaw: string) => {
  const username = usernameRaw.toLowerCase();

  const usernameExists = await checkUsername(username);
  if (!username || usernameExists) throw new Error("Username is already taken");

  const data = {
    username,
    usernameUpdatedAt: new Date(Date.now() + 126144000000),
  };

  const where = { address: { in: addresses } };
  try {
    //update social, revolution, and governance dbs
    await Promise.all([
      social.profile.updateMany({ where, data }),
      social.communityProfile.updateMany({ where, data }),
      revolution.profile.updateMany({ where, data }),
      governance.profile.updateMany({ where, data }),
    ]);
  } catch (e) {
    console.log(e);
  }
};

//check if username is already taken
const checkUsername = async (username: string) => {
  //if username is longer than 20 characters, throw error
  if (username.length > 20) throw new Error("Username is too long");

  //if username has something other than letters, numbers, or underscores, throw error
  if (!/^[a-zA-Z0-9_]*$/.test(username))
    throw new Error("Username is invalid. Only letters, numbers, and underscores are allowed.");

  const profile = await social.profile.findFirst({ where: { username } });
  return !!profile;
};
