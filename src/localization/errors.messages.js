export default {
  required: (field) => `The ${field} is required.`,
  tooLong: (field) => `The ${field} is too long.`,
  tooShort: (field) => `The ${field} is too short.`,
  doNotMatch: (field) => `${field} do not match.`,
  alreadyExist: (field) => `The ${field} already exist!`,
}