import { Calendar, MapPin, Tag } from 'lucide-react';

export default function HolidaysTable({ holidays }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-MY', { month: 'short' }),
      weekday: date.toLocaleDateString('en-MY', { weekday: 'short' }),
      full: date.toLocaleDateString('en-MY', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'public':
        return 'bg-green-100 text-green-800';
      case 'state':
        return 'bg-orange-100 text-orange-800';
      case 'school':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (holidays.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No holidays found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Holiday</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">States</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {holidays.map((holiday) => {
              const dateInfo = formatDate(holiday.date);
              return (
                <tr key={holiday.id} className="holiday-row transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-blue-50 rounded-lg p-3 text-center min-w-[60px]">
                        <div className="text-xs text-blue-600 font-medium uppercase">
                          {dateInfo.month}
                        </div>
                        <div className="text-xl font-bold text-blue-900">
                          {dateInfo.day}
                        </div>
                        <div className="text-xs text-blue-500">
                          {dateInfo.weekday}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-base font-semibold text-gray-900">
                        {holiday.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {holiday.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(holiday.category)}`}>
                      <Tag className="h-3 w-3 mr-1" />
                      {holiday.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {holiday.states.map((state, idx) => (
                          <span 
                            key={idx} 
                            className="text-sm text-gray-600"
                          >
                            {state}{idx < holiday.states.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
