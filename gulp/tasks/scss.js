import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //compress css
import webpCss from 'gulp-webpcss'; // print .webp images
import autopreFixer from 'gulp-autoprefixer'; //add vendor prefix
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // grouping media queries


const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {
            sourcemaps: app.isDev
        })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries())
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpCss({
                        webpClass: '.webp',
                        noWebpClass: '.no-webp'
                    }
                )
            ))
        .pipe(
            app.plugins.if(
                app.isBuild,
                autopreFixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 version"],
                    cascade: true
                })
            )
        )
        // uncomment if necessary debug
        // .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}