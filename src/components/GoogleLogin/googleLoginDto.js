export const GoogleLoginDto = (data) => {
  const dataMapping = {
    email: data.email,
    password: data.googleId,
    fullname: data.name,
    avatar: data.imageUrl,
  };
  return dataMapping;
};
