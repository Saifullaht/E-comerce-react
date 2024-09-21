function AuthButton({ onClick, text, isLoading }) {
    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className="w-full h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-gray-200 font-medium cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-95 text-sm"
      >
        {isLoading ? "loading.." : text}
      </button>
    );
  }
export default AuthButton