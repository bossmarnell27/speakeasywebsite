import { supabase } from '../lib/supabase'
import { Assignment, AssignmentDifficulty } from '../types'

export interface CreateAssignmentData {
  title: string
  description: string
  dueDate: string
  timeLimit: number
  difficulty: AssignmentDifficulty
  teacherId: string
}

export interface AssignmentWithStatus extends Assignment {
  studentAssignmentId?: string
  studentId?: string
}

export const assignmentService = {
  // Create a new assignment and assign it to all students of the teacher
  async createAssignment(data: CreateAssignmentData): Promise<Assignment> {
    try {
      // 1. Create the assignment
      const { data: assignment, error: assignmentError } = await supabase
        .from('assignments')
        .insert({
          title: data.title,
          description: data.description,
          due_date: data.dueDate,
          time_limit: data.timeLimit,
          difficulty: data.difficulty,
          teacher_id: data.teacherId,
        })
        .select()
        .single()

      if (assignmentError) throw assignmentError

      // 2. Get all students for this teacher
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('id')
        .eq('teacher_id', data.teacherId)

      if (studentsError) throw studentsError

      // 3. Create student_assignments for each student
      if (students && students.length > 0) {
        const studentAssignments = students.map(student => ({
          student_id: student.id,
          assignment_id: assignment.id,
          status: 'Not Started'
        }))

        const { error: studentAssignmentError } = await supabase
          .from('student_assignments')
          .insert(studentAssignments)

        if (studentAssignmentError) throw studentAssignmentError
      }

      // Convert database format to app format
      return {
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.due_date,
        timeLimit: assignment.time_limit,
        difficulty: assignment.difficulty as AssignmentDifficulty,
        status: 'Not Started',
        createdAt: assignment.created_at,
        updatedAt: assignment.updated_at,
      }
    } catch (error) {
      console.error('Error creating assignment:', error)
      throw new Error('Failed to create assignment')
    }
  },

  // Get all assignments for a teacher
  async getTeacherAssignments(teacherId: string): Promise<Assignment[]> {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(assignment => ({
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.due_date,
        timeLimit: assignment.time_limit,
        difficulty: assignment.difficulty as AssignmentDifficulty,
        status: 'Not Started', // Default status for teacher view
        createdAt: assignment.created_at,
        updatedAt: assignment.updated_at,
      }))
    } catch (error) {
      console.error('Error fetching teacher assignments:', error)
      throw new Error('Failed to fetch assignments')
    }
  },

  // Get all assignments for a student with their status
  async getStudentAssignments(studentId: string): Promise<AssignmentWithStatus[]> {
    try {
      const { data, error } = await supabase
        .from('student_assignments')
        .select(`
          id,
          status,
          submitted_at,
          graded_at,
          assignments (
            id,
            title,
            description,
            due_date,
            time_limit,
            difficulty,
            created_at,
            updated_at
          )
        `)
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(item => ({
        id: item.assignments.id,
        title: item.assignments.title,
        description: item.assignments.description,
        dueDate: item.assignments.due_date,
        timeLimit: item.assignments.time_limit,
        difficulty: item.assignments.difficulty as AssignmentDifficulty,
        status: item.status as Assignment['status'],
        createdAt: item.assignments.created_at,
        updatedAt: item.assignments.updated_at,
        studentAssignmentId: item.id,
        studentId: studentId,
      }))
    } catch (error) {
      console.error('Error fetching student assignments:', error)
      throw new Error('Failed to fetch student assignments')
    }
  },

  // Update student assignment status
  async updateStudentAssignmentStatus(
    studentAssignmentId: string, 
    status: Assignment['status'],
    submittedAt?: string
  ): Promise<void> {
    try {
      const updateData: any = { status }
      if (submittedAt) {
        updateData.submitted_at = submittedAt
      }

      const { error } = await supabase
        .from('student_assignments')
        .update(updateData)
        .eq('id', studentAssignmentId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating student assignment status:', error)
      throw new Error('Failed to update assignment status')
    }
  },

  // Get assignment by ID
  async getAssignmentById(assignmentId: string): Promise<Assignment | null> {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', assignmentId)
        .single()

      if (error) throw error

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        dueDate: data.due_date,
        timeLimit: data.time_limit,
        difficulty: data.difficulty as AssignmentDifficulty,
        status: 'Not Started',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    } catch (error) {
      console.error('Error fetching assignment:', error)
      return null
    }
  }
}