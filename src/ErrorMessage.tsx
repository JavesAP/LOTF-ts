export const ErrorMessage = ({
  message,
  show,
}: {
  message: string;
  show: boolean | null;
}) => {
  return show ? <div className="error-message">{message}</div> : <div></div>;
};
