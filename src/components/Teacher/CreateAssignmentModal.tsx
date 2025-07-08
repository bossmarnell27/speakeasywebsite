import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Assignment, AssignmentDifficulty } from '../../types';
import { assignmentService } from '../../services/assignmentService';
import { useAuth } from '../../context/AuthContext';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assignment: Assignment) => void;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    timeLimit: 3,
    difficulty: 'Medium' as AssignmentDifficulty,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    assignmentService.createAssignment({
      ...formData,
      teacherId: user.id,
    })
    .then((assignment) => {
      onSubmit(assignment);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        timeLimit: 3,
        difficulty: 'Medium',
      });
      onClose();
    })
    .catch((err) => {
      setError(err.message || 'Failed to create assignment');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      timeLimit: 3,
      difficulty: 'Medium',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center border-b border-slate-200 p-4">
          <h2 className="text-xl font-bold text-gray-800">Create New Assignment</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Assignment Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
                required
                placeholder="Enter assignment title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-slate-200 rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
                required
                placeholder="Describe the assignment requirements..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  id="timeLimit"
                  min="1"
                  max="10"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as AssignmentDifficulty })}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-slate-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isSubmitting ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;