interface APIKeyDisplayProps {
  apiKey: string;
  onCopy?: () => void;
}

export default function APIKeyDisplay({
  apiKey,
  onCopy,
}: APIKeyDisplayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);

    alert("API Key copied!");

    onCopy?.();
  };

  return (
    <div className="bg-[#11182D] border border-white/10 rounded-3xl p-6 shadow-2xl">
    
      <div className="flex items-center gap-4 mb-5">
        

        <div>
          <h2 className="text-2xl font-bold text-white">
            Your API Key
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Use this API key in your client
            library to send logs
          </p>
        </div>
      </div>

    
      <div className="flex items-center gap-4 flex-wrap">
        <code className="flex-1 bg-[#0B1023] border border-white/10 px-4 py-4 rounded-2xl font-mono text-sm break-all text-gray-300">
          {apiKey}
        </code>

        <button
          onClick={handleCopy}
          className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Copy
        </button>
      </div>
    </div>
  );
}