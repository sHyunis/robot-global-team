type InputProps = {
  name: string;
  type: 'text' | 'number' | 'file';
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  required?: boolean;
  maxLength?: number;
  className: string;
};

const Input: React.FC<InputProps> = ({ name, type, value, onChange, required = false, maxLength, className }) => {
  return (
    <input
      type={type}
      name={name}
      className={className}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      required={required}
    />
  );
};

export default Input;
