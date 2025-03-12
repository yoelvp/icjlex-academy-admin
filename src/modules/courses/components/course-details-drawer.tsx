import { Accordion, List } from "flowbite-react"
import { CourseCard } from "./course-card"
import {
  IconBookMarked,
  IconList,
  IconStar,
  IconTimeOutline
} from "@/assets/icons"
import Button from "@/@common/components/button"
import { Drawer } from "@/@common/components"

interface Props {
  show: boolean
  close: () => void
}

const data = [
  {
    title: "Título del acordeón 1",
    subtitles: [
      { title: "Subtítulo 1.1", time: "00:04" },
      { title: "Subtítulo 1.2", time: "00:00" }
    ]
  },
  {
    title: "Título del acordeón 2",
    subtitles: [
      { title: "Subtítulo 2.1", time: "05:01" },
      { title: "Subtítulo 2.2", time: "01:00" }
    ]
  }
]

const CourseDetailsDrawer = ({ show, close }: Props) => {
  return (
    <Drawer
      show={show}
      onClose={close}
      title="Detalles del curso"
    >
      <div className="space-y-4">
        <div>
          <img
            src="/image-placeholder.png"
            alt="Course image"
            className="rounded w-full h-48 object-center object-cover"
          />

          <div className="flex-between py-2">
            <div className="flex-center space-x-1">
              <IconStar color="gold" size={20} />
              <p className="text-primary-300">0(0 reviews)</p>
            </div>
            <div className="flex-center space-x-1">
              <IconTimeOutline
                size={20}
                className="text-primary-700 font-bold"
              />
              <p className="text-primary-300">02:00:00</p>
            </div>
            <div className="flex-center space-x-1">
              <IconBookMarked
                size={20}
                className="text-primary-700 font-bold"
              />
              <p className="text-primary-300">1 Clase</p>
            </div>
          </div>

          <div>
            <p>
              Aprende las bases del idioma que te abre las puertas en cualquier
              parte del mundo.
            </p>
          </div>
        </div>
        <CourseCard title="¿Qué aprenderás?">
          <List className="w-full">
            <List.Item icon={IconList} color="green">
              En este curso aprenderás las bases de reorganización de sociedades
            </List.Item>
            <List.Item icon={IconList}>A reorganizar sociedades</List.Item>
            <List.Item icon={IconList}>Convivir en sociedada</List.Item>
          </List>
        </CourseCard>

        <CourseCard title="Temario del curso">
          <Accordion
            flush
            alwaysOpen={false}
          >
            {data.map((item, index) => (
              <Accordion.Panel key={index}>
                {/* Título principal del acordeón con enumeración */}
                <Accordion.Title>
                  <span className="font-bold">
                    {index + 1}. {item.title}
                  </span>
                </Accordion.Title>
                <Accordion.Content>
                  {/* Subtítulos con enumeración dinámica */}
                  <div className="space-y-2">
                    {item.subtitles.map((subtitle, subIndex) => (
                      <div key={subIndex} className="flex-between p-2 hover:bg-primary-50 transition cursor-pointer">
                        <span className="">
                          {index + 1}.{subIndex + 1}. {subtitle.title}
                        </span>
                        <p className="text-sm text-primary-500">
                          {subtitle.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </CourseCard>

        <div>
          <Button
            variant={"primary.outline"}
            className="w-full"
            onClick={close}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default CourseDetailsDrawer
