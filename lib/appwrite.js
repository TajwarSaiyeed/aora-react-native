import {Account, Avatars, Client, Databases, ID, Query, Storage} from 'react-native-appwrite';

export const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = {
    endpoint: process.env.ENDPOINT,
    platform: process.env.PLATFORM,
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
    userCollectionId: process.env.USER_COLLECTION_ID,
    videoCollectionId: process.env.VIDEO_COLLECTION_ID,
    storageId: process.env.STORAGE_ID,
}

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);


export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        return await databases.createDocument(databaseId, userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        });
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(databaseId, userCollectionId, [Query.equal('accountId', currentAccount.$id)]);

        if (!currentUser) throw Error;

        return currentUser;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const getALlPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId,
            [Query.orderDesc('$createdAt')]);
        return posts.documents;
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}

export const getALlLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))]
        );
        return posts.documents;
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.search('title', query)]
        );
        return posts.documents;
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}


export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        );
        return posts.documents;
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        return await account.deleteSession('current')
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}

export const get_file_preview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type');
        }
        if (!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}

export const uploadFile = async (file, type) => {
    if (!file) return;
    const {mimeType, ...rest} = file;
    const asset = {type: mimeType, ...rest};
    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);

        return get_file_preview(uploadedFile.$id, type);
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
            title: form.title,
            prompt: form.prompt,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            creator: form.userId
        });

        if (!newPost) throw Error;

        return newPost;
    } catch (error) {
        console.log("[ERROR]", error)
        throw new Error(error);
    }
}
