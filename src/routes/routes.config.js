export default {
  root: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  course: (courseId) => `/courses/${courseId}`,
  createCourseLecture: (specializationId, courseId) => `/${specializationId}/courses/${courseId}/lectures/create`,
  courses: () => '/courses',
  createCourse: () => '/courses/create',
  courseRegistration: (courseId) => `/courses/${courseId}/registration`,
  courseDetails: (courseId) => `/courses/${courseId}/details`,
};