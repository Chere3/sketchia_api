import * as compression from 'compression';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import * as express from 'express';

import helmet from 'helmet';

import {config as dotConfig} from 'dotenv';
import { ProfilingIntegration } from '@sentry/profiling-node';
import {getFirestore} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const app = express();


dotConfig();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
      new ProfilingIntegration()
    ],
    tracesSampleRate: 1.0,
});

// Middlewares
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({level: 5}));



// Routes
app.use('/v0/users', require('./routes/users.routes'));
app.use('/v0/files', require('./routes/files.routes'));
app.use('/v0/courses', require('./routes/courses.routes'));
app.use('/v0/auth', require('./routes/auth.routes'));
app.use('/v0/staff', require('./routes/staff.routes'));
app.use('/v0/', require('./routes/index.routes'));
app.all('/*', (req, res) => {
res.redirect(`/v0/${req.path.slice(1)}`)  
})

app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err: any, req: any , res: any, next: any) {
  res.statusCode = 500;
  return res.end(res.sentry + "\n");
});


export const config = {
  serverConfig: {
    port: process.env.PORT || 3000 as number,
    url: process.env.URL || 'http://localhost',
  },
  firebase: {
    apiKey: process.env.API_KEY as string,
    authDomain: process.env.AUTH_DOMAIN as string,
    projectId: process.env.PROJECT_ID as string,
    storageBucket: process.env.STORAGE_BUCKET as string,
    messagingSenderId: process.env.MESSAGING_SENDER_ID as string,
    appId: process.env.APP_ID as string,
    measurementId: process.env.MEASUREMENT_ID as string,
  }
}

// Initialize Firebase
const firebase = initializeApp(config.firebase);
export const db = getFirestore(firebase);
export const auth = getAuth(firebase);

console.log(`🎄 | Firestore inicializado.`);
console.log(`🎄 | Modúlos de autenticación inicializados.`);

app.listen(config.serverConfig.port, () => {
  console.log(`🔌🔦 | Servidor corriendo en el url ${config.serverConfig.url}:${config.serverConfig.port}`);
});



export default app;