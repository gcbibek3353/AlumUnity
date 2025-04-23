import React from 'react';

const UserAvatar = ({ userImageUrl, userName } : {userImageUrl : string , userName : string}) => {
  const hasImage = Boolean(userImageUrl);
  const initials = userName?.charAt(0).toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-lg font-semibold overflow-hidden">
      {hasImage ? (
        <img
          src={userImageUrl}
          alt={userName}
          className="w-full h-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default UserAvatar;

