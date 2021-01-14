import { cloud } from "remax/wechat";
import './app.css';
import 'annar/dist/annar.css'

cloud.init({ env: 'release-b83caf' })

const App = props => props.children;

export default App;
