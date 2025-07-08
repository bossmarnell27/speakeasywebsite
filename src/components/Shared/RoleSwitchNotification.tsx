import React, { useEffect, useState } from 'react';
import { CheckCircle, GraduationCap, Users } from 'lucide-react';
import { UserRole } from '../../types';

interface RoleSwitchNotificationProps {
  role: UserRole;
  isVisible: boolean;
  onClose: () => void;
}

const RoleSwitchNotification: React.FC<RoleSwitchNotificationProps> = ({
  role,
  isVisible,
  onClose
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const roleInfo = {
    student: {
      icon: GraduationCap,
      title: 'Student View',
      description: 'You are now viewing the student dashboard'
    },
    teacher: {
      icon: Users,
      title: 'Teacher View', 
      description: 'You are now viewing the teacher dashboard'
    }
  };

  const currentRole = role ? roleInfo[role] : roleInfo.student;
  const IconComponent = currentRole.icon;

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
      isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <IconComponent className="h-4 w-4 text-gray-600" />
              <h3 className="font-medium text-gray-800">{currentRole.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{currentRole.description}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitchNotification; 