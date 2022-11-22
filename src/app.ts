import * as express from 'express';
import helmet from 'helmet';
import {config as dotConfig} from 'dotenv';
import * as csurf from 'csurf';
import * as compression from 'compression';
import { createClient } from '@supabase/supabase-js';

const app = express()
const csurfProtection = csurf({cookie: true});

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({level: 5}));

// Routes
app.use('/v0/users', require('./routes/users.routes.ts'));
app.use('/v0/files', require('./routes/files.routes.ts'));
app.use('/v0/courses', require('./routes/courses.routes.ts'));
app.use('/v0/login', require('./routes/auth.routes.ts'));
app.use('/v0/staff', require('./routes/staff.routes.ts'));
app.use('/v0/', require('./routes/index.routes.ts'));
app.all('/*', (req, res) => {
res.redirect(`/v0/${req.path.slice(1)}`)  
})


dotConfig();

export const config = {
  serverConfig: {
    port: process.env.PORT || 3000 as number,
    url: process.env.URL || 'http://localhost',
  },
  supabase: {
    url: process.env.SUPABASE_URL as string,
    key: process.env.SUPABASE_KEY as string,
  }
}


export const supabase = createClient(config.supabase.url, config.supabase.key)
console.log('🌴🎄 | Conectado a supabase con la url: ' + config.supabase.url.slice(0, 20) + '...');

app.listen(config.serverConfig.port, () => {
  console.log(`🔌🔦 | Servidor corriendo en el url ${config.serverConfig.url}:${config.serverConfig.port}`);
});


export default app;