import './configs';
import app from './app';
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Back-end a listening at http://localhost:${port}`);
});
