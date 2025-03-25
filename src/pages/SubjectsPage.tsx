import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Subject } from '../types';
import Navbar from '../components/Navbar';
import SubjectList from '../components/SubjectList';
import SubjectForm from '../components/SubjectForm';
import { Plus } from 'lucide-react';

const SubjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchSubjects();
    }
  }, [user]);
  
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('user_id', user?.id)
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddSubject = async (subjectData: { name: string; color: string }) => {
    try {
      const newSubject = {
        ...subjectData,
        user_id: user?.id
      };
      
      const { data, error } = await supabase
        .from('subjects')
        .insert([newSubject])
        .select();
      
      if (error) throw error;
      
      if (data) {
        setSubjects([...subjects, data[0]]);
      }
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };
  
  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setShowSubjectForm(true);
  };
  
  const handleUpdateSubject = async (subjectData: { name: string; color: string }) => {
    if (!editingSubject) return;
    
    try {
      const updatedSubject = {
        ...editingSubject,
        ...subjectData
      };
      
      const { error } = await supabase
        .from('subjects')
        .update(subjectData)
        .eq('id', editingSubject.id);
      
      if (error) throw error;
      
      setSubjects(subjects.map(s => s.id === editingSubject.id ? updatedSubject : s));
      setEditingSubject(null);
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };
  
  const handleDeleteSubject = async (subjectId: string) => {
    try {
      // First, update any tasks that use this subject to remove the subject_id
      const { error: tasksError } = await supabase
        .from('tasks')
        .update({ subject_id: null })
        .eq('subject_id', subjectId);
      
      if (tasksError) throw tasksError;
      
      // Then delete the subject
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', subjectId);
      
      if (error) throw error;
      
      setSubjects(subjects.filter(s => s.id !== subjectId));
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Subjects</h1>
          <button
            onClick={() => {
              setEditingSubject(null);
              setShowSubjectForm(true);
            }}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add Subject
          </button>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <SubjectList 
            subjects={subjects}
            onEditSubject={handleEditSubject}
            onDeleteSubject={handleDeleteSubject}
          />
        </div>
      </div>
      
      {showSubjectForm && (
        <SubjectForm 
          onSubmit={editingSubject ? handleUpdateSubject : handleAddSubject}
          onClose={() => {
            setShowSubjectForm(false);
            setEditingSubject(null);
          }}
          initialData={editingSubject || undefined}
        />
      )}
    </div>
  );
};

export default SubjectsPage;