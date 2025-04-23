interface FirebaseContextType {
    // TODO : Testing for now, Update Everytime you make changes to firebase context provider
    isUserLoggedIn: boolean;
    loggedInUser: User | null;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    logOut: () => Promise<void>;
    authloading: boolean;

  
}