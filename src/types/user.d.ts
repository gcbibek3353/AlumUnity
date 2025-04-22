interface UserData{
    name ?: string;
    batch ?: string;
    Role ?: Role;
    profilePic ?: string;
    Education ?: string;
    Bio ?: string;
    linkedIn ?: string;
    github ?: string;
    twitter ?: string;
    portfolio ?: string;
    skills ?: string[];
    interests ?: string[];
}
 
enum Role {
    STUDENT = "STUDENT",
    ALUMNI = "ALUMNI",
}