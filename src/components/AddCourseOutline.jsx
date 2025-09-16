import { useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useGetAllCourseQuery, useGetSingleCourseQuery } from "../redux/api/courseApi";

export default function AddCourseOutline() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: courseRes } = useGetAllCourseQuery({});
  const coursesData = courseRes?.data || [];

  const {data:singleCourseRes} = useGetSingleCourseQuery(selectedCourse, { skip: !selectedCourse });
  const singleCourse = singleCourseRes?.data || null;
  console.log("singleCourse", singleCourse?.outline);
  const [outline, setOutline] = useState({
    course: "",
    topic: [
      {
        title: "Introduction to Python",
        subtopics: [
          { title: "What is Python?" },
          { title: "Installing Python" },
          { title: "Python IDE Setup" },
        ],
      },
      {
        title: "Python Basics",
        subtopics: [
          { title: "Variables and Data Types" },
          { title: "Operators" },
        ],
      },
    ],
  });

  const [editingTopic, setEditingTopic] = useState(null);
  const [editingSubtopic, setEditingSubtopic] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState(new Set([0, 1]));
  const [courses] = useState([
    { _id: "507f1f77bcf86cd799439011", title: "Python Fundamentals" },
    { _id: "507f1f77bcf86cd799439012", title: "JavaScript Basics" },
    { _id: "507f1f77bcf86cd799439013", title: "React Development" },
  ]);

  const toggleTopic = (index) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const addTopic = () => {
    singleCourse.outline.topic.push({ title: "New Topic", subtopics: [] });
    // setOutline((prev) => ({
    //   ...prev,
    //   topic: [...prev.topic, { title: "New Topic", subtopics: [] }],
    // }));
    // setEditingTopic(outline.topic.length);
  };

  const deleteTopic = (index) => {
    setOutline((prev) => ({
      ...prev,
      topic: prev.topic.filter((_, i) => i !== index),
    }));
    setEditingTopic(null);
  };

  const updateTopicTitle = (index, title) => {
    setOutline((prev) => ({
      ...prev,
      topic: prev.topic.map((topic, i) =>
        i === index ? { ...topic, title } : topic
      ),
    }));
  };

  const addSubtopic = (topicIndex) => {
    singleCourse.outline.topic[topicIndex].subtopics.push({ title: "New Subtopic" });
    // setOutline((prev) => ({
    //   ...prev,
    //   topic: prev.topic.map((topic, i) =>
    //     i === topicIndex
    //       ? {
    //           ...topic,
    //           subtopics: [...topic.subtopics, { title: "New Subtopic" }],
    //         }
    //       : topic
    //   ),
    // }));
    // setEditingSubtopic({
    //   topicIndex,
    //   subtopicIndex: outline.topic[topicIndex].subtopics.length,
    // });
  };

  const deleteSubtopic = (topicIndex, subtopicIndex) => {
    setOutline((prev) => ({
      ...prev,
      topic: prev.topic.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              subtopics: topic.subtopics.filter((_, j) => j !== subtopicIndex),
            }
          : topic
      ),
    }));
    setEditingSubtopic(null);
  };

  const updateSubtopicTitle = (topicIndex, subtopicIndex, title) => {
    setOutline((prev) => ({
      ...prev,
      topic: prev.topic.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              subtopics: topic.subtopics.map((subtopic, j) =>
                j === subtopicIndex ? { ...subtopic, title } : subtopic
              ),
            }
          : topic
      ),
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would make an API call to save the outline
      console.log("Saving outline:", outline);
      alert("Outline saved successfully!");
    } catch (error) {
      alert("Error saving outline");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Course Outline Manager
              </h1>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                Save Outline
              </button>
            </div>
          </div>

          {/* Course Selection */}
          <div className="p-6 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a course...</option>
              {coursesData?.length > 0 &&
                coursesData.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course?.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Topics */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Course Topics
              </h2>
              <button
                onClick={addTopic}
                className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={16} />
                Add Topic
              </button>
            </div>

            <div className="space-y-4">
              {singleCourse?.outline && singleCourse?.outline.topic.map((topic, topicIndex) => (
                <div
                  key={topicIndex}
                  className="border border-gray-200 rounded-lg"
                >
                  {/* Topic Header */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleTopic(topicIndex)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedTopics.has(topicIndex) ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>

                      {editingTopic === topicIndex ? (
                        <input
                          type="text"
                          value={topic.title}
                          onChange={(e) =>
                            updateTopicTitle(topicIndex, e.target.value)
                          }
                          onBlur={() => setEditingTopic(null)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && setEditingTopic(null)
                          }
                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <h3
                          className="font-medium text-gray-900 cursor-pointer flex-1"
                          onClick={() => setEditingTopic(topicIndex)}
                        >
                          {topic.title}
                        </h3>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingTopic(topicIndex)}
                        className="p-1 text-gray-500 hover:text-blue-600"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => deleteTopic(topicIndex)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Subtopics */}
                  {expandedTopics.has(topicIndex) && (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">
                          Subtopics
                        </h4>
                        <button
                          onClick={() => addSubtopic(topicIndex)}
                          className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                        >
                          <Plus size={12} />
                          Add Subtopic
                        </button>
                      </div>

                      <div className="space-y-2">
                        {topic.subtopics.map((subtopic, subtopicIndex) => (
                          <div
                            key={subtopicIndex}
                            className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                          >
                            {editingSubtopic?.topicIndex === topicIndex &&
                            editingSubtopic?.subtopicIndex === subtopicIndex ? (
                              <input
                                type="text"
                                value={subtopic.title}
                                onChange={(e) =>
                                  updateSubtopicTitle(
                                    topicIndex,
                                    subtopicIndex,
                                    e.target.value
                                  )
                                }
                                onBlur={() => setEditingSubtopic(null)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" && setEditingSubtopic(null)
                                }
                                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                autoFocus
                              />
                            ) : (
                              <span
                                className="flex-1 text-sm text-gray-700 cursor-pointer"
                                onClick={() =>
                                  setEditingSubtopic({
                                    topicIndex,
                                    subtopicIndex,
                                  })
                                }
                              >
                                {subtopic.title}
                              </span>
                            )}

                            <button
                              onClick={() =>
                                setEditingSubtopic({
                                  topicIndex,
                                  subtopicIndex,
                                })
                              }
                              className="p-1 text-gray-500 hover:text-blue-600"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={() =>
                                deleteSubtopic(topicIndex, subtopicIndex)
                              }
                              className="p-1 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}

                        {topic.subtopics.length === 0 && (
                          <p className="text-sm text-gray-500 italic">
                            No subtopics added yet
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {outline.topic.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No topics added yet. Click "Add Topic" to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* JSON Preview (for development) */}
        <div className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Schema Preview:</h3>
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(outline, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
