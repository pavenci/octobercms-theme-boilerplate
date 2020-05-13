import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import autoprefixer from 'gulp-autoprefixer';
import revAll from 'gulp-rev-all';
import del from 'del';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

const paths = {
    theme: {
        styles: './assets/src/theme/css/theme.css',
        scripts: './assets/src/theme/js/**/*.js',
        build: './assets/build/theme'
    },
    components: {
        styles: './assets/src/components/**/*.css',
        scripts: './assets/src/components/**/*.js',
        build: './assets/build/components'
    }
};


// Theme styles
export function themeStylesDev() {
    return gulp.src(paths.theme.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            level: 2,
        }))
        .pipe(sourcemaps.write())
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'css-hash.json'
        }))
        .pipe(gulp.dest(paths.theme.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.theme.build));
}
export function themeStylesBuild() {
    return gulp.src(paths.theme.styles)
        .pipe(plumber())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'css-hash.json'
        }))
        .pipe(gulp.dest(paths.theme.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.theme.build));
}


// Theme scripts
export function themeScriptsDev() {
    return gulp.src(paths.theme.scripts)
        .pipe(plumber())
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'js-hash.json'
        }))
        .pipe(gulp.dest(paths.theme.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.theme.build));
}
export function themeScriptsBuild() {
    return gulp.src(paths.theme.scripts)
        .pipe(plumber())
        .pipe(terser())
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'js-hash.json'
        }))
        .pipe(gulp.dest(paths.theme.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.theme.build));
}


// Components styles
export function componentsStylesDev() {
    return gulp.src(paths.components.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write())
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'css-hash.json'
        }))
        .pipe(gulp.dest(paths.components.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.components.build));
}
export function componentsStylesBuild() {
    return gulp.src(paths.components.styles)
        .pipe(plumber())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'css-hash.json'
        }))
        .pipe(gulp.dest(paths.components.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.components.build));
}


// Components scripts
export function componentsScriptsDev() {
    return gulp.src(paths.components.scripts)
        .pipe(plumber())
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'js-hash.json'
        }))
        .pipe(gulp.dest(paths.components.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.components.build));
}
export function componentsScriptsBuild() {
    return gulp.src(paths.components.scripts)
        .pipe(plumber())
        .pipe(terser())
        .pipe(revAll.revision({
            hashLength: 8,
            fileNameManifest: 'js-hash.json'
        }))
        .pipe(gulp.dest(paths.components.build))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(paths.components.build));
}


// npm run 'clean'
export const clean = () => del([ './assets/build/' ]);


// 'npm run watch'
function watchFiles() {
    gulp.watch(paths.theme.styles, themeStylesDev);
    gulp.watch(paths.theme.scripts, themeScriptsDev);
    gulp.watch(paths.components.styles, componentsStylesDev);
    gulp.watch(paths.components.scripts, componentsScriptsDev);
}
export { watchFiles as watch };


// 'npm run dev'
export const dev = gulp.series(clean, gulp.parallel(themeStylesDev, themeScriptsDev, componentsStylesDev, componentsScriptsDev));


// 'npm run build'
export const build = gulp.series(clean, gulp.parallel(themeStylesBuild, themeScriptsBuild, componentsStylesBuild, componentsScriptsBuild));