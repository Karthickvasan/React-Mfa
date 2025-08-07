import React, { useState } from "react";

const TwoFASetup = ({ qrCode, secret }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Turn on 2FA Verification</h2>
        <p className="mb-4 text-gray-600">
          Scan the QR code below with your authenticator app
        </p>

        <div className="flex justify-center mb-4">
          <img src={qrCode} alt="2FA QR Code" />
        </div>

        <div className="text-sm text-gray-500 mb-2">Or enter the code manually:</div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{secret}</span>
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mt-2"
          onClick={() => {
            // navigate to verification page or proceed with enabling 2FA
            window.location.href = "/verify-2fa";
          }}
        >
          Continue to Verification
        </button>
      </div>
    </div>
  );
};

export default TwoFASetup;
