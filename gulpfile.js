const plugins = require('gulp-load-plugins')({
    replaceString: /^gulp(-|\.)/,
    camelize: true
})
const gulp = require('gulp')
const fs = require('fs')
const runSequence = require('run-sequence').use(gulp)
const autoprefixer = require('autoprefixer')


const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
if (!(config.templates in [ 'twig' ])) config.templates = 'twig'
if (!(config.styles in [ 'stylus' ])) config.styles = 'stylus'

const formats = {
    templates: {
        twig: '.twig'
    },
    styles: {
        stylus: '.styl'
    },
    js: '.js'
}

let isDev


gulp.task('clean', () => {
    return gulp.src('./build/')
        .pipe(plugins.plumber())
        .pipe(plugins.clean())
})


gulp.task('pages', [ 'pages/'+ config.templates ], () => {
    return gulp.watch(
        [
        	'./public/pages/*' + formats.templates[config.templates],
        	'./public/blocks/*/*' + formats.templates[config.templates],
			'./public/data/*.json'
        ],
        [ 'pages/'+ config.templates ])
})
gulp.task('pages/twig', (callback) => {
    let data = {}

    fs.readdir('./public/data/', (err, list) => {
        list.map((item) => {
            let name = item.replace('.json', '')
            data[name] = JSON.parse(fs.readFileSync('./public/data/' + item, 'utf8'))

            gulp.src('./public/pages/*.twig')
                .pipe(plugins.plumber())
                .pipe(plugins.twig({
                    data: {
                        data: data,
                        extends: '../blocks/_extends/_extends.twig',
						isDev: isDev
                    },
                    base: './public/blocks/',
                    functions: [
                        {
                            name: 'block',
                            func: function (name) {
                                return name +'/'+ name +'.twig'
                            }
                        }
                    ]
                }))
                .pipe(gulp.dest('./build/'))
        })
		callback()
    })
})


gulp.task('styles', [ 'styles/'+ config.styles ], () => {
    return gulp.watch(
        [
        	'./public/blocks/*/*'+formats.styles[config.styles]
        ],
        [ 'styles/'+ config.styles ]
    )
})
gulp.task('styles/stylus', () => {
	var processors = [
		autoprefixer({browsers: ['> 0.005%']})
	];

    return gulp.src
        ([
        	'./public/blocks/_extends/_extends' + formats.styles[config.styles],
        	'./public/blocks/*/*' + formats.styles[config.styles]
        ])
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('style.styl'))
        .pipe(plugins.stylus())
		.pipe(plugins.postcss(processors))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest('./build/f/styles'))
})


gulp.task('files', [ 'files/copy' ], () => {
    return gulp.watch(
        [
        	'./public/f/**',
            '!./public/f/dynamic/',
            '!./public/f/dynamic/**'
        ],
        [ 'files/copy' ]
    )
})
gulp.task('files/copy', () => {
    return gulp.src
        ([
			'./public/f/**',
			'!./public/f/dynamic/',
			'!./public/f/dynamic/**'
        ])
        .pipe(gulp.dest('./build/f/'))
})


gulp.task('htaccess', () => {
    return gulp.src
        ([
            './public/htaccess.txt'
        ])
        .pipe(plugins.rename('.htaccess'))
        .pipe(gulp.dest('./build/'))
})


gulp.task('scripts', [ 'scripts/babel' ], () => {
    return gulp.watch(
        [
        	'./public/blocks/*/*' + formats.js
        ],
        [ 'scripts/babel' ]
    )
})
gulp.task('scripts/babel', (callback) => {
    return gulp.src
        ([
			'!./public/blocks/dynamic/dynamic-header.js',
			'./public/blocks/libs/*.js',
			'./public/blocks/_extends/builder.js',
			'./public/blocks/*/*'+formats.js
        ])
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015'],
			compact: false
        }))
        .pipe(plugins.concat('script.js'))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest('./build/f/js/'))
})


gulp.task('dynamic', [ 'dynamic/build' ], () => {
    return gulp.watch(
        [
        	'./public/f/dynamic/*.svg'
        ],
        [ 'dynamic/build' ]
    )
})


gulp.task('dynamic/build', (callback) => {
    let data = {}

    fs.readdir('./public/f/dynamic/', (err, list) => {
        list.map((item) => {
            let name = item.replace('.svg', '')
            data[name] = fs.readFileSync('./public/f/dynamic/' + item, 'utf8')
        })

        data = JSON.stringify(data)

        fs.writeFileSync(
            './build/f/js/dynamic.js',
            `builder.dynamic.list = ${data}; builder.dynamic.update()`
        )

        callback()
    })
})

gulp.task('beautifier', (callback) => {
	gulp.src('./build/f/styles/style.css')
		.pipe(plugins.plumber())
		.pipe(plugins.cssnano())
		.pipe(gulp.dest('./build/f/styles'))

	gulp.src([ './build/f/js/script.js', './build/f/js/dynamic.js' ])
		.pipe(plugins.plumber())
		.pipe(plugins.concat('script.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('./build/f/js'))


	return gulp.src([
		'./build/f/js/script.js.map',
		'./build/f/js/dynamic.js',
		'./build/f/styles/style.css.map'
	])
		.pipe(plugins.plumber())
		.pipe(plugins.clean())

	callback()
})

gulp.task('isDevDisabled', () => {
	isDev = false
})

gulp.task('isDevEnabled', () => {
	isDev = true
})


gulp.task(
    'default',
    () => {
        runSequence(
			'isDevEnabled',
            'clean',
            'files',
            'htaccess',
            [ 'pages', 'styles', 'scripts' ],
            'dynamic'
        )
    }
)


gulp.task(
    'build',
    () => {
        runSequence(
        	'isDevDisabled',
            'clean',
            'files',
            'htaccess',
            [ 'pages', 'styles', 'scripts' ],
            'dynamic',
			'beautifier'
        )
    }
)
