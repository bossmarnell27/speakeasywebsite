import React from 'react';
import { mockAssignments } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Assignment, UserRole } from '../../types';
import { formatDate, getDifficultyColor, getStatusColor } from '../../utils/helpers';

interface AssignmentListProps {
  userRole: UserRole;
  assignments?: Assignment[];
}

const AssignmentList: React.FC<AssignmentListProps> = ({ userRole, assignments = mockAssignments }) => {
  const navigate = useNavigate();

  const handleAssignmentClick = (assignmentId: string) => {
    if (userRole === 'student') {
      navigate(`/student/assignment/${assignmentId}`);
    } else {
      navigate(`/teacher/assignment/${assignmentId}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Assignment</th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Due Date</th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Status</th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Difficulty</th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {assignments.map((assignment) => (
            <tr 
              key={assignment.id} 
              className="hover:bg-slate-50 cursor-pointer transition-colors"
              onClick={() => handleAssignmentClick(assignment.id)}
            >
              <td className="py-4">
                <div>
                  <p className="font-medium text-gray-800">{assignment.title}</p>
                  <p className="text-sm text-gray-500 truncate max-w-xs">{assignment.description}</p>
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {formatDate(assignment.dueDate)}
                  </span>
                </div>
              </td>
              <td className="py-4">
                <span className={`text-sm font-medium ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
              </td>
              <td className="py-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(assignment.difficulty)}`}>
                  {assignment.difficulty}
                </span>
              </td>
              <td className="py-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{assignment.timeLimit} min</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentList;