import App from './app/infrastructure/app';
import Injector from './app/infrastructure/injector';

const injector = new Injector();
new App({injector});

