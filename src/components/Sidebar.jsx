import React from 'react';
import { BookOpen, Trophy, X } from 'lucide-react';
import { useApp, ACTIONS } from '../context/AppContext';

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const { currentPage, darkMode, sidebarOpen, currentUser } = state;

  const menuItems = [
    { id: 'fields', label: 'الميادين', icon: BookOpen },
    { id: 'rewards', label: 'المكافآت', icon: Trophy }
  ];

  const handleNavigation = (pageId) => {
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: pageId });
    dispatch({ type: ACTIONS.SET_SELECTED_FIELD, payload: null });
    dispatch({ type: ACTIONS.SET_SELECTED_SECTION, payload: null });
    dispatch({ type: ACTIONS.SET_SELECTED_RESOURCE, payload: null });
    if (sidebarOpen) {
      dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR })} />
      )}
      
      <aside className={`fixed lg:static inset-y-0 right-0 z-50 w-72 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform transition-all ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b lg:hidden">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>القائمة</h2>
          <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR })} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-6 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-500 text-white' : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mx-6 mt-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6`}>
            <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
            <h3 className={`font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>الإحصائيات</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>النقاط</span>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.points}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>المستوى</span>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.level}</span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>الدروس المكتملة</span>
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.completedResources.length}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;