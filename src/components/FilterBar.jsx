import { Search, Filter } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedState,
  setSelectedState,
  categories,
  states,
  darkMode
}) {
  return (
    <div className={`rounded-xl shadow-md p-6 mb-8 transition-colors duration-300 ${
      darkMode ? "bg-[#fffffe]" : "bg-[#0f0e17]"
    }`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`} />
          <input
            type="text"
            placeholder="Search holidays..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`search-input pl-10 ${
              darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className={darkMode ? "text-gray-400" : "text-gray-500"} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="all">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''} ${
              darkMode ? "dark" : ""
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
