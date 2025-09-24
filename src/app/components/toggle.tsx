interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  className?: string; //optional to change the css of toggle button in other pages accordingly
}

export default function Toggle({ enabled, onToggle, className }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full border-white cursor-pointer p-1 ${enabled ? 'bg-red-400' : 'bg-gray-300'} ${className || ''}`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
          enabled ? 'translate-x-6' : ''
        }`}
      ></div>
    </button>
  );
}
