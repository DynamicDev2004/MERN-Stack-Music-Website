import React from "react";

const allCategories = [
  // Languages
  'English',
  'Urdu',
  'Hindi',
  'Arabic',

  // Artists
  'Atif Aslam',
  'Arjit Singh',
  'NFAK',
  'Alan Walker',
  'Talha Anjum',

  // Genres
  'Rock',
  'Qawwali',
  'EDM',
  'Lofi',
  'Classical',
  'Acoustic',
  'Rap',
  'Mashup',
  'Slowed',

  // Moods / Vibes
  'Chill',
  'Romantic',
  'Sad',
  'Party',
  
];


export default function MultipleSelectChip({ selected, setSelected }) {
  const toggleSelect = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="w-72">
      <label className="block text-sm font-medium mb-1 text-[var(--general-white)]">
        Category
      </label>
      <div className="relative">

        <div
          className="w-full min-h-[44px] rounded-lg border border-[var(--primary-colour)] bg-[var(--general-black)] px-3 py-2 text-left flex flex-wrap gap-1 cursor-pointer focus-within:ring-2 focus-within:ring-[var(--primary-colour)]"
        >
          {selected.length > 0 ? (
            selected.map((item) => (
              <span
                key={item}
                className="flex items-center bg-[var(--primary-colour)] text-[var(--general-white)] text-sm px-2 py-0.5 rounded-full"
              >
                {item}
                <button
                  type="button"
                  className="ml-1 text-xs text-[var(--general-white)] hover:text-[var(--general-black)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelect(item);
                  }}
                >
                  ✕
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">Select...</span>
          )}
        </div>


        <div className="absolute mt-1 w-full max-h-36 overflow-auto rounded-md bg-[var(--general-black)] shadow-lg border border-[var(--general-white)]/20 z-10">
          {allCategories.map((name) => (
            <div
              key={name}
              className={`cursor-pointer px-3 py-2 text-sm text-[var(--general-white)] hover:bg-[var(--primary-colour)] hover:text-[var(--general-black)] ${
                selected.includes(name)
                  ? "bg-[var(--primary-colour)] text-[var(--general-black)] font-medium"
                  : ""
              }`}
              onClick={() => toggleSelect(name)}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
