export const USER = 'USER';

const userAction = (name, gravatarEmail) => ({
  type: USER,
  name,
  gravatarEmail,
});
export default userAction;
