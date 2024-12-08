const {Firestore} = require("@google-cloud/firestore");
const db = new Firestore();

async function inputUser(id, data) {
  const usersCollection = db.collection("users");
  return usersCollection.doc(id).set(data);
}

async function getUsers(email) {
  try {
    const usersRef = await db.collection("users");
    const userSnapshot = await usersRef.where("email", "==", email).get();

    if (userSnapshot.empty) {
      return null; // Tidak ada pengguna dengan email ini
    }

    let data = null;
    userSnapshot.forEach((item) => {
        data = item.data();
    });

    return data;

  } catch (error) {
    throw new Error(error.message);
  }
}


async function updateProfil(id, newData) {
  const userRef = await db.collection("users").doc(id);

  if (newData.profile_img === undefined) {
    throw new Error("avatar kosong");
  }

  await userRef.update(newData);
}

async function getUserbyid(user_id){
  const userRef = await db
      .collection("users")
      .where("user_id", "==", user_id)
      .get();

let data = null;
userRef.forEach((item) => {
    data = item.data();
});


return data;
}

module.exports = { inputUser, getUsers, updateProfil, getUserbyid };