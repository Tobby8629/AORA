import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tobby.aora",
  projectId: "66ceb6970015db599a1a",
  databaseId: "66ceb98500315420c89c",
  userCollectionId: "66ceba4b0029865fe5a7",
  videoCollectionId: "66ceba800037eeaf2932",
  storage: "66cebca800362d4dd1d1",
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storage,

} = config

const client = new Client();

client
.setEndpoint(config.endpoint)
.setProject(config.projectId)
.setPlatform(config.platform);


const account = new Account(client)
const avatar = new Avatars(client)
const databases = new Databases(client)

export const Register = async (email, username, password) => {
   try {
     const create = await account.create(ID.unique(), email, password, username)
     if(!create) throw new Error ("failed to register")
     const avat = avatar.getInitials(username);
     await Login(email, password)
     const newuser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: create.$id,
        email,
        username,
        avatar: avat
      }
     )
     return newuser
    }
   catch(err){
    throw new err
   }
}


export const Login = async (email, password) => {
  try {
    const logg = await account.createEmailPasswordSession(email, password)
    return logg
  }
  catch(err) {
    throw new Error(err || "failed to login")
  }
  
}

export const getCurrentUser = async () => {
  try {
    const getuser = await account.get()
    if(!getuser) throw Error
    const getdb = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', getuser.$id)]
    )
    if(!getdb) return "can't get the user"
    return getdb.documents[0]
    }
  catch (err) {
    throw new Error(err.err)
  }
  
}

export const Logout = () => {
  try{
    const result = account.deleteSession("current")
  }
  catch(err) {
    throw new Error (err)
  }
}

export const getPosts = async () => {
  try{
    const getPost = await databases.listDocuments(
      databaseId,
      videoCollectionId,
    )
    return getPost.documents
  }
  catch(err) {
    throw new Error(err)
  }
}

export const GetTrendingVideos = async () => {
  try{
    const getPost = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(3)]
    )
    return getPost.documents
  }
  catch(err) {
    throw new Error(err)
  }
}

export const SearchVideo = async (value) => {
  try{
    const check = await databases.listDocuments(
      databaseId,
      videoCollectionId,
    )

    const filteredVideos = check.documents.filter((doc) =>
      doc.title.toLowerCase().includes(value.toLowerCase())
    );

    return filteredVideos;
  }
  catch (err) {
    console.error(err)
    throw new Error(err)
  }
}


