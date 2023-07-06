import replace from "gulp-replace"; // change @img to '*/img/*'
import plumber from "gulp-plumber"; // errors
import notify from "gulp-notify"; // message
import browsersync from "browser-sync"; // local sever
import newer from 'gulp-newer'; // Check window update
import ifPlugin from 'gulp-if';

//export plugins
export const plugins = {
    replace,
    plumber,
    notify,
    browsersync,
    newer,
    if: ifPlugin,
}