import { Link } from 'react-router-dom';
import { FaBell, FaWallet, FaArrowRight } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-[16px] py-[48px] bg-transparent relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-[80px] w-[256px] h-[256px] bg-blue-500/10 rounded-full blur-[80px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-[80px] w-[320px] h-[320px] bg-emerald-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="w-full max-w-[1024px] text-center relative z-10">
                <h1 className="text-[32px] sm:text-[60px] font-black text-slate-800 tracking-tighter mb-[16px] animate-in fade-in slide-in-from-top-10 duration-700 leading-tight">
                    Your Personal <span className="text-[#2d5bff]">Organizer</span>
                </h1>
                <p className="text-slate-500 text-[12px] sm:text-[18px] font-bold uppercase tracking-[0.2em] mb-[48px] animate-in fade-in slide-in-from-top-10 duration-700 delay-100">
                    Productivity meets Control
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] sm:gap-[32px] px-[16px] sm:px-0">
                    {/* Reminder App Card */}
                    <Link to="/reminders" className="group">
                        <div className="glass h-full p-[32px] sm:p-[40px] rounded-[40px] border border-white/50 shadow-2xl hover:shadow-[#2d5bff]/20 hover:border-[#2d5bff]/30 transition-all duration-500 group-hover:-translate-y-2 flex flex-col items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] bg-linear-to-br from-[#2d5bff] to-[#6366f1] rounded-[24px] flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-[32px] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <FaBell className="text-white text-[30px] sm:text-[40px] animate-bounce" />
                            </div>

                            <h2 className="text-[24px] sm:text-[30px] font-black text-slate-800 mb-[16px] group-hover:text-[#2d5bff] transition-colors">Reminders</h2>
                            <p className="text-slate-500 text-[13px] sm:text-[14px] font-bold leading-relaxed mb-[32px] max-w-[200px]">
                                Never miss a deadline. Stay on top of your daily tasks and priorities.
                            </p>

                            <div className="mt-auto flex items-center gap-[8px] text-[#2d5bff] font-black text-[11px] uppercase tracking-widest group-hover:gap-[16px] transition-all">
                                Open Dashboard <FaArrowRight />
                            </div>
                        </div>
                    </Link>

                    {/* Expense Tracker Card */}
                    <Link to="/expense-tracker" className="group">
                        <div className="glass h-full p-[32px] sm:p-[40px] rounded-[40px] border border-white/50 shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/30 transition-all duration-500 group-hover:-translate-y-2 flex flex-col items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] bg-linear-to-br from-emerald-400 to-teal-600 rounded-[24px] flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-[32px] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                                <FaWallet className="text-white text-[30px] sm:text-[40px]" />
                            </div>

                            <h2 className="text-[24px] sm:text-[30px] font-black text-slate-800 mb-[16px] group-hover:text-emerald-600 transition-colors">Expenses</h2>
                            <p className="text-slate-500 text-[13px] sm:text-[14px] font-bold leading-relaxed mb-[32px] max-w-[200px]">
                                Track every penny. Monitor your spending habits and save smarter.
                            </p>

                            <div className="mt-auto flex items-center gap-[8px] text-emerald-600 font-black text-[11px] uppercase tracking-widest group-hover:gap-[16px] transition-all">
                                Start Tracking <FaArrowRight />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Footer Quote */}
                <div className="mt-[64px] animate-in fade-in duration-1000 delay-500">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">Design for your daily lifestyle</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
