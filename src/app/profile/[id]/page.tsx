const UserProfile = ({ params }: any) => {
  console.log(params);
  return (
    <>
      <div>Profile</div>
      <span>{params.id}</span>
    </>
  );
};
export default UserProfile;
