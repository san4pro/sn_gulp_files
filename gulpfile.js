var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

//компилятор sass(scss) в css 
gulp.task('sass', function() {
  return gulp.src('css/*.scss') //берем источник
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //компилируем сас в css. выставляем читабельный css и не умираем при ошибке
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade:true})) //автопрефиксер 
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    // browserSync.init({
    //     server: "./"
    // });

    browserSync.init({
        proxy: "localhost"
    });

    //автосинхрон php файлов 
    gulp.watch("*.php").on('change', browserSync.reload);

    //автосинхрон js файлов
    gulp.watch('js/*.js', browserSync.reload);
});



//следящая функция, запускаеться при старте
gulp.task('watch', ['sass','serve'], function (){
  gulp.watch('css/*.scss', ['sass']); 

});

gulp.task('default',['watch']);