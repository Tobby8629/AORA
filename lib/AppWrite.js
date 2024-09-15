import { Account, Avatars, Client, Storage, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tobby.aora",
  projectId: "66ceb6970015db599a1a",
  databaseId: "66ceb98500315420c89c",
  userCollectionId: "66ceba4b0029865fe5a7",
  videoCollectionId: "66ceba800037eeaf2932",
  storageId: "66cebca800362d4dd1d1",
  SavedID: "66e498e500291e319bf3"
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
  SavedID
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

export const saveVideo = async (data) => {
  try {
    const videoDoc = await databases.getDocument(
      databaseId,         
      videoCollectionId,   
      data.video    
    );

    // Ensure users is an array and append the new user ID
    const currentUsers = Array.isArray(videoDoc.users) ? videoDoc.users.flat() : [];

    // Ensure the user is not bookmarking their own video
      if (videoDoc.creator.$id === data.user) {
        return Promise.reject(new Error ("You cannot bookmark your own video"));
      }

    // Check if the user has already bookmarked the video
      if (currentUsers.some(item => item && item.$id === data.user)) {
        return Promise.reject(new Error ("Video has already been bookmarked"));
      } else {
        // Add the new user ID if not already in the array
        currentUsers.push(data.user);
      }

     

    // Update the document with the new users array
    const updatedVideo = await databases.updateDocument(
      databaseId, 
      videoCollectionId, 
      data.video, 
      { users: currentUsers }
    );
    return updatedVideo;

  } catch (err) {
    console.error("Error updating document with new user:", err);
    throw new Error(err.message || 'Failed to update document');
  }
};


export const getSaveVideo = async () => {
  try {
    const check = await getCurrentUser()
    return check.video

  } catch (err) {
    console.error("Error updating document with new user:", err);
    throw new Error(err.message || 'Failed to update document');
  }
};

export const DelVideo = async (data) => {
  try {
    const videoDoc = await databases.getDocument(
      databaseId,         
      videoCollectionId,   
      data.video    
    );

    // Ensure users is an array and append the new user ID
    const currentUsers = Array.isArray(videoDoc.users) ? videoDoc.users.flat() : [];

    const removedUsers = currentUsers.filter((e)=> e.$id !== data.user)
   

    // Update the document with the new users array
    const updatedVideo = await databases.updateDocument(
      databaseId, 
      videoCollectionId, 
      data.video, 
      { users: removedUsers }
    );
    return updatedVideo;

  } catch (err) {
    console.error("Error updating document with new user:", err);
    throw new Error(err.message || 'Failed to update document');
  }
};










