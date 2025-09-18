import { useState } from "react";
import { ChevronRight, Lock, Play } from "lucide-react";

export default function CourseOutlineTab({course}) {
  const [activeModule, setActiveModule] = useState(3);
  const outline = course?.outline;

  const outlinesData = outline?.topic?.map((item,index) => {
    return {
      id: index + 1,
      title: item?.title,
      lessons:item?.subtopics?.map((subtopic, subIndex) => {
        return {
          id: subIndex + 1,
          title: subtopic?.title,
        };
      })
    }
  })
  

  const toggleModule = (moduleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-slate-700 flex">
      {/* Sidebar */}
      <div className="w-full bg-slate-800 overflow-y-auto">
        <div className="p-4 space-y-2">
          {outlinesData?.map((module) => (
            <div
              key={module.id}
              className="bg-slate-600 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-500 transition-colors"
              >
                <div>
                  <div className="text-sm text-slate-300 font-medium">
                    Module {module.id}
                  </div>
                  <div className="text-white font-semibold mt-1">
                    {module.title}
                  </div>
                </div>
                <ChevronRight
                  className={`text-white transition-transform ${
                    activeModule === module.id ? "rotate-90" : ""
                  }`}
                  size={20}
                />
              </button>

              {activeModule === module.id && module.lessons.length > 0 && (
                <div className="bg-slate-700 border-t border-slate-500">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 border-b border-slate-600 last:border-b-0 hover:bg-slate-600 transition-colors cursor-pointer ${
                        lesson.active ? "bg-blue-600 hover:bg-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.active && (
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <Play
                              className="text-blue-600"
                              size={12}
                              fill="currentColor"
                            />
                          </div>
                        )}
                        <span
                          className={`text-sm font-medium text-slate-200`}
                        >
                          {lesson.title}
                        </span>
                      </div>
                      <Lock className="text-slate-400" size={16} />
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
