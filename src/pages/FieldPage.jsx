import React from 'react';
import { ArrowRight, BookOpen, Calculator, FileText } from 'lucide-react';
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

const FieldPage = () => {
  const { state, dispatch } = useApp();
  const { selectedField, darkMode, currentUser } = state;
  
  if (!selectedField) {
    return (
      <div className="p-8 text-center">
        <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>جاري التحميل...</div>
      </div>
    );
  }

  const handleSectionClick = (section) => {
    dispatch({ type: ACTIONS.SET_SELECTED_SECTION, payload: section });
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: 'section' });
  };

  const getCompletedResourcesInSection = (section) => {
    return section.resources.filter(resource => 
      currentUser.completedResources.includes(resource.id)
    ).length;
  };

  const getSectionIcon = (sectionIndex) => {
    const icons = [Calculator, FileText, BookOpen];
    return icons[sectionIndex % icons.length] || BookOpen;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <BackButton onClick={() => dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: 'fields' })} />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 ${selectedField.color} rounded-2xl flex items-center justify-center`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedField.title}
            </h1>
          </div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mr-15`}>
            {selectedField.description}
          </p>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-8`}>
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>إحصائيات الميدان</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-blue-600">{selectedField.sections.length}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>المقاطع</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-green-600">
              {selectedField.sections.reduce((total, section) => total + section.resources.length, 0)}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>الموارد التعليمية</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-purple-600">
              {selectedField.sections.reduce((total, section) => total + getCompletedResourcesInSection(section), 0)}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>الموارد المكتملة</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-yellow-50'} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round((selectedField.sections.reduce((total, section) => total + getCompletedResourcesInSection(section), 0) / 
                selectedField.sections.reduce((total, section) => total + section.resources.length, 0)) * 100) || 0}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>نسبة الإنجاز</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>المقاطع التعليمية</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedField.sections.map((section, index) => {
            const Icon = getSectionIcon(index);
            const completedResources = getCompletedResourcesInSection(section);
            const totalResources = section.resources.length;
            const progressPercentage = Math.round((completedResources / totalResources) * 100);

            return (
              <div 
                key={section.id} 
                onClick={() => handleSectionClick(section)}
                className={`group cursor-pointer rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } border-2 border-transparent hover:border-blue-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${selectedField.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    progressPercentage === 100 
                      ? 'bg-green-100 text-green-800' 
                      : progressPercentage > 0 
                      ? 'bg-yellow-100 text-yellow-800'
                      : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {progressPercentage}% مكتمل
                  </div>
                </div>
                
                <h4 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                  {section.title}
                </h4>
                
                <div className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {totalResources} موارد تعليمية • {completedResources} مكتملة
                </div>

                <div className="mb-4">
                  <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    ابدأ التعلم
                  </span>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FieldPage;