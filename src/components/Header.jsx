import React from 'react';
import { Menu, Bell, Sun, Moon, Brain, Star } from 'lucide-react';
import { useApp, ACTIONS } from '../context/AppContext';

const Header = () => {
  const { state, dispatch } = useApp();
  const { currentUser, darkMode, notifications } = state;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg`}>
      <div className="flex items-center gap-6">
        <button
          onClick={() => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR })}
          className={`lg:hidden p-3 rounded-xl ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              منصة الرياضيات التفاعلية
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>الصف الرابع متوسط</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentUser.name}
            </p>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {currentUser.points} نقطة
              </span>
            </div>
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
            {currentUser.name.charAt(0)}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {unreadNotifications > 0 && (
            <div className="relative cursor-pointer" onClick={() => dispatch({ type: ACTIONS.MARK_NOTIFICATION_READ, payload: notifications.find(n => !n.read)?.id })}>
              <Bell className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            </div>
          )}
          
          <button
            onClick={() => dispatch({ type: ACTIONS.TOGGLE_DARK_MODE })}
            className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-purple-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;