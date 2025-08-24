import React from 'react';
import { Star, Trophy, Award, CheckCircle, Target, Medal, Crown, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RewardsPage = () => {
  const { state } = useApp();
  const { currentUser, darkMode, fields } = state;

  const totalResources = fields.reduce((total, field) => 
    total + field.sections.reduce((sectionTotal, section) => 
      sectionTotal + section.resources.length, 0), 0);

  const completionPercentage = Math.round((currentUser.completedResources.length / totalResources) * 100);

  const achievements = [
    {
      id: 'first-lesson',
      title: 'الخطوة الأولى',
      description: 'أكمل درسك الأول',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: darkMode ? 'bg-green-900/20' : 'bg-green-100',
      earned: currentUser.completedResources.length >= 1
    },
    {
      id: 'five-lessons',
      title: 'المتعلم النشط',
      description: 'أكمل 5 دروس',
      icon: Star,
      color: 'text-blue-500',
      bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-100',
      earned: currentUser.completedResources.length >= 5
    },
    {
      id: 'ten-lessons',
      title: 'عاشق المعرفة',
      description: 'أكمل 10 دروس',
      icon: Medal,
      color: 'text-purple-500',
      bgColor: darkMode ? 'bg-purple-900/20' : 'bg-purple-100',
      earned: currentUser.completedResources.length >= 10
    },
    {
      id: 'section-master',
      title: 'سيد المقطع',
      description: 'أكمل مقطعاً كاملاً',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-100',
      earned: fields.some(field => 
        field.sections.some(section => 
          section.resources.every(resource => 
            currentUser.completedResources.includes(resource.id)
          )
        )
      )
    },
    {
      id: 'field-champion',
      title: 'بطل الميدان',
      description: 'أكمل ميداناً كاملاً',
      icon: Crown,
      color: 'text-red-500',
      bgColor: darkMode ? 'bg-red-900/20' : 'bg-red-100',
      earned: fields.some(field => 
        field.sections.every(section => 
          section.resources.every(resource => 
            currentUser.completedResources.includes(resource.id)
          )
        )
      )
    },
    {
      id: 'speed-learner',
      title: 'المتعلم السريع',
      description: 'احصل على أكثر من 500 نقطة',
      icon: Zap,
      color: 'text-orange-500',
      bgColor: darkMode ? 'bg-orange-900/20' : 'bg-orange-100',
      earned: currentUser.points >= 500
    }
  ];

  const earnedAchievements = achievements.filter(achievement => achievement.earned);
  const nextAchievements = achievements.filter(achievement => !achievement.earned).slice(0, 3);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-3xl p-8 shadow-xl`}>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
          المكافآت والإنجازات
        </h1>
        <p className={`text-xl text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          تتبع تقدمك واكتشف إنجازاتك في رحلة التعلم
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg text-center`}>
          <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            {currentUser.points}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>النقاط الإجمالية</div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg text-center`}>
          <Trophy className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            {currentUser.level}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>المستوى الحالي</div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg text-center`}>
          <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            {earnedAchievements.length}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>الشارات المكتسبة</div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg text-center`}>
          <CheckCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            {currentUser.completedResources.length}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>الدروس المكتملة</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>نظرة عامة على التقدم</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>التقدم الإجمالي</span>
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{completionPercentage}%</span>
            </div>
            <div className={`w-full bg-gray-200 rounded-full h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentUser.completedResources.length} من {totalResources} دروس مكتملة
            </div>
          </div>

          <div className="space-y-3">
            {fields.map((field) => {
              const fieldTotalResources = field.sections.reduce((total, section) => total + section.resources.length, 0);
              const fieldCompletedResources = field.sections.reduce((total, section) => 
                total + section.resources.filter(resource => 
                  currentUser.completedResources.includes(resource.id)
                ).length, 0);
              const fieldPercentage = Math.round((fieldCompletedResources / fieldTotalResources) * 100);

              return (
                <div key={field.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{field.title}</span>
                    <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{fieldPercentage}%</span>
                  </div>
                  <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${fieldPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>🎉 إنجازاتك المكتسبة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedAchievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`${achievement.bgColor} rounded-2xl p-6 shadow-lg border-2 border-transparent hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <Icon className={`w-8 h-8 ${achievement.color}`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        مكتسب
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Achievements */}
      {nextAchievements.length > 0 && (
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>🎯 الإنجازات التالية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextAchievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border-2 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'} opacity-75 hover:opacity-100 transition-all duration-300`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    <div className="mt-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        <Target className="w-3 h-3" />
                        لم يكتسب بعد
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-2xl p-8 text-center border-l-4 border-blue-500`}>
        <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          استمر في التعلم! 🚀
        </h3>
        <p className={`text-lg ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
          كل درس جديد تكمله يقربك خطوة أخرى من إتقان الرياضيات. استمر في التقدم واكتشف المزيد من الإنجازات!
        </p>
      </div>
    </div>
  );
};

export default RewardsPage;