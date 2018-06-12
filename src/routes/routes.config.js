export default {
  root: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  lectures: () => '/lectures',
  courses: () => '/courses',
  courseRegistration: (courseId) => `/courses/${courseId}/registration`,
  courseDetails: (courseId) => `/courses/${courseId}/details`,
};