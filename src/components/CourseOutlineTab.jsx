import { useState } from "react";
import { ChevronRight, Lock, Play } from "lucide-react";

export default function CourseOutlineTab({ course }) {
  const [activeModule, setActiveModule] = useState(3);
  const outline = course?.outline;

  const outlinesData = outline?.topic?.map((item, index) => {
    return {
      id: index + 1,
      title: item?.title,
      lessons: item?.subtopics?.map((subtopic, subIndex) => {
        return {
          id: subIndex + 1,
          title: subtopic?.title,
        };
      }),
    };
  });

  const toggleModule = (moduleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300 flex">
      {/* Sidebar */}
      <div className="w-full bg-white dark:bg-slate-800 shadow-lg overflow-y-auto transition-colors duration-300">
        <div className="p-4 space-y-3">
          {outlinesData?.map((module) => (
            <div
              key={module.id}
              className="bg-gray-50 dark:bg-slate-700 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600 transition-colors"
            >
              {/* Module button */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
              >
                <div>
                  <div className="text-sm text-gray-600 dark:text-slate-300 font-medium">
                    Module {module.id}
                  </div>
                  <div className="text-gray-900 dark:text-white font-semibold mt-1">
                    {module.title}
                  </div>
                </div>
                <ChevronRight
                  className={`text-gray-700 dark:text-white transition-transform ${
                    activeModule === module.id ? "rotate-90" : ""
                  }`}
                  size={20}
                />
              </button>

              {/* Lessons */}
              {activeModule === module.id && module.lessons.length > 0 && (
                <div className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-600 transition-colors">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 last:border-b-0 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer ${
                        lesson.active
                          ? "bg-blue-100 dark:bg-blue-600/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.active && (
                          <div className="w-6 h-6 bg-blue-600 dark:bg-white rounded-full flex items-center justify-center">
                            <Play
                              className="text-white dark:text-blue-600"
                              size={12}
                              fill="currentColor"
                            />
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-800 dark:text-slate-200">
                          {lesson.title}
                        </span>
                      </div>
                      <Lock className="text-gray-400 dark:text-slate-400" size={16} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
