module.exports = (req, res, next) => {
	req.headers.authorization =
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbnRlIiwicGFzc3dvcmQiOiJQYXNzd29yMSEiLCJpYXQiOjE2MjEyNjcwMTgsImV4cCI6MzMxNDczMDk0MTh9.QVK4SKcPuPb1dwu1YUVlxfA836WpZkJhljHBfsmvbzg';
	next();
};
