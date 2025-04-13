import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QueryKeys } from "@/@common/utils"
import { createStudentService } from "@/services/students.service"
import { StudentForm } from "@/types"

export const useCreateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: StudentForm) => createStudentService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.STUDENTS] })
    }
  })
}
