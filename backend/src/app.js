import  express  from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';
import sessions from 'express-session';
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import __dirname from './utils.js';
// import passport from 'passport';
import { config } from './config/configCommander.js';

// import { inicializarPassport } from './config/config.passport.js';
// import { router as routerCarrito } from './routes/carrito.router.js';
import { router as routerHome } from './routes/products.router.js';
// import { router as routerRegistro } from './routes/registro.router.js';
// import { router as routerLogin } from './routes/login.router.js';
// import { router as routerPerfil } from './routes/perfil.router.js';
// import { router as routerLogout } from './routes/logout.router.js';


const PORT = config.PORT;
const app = express();

// app.use(sessions(
//     {
//         secret:"codercoder123",
//         resave: true, 
//         saveUninitialized: true,
//         store: mongoStore.create(
//             {
//                 // se cambia la url y dbname con la variables de entorno
//                 mongoUrl: config.MONGO_URL,
//                 mongoOptions:{ dbName: config.DBNAME},
//                 ttl:3600
//             }
//         )
//     }
// ))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// inicializarPassport();
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());

app.use('/home', 
    // Pasa la información del usuario a la vista "home" solo si se ha iniciado sesión
    // if (req.session.usuario) {
    //     res.locals.usuario = req.session.usuario;

    //     // Verifica si la consulta 'login' está presente y muestra el mensaje de bienvenida
    //     if (req.query.login === 'success') {
    //         res.locals.welcomeMessage = true;
    //     }
    // }

    // next();
 routerHome);
// app.use('/api/carts', routerCarrito)
// app.use('/api/registro', routerRegistro)
// app.use('/api/perfil', routerPerfil)
// app.use('/api/login', routerLogin)
// app.use('/api/logout', routerLogout)


const connectToDatabase = async () => {
    try {
        // se usan las variables de entorno
        await mongoose.connect(config.MONGO_URL, { dbName: config.DBNAME });
        console.log(`DB Online...!!! Base: ${config.DBNAME}`);
    } catch (error) {
        console.log(error.message);
    }
};

connectToDatabase();


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${config.PORT}`);
});

