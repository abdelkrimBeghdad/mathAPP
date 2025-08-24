import React, { createContext, useContext, useReducer } from 'react';
import { lessonData } from '../data/lessonData';

const AppContext = createContext();

export const ACTIONS = {
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_SELECTED_FIELD: 'SET_SELECTED_FIELD',
  SET_SELECTED_SECTION: 'SET_SELECTED_SECTION',
  SET_SELECTED_RESOURCE: 'SET_SELECTED_RESOURCE',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  COMPLETE_RESOURCE: 'COMPLETE_RESOURCE',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ'
};

const initialState = {
  fields: lessonData,
  users: [
    {
      id: 'user-1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 'student',
      points: 450,
      level: 3,
      completedResources: [],
      badges: ['first-lesson']
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      title: 'دروس جديدة متاحة',
      message: 'تم إضافة دروس جديدة في الأعداد الطبيعية والحساب الحرفي',
      type: 'info',
      read: false
    },
    {
      id: 'notif-2',
      title: 'إنجاز جديد!',
      message: 'تم فتح ميدان الأنشطة الهندسية',
      type: 'success',
      read: false
    }
  ],
  currentUser: null,
  darkMode: false,
  currentPage: 'fields',
  selectedField: null,
  selectedSection: null,
  selectedResource: null,
  sidebarOpen: false
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case ACTIONS.SET_SELECTED_FIELD:
      return { ...state, selectedField: action.payload };
    case ACTIONS.SET_SELECTED_SECTION:
      return { ...state, selectedSection: action.payload };
    case ACTIONS.SET_SELECTED_RESOURCE:
      return { ...state, selectedResource: action.payload };
    case ACTIONS.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case ACTIONS.COMPLETE_RESOURCE:
      const updatedUsers = state.users.map(user => 
        user.id === state.currentUser.id 
          ? { 
              ...user, 
              completedResources: [...user.completedResources, action.payload.resourceId],
              points: user.points + action.payload.points
            }
          : user
      );
      return {
        ...state,
        users: updatedUsers,
        currentUser: updatedUsers.find(u => u.id === state.currentUser.id)
      };
    case ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        )
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    currentUser: initialState.users[0]
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};