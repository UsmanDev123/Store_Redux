export const BaseUrl = 'https://test.scserver.org/';

export const EndPoints = {
  loginUser: 'login', //login from app
  logOutUser: 'logout', //logout from app
  signupUser: 'register', //register from app
  forgotPassword: 'otp/send', //forgot password
  verifyOtp: 'otp/verify', //verify OTP
  resetPassword: 'forgetpassword', //reset password
  riggerTicket: 'ticket', //rigger ticket form
  getAllJobs: 'job', //get all jobs
  payDuty: 'payduty', //pay duty
  transportationTicket: 'trans', //transportation ticket
  jobUpdate:'jobs' ,//Update all Values of Jobs 
  generatePDF: 'pdf', ///PDF GENERATOR
  sendPdfToMail: 'sendemail', //send pdf to email
};
