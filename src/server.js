
const auth = require('./routes/auth.js');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const dashRouter = require('./routes/dashRouter');
const projectRouter = require('./routes/projectRouter');
const eventsRouter = require('./routes/eventsRouter');
const leavesRouter = require('./routes/leavesRouter');
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const teamRouter = require('./routes/teamRouter');
const githubRouter = require('./routes/githubRouter');
const personalCostRouter = require('./routes/personalCostRouter');
const callAutomation = require('./utils/automationCaller');
const populateTables = require('./utils/populateTables/populateTables');
const roleInProjectsRouter = require('./routes/roleInProjectsRouter.js');
const supplementaryCostRouter = require('./routes/supplementaryCostRouter.js');
const { verifyJWT } = require('./middlewares/auth');
const pulseRouter = require('./routes/pulseRouter');
const sonarRouter = require('./routes/sonarRouter');
const retroRouter = require('./routes/retroRouter');
const bookmarksRouter = require('./routes/bookmarksRouter');

require('dotenv').config();
const app = express();
const port = 8080;

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

if (!process.env.jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

callAutomation();

app.use(express.json());
app.use(cookieParser());
app.use('/auth', auth);
app.use(verifyJWT);
app.use('/uploads', express.static('uploads'));
app.use('/retro', retroRouter);
app.use('/projects', projectRouter);
app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/admin', adminRouter);
app.use('/users', userRouter);
app.use('/events', eventsRouter);
app.use('/leaves', leavesRouter);
app.use('/dashboard', dashRouter);
app.use('/roleInProjects', roleInProjectsRouter);
app.use('/teams', teamRouter);
app.use('/populate', populateTables);
app.use('/github', githubRouter);
app.use('/pulse', pulseRouter);
app.use('/sonar', sonarRouter);
app.use('/supplementaryCost', supplementaryCostRouter);
app.use('/personalCost', personalCostRouter);
app.use('/bookmarks', bookmarksRouter);

app.listen(port, () =>
  console.log(`Dashboard BE listening at http://localhost:${port}`)
);
