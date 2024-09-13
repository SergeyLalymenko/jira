module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        boxShadow: {
            DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            inner: 'inset 0 0 4px 0 rgba(0, 0, 0, 0.06)',
            none: 'none',
        },
        extend: {
            colors: {
                'text': '#fff',
                'text-upper': '#1a1a1a',
                'link': '#42b883',
                'linkHighlight': '#42d392',
                'background': '#1a1a1a',
                'background-upper': '#fff',
                'field-background': '#fff',
                'field-text': '#1a1a1a',
                'field-border': '#000',
                'overley': 'rgba(255, 255, 255, .2)',
                'chess-cell-white': '#fff',
                'chess-cell-black': '#363333',
                'divider': '#5454547a',
                'border': '#fff',
                'active': '#42b883',
                'activeHighlight': '#42d392',
                'danger': '#dc3545'
            }
        }
    },
    plugins: [],
}
