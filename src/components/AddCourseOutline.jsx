import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  useCreateOutlineMutation,
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useUpdateOutlineMutation,
} from "../redux/api/courseApi";
import Swal from "sweetalert2";

export default function AddCourseOutline() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: courseRes } = useGetAllCourseQuery({});
  const coursesData = courseRes?.data || [];

  const { data: singleCourseRes } = useGetSingleCourseQuery(selectedCourse, {
    skip: !selectedCourse,
  });

  const [createOutline] = useCreateOutlineMutation();
  const [updateOutline] = useUpdateOutlineMutation();

  const singleCourse = singleCourseRes?.data || null;
  const existingOutline = singleCourse?.outline || null;

  const [outline, setOutline] = useState({
    course: "",
    topic: [],
  });

  const [editingTopic, setEditingTopic] = useState(null);
  const [editingSubtopic, setEditingSubtopic] = useState(null);
  const [expandedTopics, setExpandedTopics] = useState(new Set([0, 1]));
  const [isSaving, setIsSaving] = useState(false);

  // Reset outline when course selection changes
  useEffect(() => {
    if (selectedCourse) {
      if (existingOutline) {
        // Load existing outline
        setOutline({
          course: selectedCourse,
          topic: existingOutline.topic || [],
        });
      } else {
        // Initialize new outline for selected course
        setOutline({
          course: selectedCourse,
          topic: [],
        });
      }
    } else {
      // Reset when no course is selected
      setOutline({
        course: "",
        topic: [],
      });
    }
  }, [selectedCourse, existingOutline]);

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
    const newTopicIndex = outline.topic.length;
    setOutline((prev) => ({
      ...prev,
      topic: [...prev.topic, { title: "New Topic", subtopics: [] }],
    }));
    // Expand and start editing the new topic immediately
    setExpandedTopics((prev) => new Set([...prev, newTopicIndex]));
    setEditingTopic(newTopicIndex);
  };

  const deleteTopic = (index) => {
    setOutline((prev) => ({
      ...prev,
      topic: prev.topic.filter((_, i) => i !== index),
    }));
    setEditingTopic(null);
    // Update expanded topics to account for removed topic
    const newExpanded = new Set();
    expandedTopics.forEach((topicIndex) => {
      if (topicIndex < index) {
        newExpanded.add(topicIndex);
      } else if (topicIndex > index) {
        newExpanded.add(topicIndex - 1);
      }
    });
    setExpandedTopics(newExpanded);
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
    const currentSubtopics = outline.topic[topicIndex]?.subtopics || [];
    const newSubtopicIndex = currentSubtopics.length;

    setOutline((prev) => ({
      ...prev,
      topic: prev.topic.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              subtopics: [...topic.subtopics, { title: "New Subtopic" }],
            }
          : topic
      ),
    }));
    // Start editing the new subtopic immediately
    setEditingSubtopic({
      topicIndex,
      subtopicIndex: newSubtopicIndex,
    });
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
    if (!selectedCourse) {
      alert("Please select a course first.");
      return;
    }

    if (outline.topic.length === 0) {
      alert("Please add at least one topic before saving.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await createOutline({
        courseId: selectedCourse,
        topic: outline.topic,
      }).unwrap();
      showSuccessAlert();
    } catch (error) {
      console.error("Error saving outline:", error);
      alert(
        `Error ${
          existingOutline ? "updating" : "creating"
        } outline. Please try again.`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "<strong>🎉 Course Outline Updated!</strong>",
      html: "Your course outline has been successfully <b>updated</b> ✅",
      icon: "success",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonColor: "#00baff",
      background: "linear-gradient(135deg, #1f2937, #111827)",
      color: "#ffffff",
      iconColor: "#00baff",
      customClass: {
        popup:
          "rounded-3xl shadow-2xl p-6 border-2 border-cyan-500 animate-fadeIn",
        title: "text-2xl font-bold text-cyan-400",
        content: "text-lg text-gray-300",
        confirmButton:
          "text-white bg-cyan-500 hover:bg-cyan-400 px-6 py-2 rounded-full font-semibold transition-all duration-300",
      },
    })
  };

  const handleCourseChange = (courseId) => {
    // Reset editing states when changing course
    setEditingTopic(null);
    setEditingSubtopic(null);
    setExpandedTopics(new Set([0, 1]));
    setSelectedCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Course Outline Manager
                </h1>
                {selectedCourse && (
                  <p className="text-sm text-gray-600 mt-1">
                    {existingOutline
                      ? "Editing existing outline"
                      : "Creating new outline"}
                  </p>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving || !selectedCourse}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save size={16} />
                {isSaving
                  ? "Saving..."
                  : existingOutline
                  ? "Update Outline"
                  : "Save Outline"}
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
              onChange={(e) => handleCourseChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a course...</option>
              {coursesData?.length > 0 &&
                coursesData.map((course) => (
                  <option key={course._id} value={course.id}>
                    {course?.title}
                  </option>
                ))}
            </select>

            {selectedCourse && existingOutline && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                This course already has an outline with{" "}
                {existingOutline.topic?.length || 0} topics. You can modify and
                update it.
              </div>
            )}
          </div>

          {/* Topics */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Course Topics{" "}
                {outline.topic.length > 0 && `(${outline.topic.length})`}
              </h2>
              <button
                onClick={addTopic}
                className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={!selectedCourse}
              >
                <Plus size={16} />
                Add Topic
              </button>
            </div>

            {!selectedCourse ? (
              <div className="text-center py-8 text-gray-500">
                <p>Please select a course to manage its outline.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {outline.topic.map((topic, topicIndex) => (
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
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                setEditingTopic(null);
                              }
                            }}
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

                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          {topic.subtopics?.length || 0} subtopics
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTopic(topicIndex)}
                          className="p-1 text-gray-500 hover:text-blue-600"
                          title="Edit topic"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => deleteTopic(topicIndex)}
                          className="p-1 text-gray-500 hover:text-red-600"
                          title="Delete topic"
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
                          {topic.subtopics?.map((subtopic, subtopicIndex) => (
                            <div
                              key={subtopicIndex}
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                            >
                              {editingSubtopic?.topicIndex === topicIndex &&
                              editingSubtopic?.subtopicIndex ===
                                subtopicIndex ? (
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
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      setEditingSubtopic(null);
                                    }
                                  }}
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
                                title="Edit subtopic"
                              >
                                <Edit3 size={12} />
                              </button>
                              <button
                                onClick={() =>
                                  deleteSubtopic(topicIndex, subtopicIndex)
                                }
                                className="p-1 text-gray-500 hover:text-red-600"
                                title="Delete subtopic"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}

                          {(!topic.subtopics ||
                            topic.subtopics.length === 0) && (
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
                    <p>
                      No topics added yet. Click "Add Topic" to get started.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* JSON Preview (for development) */}
        {/* {process.env.NODE_ENV === "development" && (
          <div className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Schema Preview:</h3>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(outline, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  );
}
