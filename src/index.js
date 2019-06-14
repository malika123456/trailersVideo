import App from './components/App/App';
import './index.scss';

let app = new App();
document.getElementById('movie-app').innerHTML = app.render();
app.afterRender();
