interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-red-500 text-center">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
