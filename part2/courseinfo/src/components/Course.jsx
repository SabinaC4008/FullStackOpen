const CourseHeader = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({total}) => <p><b>total of {total} exercises</b></p>





const Course = ({course}) => {
  const count = course.parts.reduce((total, curVal) => total + curVal.exercises, 0)

  return (
    <div>
      <CourseHeader course={course.name} />
      <Content parts={course.parts} />
      <Total total={count} />
    </div>
  )
}

export default Course