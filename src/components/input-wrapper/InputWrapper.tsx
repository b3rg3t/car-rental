import { FieldErrors, FieldValues } from "react-hook-form";

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
  fieldName: string;
  errors: FieldErrors<FieldValues>;
}

export function InputWrapper({
  label,
  children,
  fieldName,
  errors,
}: InputWrapperProps) {
  return (
    <div>
      <label htmlFor={fieldName}>
        {label}
        {children}
      </label>
      <div aria-live="assertive">
        {typeof errors[fieldName]?.message === "string" ? (
          <p className="error-message">{errors[fieldName]?.message}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
