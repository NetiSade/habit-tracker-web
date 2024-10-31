const Button = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.target as HTMLButtonElement;
    buttonElement.textContent = "Clicked! 🎉";
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.target as HTMLButtonElement;
    buttonElement.textContent = "Double-clicked! 🎉";
  };

  return (
    <button onClick={handleClick} onDoubleClick={handleDoubleClick}>
      Click me! 🚀
    </button>
  );
};

export default Button;
