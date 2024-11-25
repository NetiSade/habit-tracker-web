const EncouragementSection = ({
  encouragementMessage,
}: {
  encouragementMessage: string | null;
}) => {
  return (
    <div className="animate-fade-in rounded-lg border-2 border-green-200 bg-green-50 p-6 text-center">
      <div className="mb-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mx-auto mb-4 h-12 w-12 animate-bounce text-green-600"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <p className="mb-2 text-2xl font-bold text-green-800">Congratulations!</p>
      <p className="text-xl text-green-700">{encouragementMessage}</p>
    </div>
  );
};

export default EncouragementSection;
