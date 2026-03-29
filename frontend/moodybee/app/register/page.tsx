import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register – Daylio",
  description: "Create an account to track your mood",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Main Register Card */}
      <div className="w-full max-w-sm bg-[#7CCC29] p-8 sm:p-10 rounded-[40px] shadow-lg flex flex-col items-center">
        
        {/* Title */}
        <h1 className="text-white text-3xl sm:text-4xl font-extrabold mb-8 tracking-wide">
          Register
        </h1>

        {/* Register Form Items */}
        <form className="w-full flex flex-col gap-5 sm:gap-6" action="/login">
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white text-black placeholder-gray-400 rounded-full px-6 py-3 sm:py-4 text-[15px] sm:text-[16px] font-semibold outline-none focus:ring-4 focus:ring-white/40 transition-shadow"
            required
          />

          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-white text-black placeholder-gray-400 rounded-full px-6 py-3 sm:py-4 text-[15px] sm:text-[16px] font-semibold outline-none focus:ring-4 focus:ring-white/40 transition-shadow"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white text-black placeholder-gray-400 rounded-full px-6 py-3 sm:py-4 text-[15px] sm:text-[16px] font-semibold outline-none focus:ring-4 focus:ring-white/40 transition-shadow"
            required
          />

          {/* Submit Button */}
          {/* Using the identical 3D yellow-border effect as Login page */}
          <button
            type="submit"
            className="mt-4 w-3/4 mx-auto bg-white rounded-full py-2.5 sm:py-3 border-[4px] border-[#FDB813] border-b-[6px] active:border-b-[4px] active:translate-y-[2px] transition-all"
          >
            <span className="text-[#FDB813] text-[20px] sm:text-[22px] font-extrabold tracking-wide drop-shadow-sm">
              Register
            </span>
          </button>

        </form>

      </div>
    </main>
  );
}
