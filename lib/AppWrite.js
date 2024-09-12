import { Account, Avatars, Client, Storage, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tobby.aora",
  projectId: "66ceb6970015db599a1a",
  databaseId: "66ceb98500315420c89c",
  userCollectionId: "66ceba4b0029865fe5a7",
  videoCollectionId: "66ceba800037eeaf2932",
  storageId: "66cebca800362d4dd1d1",
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,

} = config

const client = new Client();

client
.setEndpoint(config.endpoint)
.setProject(config.projectId)
.setPlatform(config.platform);


const account = new Account(client)
const avatar = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

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

export const Logout = async () => {
  try{
    await account.deleteSession("current")
  }
  catch(err) {
    throw new Error(err)
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

export const getUserVideos = async (userID) => {
  try {
    const userVideos = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('creator', userID )]
    )
    return userVideos.documents
    
  }
  catch(err){
    throw new Error(err)
  }
}

export const CreateUrl = async (id, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, id);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        id,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;
    
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


export const uploadFile = async (file, type) => {
  const asset =  {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  const upload = await storage.createFile(
    storageId,
    ID.unique(),
    asset
  )
 
  const GetUrl = CreateUrl(upload.$id, type)

  return GetUrl

}


export const createPost = async(postInfo) => {
  try{
    const [thumbnailUrl, videoUrl] = await Promise.all([
       uploadFile(postInfo.thumbnail, "image"),
       uploadFile(postInfo.video, "video"),
    ])

    const asset = {
      title: postInfo.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: postInfo.AI_prompt,
      creator: postInfo.userid
    }
    
  const create = await databases.createDocument(
    databaseId,
    videoCollectionId,
    ID.unique(),
    asset
  )

  return create
  }
  catch(err){
    throw new Error(err)
  }
}


export const deletePost = async(id) => {
  try {
    const deletepost = await databases.deleteDocument(
      databaseId,videoCollectionId,
      id,
    )
  }
  catch(err) {
    throw new Error(err)
  }

}


