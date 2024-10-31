type CardProps = {
  title: string;
  description: string;
  imageSrc?: string;
};

const Card = ({ title, description, imageSrc }: CardProps) => {
  return (
    <div className="card">
      <img
        className="card-image"
        src={imageSrc ?? "https://placehold.jp/3d4070/ffffff/150x150.png"}
        alt="profile picture"
      />
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{description}</p>
    </div>
  );
};

export default Card;
