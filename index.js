const app = require('./backend/app');
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Back-end listening at http://localhost:${port}`);
});
