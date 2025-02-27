import App from './shared/infrastructure/app';
import Injector from './shared/infrastructure/injector';

const injector = new Injector();
new App({injector});

