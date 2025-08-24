import React, { useState } from 'react';
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp, BookOpen, Lightbulb, Target } from 'lucide-react';
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

const ResourcePage = () => {
  const { state, dispatch } = useApp();
  const { selectedResource, selectedSection, selectedField, darkMode, currentUser } = state;
  const [showSolution, setShowSolution] = useState(false);
  const [showAppSolution, setShowAppSolution] = useState(false);
  
  if (!selectedResource) {
    return (
      <div className="p-8 text-center">
        <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>جاري التحميل...</div>
      </div>
    );
  }

  const isCompleted = currentUser.completedResources.includes(selectedResource.id);

  const handleCompleteResource = () => {
    if (!isCompleted) {
      dispatch({ 
        type: ACTIONS.COMPLETE_RESOURCE, 
        payload: { resourceId: selectedResource.id, points: 50 }
      });
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header with breadcrumb */}
      <div className="flex items-center gap-4 mb-6">
        <BackButton onClick={() => dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: 'section' })} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 text-sm">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedField?.title}</span>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedSection?.title}</span>
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedResource.title}</span>
          </div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedResource.title}
          </h1>
          {isCompleted && (
            <div className="flex items-center gap-2 mt-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">تم إتمام هذا المورد</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>الحوصلة</h2>
            </div>
            
            <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/20' : 'bg-gradient-to-br from-blue-50 to-blue-100'} rounded-xl p-6 mb-6 border-l-4 border-blue-500`}>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'} font-medium`}>
                {selectedResource.summary}
              </p>
            </div>
          </div>

          {/* Example Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>مثال تطبيقي</h3>
            </div>
            
            <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-6 mb-4 border-l-4 border-orange-500`}>
              <p className={`font-medium text-lg ${darkMode ? 'text-orange-200' : 'text-orange-800'}`}>
                {selectedResource.example}
              </p>
            </div>
            
            <button
              onClick={() => setShowSolution(!showSolution)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                showSolution 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {showSolution ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              <span>{showSolution ? 'إخفاء الحل' : 'عرض الحل'}</span>
            </button>
            
            {showSolution && (
              <div className={`mt-4 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-6 border-l-4 border-green-500`}>
                <h4 className={`font-bold mb-3 text-lg ${darkMode ? 'text-green-300' : 'text-green-800'}`}>الحل:</h4>
                <p className={`${darkMode ? 'text-green-200' : 'text-green-800'} text-lg leading-relaxed`}>
                  {selectedResource.exampleSolution}
                </p>
              </div>
            )}
          </div>

          {/* Application Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>تطبيق</h3>
            </div>
            
            <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-xl p-6 mb-4 border-l-4 border-purple-500`}>
              <p className={`font-medium text-lg ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                {selectedResource.application}
              </p>
            </div>
            
            <button
              onClick={() => setShowAppSolution(!showAppSolution)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                showAppSolution 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {showAppSolution ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              <span>{showAppSolution ? 'إخفاء الحل' : 'عرض الحل'}</span>
            </button>
            
            {showAppSolution && (
              <div className={`mt-4 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-6 border-l-4 border-green-500`}>
                <h4 className={`font-bold mb-3 text-lg ${darkMode ? 'text-green-300' : 'text-green-800'}`}>الحل:</h4>
                <p className={`${darkMode ? 'text-green-200' : 'text-green-800'} text-lg leading-relaxed`}>
                  {selectedResource.applicationSolution}
                </p>
              </div>
            )}
          </div>

          {/* Completion Button */}
          <div className="text-center py-8">
            {!isCompleted ? (
              <button
                onClick={handleCompleteResource}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                إتمام الدرس (+50 نقطة)
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl shadow-lg">
                <CheckCircle className="w-6 h-6" />
                <span className="font-bold text-lg">تم إتمام الدرس بنجاح!</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progress Card */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>تقدمك</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mx-auto mb-2 ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-blue-500 bg-blue-50'
                } ${darkMode && isCompleted ? 'bg-green-900/20' : ''} ${darkMode && !isCompleted ? 'bg-blue-900/20' : ''}`}>
                  {isCompleted ? (
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  ) : (
                    <span className="text-2xl font-bold text-blue-500">
                      {selectedSection?.resources.findIndex(r => r.id === selectedResource.id) + 1}
                    </span>
                  )}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  المورد {selectedSection?.resources.findIndex(r => r.id === selectedResource.id) + 1} من {selectedSection?.resources.length}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Card */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>الموارد الأخرى</h3>
            <div className="space-y-2">
              {selectedSection?.resources.slice(0, 5).map((resource, index) => {
                const isCurrentResource = resource.id === selectedResource.id;
                const isResourceCompleted = currentUser.completedResources.includes(resource.id);
                
                return (
                  <div
                    key={resource.id}
                    onClick={() => !isCurrentResource && handleResourceClick(resource)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      isCurrentResource
                        ? darkMode ? 'bg-blue-900/30 border-blue-500 border' : 'bg-blue-100 border-blue-300 border'
                        : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isResourceCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isResourceCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${
                          isCurrentResource 
                            ? darkMode ? 'text-blue-300' : 'text-blue-700'
                            : darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {resource.title}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {selectedSection && selectedSection.resources.length > 5 && (
                <div className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} pt-2`}>
                  و {selectedSection.resources.length - 5} موارد أخرى
                </div>
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20' : 'bg-gradient-to-br from-yellow-50 to-orange-50'} rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>💡 نصيحة</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
              تأكد من فهم الحوصلة جيداً قبل الانتقال إلى المثال. جرب حل التطبيق بنفسك قبل رؤية الحل.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;