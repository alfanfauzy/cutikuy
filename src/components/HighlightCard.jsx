import { Calendar, Clock, MapPin } from 'lucide-react';

export default function HighlightCard({ holidays }) {
  // Find upcoming holidays
  const today = new Date();
  const upcomingHolidays = holidays
    .filter(h => new Date(h.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-MY', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateStr) => {
    const holiday = new Date(dateStr);
    const diffTime = holiday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Upcoming Holidays
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingHolidays.map((holiday, index) => {
            const daysUntil = getDaysUntil(holiday.date);
            return (
              <div 
                key={holiday.id} 
                className={`rounded-xl p-6 shadow-lg ${
                  index === 0 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' 
                    : 'bg-white text-gray-900'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    index === 0 ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {daysUntil === 0 
                      ? 'Today!' 
                      : daysUntil === 1 
                        ? 'Tomorrow' 
                        : `${daysUntil} days left`
                    }
                  </div>
                  {index === 0 && (
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                      NEXT
                    </span>
                  )}
                </div>

                <h3 className={`text-xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                  {holiday.name}
                </h3>

                <div className={`space-y-2 ${index === 0 ? 'text-blue-100' : 'text-gray-600'}`}>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{formatDate(holiday.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm capitalize">{holiday.category} Holiday</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {holiday.states.length > 2 
                        ? `${holiday.states.slice(0, 2).join(', ')} +${holiday.states.length - 2} more`
                        : holiday.states.join(', ')
                      }
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
