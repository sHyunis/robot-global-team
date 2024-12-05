type ButtonProps = {
  className: string;
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({ className, text, onClick, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
