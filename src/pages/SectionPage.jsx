import React from 'react';
import { ArrowRight, Check, Clock, BookOpen } from 'lucide-react';
import { useApp, ACTIONS } from '../context/AppContext';

const BackButton = ({ onClick }) => {
  const { state } = useApp();
  const { darkMode } = state;
  
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-50 text-gray-900'} shadow-md transition-all`}
    >
      <ArrowRight className="w-5 h-5" />
      <span>رجوع</span>
    </button>
  );
};

const SectionPage = () => {
  const { state, dispatch } = useApp();
  const { selectedSection, selectedField, darkMode, currentUser } = state;
  
  if (!selectedSection) {
    return (
      <div className="p-8 text-center">
        <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>جاري التحميل...</div>
      </div>
    );
  }

  const handleResourceClick = (resource) => {
    dispatch({ type: ACTIONS.SET_SELECTED_RESOURCE, payload: resource });
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: 'resource' });
  };

  const completedResources = selectedSection.resources.filter(resource => 
    currentUser.completedResources.includes(resource.id)
  ).length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <BackButton onClick={() => dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: 'field' })} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedField?.title}
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedSection.title}
            </span>
          </div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedSection.title}
          </h1>
        </div>
      </div>

      {/* Progress Summary */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-8`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>تقدمك في هذا المقطع</h2>
          <div className={`px-4 py-2 rounded-full ${
            completedResources === selectedSection.resources.length
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {completedResources}/{selectedSection.resources.length} مكتمل
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-blue-600">{selectedSection.resources.length}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>إجمالي الموارد</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-green-600">{completedResources}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>المكتملة</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((completedResources / selectedSection.resources.length) * 100)}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>نسبة الإنجاز</div>
          </div>
        </div>

        <div className={`w-full bg-gray-200 rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.round((completedResources / selectedSection.resources.length) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Resources List */}
      <div>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>الموارد التعليمية</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedSection.resources.map((resource, index) => {
            const isCompleted = currentUser.completedResources.includes(resource.id);
            return (
              <div
                key={resource.id}
                onClick={() => handleResourceClick(resource)}
                className={`group cursor-pointer rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } border-2 ${
                  isCompleted 
                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100' + (darkMode ? ' !bg-gradient-to-br !from-green-900/20 !to-green-800/20' : '')
                    : 'border-transparent hover:border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
                    </div>
                    <div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                        المورد {index + 1}
                      </div>
                      {isCompleted && (
                        <div className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">مكتمل</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!isCompleted && (
                    <div className="flex items-center gap-1 text-blue-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">جديد</span>
                    </div>
                  )}
                </div>
                
                <h4 className={`text-lg font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                } group-hover:text-blue-600 transition-colors ${
                  isCompleted ? 'text-green-700' : ''
                }`}>
                  {resource.title}
                </h4>
                
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 leading-relaxed`}>
                  {resource.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      حوصلة + مثال + تطبيق
                    </span>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 group-hover:bg-blue-600 text-white'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-sm">→</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Message */}
      {completedResources === selectedSection.resources.length && (
        <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border border-green-200 rounded-2xl p-6 text-center`}>
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2">تهانينا!</h3>
          <p className="text-green-600">
            لقد أكملت جميع موارد هذا المقطع بنجاح. يمكنك الآن الانتقال إلى المقطع التالي.
          </p>
        </div>
      )}
    </div>
  );
};

export default SectionPage;