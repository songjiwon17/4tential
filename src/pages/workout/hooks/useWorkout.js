import { useState, useEffect } from 'react';

const useWorkout = (workouts, profileSave) => {
  const [selectedType, setSelectedType] = useState('전체');

  const isProfileSaved = () => {
    return profileSave?.name && profileSave.name.trim() !== '';
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (isProfileSaved() && profileSave.type) {
      setSelectedType(profileSave.type);
    }
  }, [profileSave]);

  return {
    selectedType,
    handleTypeClick,
    isProfileSaved,
  };
};

export default useWorkout;
