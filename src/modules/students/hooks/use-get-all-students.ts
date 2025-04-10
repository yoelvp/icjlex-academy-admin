import { useQuery } from "@tanstack/react-query"
import { getAllStudentsService } from "@/services/students.service"
import { QueryKeys } from "@/@common/utils"

export const useGetAllStudents = () => {
  return useQuery({
    queryKey: [QueryKeys.STUDENTS],
    queryFn: getAllStudentsService,
    select: (res) => res?.data
  })
}
