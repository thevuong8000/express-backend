import app from './app';
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Back-end a listening at http://localhost:${port}`);
});
