const app = require('./app');

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.send('I Love you');
});

app.listen(port, () => {
	console.log(`Back-end listening at http://localhost:${port}`);
});
