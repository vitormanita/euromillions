interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
}

export function GenerateButton({ onClick, isGenerating }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating}
      className={`
        generate-btn w-full py-3 px-6 rounded-xl font-bold text-base
        transition-all duration-300 transform
        ${isGenerating
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed scale-95'
          : 'bg-gradient-to-r from-lottery-pink to-lottery-gold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
        }
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </>
        ) : (
          <>
            <span className="text-xl">🎰</span>
            Generate Numbers
          </>
        )}
      </span>
    </button>
  );
}
