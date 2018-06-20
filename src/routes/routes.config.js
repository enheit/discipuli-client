export default {
  root: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  lecture: (specializationId, courseId, lectureId) => `/${specializationId}/courses/${courseId}/lectures/${lectureId}`,
  course: (specializationId, courseId) => `/${specializationId}/courses/${courseId}`,
  coursesSubscriptions: () => `/courses/subscriptions`,
  createCourseLecture: (specializationId, courseId) => `/${specializationId}/courses/${courseId}/lectures/create`,
  courses: () => '/courses',
  createCourse: () => '/courses/create',
  courseRegistration: (courseId) => `/courses/${courseId}/registration`,
  courseDetails: (courseId) => `/courses/${courseId}/details`,
};
