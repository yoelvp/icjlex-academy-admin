import { ChangeEvent, Suspense, useState } from "react"
import Form from "@/@common/components/form"
import Link from "@/@common/components/link"
import { Tabs, Tab } from "@/@common/components/tabs"
import { useCourseUI } from "../hooks/use-courses-ui"
import { TablePublishedCourses } from "../components/table-published-courses"
import { TableScheduledCourses } from "../components/table-scheduled-courses"
import { useShow } from "@/@common/hooks"
import UpdateImageModal from "../components/update-image-modal"
import { LoadingModal } from "@/@common/components"
import { useGetCourses } from "../hooks/use-get-courses"
import {
  IconAdd,
  IconSearch
} from "@/assets/icons"
import { TAB_INDEX } from "../utils/course-tab-index"

const CoursesPage = () => {
  const [courseId, setCourseId] = useState<string | null>(null)
  const [courseImageUrl, setCourseImageUrl] = useState<string | null>(null)
  const { tab, handleTabIndex } = useCourseUI()
  const { show: showUpdateImageModal, open: openUpdateImageModal, close: closeUpdateImageModal } = useShow()
  const { search, searchUpcomingCourses } = useGetCourses()

  const handleCourseId = (teacherId: string) => {
    setCourseId(teacherId)
  }

  const handleCourseImageUrl = (imageUrl: string) => {
    setCourseImageUrl(imageUrl)
  }

  const handleSearchCourse = (event: ChangeEvent<HTMLInputElement>) => {
    if (tab === TAB_INDEX[0]) {
      search(event.target.value)
    } else {
      searchUpcomingCourses(event.target.value)
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <header className="flex-between">
        <h2 className="header-title">
          Cursos
        </h2>
        <div className="flex items-center gap-x-2">
          <Form.Input
            placeholder="Buscar..."
            size="sm"
            rounded="sm"
            onChange={handleSearchCourse}
            withIcon
            icon={IconSearch}
          />
          <Link href="/admin/courses/create" size="sm" rounded="sm">
            <IconAdd size={24} />
            Crear
          </Link>
        </div>
      </header>

      <section>
        <Tabs defaultValue={tab === null ? "published" : "upcoming"}>
          <Tab title="Publicados" value="published" onChange={() => handleTabIndex(0)}>
            <TablePublishedCourses
              handleCourseId={handleCourseId}
              handleCourseImageUrl={handleCourseImageUrl}
              openUpdateImageModal={openUpdateImageModal}
            />
          </Tab>
          <Tab title="Programados" value="upcoming" onChange={() => handleTabIndex(1)}>
            <TableScheduledCourses
              handleCourseId={handleCourseId}
              handleCourseImageUrl={handleCourseImageUrl}
              openUpdateImageModal={openUpdateImageModal}
            />
          </Tab>
        </Tabs>
      </section>

      {showUpdateImageModal && (
        <Suspense fallback={<LoadingModal />}>
          <UpdateImageModal
            show={showUpdateImageModal}
            close={closeUpdateImageModal}
            courseId={courseId ?? ""}
            defaultImage={courseImageUrl ?? ""}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CoursesPage
