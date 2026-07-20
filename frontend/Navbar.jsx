import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  heading,
  a1,
  a2,
  l1,
  l2,
  width,
  image,
  w,
  onLogoutClick,
}) {
  const [open, setOpen] = useState(false);

  const primaryBtnClasses =
    "text-center text-[13px] sm:text-[14px] py-2 px-3 sm:px-4 bg-[#10B981] text-white rounded-xl hover:bg-emerald-600 active:scale-95 transition-all duration-200";

  const secondaryBtnClasses =
    "flex justify-center items-center gap-1 text-center text-[13px] sm:text-[14px] py-2 px-3 sm:px-4 bg-[#10B981] text-white rounded-xl hover:bg-emerald-600 active:scale-95 transition-all duration-200";

  return (
    <div className="fixed top-0 w-full z-10 shadow-md bg-[#0F172A]">
      {/* Top bar */}
      <div className="flex justify-between items-center min-h-14 p-2 sm:px-4">
        <h1 className="text-xl sm:text-2xl text-white truncate max-w-[60%] sm:max-w-none text-left">
          {heading}
        </h1>

        {/* Desktop actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to={l1}>
            <button className={`${primaryBtnClasses} ${width}`}>{a1}</button>
          </Link>

          {onLogoutClick ? (
            <button onClick={onLogoutClick} className={`${secondaryBtnClasses} w-20`}>
              {a2}
              <img src={image} className={`${w} object-contain`} alt="" />
            </button>
          ) : (
            <Link to={l2}>
              <button className={`${secondaryBtnClasses} w-20`}>
                {a2}
                <img src={image} className={`${w} object-contain`} alt="" />
              </button>
            </Link>
          )}
        </div>

        {/* Mobile hamburger toggle */}
        <button
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white hover:bg-white/10 active:scale-95 transition-all duration-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-3 pb-3">
          <Link to={l1} onClick={() => setOpen(false)}>
            <button className={`${primaryBtnClasses} w-full`}>{a1}</button>
          </Link>

          {onLogoutClick ? (
            <button
              onClick={() => {
                setOpen(false);
                onLogoutClick();
              }}
              className={`${secondaryBtnClasses} w-full`}
            >
              {a2}
              <img src={image} className={`${w} object-contain`} alt="" />
            </button>
          ) : (
            <Link to={l2} onClick={() => setOpen(false)}>
              <button className={`${secondaryBtnClasses} w-full`}>
                {a2}
                <img src={image} className={`${w} object-contain`} alt="" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}