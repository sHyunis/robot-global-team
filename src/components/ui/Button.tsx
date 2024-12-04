type ButtonProps = {
  className: string;
  text: string;
};

const Button: React.FC<ButtonProps> = ({ className, text }) => {
  return <div className={className}>{text}</div>;
};

export default Button;
