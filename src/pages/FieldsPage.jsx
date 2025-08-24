import React from 'react';
import { BookOpen } from 'lucide-react';
import { useApp, ACTIONS } from '../context/AppContext';

const FieldsPage = () => {
  const { state, dispatch } = useApp();
  const { fields, darkMode, currentUser } = state;

  const handleFieldClick = (field) => {
    dispatch({ type: ACTIONS.SET_SELECTED_FIELD, payload: field });
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: 'field' });
  };

  return (
    <div className="p-8 space-y-8">
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-3xl p-8 shadow-xl`}>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          أهلاً بك، {currentUser.name}!
        </h2>
        <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          اختر الميدان التعليمي لتبدأ رحلة التعلم في الرياضيات
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-white/50'} rounded-2xl p-4 text-center`}>
            <div className="text-2xl font-bold text-blue-600">{currentUser.points}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>النقاط المحصلة</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-white/50'} rounded-2xl p-4 text-center`}>
            <div className="text-2xl font-bold text-green-600">{currentUser.completedResources.length}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>الدروس المكتملة</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-white/50'} rounded-2xl p-4 text-center`}>
            <div className="text-2xl font-bold text-purple-600">{currentUser.level}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>المستوى الحالي</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8 text-center`}>الميادين التعليمية</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {fields.map((field) => (
            <div
              key={field.id}
              onClick={() => handleFieldClick(field)}
              className={`group cursor-pointer rounded-3xl p-8 shadow-xl transition-all duration-500 hover:scale-105 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} border-2 border-transparent hover:border-blue-200`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 ${field.color} rounded-3xl flex items-center justify-center`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  {field.sections.length} مقاطع
                </div>
              </div>
              
              <h4 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                {field.title}
              </h4>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {field.description}
              </p>
              
              <div className="space-y-2">
                {field.sections.map((section, index) => (
                  <div key={section.id} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-2`}>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    {section.title} ({section.resources.length} موارد)
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  المجموع: {field.sections.reduce((total, section) => total + section.resources.length, 0)} موارد
                </span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <span className="text-white text-sm">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldsPage;