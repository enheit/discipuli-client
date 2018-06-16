export default {
  root: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  lectures: () => '/lectures',
  courses: () => '/courses',
  createCourse: () => '/courses/create',
  courseRegistration: (courseId) => `/courses/${courseId}/registration`,
  courseDetails: (courseId) => `/courses/${courseId}/details`,
};