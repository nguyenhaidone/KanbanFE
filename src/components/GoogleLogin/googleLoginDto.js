export const GoogleLoginDto = (data) => {
  console.log(data);
  const dataMapping = {
    email: data.email,
    password: data.googleId,
    fullname: data.name,
    avatar: data.imageUrl,
  };
  return dataMapping;
};
