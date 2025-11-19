module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg1: '#034b47ff',   // deep green background
        mint1: '#cae6d5', // mint light section
        accent1: '#e2d6c6', // beige accent (text/buttons)
        cream1: '#e9dcc9', // secondary beige
        muted1: '#93a79a',
        mustard: '#bc9c22',
        mint2: '#f5fffa'   
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
