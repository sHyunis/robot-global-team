type ButtonProps = {
  className: string;
  onClick: () => void;
  text: string;
};

const Button: React.FC<ButtonProps> = ({ className, onClick, text }) => {
  return (
    <div
      className={className}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
