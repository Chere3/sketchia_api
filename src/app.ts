import * as compression from 'compression';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import * as express from 'express';

import helmet from 'helmet';

import {config as dotConfig} from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { ProfilingIntegration } from '@sentry/profiling-node';

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
  supabase: {
    url: process.env.SUPABASE_URL as string,
    key: process.env.SUPABASE_KEY as string,
    serviceRole: process.env.SUPABASE_SERVICE_ROLE as string,
  }
}




export const supabase = createClient(config.supabase.url, config.supabase.key);
export const supabaseAdmin = createClient(config.supabase.url, config.supabase.serviceRole);
console.log('🌴🎄 | Conectado a supabase con la url: ' + config.supabase.url.slice(0, 20) + '...');
console.log('🌴👑 | Conectado a supabase como admin con la key: ' + config.supabase.key.slice(0, 20) + '...');

app.listen(config.serverConfig.port, () => {
  console.log(`🔌🔦 | Servidor corriendo en el url ${config.serverConfig.url}:${config.serverConfig.port}`);
});



export default app;