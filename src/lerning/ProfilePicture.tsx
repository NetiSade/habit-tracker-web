const ProfilePicture = () => {
  const handleClick: React.MouseEventHandler<HTMLImageElement> = (event) => {
    console.log("Clicked!", event);
    // hide the image
    const imageElement = event.target as HTMLImageElement;
    imageElement.style.display = "none";
  };

  return (
    <div>
      <img
        src="https://placehold.jp/3d4070/ffffff/150x150.png"
        alt="Profile Picture"
        onClick={handleClick}
      />
    </div>
  );
};

export default ProfilePicture;
