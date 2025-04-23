import { firebasedb } from './firebase.config';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore'; // Import necessary Firestore functions

export const saveUserAfterLogin = async (email: string) => {
    // TODO : Don't save if the email already exists
    try {
        // Reference to the 'users' collection in Firestore
        const usersCollection = collection(firebasedb, 'users');
        
        // Add the user's email to the Firestore database
        const docRef = await addDoc(usersCollection, { email });

        // Return success response with the user ID
        return {
            success: true,
            message: "User email added to db successfully",
            userId: docRef.id, // ID of the document created in Firestore
        };
    } catch (error) {
        // Handle errors and return failure response
        return {
            success: false,
            message: `Failed to add user email to db: ${error.message}`,
        };
    }
};

export const updateUserInfo = async (userId: string, userInfo: UserData) => {
    try {
        // Reference to the user's document in Firestore
        const userDocRef = doc(firebasedb, 'users', userId);

        // Update the user's document with the provided userInfo
        await updateDoc(userDocRef, { ...userInfo });

        // Return success response
        return {
            success: true,
            message: "User information updated successfully",
        };
    } catch (error) {
        // Handle errors and return failure response
        return {
            success: false,
            message: `Failed to update user information: ${error.message}`,
        };
    }
};

export const getUserInfo = async (userId: string) => {
    try {
        // Reference to the user's document in Firestore
        const userDocRef = doc(firebasedb, 'users', userId);

        // Fetch the user's document from Firestore
        const userDoc = await getDoc(userDocRef);

        // Check if the document exists
        if (userDoc.exists()) {
            return {
                success: true,
                data: userDoc.data(), // Return the user data
            };
        } else {
            return {
                success: false,
                message: "User not found",
            };
        }
    } catch (error) {
        // Handle errors and return failure response
        return {
            success: false,
            message: `Failed to fetch user information: ${error.message}`,
        };
    }
}